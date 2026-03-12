"use server";

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

  const workspaceId = crypto.randomUUID();

  // Avoid selecting the inserted row here: the creator is not yet a member,
  // so the current workspace SELECT policy would reject the return payload.
  const { error: wsError } = await supabase
    .from("workspaces")
    .insert({
      id: workspaceId,
      name: parsed.data.name,
      slug: parsed.data.slug,
      created_by: user.id,
    })

  if (wsError) {
    if (wsError.code === "23505") {
      return { error: "This slug is already taken" };
    }

    return { error: wsError.message };
  }

  // Add creator as admin
  const { error: memberError } = await supabase
    .from("workspace_members")
    .insert({
      workspace_id: workspaceId,
      user_id: user.id,
      role: "admin",
      status: "active",
    });

  if (memberError) {
    return { error: memberError.message };
  }

  return { success: true, slug: parsed.data.slug };
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
    .is("used_at", null)
    .single();

  if (inviteError || !invite) {
    return { error: "Invalid or expired invite" };
  }

  // Check expiry
  if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
    return { error: "This invite has expired" };
  }

  // Check email restriction
  if (invite.invited_email && invite.invited_email !== user.email) {
    return { error: "This invite was sent to a different email address" };
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

  // Create membership
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
    .update({ used_at: new Date().toISOString(), used_by: user.id })
    .eq("id", invite.id);

  // Get workspace slug
  const { data: workspace } = await supabase
    .from("workspaces")
    .select("slug")
    .eq("id", invite.workspace_id)
    .single();

  return { success: true, slug: workspace?.slug || "" };
}

export async function createInvite(input: {
  workspaceId: string;
  invitedEmail?: string;
  role?: "admin" | "member";
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

  // Generate secure token
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);

  const { error } = await supabase.from("workspace_invites").insert({
    workspace_id: parsed.data.workspaceId,
    token_hash: tokenHash,
    invited_email: parsed.data.invitedEmail || null,
    role: parsed.data.role || "member",
    created_by: user.id,
    expires_at: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString(), // 7 days
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, token };
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
