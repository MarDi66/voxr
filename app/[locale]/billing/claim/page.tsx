import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BillingClaimPanel } from "@/components/workspace/billing-claim-panel";
import { createClient } from "@/lib/supabase/server";
import { buildAuthRedirectHref } from "@/lib/auth-redirect";
import { syncCheckoutSession } from "@/lib/stripe";
import { getOwnedWorkspaces } from "@/lib/billing/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/lib/i18n/navigation";

function isInvalidCheckoutSessionPlaceholder(sessionId: string) {
  return sessionId.includes("CHECKOUT_SESSION_ID") || sessionId.includes("{");
}

export default async function BillingClaimPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams.session_id;

  if (!sessionId) {
    redirect(`/${locale}/pricing`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}${buildAuthRedirectHref(`/billing/claim?session_id=${sessionId}`)}`);
  }

  const hasInvalidPlaceholder = isInvalidCheckoutSessionPlaceholder(sessionId);

  if (!hasInvalidPlaceholder) {
    await syncCheckoutSession(sessionId);
  }

  const [{ data: subscription }, ownedWorkspaces, t] = await Promise.all([
    hasInvalidPlaceholder
      ? supabase
          .from("billing_subscriptions")
          .select("id, workspace_id, plan_key")
          .eq("owner_user_id", user.id)
          .is("workspace_id", null)
          .in("status", ["active", "trialing", "past_due"])
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle()
      : supabase
          .from("billing_subscriptions")
          .select("id, workspace_id, plan_key")
          .eq("stripe_checkout_session_id", sessionId)
          .maybeSingle(),
    getOwnedWorkspaces(supabase),
    getTranslations("billing"),
  ]);

  if (!subscription) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Card>
          <CardHeader>
            <CardTitle>{t("subscriptionNotReadyTitle")}</CardTitle>
            <CardDescription>{t("subscriptionNotReadyDescription")}</CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  if (subscription.workspace_id) {
    const { data: workspace } = await supabase
      .from("workspaces")
      .select("slug, name")
      .eq("id", subscription.workspace_id)
      .maybeSingle();

    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Card>
          <CardHeader>
            <CardTitle>{t("subscriptionActiveTitle")}</CardTitle>
            <CardDescription>
              {t("subscriptionActiveDescription", {
                plan: t(`plan${subscription.plan_key[0].toUpperCase()}${subscription.plan_key.slice(1)}`),
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {workspace ? (
              <Link href={`/w/${workspace.slug}/settings?tab=billing`}>
                <Button>{t("goToBilling")}</Button>
              </Link>
            ) : null}
            {workspace ? (
              <Link href={`/w/${workspace.slug}`}>
                <Button variant="outline">{t("goToWorkspace")}</Button>
              </Link>
            ) : null}
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{t("claimTitle")}</h1>
        <p className="text-muted-foreground">{t("claimDescription")}</p>
      </div>
      <BillingClaimPanel
        sessionId={hasInvalidPlaceholder ? undefined : sessionId}
        subscriptionId={subscription.id}
        workspaces={ownedWorkspaces}
      />
    </main>
  );
}
