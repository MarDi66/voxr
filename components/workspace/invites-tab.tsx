"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Copy, Loader2, Trash2 } from "lucide-react";

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

import { createInvite, revokeInvite } from "@/actions/workspaces";
import { createClient } from "@/lib/supabase/client";

type Invite = {
  id: string;
  invited_email: string | null;
  role: string;
  created_at: string;
  expires_at: string | null;
  used_at: string | null;
};

export function InvitesTab({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  async function fetchInvites() {
    const supabase = createClient();
    const { data } = await supabase
      .from("workspace_invites")
      .select("id, invited_email, role, created_at, expires_at, used_at")
      .eq("workspace_id", workspaceId)
      .order("created_at", { ascending: false });

    setInvites(data || []);
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();
    supabase
      .from("workspace_invites")
      .select("id, invited_email, role, created_at, expires_at, used_at")
      .eq("workspace_id", workspaceId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!cancelled) {
          setInvites(data || []);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [workspaceId]);

  async function handleCreate() {
    setCreating(true);
    const result = await createInvite({ workspaceId });
    setCreating(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    const inviteUrl = `${window.location.origin}/onboarding?token=${result.token}`;
    await navigator.clipboard.writeText(inviteUrl);
    toast.success("Invite link copied to clipboard!");
    fetchInvites();
  }

  async function handleRevoke(inviteId: string) {
    const result = await revokeInvite(inviteId);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Invite revoked");
    fetchInvites();
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Invite Links</CardTitle>
        <Button onClick={handleCreate} disabled={creating} size="sm">
          {creating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          Create Invite
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : invites.length === 0 ? (
          <p className="text-sm text-muted-foreground">No invites yet</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell>
                    {invite.invited_email || "Any"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{invite.role}</Badge>
                  </TableCell>
                  <TableCell>
                    {invite.used_at ? (
                      <Badge variant="secondary">Used</Badge>
                    ) : invite.expires_at &&
                      new Date(invite.expires_at) < new Date() ? (
                      <Badge variant="destructive">Expired</Badge>
                    ) : (
                      <Badge>Active</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(invite.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {!invite.used_at && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRevoke(invite.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
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
