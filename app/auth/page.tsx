import { AuthForm } from "@/components/auth/auth-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sign in",
  description: "Sign in to access your private Voxr workspace.",
  path: "/auth",
  index: false,
});

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <AuthForm />
    </div>
  );
}
