import { redirect } from "next/navigation";
import { getWorkspaceBySlug, checkUserRole } from "@/lib/supabase/queries";
import { SettingsTabs } from "@/components/workspace/settings-tabs";

export default async function SettingsPage({
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
  if (role !== "admin") {
    redirect(`/w/${slug}`);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Workspace Settings</h1>
      <SettingsTabs workspace={workspace} />
    </div>
  );
}
