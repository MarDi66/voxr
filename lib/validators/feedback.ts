import { z } from "zod";

export const createItemSchema = z.object({
  workspaceId: z.string().uuid(),
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title must be at most 200 characters"),
  body: z.string().min(10, "Body must be at least 10 characters").max(5000, "Body must be at most 5000 characters"),
  category: z.enum(["idea", "concern", "praise", "question"]),
});

export const updateItemSchema = z.object({
  itemId: z.string().uuid(),
  title: z.string().min(3).max(200).optional(),
  body: z.string().min(10).max(5000).optional(),
  category: z.enum(["idea", "concern", "praise", "question"]).optional(),
});

export const createCommentSchema = z.object({
  workspaceId: z.string().uuid(),
  itemId: z.string().uuid(),
  body: z.string().min(1, "Comment cannot be empty").max(2000, "Comment must be at most 2000 characters"),
});

export const toggleReactionSchema = z.object({
  workspaceId: z.string().uuid(),
  targetType: z.enum(["item", "comment"]),
  targetId: z.string().uuid(),
  emoji: z.string().min(1).max(10),
});

export const reportTargetSchema = z.object({
  workspaceId: z.string().uuid(),
  targetType: z.enum(["item", "comment"]),
  targetId: z.string().uuid(),
  reason: z.string().max(500).optional(),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type ToggleReactionInput = z.infer<typeof toggleReactionSchema>;
export type ReportTargetInput = z.infer<typeof reportTargetSchema>;
