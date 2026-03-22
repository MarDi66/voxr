"use server";

import { getWorkspaceLimitError } from "@/lib/billing/limits";
import { createClient } from "@/lib/supabase/server";
import {
  createWorkspaceSchema,
  joinWorkspaceSchema,
  createInviteSchema,
  updateWorkspaceSchema,
} from "@/lib/validators/workspaces";
import crypto from "crypto";

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function insertWorkspaceForUser(input: {
  userId: string;
  name: string;
  slug: string;
}) {
  const supabase = await createClient();
  const workspaceId = crypto.randomUUID();

  const { error: wsError } = await supabase.from("workspaces").insert({
    id: workspaceId,
    name: input.name,
    slug: input.slug,
    created_by: input.userId,
  });

  if (wsError) {
    if (wsError.code === "23505") {
      return { error: "This slug is already taken" };
    }

    return { error: wsError.message };
  }

  const { error: memberError } = await supabase.from("workspace_members").insert({
    workspace_id: workspaceId,
    user_id: input.userId,
    role: "owner",
    status: "active",
  });

  if (memberError) {
    return { error: memberError.message };
  }

  return { success: true, workspaceId };
}

export async function createWorkspace(input: { name: string; slug: string }) {
  const parsed = createWorkspaceSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const result = await insertWorkspaceForUser({
    userId: user.id,
    name: parsed.data.name,
    slug: parsed.data.slug,
  });

  if ("error" in result) {
    return { error: result.error };
  }

  return {
    success: true,
    slug: parsed.data.slug,
    workspaceId: result.workspaceId,
  };
}

export async function consumeInvite(input: { inviteToken: string }) {
  const parsed = joinWorkspaceSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const tokenHash = hashToken(parsed.data.inviteToken);

  // Find the invite
  const { data: invite, error: inviteError } = await supabase
    .from("workspace_invites")
    .select("*")
    .eq("token_hash", tokenHash)
    .eq("status", "active")
    .single();

  if (inviteError || !invite) {
    return { error: "Invalid or expired invite" };
  }

  // Check expiry
  if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
    await supabase
      .from("workspace_invites")
      .update({ status: "expired" })
      .eq("id", invite.id);
    return { error: "This invite has expired" };
  }

  // Check if already a member
  const { data: existingMember } = await supabase
    .from("workspace_members")
    .select("user_id")
    .eq("workspace_id", invite.workspace_id)
    .eq("user_id", user.id)
    .single();

  if (existingMember) {
    // Get the workspace slug to redirect
    const { data: ws } = await supabase
      .from("workspaces")
      .select("slug")
      .eq("id", invite.workspace_id)
      .single();
    return { success: true, slug: ws?.slug || "" };
  }

  const memberLimitError = await getWorkspaceLimitError(
    invite.workspace_id,
    "members"
  );
  if (memberLimitError) {
    return { error: memberLimitError };
  }

  // Create membership with the role specified in the invite
  const { error: memberError } = await supabase
    .from("workspace_members")
    .insert({
      workspace_id: invite.workspace_id,
      user_id: user.id,
      role: invite.role,
      status: "active",
    });

  if (memberError) {
    return { error: memberError.message };
  }

  // Mark invite as used
  await supabase
    .from("workspace_invites")
    .update({ used_at: new Date().toISOString(), used_by: user.id, status: "used" })
    .eq("id", invite.id);

  // Get workspace slug
  const { data: workspace } = await supabase
    .from("workspaces")
    .select("slug")
    .eq("id", invite.workspace_id)
    .single();

  return { success: true, slug: workspace?.slug || "" };
}

export async function getInviteInfo(
  token: string
): Promise<{ workspaceName: string; role: string } | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const tokenHash = hashToken(token);

  const { data } = await supabase.rpc("get_invite_info", {
    p_token_hash: tokenHash,
  });

  if (!data?.workspace_name) return null;

  return { workspaceName: data.workspace_name, role: data.role };
}

