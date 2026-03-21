import { Link } from "@/lib/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  ArrowRight,
  MessageSquareText,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import {
  buildMetadata,
  breadcrumbSchema,
  faqSchema,
  webApplicationSchema,
} from "@/lib/seo";
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
  const t = await getTranslations("productPage");
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/product",
    locale: locale as Locale,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("productPage");
  const tc = await getTranslations("common");
  const ts = await getTranslations("seo");

  const faqItems = [
    { question: t("faq1Question"), answer: t("faq1Answer") },
    { question: t("faq2Question"), answer: t("faq2Answer") },
    { question: t("faq3Question"), answer: t("faq3Answer") },
  ];

  const productCapabilities = [
    {
      icon: MessageSquareText,
      title: t("feature1Title"),
      body: t("feature1Description"),
    },
    {
      icon: Waypoints,
      title: t("feature2Title"),
      body: t("feature2Description"),
    },
    {
      icon: ShieldCheck,
      title: t("feature3Title"),
      body: t("feature3Description"),
    },
  ];

  const crumbs = [
    { label: tc("home"), href: "/" },
    { label: t("eyebrow"), href: `/${localizeStaticSlug("product", loc)}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <div className="space-y-6">
        <Breadcrumbs items={crumbs} />
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            {t("eyebrow")}
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
            {t("intro")}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[#8A857C]">
            {t("body1")}
          </p>
        </div>
      </div>

      <div className="mt-4 h-px bg-linear-to-r from-terracotta/40 via-[#2A2722] to-transparent" />

      <section className="mt-14 grid gap-6 lg:grid-cols-3">
        {productCapabilities.map((item) => (
          <article
            key={item.title}
            className="group rounded-2xl border border-[#2A2722] bg-[#171613] p-8 transition-all hover:border-[#3A3630]"
          >
            <div className="inline-flex rounded-xl bg-terracotta/50 p-3 text-[#171613]">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-6 font-display text-xl font-medium tracking-tight">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#8A857C]">
              {item.body}
            </p>
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

          <article className="space-y-4">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              {t("section3Title")}
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#8A857C]">
              {t("section3Body")}
            </p>
          </article>
        </div>

        <aside className="rounded-2xl border border-[#2A2722] bg-[#171613] p-6 h-fit sticky top-20">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
            {tc("continueExploring")}
          </p>
          <ul className="mt-5 space-y-5">
            <li>
              <Link href={`/${localizeStaticSlug("features", loc)}`} className="group block space-y-1">
                <span className="text-sm font-medium text-[#EAE6DF] transition-colors group-hover:text-terracotta">
                  {t("related1Label")}
                </span>
                <span className="block text-sm leading-6 text-[#8A857C]">
                  {t("related1Description")}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={`/${localizeStaticSlug("solutions", loc)}/${localizeDynamicSlug("anonymous-feedback-software", loc)}`}
                className="group block space-y-1"
              >
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
                href={`/${localizeStaticSlug("guides", loc)}/${localizeDynamicSlug("how-to-collect-anonymous-employee-feedback", loc)}`}
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

      <section className="mt-16 space-y-6">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            {tc("faq")}
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight">
            {t("faqSectionSubtitle")}
          </h2>
        </div>
        <div className="divide-y divide-[#2A2722]">
          {faqItems.map((faq) => (
            <details key={faq.question} className="group py-5 first:pt-0">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium text-[#EAE6DF] transition-colors hover:text-terracotta">
                {faq.question}
                <span className="shrink-0 text-[#5C5850] transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#8A857C]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
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
            href={`/${localizeStaticSlug("features", loc)}`}
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/60"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          webApplicationSchema(ts("applicationDescription")),
          faqSchema(faqItems),
        ]}
      />
    </main>
  );
}
