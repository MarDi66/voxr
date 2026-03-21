"use client";

import { Link } from "@/lib/i18n/navigation";
import { useRouter } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { CreateWorkspaceForm } from "./create-workspace-form";
import { JoinWorkspaceForm } from "./join-workspace-form";

export function OnboardingTabs({
  defaultToken,
  existingWorkspaceSlug,
  invitedWorkspaceName,
  invitedRole,
}: {
  defaultToken?: string;
  existingWorkspaceSlug?: string;
  invitedWorkspaceName?: string | null;
  invitedRole?: string;
}) {
  const router = useRouter();
  const t = useTranslations("onboarding");

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth");
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue={defaultToken ? "join" : "create"}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">{t("create")}</TabsTrigger>
          <TabsTrigger value="join">{t("join")}</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreateWorkspaceForm />
        </TabsContent>
        <TabsContent value="join">
          <JoinWorkspaceForm defaultToken={defaultToken} invitedWorkspaceName={invitedWorkspaceName} invitedRole={invitedRole} />
        </TabsContent>
      </Tabs>
      {existingWorkspaceSlug && (
        <div className="rounded-lg border bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            {t("alreadyMember")}
          </p>
          <Link href={`/w/${existingWorkspaceSlug}`}>
            <Button variant="link" className="mt-1">
              {t("goToWorkspace")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
      {!existingWorkspaceSlug && (
        <div className="text-center">
          <Button variant="ghost" onClick={handleSignOut} className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            {t("logOut")}
          </Button>
        </div>
      )}
    </div>
  );
}
