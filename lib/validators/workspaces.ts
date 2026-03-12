import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(30, "Slug must be at most 30 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
});

export const joinWorkspaceSchema = z.object({
  inviteToken: z.string().min(1, "Invite token is required"),
});

export const updateWorkspaceSchema = z.object({
  workspaceId: z.string().uuid(),
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
});

export const createInviteSchema = z.object({
  workspaceId: z.string().uuid(),
  invitedEmail: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  role: z.enum(["admin", "member"]).default("member"),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type JoinWorkspaceInput = z.infer<typeof joinWorkspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
export type CreateInviteInput = z.infer<typeof createInviteSchema>;
