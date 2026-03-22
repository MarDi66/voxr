import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { buildAuthRedirectHref } from "@/lib/auth-redirect";
import { createCheckoutSession } from "@/lib/stripe";
import { isBillablePlanKey } from "@/lib/billing/plans";

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; plan: string }>;
  searchParams: Promise<{ workspaceId?: string }>;
}) {
  const { locale, plan } = await params;
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

  let cancelPath = `/${locale}/pricing`;

  if (resolvedSearchParams.workspaceId) {
    const { data: membership } = await supabase
      .from("workspace_members")
      .select("workspace_id, workspaces(slug)")
      .eq("workspace_id", resolvedSearchParams.workspaceId)
      .eq("user_id", user.id)
      .eq("role", "owner")
      .eq("status", "active")
      .maybeSingle();

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
