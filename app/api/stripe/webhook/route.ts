import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe, syncCheckoutSession, syncStripeSubscription } from "@/lib/stripe";

export async function POST(request: Request) {
  const signature = (await headers()).get("stripe-signature");
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new Response("Missing Stripe webhook configuration", { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : "Webhook signature verification failed",
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await syncCheckoutSession(session.id);
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await syncStripeSubscription(subscription);
        break;
      }
      default:
        break;
    }
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : "Webhook processing failed",
      { status: 500 }
    );
  }

  return Response.json({ received: true });
}
