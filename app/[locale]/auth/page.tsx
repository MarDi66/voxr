import { setRequestLocale, getTranslations } from "next-intl/server";
import { AuthForm } from "@/components/auth/auth-form";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

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

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <AuthForm />
    </div>
  );
}
