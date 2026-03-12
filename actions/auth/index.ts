"use server";

import { createClient } from "@/lib/supabase/server";
import { otpRequestSchema, otpVerifySchema } from "@/lib/validators/auth";

export async function sendOtp(formData: { email: string }) {
  const parsed = otpRequestSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function verifyOtp(formData: { email: string; token: string }) {
  const parsed = otpVerifySchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    email: parsed.data.email,
    token: parsed.data.token,
    type: "email",
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
