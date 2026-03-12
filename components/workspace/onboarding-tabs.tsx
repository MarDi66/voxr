"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateWorkspaceForm } from "./create-workspace-form";
import { JoinWorkspaceForm } from "./join-workspace-form";

export function OnboardingTabs({ defaultToken }: { defaultToken?: string }) {
  return (
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
  );
}
