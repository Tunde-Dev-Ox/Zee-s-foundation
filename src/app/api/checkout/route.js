// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   try {
//     const { amount, email } = await req.json();

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Zee's Foundation Donation",
//             },
//             unit_amount: amount * 100, // Convert dollars to cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//     //   success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
//     //   cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate`,
//         success_url: "http://localhost:3000/success",
//         cancel_url: "http://localhost:3000/donate",

//       customer_email: email,
//     });

//     return new Response(JSON.stringify({ url: session.url }), { status: 200 });
//   } catch (error) {
//     console.error("Stripe error:", error);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }








import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, email, frequency } = await req.json();

    // Validate input
    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: "Invalid amount" }), 
        { status: 400 }
      );
    }

    let session;

    if (frequency === "monthly") {
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
              unit_amount: amount * 100, // Convert dollars to cents
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/donate`,
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
                description: "One-time donation to support families",
              },
              unit_amount: amount * 100, // Convert dollars to cents
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/donate`,
        customer_email: email,
        allow_promotion_codes: true,
      });
    }

    return new Response(
      JSON.stringify({ url: session.url }), 
      { status: 200 }
    );
  } catch (error) {
    console.error("Stripe error:", error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500 }
    );
  }
}