import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { session_id } = await req.json();
    
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate`,
    });

    return new Response(
      JSON.stringify({ url: portalSession.url }), 
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500 }
    );
  }
}