import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import type { BillablePlanKey } from "@/lib/billing/plans";
import { isBillablePlanKey } from "@/lib/billing/plans";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

function getCheckoutSuccessUrl(locale: string) {
  const url = new URL(`/${locale}/billing/claim`, getSiteUrl());
  return `${url.origin}${url.pathname}?session_id={CHECKOUT_SESSION_ID}`;
}

export function getStripePriceId(planKey: BillablePlanKey) {
  switch (planKey) {
    case "pro":
      return process.env.STRIPE_PRO_MONTHLY_PRICE_ID;
    case "enterprise":
      return process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID;
  }
}

export function getPlanKeyFromPriceId(priceId: string): BillablePlanKey | null {
  if (priceId === process.env.STRIPE_PRO_MONTHLY_PRICE_ID) {
    return "pro";
  }

  if (priceId === process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID) {
    return "enterprise";
  }

  return null;
}

function getSubscriptionPlanKey(subscription: Stripe.Subscription) {
  const lineItem = subscription.items.data[0];
  const priceId = lineItem?.price.id;

  if (!priceId) {
    throw new Error("Stripe subscription is missing a price");
  }

  const metadataPlan = subscription.metadata.planKey;
  if (metadataPlan && isBillablePlanKey(metadataPlan)) {
    return metadataPlan;
  }

  const mappedPlan = getPlanKeyFromPriceId(priceId);
  if (!mappedPlan) {
    throw new Error(`Unknown Stripe price id: ${priceId}`);
  }

  return mappedPlan;
}

export async function createCheckoutSession(input: {
  userId: string;
  userEmail?: string | null;
  planKey: BillablePlanKey;
  locale: string;
  workspaceId?: string | null;
  cancelPath: string;
}) {
  const admin = createAdminClient();
  const { data: billingCustomer } = await admin
    .from("billing_customers")
    .select("stripe_customer_id")
    .eq("user_id", input.userId)
    .maybeSingle();

  const priceId = getStripePriceId(input.planKey);
  if (!priceId) {
    throw new Error(`Missing Stripe price id for ${input.planKey}`);
  }

  const cancelUrl = new URL(input.cancelPath, getSiteUrl());

  return stripe.checkout.sessions.create({
    mode: "subscription",
    success_url: getCheckoutSuccessUrl(input.locale),
    cancel_url: cancelUrl.toString(),
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    customer: billingCustomer?.stripe_customer_id ?? undefined,
    customer_email: billingCustomer?.stripe_customer_id ? undefined : input.userEmail ?? undefined,
    client_reference_id: input.userId,
    metadata: {
      locale: input.locale,
      ownerUserId: input.userId,
      planKey: input.planKey,
      workspaceId: input.workspaceId ?? "",
    },
    subscription_data: {
      metadata: {
        ownerUserId: input.userId,
        planKey: input.planKey,
        workspaceId: input.workspaceId ?? "",
      },
    },
  });
}

export async function syncCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["subscription"],
  });

  if (session.mode !== "subscription") {
    throw new Error("Stripe checkout session is not a subscription session");
  }

  if (!session.subscription) {
    throw new Error("Stripe checkout session does not include a subscription");
  }

  const subscription =
    typeof session.subscription === "string"
      ? await stripe.subscriptions.retrieve(session.subscription)
      : session.subscription;

  const metadata = session.metadata ?? {};

  await syncStripeSubscription(subscription, {
    checkoutSessionId: session.id,
    ownerUserId: metadata.ownerUserId || session.client_reference_id || "",
    workspaceId: metadata.workspaceId || null,
    stripeCustomerId:
      typeof session.customer === "string" ? session.customer : session.customer?.id ?? null,
  });

  return session;
}

export async function syncStripeSubscription(
  subscription: Stripe.Subscription,
  options?: {
    checkoutSessionId?: string | null;
    ownerUserId?: string | null;
    workspaceId?: string | null;
    stripeCustomerId?: string | null;
  }
) {
  const admin = createAdminClient();
  const existingSubscriptionResult = await admin
    .from("billing_subscriptions")
    .select("*")
    .eq("stripe_subscription_id", subscription.id)
    .maybeSingle();
  const existingSubscription = existingSubscriptionResult.data;

  const planKey = getSubscriptionPlanKey(subscription);
  const ownerUserId =
    options?.ownerUserId ||
    subscription.metadata.ownerUserId ||
    existingSubscription?.owner_user_id;
  const workspaceId =
    options?.workspaceId ||
    subscription.metadata.workspaceId ||
    existingSubscription?.workspace_id ||
    null;
  const stripeCustomerId =
    options?.stripeCustomerId ||
    (typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id) ||
    existingSubscription?.stripe_customer_id;
  const checkoutSessionId =
    options?.checkoutSessionId ??
    existingSubscription?.stripe_checkout_session_id ??
    null;

  if (!ownerUserId || !stripeCustomerId) {
    throw new Error("Stripe subscription sync is missing owner or customer metadata");
  }

  await admin.from("billing_customers").upsert(
    {
      user_id: ownerUserId,
      stripe_customer_id: stripeCustomerId,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id",
    }
  );

  const priceId = subscription.items.data[0]?.price.id;
  const currentPeriodStart = subscription.items.data[0]?.current_period_start;
  const currentPeriodEnd = subscription.items.data[0]?.current_period_end;
  if (!priceId) {
    throw new Error("Stripe subscription has no recurring price");
  }

  const payload = {
    owner_user_id: ownerUserId,
    workspace_id: workspaceId || null,
    stripe_customer_id: stripeCustomerId,
    stripe_subscription_id: subscription.id,
    stripe_checkout_session_id: checkoutSessionId,
    plan_key: planKey,
    stripe_price_id: priceId,
    status: subscription.status,
    cancel_at_period_end: subscription.cancel_at_period_end,
    current_period_start: currentPeriodStart
      ? new Date(currentPeriodStart * 1000).toISOString()
      : null,
    current_period_end: currentPeriodEnd
      ? new Date(currentPeriodEnd * 1000).toISOString()
      : null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await admin.from("billing_subscriptions").upsert(payload, {
    onConflict: "stripe_subscription_id",
  });

  if (error) {
    throw new Error(error.message);
  }
}
