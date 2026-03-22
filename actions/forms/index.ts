"use server";

import { getWorkspaceLimitError } from "@/lib/billing/limits";
import { createClient } from "@/lib/supabase/server";
import { encrypt } from "@/lib/encryption";
import { createFormSchema, submitFormResponseSchema } from "@/lib/validators/forms";
import crypto from "crypto";

export async function createForm(input: {
  workspaceId: string;
  title: string;
  description?: string;
  visibility: "public" | "private";
  questions: {
    question_text: string;
    question_type: "short_text" | "long_text" | "single_choice" | "multiple_choice" | "rating";
    options?: string[];
    required?: boolean;
  }[];
}) {
  const parsed = createFormSchema.safeParse(input);
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

  const limitError = await getWorkspaceLimitError(
    parsed.data.workspaceId,
    "forms"
  );
  if (limitError) {
    return { error: limitError };
  }

  const formId = crypto.randomUUID();

  const { error: formError } = await supabase.from("forms").insert({
    id: formId,
    workspace_id: parsed.data.workspaceId,
    title: encrypt(parsed.data.title),
    description: parsed.data.description ? encrypt(parsed.data.description) : null,
    visibility: parsed.data.visibility,
    created_by: user.id,
  });

  if (formError) {
    return { error: formError.message };
  }

  const questions = parsed.data.questions.map((q, index) => ({
    id: crypto.randomUUID(),
    form_id: formId,
    question_text: encrypt(q.question_text),
    question_type: q.question_type,
    options: (q.options || []).map((o) => encrypt(o)),
    position: index,
    required: q.required ?? true,
  }));

  const { error: questionsError } = await supabase
    .from("form_questions")
    .insert(questions);

  if (questionsError) {
    return { error: questionsError.message };
  }

  return { success: true, formId };
}

export async function submitFormResponse(input: {
  formId: string;
  answers: { questionId: string; value: string }[];
}) {
  const parsed = submitFormResponseSchema.safeParse(input);
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

  // Create response
  const responseId = crypto.randomUUID();
  const { error: responseError } = await supabase.from("form_responses").insert({
    id: responseId,
    form_id: parsed.data.formId,
    respondent_id: user.id,
  });

  if (responseError) {
    console.log("Error inserting response:", responseError);
    if (responseError.code === "23505") {
      return { error: "You have already completed this form" };
    }
    return { error: responseError.message };
  }

  // Insert answers
  const answers = parsed.data.answers
    .filter((a) => a.value.trim() !== "")
    .map((a) => ({
      id: crypto.randomUUID(),
      response_id: responseId,
      question_id: a.questionId,
      answer_value: encrypt(a.value),
    }));

  if (answers.length > 0) {
    const { error: answersError } = await supabase
      .from("form_answers")
      .insert(answers);

    if (answersError) {
      console.error("[submitFormResponse] form_answers insert error:", {
        message: answersError.message,
        code: answersError.code,
        details: answersError.details,
        hint: answersError.hint,
        responseId,
        answerCount: answers.length,
      });
      return { error: answersError.message };
    }
  }

  return { success: true };
}

export async function closeForm(formId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Verify the user is the workspace owner
  const { data: form } = await supabase
    .from("forms")
    .select("workspace_id")
    .eq("id", formId)
    .single();

  if (!form) {
    return { error: "Form not found" };
  }

  const { data: membership } = await supabase
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", form.workspace_id)
    .eq("user_id", user.id)
    .eq("status", "active")
    .single();

  if (membership?.role !== "owner" && membership?.role !== "admin") {
    return { error: "Only the workspace owner or an admin can close forms" };
  }

  const { error } = await supabase
    .from("forms")
    .update({ status: "closed" })
    .eq("id", formId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
