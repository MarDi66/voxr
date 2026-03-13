"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { CreateWorkspaceForm } from "./create-workspace-form";
import { JoinWorkspaceForm } from "./join-workspace-form";

export function OnboardingTabs({
  defaultToken,
  existingWorkspaceSlug,
}: {
  defaultToken?: string;
  existingWorkspaceSlug?: string;
}) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth");
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue={defaultToken ? "join" : "create"}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="join">Join</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreateWorkspaceForm />
        </TabsContent>
        <TabsContent value="join">
          <JoinWorkspaceForm defaultToken={defaultToken} />
        </TabsContent>
      </Tabs>
      {existingWorkspaceSlug && (
        <div className="rounded-lg border bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            You&apos;re already a member of a workspace
          </p>
          <Link href={`/w/${existingWorkspaceSlug}`}>
            <Button variant="link" className="mt-1">
              Go to my workspace
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
      {!existingWorkspaceSlug && (
        <div className="text-center">
          <Button variant="ghost" onClick={handleSignOut} className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      )}
    </div>
  );
}
