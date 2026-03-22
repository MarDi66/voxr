import { notFound, redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { buildAuthRedirectHref } from "@/lib/auth-redirect";
import { createCheckoutSession, upgradeStripeSubscription } from "@/lib/stripe";
import { comparePlanOrder, ENTITLED_SUBSCRIPTION_STATUSES, isBillablePlanKey } from "@/lib/billing/plans";
import { getOwnedWorkspaces } from "@/lib/billing/queries";
import { BillingCheckoutPanel } from "@/components/workspace/billing-checkout-panel";

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; plan: string }>;
  searchParams: Promise<{ workspaceId?: string }>;
}) {
  const { locale, plan } = await params;
  setRequestLocale(locale);
  const resolvedSearchParams = await searchParams;

  if (!isBillablePlanKey(plan)) {
    notFound();
  }

  const checkoutPath = `/checkout/${plan}${resolvedSearchParams.workspaceId ? `?workspaceId=${resolvedSearchParams.workspaceId}` : ""}`;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}${buildAuthRedirectHref(checkoutPath)}`);
  }

  if (!resolvedSearchParams.workspaceId) {
    const [workspaces, t] = await Promise.all([
      getOwnedWorkspaces(supabase),
      getTranslations("billing"),
    ]);

    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            {t("checkoutWorkspaceTitle", {
              plan: t(`plan${plan[0].toUpperCase()}${plan.slice(1)}`),
            })}
          </h1>
          <p className="text-muted-foreground">
            {t("checkoutWorkspaceDescription")}
          </p>
        </div>
        <BillingCheckoutPanel plan={plan} workspaces={workspaces} />
      </main>
    );
  }

  let cancelPath = `/${locale}/pricing`;

  if (resolvedSearchParams.workspaceId) {
    const [{ data: membership }, { data: existingSubscription }] =
      await Promise.all([
        supabase
          .from("workspace_members")
          .select("workspace_id, workspaces(slug)")
          .eq("workspace_id", resolvedSearchParams.workspaceId)
          .eq("user_id", user.id)
          .eq("role", "owner")
          .eq("status", "active")
          .maybeSingle(),
        supabase
          .from("billing_subscriptions")
          .select("stripe_subscription_id, plan_key")
          .eq("workspace_id", resolvedSearchParams.workspaceId)
          .in("status", [...ENTITLED_SUBSCRIPTION_STATUSES])
          .order("current_period_end", { ascending: false, nullsFirst: false })
          .limit(1)
          .maybeSingle(),
      ]);

    if (!membership) {
      redirect(`/${locale}/pricing`);
    }

    const workspaceRecord = membership.workspaces as unknown as
      | { slug: string }
      | { slug: string }[];
    const workspace = Array.isArray(workspaceRecord)
      ? workspaceRecord[0]
      : workspaceRecord;
    cancelPath = `/${locale}/w/${workspace.slug}/settings?tab=billing`;

    if (existingSubscription) {
      if (existingSubscription.plan_key === plan) {
        redirect(cancelPath);
      }

      if (comparePlanOrder(existingSubscription.plan_key, plan) < 0) {
        await upgradeStripeSubscription({
          stripeSubscriptionId: existingSubscription.stripe_subscription_id,
          planKey: plan,
          ownerUserId: user.id,
          workspaceId: resolvedSearchParams.workspaceId,
        });
      }

      redirect(cancelPath);
    }
  }

  const session = await createCheckoutSession({
    userId: user.id,
    userEmail: user.email,
    planKey: plan,
    locale,
    workspaceId: resolvedSearchParams.workspaceId,
    cancelPath,
  });

  if (!session.url) {
    redirect(cancelPath);
  }

  redirect(session.url);
}
