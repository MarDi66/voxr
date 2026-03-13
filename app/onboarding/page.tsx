import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingTabs } from "@/components/workspace/onboarding-tabs";
import VoxrLogo from "@/components/common/logo";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; manager?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // Check if user already has workspaces
  const { data: memberships } = await supabase
    .from("workspace_members")
    .select("workspace_id, workspaces(slug)")
    .eq("user_id", user.id)
    .eq("status", "active")
    .limit(1);

  const resolvedParams = await searchParams;

  const existingWorkspaceSlug =
    memberships && memberships.length > 0
      ? (memberships[0].workspaces as unknown as { slug: string }).slug
      : undefined;

  // If user already has a workspace and there's no invite token and their not coming from the workspace manager CTA, go straight to the workspace
  if (existingWorkspaceSlug && !resolvedParams.token && !resolvedParams.manager) {
    redirect(`/w/${existingWorkspaceSlug}`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          {existingWorkspaceSlug ? (
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl flex justify-center gap-4">
              <VoxrLogo className="w-18" />
              Voxr
            </h1>
          ) : (
            <h1 className="text-3xl font-bold">Welcome to Voxr</h1>
          )}
          <p className="mt-2 text-muted-foreground">
            Create a new workspace or join an existing one
          </p>
        </div>
        <OnboardingTabs
          defaultToken={resolvedParams.token}
          existingWorkspaceSlug={existingWorkspaceSlug}
        />
      </div>
    </div>
  );
}
