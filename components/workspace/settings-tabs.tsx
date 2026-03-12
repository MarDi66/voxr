"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkspaceSettingsTab } from "./workspace-settings-tab";
import { MembersTab } from "./members-tab";
import { InvitesTab } from "./invites-tab";
import { ModerationTab } from "./moderation-tab";

type Workspace = {
  id: string;
  name: string;
  slug: string;
};

export function SettingsTabs({
  workspace,
  role,
}: {
  workspace: Workspace;
  role: string;
}) {
  const isOwner = role === "owner";

  return (
    <Tabs defaultValue="workspace">
      <TabsList>
        <TabsTrigger value="workspace">Workspace</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
        {isOwner && <TabsTrigger value="invites">Invites</TabsTrigger>}
        {isOwner && <TabsTrigger value="moderation">Moderation</TabsTrigger>}
      </TabsList>

      <TabsContent value="workspace" className="mt-4">
        <WorkspaceSettingsTab workspace={workspace} isOwner={isOwner} />
      </TabsContent>

      <TabsContent value="members" className="mt-4">
        <MembersTab workspaceId={workspace.id} isOwner={isOwner} />
      </TabsContent>

      {isOwner && (
        <TabsContent value="invites" className="mt-4">
          <InvitesTab workspaceId={workspace.id} />
        </TabsContent>
      )}

      {isOwner && (
        <TabsContent value="moderation" className="mt-4">
          <ModerationTab workspaceId={workspace.id} />
        </TabsContent>
      )}
    </Tabs>
  );
}
