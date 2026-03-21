import { setRequestLocale, getTranslations } from "next-intl/server";
import { HubPage } from "@/components/marketing/hub-page";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getResourcePages } from "@/lib/site-content";
import type { Locale } from "@/lib/i18n/config";
import { localizeStaticSlug, localizeDynamicSlug } from "@/lib/i18n/slugs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("resourcesHub");
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/resources",
    locale: locale as Locale,
  });
}

export default async function ResourcesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const t = await getTranslations("resourcesHub");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const pages = getResourcePages(loc);

  return (
    <HubPage
      eyebrow={tn("resources")}
      title={t("hubDescription")}
      description={t("hubSubtitle")}
      crumbs={[
        { label: tc("home"), href: "/" },
        { label: tn("resources"), href: `/${localizeStaticSlug("resources", loc)}` },
      ]}
      items={pages.map((page) => ({
        href: `/${localizeStaticSlug("resources", loc)}/${localizeDynamicSlug(page.slug, loc)}`,
        label: page.title,
        description: page.description,
      }))}
      cta={{
        title: t("ctaTitle"),
        body: t("ctaBody"),
        primaryHref: "/auth",
        primaryLabel: t("ctaPrimary"),
        secondaryHref: `/${localizeStaticSlug("features", loc)}`,
        secondaryLabel: t("ctaSecondary"),
      }}
      schema={[
        breadcrumbSchema([
          { label: tc("home"), href: "/" },
          { label: tn("resources"), href: `/${localizeStaticSlug("resources", loc)}` },
        ]),
      ]}
    />
  );
}
