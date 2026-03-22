import { redirect } from "next/navigation";
import { buildAuthRedirectHref } from "@/lib/auth-redirect";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

export default async function BillingPortalPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ workspaceId?: string; slug?: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const workspaceId = resolvedSearchParams.workspaceId;
  const slug = resolvedSearchParams.slug;

  if (!workspaceId || !slug) {
    redirect(`/${locale}/pricing`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/${locale}${buildAuthRedirectHref(
        `/billing/portal?workspaceId=${workspaceId}&slug=${slug}`
      )}`
    );
  }

  const { data: membership } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("workspace_id", workspaceId)
    .eq("user_id", user.id)
    .eq("role", "owner")
    .eq("status", "active")
    .maybeSingle();

  if (!membership) {
    redirect(`/${locale}/w/${slug}/settings?tab=billing`);
  }

  const { data: subscription } = await supabase
    .from("billing_subscriptions")
    .select("stripe_customer_id")
    .eq("workspace_id", workspaceId)
    .in("status", ["active", "trialing", "past_due"])
    .maybeSingle();

  if (!subscription?.stripe_customer_id) {
    redirect(`/${locale}/w/${slug}/settings?tab=billing`);
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${locale}/w/${slug}/settings?tab=billing`,
  });

  redirect(portalSession.url);
}
