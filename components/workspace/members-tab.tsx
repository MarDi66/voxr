"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Crown, UserMinus, ArrowRightLeft, Shield, ShieldPlus, ShieldMinus, MoreHorizontal } from "lucide-react";

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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { removeMember, transferOwnership, changeMemberRole } from "@/actions/workspaces";
import { createClient } from "@/lib/supabase/client";

type Member = {
  user_id: string;
  email: string;
  role: string;
  status: string;
  joined_at: string;
};

export function MembersTab({
  workspaceId,
  role: currentRole,
}: {
  workspaceId: string;
  role: string;
}) {
  const t = useTranslations("workspace");
  const tc = useTranslations("common");
  const isOwnerOrAdmin = currentRole === "owner" || currentRole === "admin";
  const isOwner = currentRole === "owner";
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  async function fetchMembers() {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);

    const { data } = await supabase.rpc("get_workspace_members", {
      wid: workspaceId,
    });
    setMembers(data || []);
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();

    Promise.all([
      supabase.auth.getUser(),
      supabase.rpc("get_workspace_members", { wid: workspaceId }),
    ]).then(([authResult, membersResult]) => {
      if (cancelled) return;
      setCurrentUserId(authResult.data.user?.id || null);
      setMembers(membersResult.data || []);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [workspaceId]);

  async function handleRemove(userId: string) {
    const result = await removeMember(workspaceId, userId);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(t("memberRemoved"));
    fetchMembers();
  }

  async function handleTransfer(userId: string) {
    const result = await transferOwnership(workspaceId, userId);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(t("ownershipTransferred"));
    window.location.reload();
  }

  async function handleRoleChange(userId: string, newRole: "admin" | "member") {
    const result = await changeMemberRole(workspaceId, userId, newRole);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(t("roleChanged", { role: newRole }));
    fetchMembers();
  }

  const [confirmAction, setConfirmAction] = useState<{
    type: "transfer" | "remove";
    userId: string;
    email: string;
  } | null>(null);

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>{t("members")}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">{tc("loading")}</p>
        ) : members.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("noMembers")}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("emailColumn")}</TableHead>
                <TableHead>{t("roleColumn")}</TableHead>
                <TableHead>{t("joinedColumn")}</TableHead>
                {isOwnerOrAdmin && <TableHead></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => {
                const isCurrentUser = member.user_id === currentUserId;
                const isMemberOwner = member.role === "owner";
                const isMemberAdmin = member.role === "admin";
                const canManage =
                  !isCurrentUser &&
                  !isMemberOwner &&
                  (isOwner || (currentRole === "admin" && !isMemberAdmin));

                return (
                  <TableRow key={member.user_id} className="h-11">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {member.email}
                        {isCurrentUser && (
                          <Badge variant="outline" className="text-xs">
                            {t("you")}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={isMemberOwner ? "default" : isMemberAdmin ? "outline" : "secondary"}
                      >
                        {isMemberOwner && (
                          <Crown className="mr-1 h-3 w-3" />
                        )}
                        {isMemberAdmin && (
                          <Shield className="mr-1 h-3 w-3" />
                        )}
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(member.joined_at).toLocaleDateString()}
                    </TableCell>
                    {isOwnerOrAdmin && (
                      <TableCell>
                        {canManage && (
                          <DropdownMenu>
                            <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
                              <MoreHorizontal className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-fit">
                              <DropdownMenuGroup>
                                <DropdownMenuLabel>Role</DropdownMenuLabel>
                                {isMemberAdmin && isOwner && (
                                  <DropdownMenuItem onClick={() => handleRoleChange(member.user_id, "member")}>
                                    <ShieldMinus className="h-4 w-4" />
                                    {t("demoteToMember")}
                                  </DropdownMenuItem>
                                )}
                                {!isMemberAdmin && (
                                  <DropdownMenuItem onClick={() => handleRoleChange(member.user_id, "admin")}>
                                    <ShieldPlus className="h-4 w-4" />
                                    {t("promoteToAdmin")}
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuGroup>
                              {isOwner && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuGroup>
                                    <DropdownMenuLabel>{t("ownership")}</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => setConfirmAction({ type: "transfer", userId: member.user_id, email: member.email })}>
                                      <ArrowRightLeft className="h-4 w-4" />
                                      {t("transferOwnership")}
                                    </DropdownMenuItem>
                                  </DropdownMenuGroup>
                                </>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => setConfirmAction({ type: "remove", userId: member.user_id, email: member.email })}
                              >
                                <UserMinus className="h-4 w-4" />
                                {t("removeFromWorkspace")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>

    <AlertDialog
      open={confirmAction?.type === "transfer"}
      onOpenChange={(open) => { if (!open) setConfirmAction(null); }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("transferConfirmTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("transferConfirmDescription", { email: confirmAction?.email ?? "" })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{tc("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={() => { if (confirmAction) handleTransfer(confirmAction.userId); }}>
            {t("transfer")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <AlertDialog
      open={confirmAction?.type === "remove"}
      onOpenChange={(open) => { if (!open) setConfirmAction(null); }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("removeConfirmTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("removeConfirmDescription", { email: confirmAction?.email ?? "" })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{tc("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={() => { if (confirmAction) handleRemove(confirmAction.userId); }}>
            {t("remove")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
