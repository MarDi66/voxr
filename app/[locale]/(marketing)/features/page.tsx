import { Link } from "@/lib/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import {
  localizeStaticSlug,
  localizeDynamicSlug,
} from "@/lib/i18n/slugs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("featuresPage");
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/features",
    locale: locale as Locale,
  });
}

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("featuresPage");
  const tc = await getTranslations("common");

  const featureGroups = [
    {
      title: t("feature1Title"),
      points: [
        t("feature1Bullet1"),
        t("feature1Bullet2"),
        t("feature1Bullet3"),
      ],
    },
    {
      title: t("feature2Title"),
      points: [
        t("feature2Bullet1"),
        t("feature2Bullet2"),
        t("feature2Bullet3"),
      ],
    },
    {
      title: t("feature3Title"),
      points: [
        t("feature3Bullet1"),
        t("feature3Bullet2"),
        t("feature3Bullet3"),
      ],
    },
    {
      title: t("feature4Title"),
      points: [
        t("feature4Bullet1"),
        t("feature4Bullet2"),
        t("feature4Bullet3"),
      ],
    },
  ];

  const crumbs = [
    { label: tc("home"), href: "/" },
    { label: t("eyebrow"), href: `/${localizeStaticSlug("features", loc)}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <div className="space-y-6">
        <Breadcrumbs items={crumbs} />
        <section className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            {t("eyebrow")}
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
            {t("intro")}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[#8A857C]">
            {t("body")}
          </p>
        </section>
      </div>

      <div className="mt-4 h-px bg-gradient-to-r from-terracotta/40 via-[#2A2722] to-transparent" />

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        {featureGroups.map((group, groupIndex) => (
          <article
            key={group.title}
            className="rounded-2xl border border-[#2A2722] bg-[#171613] p-8 transition-all hover:border-[#3A3630]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-terracotta/10 text-xs font-bold text-terracotta">
                {groupIndex + 1}
              </span>
              <h2 className="font-display text-xl font-medium tracking-tight">
                {group.title}
              </h2>
            </div>
            <ul className="mt-5 space-y-3">
              {group.points.map((point) => (
                <li
                  key={point}
                  className="border-l-2 border-[#2A2722] pl-4 text-sm leading-7 text-[#8A857C] transition-colors hover:border-terracotta/40"
                >
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-12">
          <article className="space-y-4">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              {t("section1Title")}
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#8A857C]">
              {t("section1Body")}
            </p>
          </article>
          <article className="space-y-4">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              {t("section2Title")}
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#8A857C]">
              {t("section2Body")}
            </p>
          </article>
        </div>
        <aside className="rounded-2xl border border-[#2A2722] bg-[#171613] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
            {t("relatedTitle")}
          </p>
          <ul className="mt-5 space-y-5">
            <li>
              <Link href={`/${localizeStaticSlug("product", loc)}`} className="group block space-y-1">
                <span className="text-sm font-medium text-[#EAE6DF] transition-colors group-hover:text-terracotta">
                  {t("related1Label")}
                </span>
                <span className="block text-sm leading-6 text-[#8A857C]">
                  {t("related1Description")}
                </span>
              </Link>
            </li>
            <li>
              <Link href={`/${localizeStaticSlug("security", loc)}`} className="group block space-y-1">
                <span className="text-sm font-medium text-[#EAE6DF] transition-colors group-hover:text-terracotta">
                  {t("related2Label")}
                </span>
                <span className="block text-sm leading-6 text-[#8A857C]">
                  {t("related2Description")}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={`/${localizeStaticSlug("solutions", loc)}/${localizeDynamicSlug("internal-feedback-tool", loc)}`}
                className="group block space-y-1"
              >
                <span className="text-sm font-medium text-[#EAE6DF] transition-colors group-hover:text-terracotta">
                  {t("related3Label")}
                </span>
                <span className="block text-sm leading-6 text-[#8A857C]">
                  {t("related3Description")}
                </span>
              </Link>
            </li>
          </ul>
        </aside>
      </section>

      <section className="mt-16 overflow-hidden rounded-2xl bg-terracotta p-8 text-white shadow-xl shadow-terracotta/10 sm:p-10">
        <h2 className="font-display text-3xl font-medium tracking-tight">
          {t("ctaTitle")}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
          {t("ctaDescription")}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-terracotta transition-all hover:-translate-y-px hover:shadow-md"
          >
            {t("ctaPrimary")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/${localizeStaticSlug("guides", loc)}/${localizeDynamicSlug("internal-feedback-best-practices", loc)}`}
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/60"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </section>

      <JsonLd data={[breadcrumbSchema(crumbs)]} />
    </main>
  );
}
