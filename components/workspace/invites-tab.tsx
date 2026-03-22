"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CopyIcon, Loader2, Plus, Trash2 } from "lucide-react";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createInvite, revokeInvite } from "@/actions/workspaces";
import { getActionErrorMessage } from "@/lib/action-error-message";
import { createClient } from "@/lib/supabase/client";

type Invite = {
  id: string;
  token: string | null;
  role: string;
  status: string;
  created_at: string;
  expires_at: string | null;
  used_at: string | null;
};

export function InvitesTab({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const t = useTranslations("workspace");
  const tc = useTranslations("common");
  const te = useTranslations("billingErrors");
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [inviteRole, setInviteRole] = useState<"admin" | "member">("member");
  const [dialogOpen, setDialogOpen] = useState(false);

  async function fetchInvites() {
    const supabase = createClient();
    const { data } = await supabase
      .from("workspace_invites")
      .select("id, token, role, status, created_at, expires_at, used_at")
      .eq("workspace_id", workspaceId)
      .order("created_at", { ascending: false });

    if (data) {
      // Update expired invites that still have 'active' status
      const expired = data.filter(
        (i) =>
          i.status === "active" &&
          i.expires_at &&
          new Date(i.expires_at) < new Date()
      );
      if (expired.length > 0) {
        await supabase
          .from("workspace_invites")
          .update({ status: "expired" })
          .in(
            "id",
            expired.map((i) => i.id)
          );
      }
      setInvites(
        data.map((i) =>
          expired.some((e) => e.id === i.id) ? { ...i, status: "expired" } : i
        )
      );
    } else {
      setInvites([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();
    supabase
      .from("workspace_invites")
      .select("id, token, role, status, created_at, expires_at, used_at")
      .eq("workspace_id", workspaceId)
      .order("created_at", { ascending: false })
      .then(async ({ data }) => {
        if (cancelled) return;
        if (data) {
          const expired = data.filter(
            (i) =>
              i.status === "active" &&
              i.expires_at &&
              new Date(i.expires_at) < new Date()
          );
          if (expired.length > 0) {
            await supabase
              .from("workspace_invites")
              .update({ status: "expired" })
              .in(
                "id",
                expired.map((i) => i.id)
              );
          }
          setInvites(
            data.map((i) =>
              expired.some((e) => e.id === i.id)
                ? { ...i, status: "expired" }
                : i
            )
          );
        } else {
          setInvites([]);
        }
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [workspaceId]);

  async function handleCreate() {
    setCreating(true);
    const result = await createInvite({ workspaceId, role: inviteRole });
    setCreating(false);

    if (result.error) {
      toast.error(getActionErrorMessage(result.error, te));
      return;
    }

    const inviteUrl = `${window.location.origin}/onboarding?token=${result.token}`;
    await navigator.clipboard.writeText(inviteUrl);
    toast.success(t("inviteCopied"));
    setDialogOpen(false);
    setInviteRole("member");
    fetchInvites();
  }

  async function handleRevoke(inviteId: string) {
    const result = await revokeInvite(inviteId);
    if (result.error) {
      toast.error(getActionErrorMessage(result.error, te));
      return;
    }
    toast.success(t("inviteRevoked"));
    fetchInvites();
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t("inviteLinks")}</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setInviteRole("member");
        }}>
          <DialogTrigger render={
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              {t("createInvite")}
            </Button>
          } />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("createInvite")}</DialogTitle>
              <DialogDescription>
                {t("createInviteDescription")}
              </DialogDescription>
            </DialogHeader>
            <Select
              value={inviteRole}
              onValueChange={(v) => setInviteRole(v as "admin" | "member")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">{t("roleMember")}</SelectItem>
                <SelectItem value="admin">{t("roleAdmin")}</SelectItem>
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button onClick={handleCreate} disabled={creating}>
                {creating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("createAndCopyLink")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">{tc("loading")}</p>
        ) : invites.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("noInvitesYet")}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("roleColumn")}</TableHead>
                <TableHead>{t("statusColumn")}</TableHead>
                <TableHead>{t("createdColumn")}</TableHead>
                <TableHead>{t("expiresColumn")}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell>
                    <Badge variant="outline">{invite.role}</Badge>
                  </TableCell>
                  <TableCell>
                    {invite.status === "used" || invite.used_at ? (
                      <Badge variant="secondary">{t("statusUsed")}</Badge>
                    ) : invite.status === "expired" ||
                      (invite.expires_at &&
                        new Date(invite.expires_at) < new Date()) ? (
                      <Badge variant="destructive">{t("statusExpired")}</Badge>
                    ) : (
                      <Badge>{t("statusActive")}</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(invite.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {invite.expires_at
                      ? new Date(invite.expires_at).toLocaleDateString()
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 justify-end">
                      {invite.token && invite.status === "active" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            const url = `${window.location.origin}/onboarding?token=${invite.token}`;
                            await navigator.clipboard.writeText(url);
                            toast.success(t("inviteCopied"));
                          }}
                        >
                          <CopyIcon />
                        </Button>
                      )}
                      {!invite.used_at && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRevoke(invite.id)}
                        >
                          <Trash2 />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
