import { setRequestLocale, getTranslations } from "next-intl/server";
import { HubPage } from "@/components/marketing/hub-page";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getGlossaryPages } from "@/lib/site-content";
import type { Locale } from "@/lib/i18n/config";
import { localizeStaticSlug, localizeDynamicSlug } from "@/lib/i18n/slugs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("glossaryHub");
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/glossary",
    locale: locale as Locale,
  });
}

export default async function GlossaryHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const t = await getTranslations("glossaryHub");
  const tc = await getTranslations("common");

  const pages = getGlossaryPages(loc);

  return (
    <HubPage
      eyebrow="Glossary"
      title={t("hubDescription")}
      description={t("hubSubtitle")}
      crumbs={[
        { label: tc("home"), href: "/" },
        { label: "Glossary", href: `/${localizeStaticSlug("glossary", loc)}` },
      ]}
      items={pages.map((page) => ({
        href: `/${localizeStaticSlug("glossary", loc)}/${localizeDynamicSlug(page.slug, loc)}`,
        label: page.title,
        description: page.description,
      }))}
      cta={{
        title: t("ctaTitle"),
        body: t("ctaBody"),
        primaryHref: `/${localizeStaticSlug("guides", loc)}`,
        primaryLabel: t("ctaPrimary"),
        secondaryHref: `/${localizeStaticSlug("solutions", loc)}`,
        secondaryLabel: t("ctaSecondary"),
      }}
      schema={[
        breadcrumbSchema([
          { label: tc("home"), href: "/" },
          { label: "Glossary", href: `/${localizeStaticSlug("glossary", loc)}` },
        ]),
      ]}
    />
  );
}
