import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ContentPage } from "@/components/marketing/content-page";
import { solutionPages, getSolutionPages } from "@/lib/site-content";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    solutionPages.map((page) => ({
      locale,
      slug: page.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = getSolutionPages(locale as Locale).find((entry) => entry.slug === slug);

  if (!page) {
    return {};
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    locale: locale as Locale,
  });
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = getSolutionPages(locale as Locale).find((entry) => entry.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <ContentPage
      page={page}
      schema={[breadcrumbSchema(page.breadcrumbs), faqSchema(page.faqs)]}
    />
  );
}
