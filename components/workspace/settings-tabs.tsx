"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkspaceSettingsTab } from "./workspace-settings-tab";
import { InvitesTab } from "./invites-tab";
import { ModerationTab } from "./moderation-tab";

type Workspace = {
  id: string;
  name: string;
  slug: string;
};

export function SettingsTabs({
  workspace,
}: {
  workspace: Workspace;
}) {
  return (
    <Tabs defaultValue="workspace">
      <TabsList>
        <TabsTrigger value="workspace">Workspace</TabsTrigger>
        <TabsTrigger value="invites">Invites</TabsTrigger>
        <TabsTrigger value="moderation">Moderation</TabsTrigger>
      </TabsList>

      <TabsContent value="workspace" className="mt-4">
        <WorkspaceSettingsTab workspace={workspace} />
      </TabsContent>

      <TabsContent value="invites" className="mt-4">
        <InvitesTab workspaceId={workspace.id} />
      </TabsContent>

      <TabsContent value="moderation" className="mt-4">
        <ModerationTab workspaceId={workspace.id} />
      </TabsContent>
    </Tabs>
  );
}