export async function createInvite(input: {
  workspaceId: string;
  role: "admin" | "member";
}) {
  const parsed = createInviteSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const memberLimitError = await getWorkspaceLimitError(
    parsed.data.workspaceId,
    "members"
  );
  if (memberLimitError) {
    return { error: memberLimitError };
  }

  // Generate secure token
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);

  const { data: inserted, error } = await supabase.from("workspace_invites").insert({
    workspace_id: parsed.data.workspaceId,
    token_hash: tokenHash,
    token,
    role: parsed.data.role,
    created_by: user.id,
    expires_at: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString(), // 7 days
  }).select("id").single();

  if (error) {
    return { error: error.message };
  }

  return { success: true, token, inviteId: inserted.id };
}

export async function revokeInvite(inviteId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("workspace_invites")
    .delete()
    .eq("id", inviteId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function updateWorkspace(input: {
  workspaceId: string;
  name: string;
}) {
  const parsed = updateWorkspaceSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("workspaces")
    .update({ name: parsed.data.name })
    .eq("id", parsed.data.workspaceId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function getUserWorkspaces() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated", data: [] };
  }

  const { data, error } = await supabase
    .from("workspace_members")
    .select("workspace_id, role, workspaces(id, name, slug)")
    .eq("user_id", user.id)
    .eq("status", "active");

  if (error) {
    return { error: error.message, data: [] };
  }

  return { data: data || [] };
}

export async function transferOwnership(
  workspaceId: string,
  newOwnerId: string
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase.rpc("transfer_ownership", {
    wid: workspaceId,
    new_owner_id: newOwnerId,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function removeMember(
  workspaceId: string,
  targetUserId: string
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  if (targetUserId === user.id) {
    return { error: "You cannot remove yourself" };
  }

  // Verify ownership
  const { data: member } = await supabase
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", workspaceId)
    .eq("user_id", user.id)
    .eq("status", "active")
    .single();

  if (!member || (member.role !== "owner" && member.role !== "admin")) {
    return { error: "Only the owner or an admin can remove members" };
  }

  // Admins cannot remove other admins or the owner
  if (member.role === "admin") {
    const { data: target } = await supabase
      .from("workspace_members")
      .select("role")
      .eq("workspace_id", workspaceId)
      .eq("user_id", targetUserId)
      .eq("status", "active")
      .single();

    if (target && (target.role === "owner" || target.role === "admin")) {
      return { error: "Admins cannot remove other admins or the owner" };
    }
  }

  const { error } = await supabase
    .from("workspace_members")
    .update({ status: "left" })
    .eq("workspace_id", workspaceId)
    .eq("user_id", targetUserId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function changeMemberRole(
  workspaceId: string,
  targetUserId: string,
  newRole: "admin" | "member"
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  if (targetUserId === user.id) {
    return { error: "You cannot change your own role" };
  }

  const { data: caller } = await supabase
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", workspaceId)
    .eq("user_id", user.id)
    .eq("status", "active")
    .single();

  if (!caller || (caller.role !== "owner" && caller.role !== "admin")) {
    return { error: "Only the owner or an admin can change roles" };
  }

  // Only owner can downgrade admin → member
  if (newRole === "member" && caller.role !== "owner") {
    return { error: "Only the owner can demote an admin" };
  }

  // Cannot change the owner's role
  const { data: target } = await supabase
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", workspaceId)
    .eq("user_id", targetUserId)
    .eq("status", "active")
    .single();

  if (!target) {
    return { error: "Target user is not an active member" };
  }

  if (target.role === "owner") {
    return { error: "Cannot change the owner's role" };
  }

  if (target.role === newRole) {
    return { error: `User is already a ${newRole}` };
  }

  const { error } = await supabase
    .from("workspace_members")
    .update({ role: newRole })
    .eq("workspace_id", workspaceId)
    .eq("user_id", targetUserId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function deleteWorkspace(workspaceId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Verify ownership
  const { data: member } = await supabase
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", workspaceId)
    .eq("user_id", user.id)
    .eq("status", "active")
    .single();

  if (!member || member.role !== "owner") {
    return { error: "Only the owner can delete a workspace" };
  }

  const { error } = await supabase
    .from("workspaces")
    .delete()
    .eq("id", workspaceId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
