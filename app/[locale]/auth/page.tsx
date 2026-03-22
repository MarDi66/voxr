import { setRequestLocale, getTranslations } from "next-intl/server";
import { AuthForm } from "@/components/auth/auth-form";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import { Link } from "@/lib/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import VoxrLogo from "@/components/common/logo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("auth");
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/auth",
    locale: locale as Locale,
    index: false,
  });
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("auth");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center gap-2">
          <VoxrLogo className="h-12 w-12" />
          <h2 className="text-4xl font-bold tracking-tight">
            Voxr
          </h2>
        </div>
        <AuthForm />
        <Link
          href="/"
          className="inline-flex w-full justify-center items-center gap-2 text-sm text-[#8A857C] transition-colors hover:text-terracotta"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
