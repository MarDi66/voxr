import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getWorkspaceBySlug } from "@/lib/supabase/queries";
import { WorkspaceHeader } from "@/components/workspace/workspace-header";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const workspace = await getWorkspaceBySlug(slug);
  if (!workspace) {
    redirect("/onboarding");
  }

  // Get user's workspaces for switcher
  const { data: memberships } = await supabase
    .from("workspace_members")
    .select("workspace_id, role, workspaces(id, name, slug)")
    .eq("user_id", user.id)
    .eq("status", "active");

  const workspaces =
    memberships?.map((m) => ({
      ...(m.workspaces as unknown as { id: string; name: string; slug: string }),
      role: m.role,
    })) || [];

  return (
    <div className="min-h-screen">
      <WorkspaceHeader
        workspace={workspace}
        workspaces={workspaces}
        isOwner={workspaces.some((ws) => ws.id === workspace.id && ws.role === "owner")}
      />
      <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>
    </div>
  );
}
