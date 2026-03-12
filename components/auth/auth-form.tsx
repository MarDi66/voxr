"use client";

import { useId, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { sendOtp, verifyOtp } from "@/actions/auth";
import {
  otpRequestSchema,
  type OtpRequestInput,
  otpVerifySchema,
} from "@/lib/validators/auth";

export function AuthForm() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const otpFieldId = useId();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/onboarding";

  const emailForm = useForm<OtpRequestInput>({
    resolver: zodResolver(otpRequestSchema),
    defaultValues: { email: "" },
  });

  async function onEmailSubmit(data: OtpRequestInput) {
    const result = await sendOtp(data);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    setEmail(data.email);
    setToken("");
    setTokenError(null);
    setStep("otp");
    toast.success("Check your email for the verification code");
  }

  async function onOtpSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTokenError(null);

    const parsed = otpVerifySchema.safeParse({ email, token });
    if (!parsed.success) {
      setTokenError(parsed.error.flatten().fieldErrors.token?.[0] ?? "OTP must be 6 digits");
      return;
    }

    setIsVerifying(true);
    try {
      const result = await verifyOtp(parsed.data);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Signed in successfully");
      router.push(redirectTo);
      router.refresh();
    } finally {
      setIsVerifying(false);
    }
  }

  if (step === "email") {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in to Voxr</CardTitle>
          <CardDescription>
            Enter your email to receive a verification code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor={field.name}>Email</Label>
                    <FormControl>
                      <Input placeholder="you@company.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={emailForm.formState.isSubmitting}
              >
                {emailForm.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Send Code
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Enter verification code</CardTitle>
        <CardDescription>
          We sent a code to {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onOtpSubmit} className="space-y-4">
          <div className="space-y-2">
            <InputOTP
              id={otpFieldId}
              autoFocus
              autoComplete="one-time-code"
              inputMode="numeric"
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={token}
              onChange={(value) => {
                setToken(value);
                if (tokenError) {
                  setTokenError(null);
                }
              }}
              aria-invalid={!!tokenError}
              containerClassName="w-full justify-center"
              className="w-full"
            >
              <InputOTPGroup
                className="mx-auto"
                onClick={() => {
                  document.getElementById(otpFieldId)?.focus();
                }}
              >
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {tokenError ? (
              <p className="text-[0.8rem] font-medium text-destructive">{tokenError}</p>
            ) : null}
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setStep("email")}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isVerifying}
            >
              {isVerifying && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Verify
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
