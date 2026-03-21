import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import {
  ArrowRight,
  MessageSquareText,
  Shield,
  Users,
} from "lucide-react";
import { JsonLd } from "@/components/marketing/json-ld";
import {
  buildMetadata,
  faqSchema,
  organizationSchema,
  webApplicationSchema,
  websiteSchema,
} from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import { localizePathname } from "@/lib/i18n/slugs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("homePage");
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/",
    locale: locale as Locale,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const t = await getTranslations("homePage");
  const ts = await getTranslations("seo");

  const homeFaqs = [
    { question: t("faq1Question"), answer: t("faq1Answer") },
    { question: t("faq2Question"), answer: t("faq2Answer") },
    { question: t("faq3Question"), answer: t("faq3Answer") },
  ];

  const trustPoints = [
    {
      icon: Shield,
      title: t("trustPoint1Title"),
      body: t("trustPoint1Description"),
    },
    {
      icon: Users,
      title: t("trustPoint2Title"),
      body: t("trustPoint2Description"),
    },
    {
      icon: MessageSquareText,
      title: t("trustPoint3Title"),
      body: t("trustPoint3Description"),
    },
  ];

  return (
    <main>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -z-10 h-150 w-150 -translate-x-1/2 -translate-y-1/3 rounded-full bg-terracotta opacity-[0.06] blur-[120px]" />

        <div className="mx-auto max-w-3xl px-6 pb-20 pt-24 text-center sm:pt-32">
          <div className="mk-animate" style={{ animationDelay: "0ms" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/20 bg-terracotta/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
              {t("heroTagline")}
            </span>
          </div>

          <h1
            className="mk-animate mx-auto mt-8 max-w-2xl font-display text-5xl font-medium leading-[1.08] tracking-tight sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {t("heroTitle")}
          </h1>

          <p
            className="mk-animate mx-auto mt-6 max-w-xl text-lg leading-8 text-[#8A857C]"
            style={{ animationDelay: "160ms" }}
          >
            {t("heroDescription")}
          </p>

          <div
            className="mk-animate mt-10 flex flex-wrap items-center justify-center gap-5"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-terracotta/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-terracotta/25"
            >
              {t("heroGetStarted")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={localizePathname("/product", loc)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#D0CBC3] transition-colors hover:text-terracotta"
            >
              {t("heroSeeHow")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust points ─────────────────────────── */}
      <section className="border-y border-[#2A2722] bg-[#121110]">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {trustPoints.map((point) => (
              <article
                key={point.title}
                className="group rounded-2xl border border-[#2A2722] bg-[#171613] p-8 transition-all hover:border-[#3A3630]"
              >
                <div className="inline-flex rounded-xl bg-terracotta/50 p-3 text-[#171613]">
                  <point.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-6 font-display text-xl font-medium tracking-tight">
                  {point.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#8A857C]">
                  {point.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Voxr ─────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            {t("whyTitle")}
          </p>
          <h2 className="max-w-xl font-display text-4xl font-medium tracking-tight">
            {t("whySubtitle")}
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-terracotta/40" />
            <div className="h-1 w-1 rounded-full bg-terracotta/40" />
          </div>
          <p className="max-w-2xl text-base leading-7 text-[#8A857C]">
            {t("whyBody1")} {t("whyBody2")}
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-16 space-y-6">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            {t("faqSectionTitle")}
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight">
            {t("faqSectionSubtitle")}
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[#8A857C]">
            {t("faqSectionDescription")}
          </p>
        </div>
        <div className="divide-y divide-[#2A2722]">
          {homeFaqs.map((faq) => (
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

      {/* ── CTA ───────────────────────────────────── */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-terracotta p-8 text-white shadow-xl shadow-terracotta/10 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
            {t("ctaTagline")}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium tracking-tight sm:text-4xl">
            {t("ctaTitle")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
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
              href={localizePathname("/solutions/anonymous-feedback-software", loc)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/60"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={[
          organizationSchema(),
          websiteSchema(),
          webApplicationSchema(ts("applicationDescription")),
          faqSchema(homeFaqs),
        ]}
      />
    </main>
  );
}
