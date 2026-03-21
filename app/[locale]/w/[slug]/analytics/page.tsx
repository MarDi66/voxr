import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { getWorkspaceBySlug, getWorkspaceAnalytics, getWorkspaceAnalyticsHistory, checkUserRole } from "@/lib/supabase/queries";
import { AnalyticsDashboard } from "@/components/workspace/analytics-dashboard";

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workspace = await getWorkspaceBySlug(slug);

  if (!workspace) {
    redirect("/onboarding");
  }

  const role = await checkUserRole(workspace.id);

  if (role !== "owner" && role !== "admin") {
    redirect(`/w/${slug}`);
  }

  const [analytics, history] = await Promise.all([
    getWorkspaceAnalytics(workspace.id),
    getWorkspaceAnalyticsHistory(workspace.id),
  ]);
  const t = await getTranslations("workspace");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("analyticsTitle")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("analyticsDescription")}
        </p>
      </div>
      <AnalyticsDashboard data={analytics} history={history} />
    </div>
  );
}
