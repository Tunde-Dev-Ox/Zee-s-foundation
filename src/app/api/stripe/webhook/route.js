import Stripe from "stripe";
import { Resend } from "resend";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // 💰 Donation amount
    const amount = session.amount_total / 100;

    // 📧 Safely get donor email
    let donorEmail = session.customer_email;
    if (!donorEmail && session.customer) {
      try {
        const customer = await stripe.customers.retrieve(session.customer);
        donorEmail = customer.email;
      } catch (fetchErr) {
        console.error("Failed to retrieve customer email:", fetchErr);
      }
    }

    if (!donorEmail) {
      console.warn("⚠️ No donor email found for session:", session.id);
      return new Response("No email to send to", { status: 200 });
    }

    console.log(`📨 Sending thank-you email to ${donorEmail}`);

    try {
      await resend.emails.send({
        from: "Zee’s Foundation <donations@resend.dev>",
        to: donorEmail,
        subject: "Thank You for Supporting Zee’s Foundation ❤️",
        html: `
        <div style="background-color:#f8f9fb;padding:40px 0;font-family:'Helvetica Neue',Arial,sans-serif;color:#333;">
          <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">
            <tr>
              <td align="center" style="background-color:#f0f4ff;padding:30px 20px;">
                <img src="https://zee-foundation.vercel.app/logo.svg" alt="Zee’s Foundation" width="90" style="display:block;margin-bottom:10px;">
                <h1 style="font-size:22px;margin:0;color:#2a2a2a;">Thank You for Your Donation</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;">
                <p style="font-size:16px;line-height:1.6;margin:0 0 10px;">Dear Friend,</p>
                <p style="font-size:16px;line-height:1.6;margin:0 0 20px;">
                  We’ve received your generous donation of <b>$${amount}</b>.  
                  Your support helps us continue empowering children with special needs and providing resources for their families.
                </p>
                <p style="font-size:16px;line-height:1.6;margin:0 0 30px;">
                  You’re now part of a growing community committed to inclusion, care, and hope.
                </p>
                <div style="text-align:center;">
                  <a href="https://zee-foundation.vercel.app" 
                    style="background-color:#3b82f6;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;display:inline-block;font-weight:bold;">
                    Visit Our Website
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="background-color:#f8f9fb;padding:20px;text-align:center;font-size:13px;color:#777;">
                <p style="margin:0;">Zee’s Foundation © ${new Date().getFullYear()}<br>
                <a href="https://zee-foundation.vercel.app" style="color:#3b82f6;text-decoration:none;">zee-foundation.vercel.app</a></p>
              </td>
            </tr>
          </table>
        </div>
        `,
      });

      console.log(`✅ Thank-you email sent to ${donorEmail}`);
    } catch (emailErr) {
      console.error("❌ Failed to send thank-you email:", emailErr);
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}