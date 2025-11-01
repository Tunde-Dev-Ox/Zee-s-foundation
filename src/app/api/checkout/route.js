import Stripe from "stripe";

// Validate environment variable
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Constants
const MAX_DONATION_AMOUNT = 100000; // $10,000 maximum
const MIN_DONATION_AMOUNT = 1; // $1 minimum
const ALLOWED_FREQUENCIES = ["one-time", "monthly"];

// Get base URL - remove trailing slash for consistency
function getBaseUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://zee-foundation.vercel.app";
  // Remove trailing slash if present
  return url.replace(/\/$/, '');
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple rate limiting store (in production, use Redis or similar)
const rateLimitMap = new Map();

function checkRateLimit(identifier, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(identifier) || [];
  
  // Remove old requests outside the window
  const validRequests = userRequests.filter(time => now - time < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitMap.set(identifier, validRequests);
  return true;
}

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false; // RFC 5321 limit
  return EMAIL_REGEX.test(email);
}

export async function POST(req) {
  // Rate limiting - use IP address as identifier
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
    
    // Validate body size (rough estimate: 1KB max)
    const bodyString = JSON.stringify(body);
    if (bodyString.length > 1024) {
      return new Response(
        JSON.stringify({ error: "Request too large" }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { amount, email, frequency } = body;

    // Validate amount
    const amountNum = Number(amount);
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      return new Response(
        JSON.stringify({ error: "Invalid amount" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (amountNum < MIN_DONATION_AMOUNT) {
      return new Response(
        JSON.stringify({ error: `Minimum donation amount is $${MIN_DONATION_AMOUNT}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (amountNum > MAX_DONATION_AMOUNT) {
      return new Response(
        JSON.stringify({ error: `Maximum donation amount is $${MAX_DONATION_AMOUNT.toLocaleString()}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email
    if (email && !validateEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate frequency
    const normalizedFrequency = frequency?.toLowerCase();
    if (normalizedFrequency && !ALLOWED_FREQUENCIES.includes(normalizedFrequency)) {
      return new Response(
        JSON.stringify({ error: "Invalid frequency. Must be 'one-time' or 'monthly'" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const finalFrequency = normalizedFrequency || "one-time";
    
    // Get base URL
    const baseUrl = getBaseUrl();
    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/cancel`;

    let session;

    if (finalFrequency === "monthly") {
      // Create a subscription for monthly donations
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Zee's Foundation Monthly Donation",
                description: "Recurring monthly donation to support families",
              },
              unit_amount: amount * 100,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: email,
        allow_promotion_codes: true,
      });
    } else {
      // Create a one-time payment
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Zee's Foundation Donation",
                description: "One-time donation to support children with special needs",
              },
              unit_amount: amount * 100, 
            },
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: email,
        allow_promotion_codes: true,
      });
    }

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    // Log error server-side only (don't expose details to client)
    console.error("Stripe error:", {
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