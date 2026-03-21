import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ContentPage } from "@/components/marketing/content-page";
import { guidePages, getGuidePages } from "@/lib/site-content";
import { articleSchema, buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    guidePages.map((page) => ({
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
  const page = getGuidePages(locale as Locale).find((entry) => entry.slug === slug);

  if (!page) {
    return {};
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    type: "article",
    locale: locale as Locale,
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = getGuidePages(locale as Locale).find((entry) => entry.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <ContentPage
      page={page}
      schema={[
        breadcrumbSchema(page.breadcrumbs),
        articleSchema({
          title: page.title,
          description: page.description,
          path: page.path,
          publishedTime: page.publishedTime,
          locale: locale as Locale,
        }),
        faqSchema(page.faqs),
      ]}
    />
  );
}
