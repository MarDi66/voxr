import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { getWorkspaceBySlug } from "@/lib/supabase/queries";
import { WorkspaceHeader } from "@/components/workspace/workspace-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-image-preview": "none",
      "max-snippet": 0,
      "max-video-preview": 0,
    },
  },
};

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/auth`);
  }

  const workspace = await getWorkspaceBySlug(slug);
  if (!workspace) {
    redirect(`/${locale}/onboarding`);
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
        isOwner={workspaces.some((ws) => ws.id === workspace.id && (ws.role === "owner" || ws.role === "admin"))}
      />
      <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>
    </div>
  );
}
