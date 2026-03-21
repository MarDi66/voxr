import { Link } from "@/lib/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  ArrowRight,
  Check,
  Users,
  MessageSquareText,
  FileText,
} from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import { localizeStaticSlug } from "@/lib/i18n/slugs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pricingPage");
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/pricing",
    locale: locale as Locale,
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("pricingPage");
  const tc = await getTranslations("common");

  const crumbs = [
    { label: tc("home"), href: "/" },
    { label: t("eyebrow"), href: `/${localizeStaticSlug("pricing", loc)}` },
  ];

  const faqItems = [
    { question: t("faq1Question"), answer: t("faq1Answer") },
    { question: t("faq2Question"), answer: t("faq2Answer") },
    { question: t("faq3Question"), answer: t("faq3Answer") },
  ];

  const includedFeatures = [
    t("feature1"),
    t("feature2"),
    t("feature3"),
    t("feature4"),
    t("feature5"),
    t("feature6"),
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
        </section>
      </div>

      {/* Pricing cards */}
      <section className="mt-14 grid gap-6 lg:grid-cols-3">
        {/* Free */}
        <article className="flex flex-col rounded-2xl border border-[#2A2722] bg-[#171613] p-8 transition-all hover:border-[#3A3630]">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
            {t("free")}
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-4xl font-medium tracking-tight">
              {t("freePriceLabel")}
            </span>
            <span className="text-sm text-[#8A857C]">
              {t("forever")}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#8A857C]">
            {t("freeDescription")}
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3 text-[#EAE6DF]">
              <Users className="h-4 w-4 shrink-0 text-terracotta" />
              {t("freeMembersLimit")}
            </li>
            <li className="flex items-center gap-3 text-[#EAE6DF]">
              <MessageSquareText className="h-4 w-4 shrink-0 text-terracotta" />
              {t("freeFeedbackLimit")}
            </li>
            <li className="flex items-center gap-3 text-[#EAE6DF]">
              <FileText className="h-4 w-4 shrink-0 text-terracotta" />
              {t("freeFormsLimit")}
            </li>
          </ul>

          <div className="mt-auto pt-8">
            <Link
              href="/auth"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#2A2722] px-6 py-3 text-sm font-medium text-[#EAE6DF] transition-all hover:border-[#3A3630] hover:bg-[#1E1D1A]"
            >
              {t("freeCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        {/* Pro */}
        <article className="relative flex flex-col rounded-2xl border-2 border-terracotta bg-[#171613] p-8 shadow-lg shadow-terracotta/5">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
            {t("pro")}
          </p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-display text-4xl font-medium tracking-tight">
              {t("proPrice")}&euro;
            </span>
            <span className="text-sm text-[#8A857C]">
              {t("perMonth")}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#8A857C]">
            {t("proDescription")}
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3 text-[#EAE6DF]">
              <Users className="h-4 w-4 shrink-0 text-terracotta" />
              {t("proMembersLimit")}
            </li>
            <li className="flex items-center gap-3 text-[#EAE6DF]">
              <MessageSquareText className="h-4 w-4 shrink-0 text-terracotta" />
              {t("proFeedbackLimit")}
            </li>
            <li className="flex items-center gap-3 text-[#EAE6DF]">
              <FileText className="h-4 w-4 shrink-0 text-terracotta" />
              {t("proFormsLimit")}
            </li>
          </ul>

          <div className="mt-auto pt-8">
            <Link
              href="/auth"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-terracotta/20 transition-all hover:-translate-y-px hover:shadow-md hover:shadow-terracotta/25"
            >
              {t("proCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        {/* Enterprise */}
        <article className="flex flex-col rounded-2xl border border-[#2A2722] bg-[#171613] p-8 transition-all hover:border-[#3A3630]">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
            {t("enterprise")}
          </p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-display text-4xl font-medium tracking-tight">
              {t("enterprisePrice")}&euro;
            </span>
            <span className="text-sm text-[#8A857C]">
              {t("perMonth")}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#8A857C]">
            {t("enterpriseDescription")}
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3 text-[#EAE6DF]">
              <Users className="h-4 w-4 shrink-0 text-terracotta" />
              <span>
                {t("enterpriseMembersLimit")}
                <span className="block text-xs text-[#8A857C]">
                  {t("enterpriseMembersAddon", { price: "2\u00a0\u20ac" })}
                </span>
              </span>
            </li>
            <li className="flex items-center gap-3 text-[#EAE6DF]">
              <MessageSquareText className="h-4 w-4 shrink-0 text-terracotta" />
              <span>
                {t("enterpriseFeedbackLimit")}
                <span className="block text-xs text-[#8A857C]">
                  {t("enterpriseFeedbackAddon", { price: "5\u00a0\u20ac" })}
                </span>
              </span>
            </li>
            <li className="flex items-center gap-3 text-[#EAE6DF]">
              <FileText className="h-4 w-4 shrink-0 text-terracotta" />
              <span>
                {t("enterpriseFormsLimit")}
                <span className="block text-xs text-[#8A857C]">
                  {t("enterpriseFormsAddon", { price: "5\u00a0\u20ac" })}
                </span>
              </span>
            </li>
          </ul>

          <div className="mt-auto pt-8">
            <Link
              href="/auth"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#2A2722] px-6 py-3 text-sm font-medium text-[#EAE6DF] transition-all hover:border-[#3A3630] hover:bg-[#1E1D1A]"
            >
              {t("enterpriseCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </section>

      {/* Included features */}
      <section className="mt-16 space-y-6">
        <h2 className="font-display text-3xl font-medium tracking-tight">
          {t("includedFeatures")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {includedFeatures.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 rounded-xl border border-[#2A2722] bg-[#171613] px-5 py-4 text-sm text-[#EAE6DF]"
            >
              <Check className="h-4 w-4 shrink-0 text-terracotta" />
              {feature}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
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

      {/* CTA */}
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
        data={[breadcrumbSchema(crumbs), faqSchema(faqItems)]}
      />
    </main>
  );
}
