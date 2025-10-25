import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, email } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Zu Foundation Donation",
            },
            unit_amount: amount * 100, // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
    //   success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate`,
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/donate",

      customer_email: email,
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error("Stripe error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
