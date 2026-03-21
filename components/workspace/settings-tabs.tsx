"use client";

import { useTranslations } from "next-intl";
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
  const t = useTranslations("workspace");
  const isOwner = role === "owner";
  const isOwnerOrAdmin = role === "owner" || role === "admin";

  return (
    <Tabs defaultValue="workspace">
      <TabsList>
        <TabsTrigger value="workspace">{t("tabWorkspace")}</TabsTrigger>
        <TabsTrigger value="members">{t("tabMembers")}</TabsTrigger>
        {isOwnerOrAdmin && <TabsTrigger value="invites">{t("tabInvites")}</TabsTrigger>}
        {isOwnerOrAdmin && <TabsTrigger value="moderation">{t("tabModeration")}</TabsTrigger>}
      </TabsList>

      <TabsContent value="workspace" className="mt-4">
        <WorkspaceSettingsTab workspace={workspace} isOwner={isOwner} isAdmin={role === "admin"} />
      </TabsContent>

      <TabsContent value="members" className="mt-4">
        <MembersTab workspaceId={workspace.id} role={role} />
      </TabsContent>

      {isOwnerOrAdmin && (
        <TabsContent value="invites" className="mt-4">
          <InvitesTab workspaceId={workspace.id} />
        </TabsContent>
      )}

      {isOwnerOrAdmin && (
        <TabsContent value="moderation" className="mt-4">
          <ModerationTab workspaceId={workspace.id} slug={workspace.slug} />
        </TabsContent>
      )}
    </Tabs>
  );
}
