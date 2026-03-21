import { setRequestLocale, getTranslations } from "next-intl/server";
import { HubPage } from "@/components/marketing/hub-page";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getGuidePages } from "@/lib/site-content";
import type { Locale } from "@/lib/i18n/config";
import { localizeStaticSlug, localizeDynamicSlug } from "@/lib/i18n/slugs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("guidesHub");
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/guides",
    locale: locale as Locale,
  });
}

export default async function GuidesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const t = await getTranslations("guidesHub");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const pages = getGuidePages(loc);

  return (
    <HubPage
      eyebrow={tn("guides")}
      title={t("hubDescription")}
      description={t("hubSubtitle")}
      crumbs={[
        { label: tc("home"), href: "/" },
        { label: tn("guides"), href: `/${localizeStaticSlug("guides", loc)}` },
      ]}
      items={pages.map((page) => ({
        href: `/${localizeStaticSlug("guides", loc)}/${localizeDynamicSlug(page.slug, loc)}`,
        label: page.title,
        description: page.description,
      }))}
      cta={{
        title: t("ctaTitle"),
        body: t("ctaBody"),
        primaryHref: "/auth",
        primaryLabel: t("ctaPrimary"),
        secondaryHref: `/${localizeStaticSlug("resources", loc)}`,
        secondaryLabel: t("ctaSecondary"),
      }}
      schema={[
        breadcrumbSchema([
          { label: tc("home"), href: "/" },
          { label: tn("guides"), href: `/${localizeStaticSlug("guides", loc)}` },
        ]),
      ]}
    />
  );
}
