import { redirect } from "next/navigation";

import { getWorkspaceBySlug, getWorkspaceAnalytics, checkUserRole } from "@/lib/supabase/queries";
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

  const analytics = await getWorkspaceAnalytics(workspace.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Workspace wellbeing and engagement insights
        </p>
      </div>
      <AnalyticsDashboard data={analytics} />
    </div>
  );
}
