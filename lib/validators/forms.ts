import { z } from "zod";

const questionSchema = z.object({
  question_text: z.string().min(1, "Question text is required").max(500),
  question_type: z.enum(["short_text", "long_text", "single_choice", "multiple_choice", "rating"]),
  options: z.array(z.string().min(1).max(200)).default([]),
  required: z.boolean().default(true),
});

export const createFormSchema = z.object({
  workspaceId: z.string().uuid(),
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title must be at most 200 characters"),
  description: z.string().max(1000, "Description must be at most 1000 characters").optional(),
  visibility: z.enum(["public", "private"]),
  questions: z.array(questionSchema).min(1, "At least one question is required").max(50, "Maximum 50 questions"),
});

export const submitFormResponseSchema = z.object({
  formId: z.string().uuid(),
  answers: z.array(
    z.object({
      questionId: z.string().uuid(),
      value: z.string().max(5000),
    })
  ),
});

export type CreateFormInput = z.infer<typeof createFormSchema>;
export type QuestionInput = z.infer<typeof questionSchema>;
export type SubmitFormResponseInput = z.infer<typeof submitFormResponseSchema>;
