import Stripe from "stripe";

// Validate environment variable
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Get base URL - remove trailing slash for consistency
function getBaseUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://zee-foundation.vercel.app';
  // Remove trailing slash if present
  return url.replace(/\/$/, '');
}

// Simple rate limiting store
const rateLimitMap = new Map();

function checkRateLimit(identifier, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(identifier) || [];
  
  const validRequests = userRequests.filter(time => now - time < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitMap.set(identifier, validRequests);
  return true;
}

function validateSessionId(sessionId) {
  // Stripe session IDs start with cs_ and are typically 67 characters
  if (!sessionId || typeof sessionId !== 'string') return false;
  if (sessionId.length < 20 || sessionId.length > 100) return false;
  if (!sessionId.startsWith('cs_')) return false;
  return /^[a-zA-Z0-9_]+$/.test(sessionId);
}

export async function POST(req) {
  // Rate limiting
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';
  
  if (!checkRateLimit(ip, 10, 60000)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    // Validate Content-Type
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: "Invalid content type" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { session_id } = body;

    // Validate session_id
    if (!session_id || !validateSessionId(session_id)) {
      return new Response(
        JSON.stringify({ error: "Invalid session ID" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    
    // Validate that session has a customer
    if (!checkoutSession.customer) {
      return new Response(
        JSON.stringify({ error: "Session does not have an associated customer" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const baseUrl = getBaseUrl();
    
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: `${baseUrl}/donate`,
    });

    return new Response(
      JSON.stringify({ url: portalSession.url }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    // Log error server-side only
    console.error("Stripe portal error:", {
      message: error.message,
      type: error.type,
      code: error.code
    });

    // Return generic error to client
    const statusCode = error.type === 'StripeInvalidRequestError' ? 400 : 500;
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request. Please try again." }),
      {
        status: statusCode,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}