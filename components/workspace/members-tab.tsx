"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Crown, UserMinus, ArrowRightLeft, Shield } from "lucide-react";

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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { removeMember, transferOwnership } from "@/actions/workspaces";
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
    toast.success("Member removed");
    fetchMembers();
  }

  async function handleTransfer(userId: string) {
    const result = await transferOwnership(workspaceId, userId);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Ownership transferred");
    window.location.reload();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : members.length === 0 ? (
          <p className="text-sm text-muted-foreground">No members</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
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
                            You
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
                          <div className="flex gap-1">
                            {isOwner && (
                            <AlertDialog>
                              <AlertDialogTrigger render={<Button variant="outline" size="sm" className="ml-auto" />}>
                                  <ArrowRightLeft />
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Transfer ownership?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will make {member.email} the workspace
                                    owner and you will become a regular member.
                                    This action cannot be undone without the new
                                    owner&apos;s consent.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleTransfer(member.user_id)
                                    }
                                  >
                                    Transfer
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            )}

                            <AlertDialog>
                              <AlertDialogTrigger render={<Button variant="destructive" size="sm" />}>
                                  <UserMinus />
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Remove member?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will remove {member.email} from the
                                    workspace. They will need a new invite to
                                    rejoin.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleRemove(member.user_id)
                                    }
                                  >
                                    Remove
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
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
  );
}
