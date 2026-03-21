import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { localizeStaticSlug, localizeDynamicSlug } from "@/lib/i18n/slugs";
import type { Locale } from "@/lib/i18n/config";

function useFooterGroups() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;

  return [
    {
      title: t("platform"),
      links: [
        { href: `/${localizeStaticSlug("product", locale)}`, label: tNav("product") },
        { href: `/${localizeStaticSlug("features", locale)}`, label: tNav("features") },
        { href: `/${localizeStaticSlug("security", locale)}`, label: t("securityAndPrivacy") },
        { href: `/${localizeStaticSlug("pricing", locale)}`, label: tNav("pricing") },
      ],
    },
    {
      title: t("useCases"),
      links: [
        { href: `/${localizeStaticSlug("solutions", locale)}`, label: t("solutionsHub") },
        {
          href: `/${localizeStaticSlug("solutions", locale)}/${localizeDynamicSlug("employee-feedback-platform", locale)}`,
          label: t("employeeFeedbackPlatform"),
        },
        {
          href: `/${localizeStaticSlug("solutions", locale)}/${localizeDynamicSlug("employee-suggestion-box-software", locale)}`,
          label: t("suggestionBoxSoftware"),
        },
      ],
    },
    {
      title: t("learn"),
      links: [
        { href: `/${localizeStaticSlug("guides", locale)}`, label: t("guidesHub") },
        { href: `/${localizeStaticSlug("resources", locale)}`, label: t("resourcesHub") },
        { href: `/${localizeStaticSlug("glossary", locale)}`, label: t("glossaryHub") },
      ],
    },
  ];
}

export function SiteFooter() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const footerGroups = useFooterGroups();

  return (
    <footer className="border-t border-[#2A2722]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-5">
          <p className="font-display text-xl font-medium tracking-tight text-[#EAE6DF]">
            Voxr
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-[#8A857C]">
            {t("tagline")}
          </p>
          <Link
            href="/auth"
            className="inline-block text-sm font-medium text-terracotta underline decoration-terracotta/30 underline-offset-4 transition-colors hover:decoration-terracotta"
          >
            {tCommon("createWorkspace")}
          </Link>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5C5850]">
              {group.title}
            </p>
            <ul className="space-y-3 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8A857C] transition-colors hover:text-[#EAE6DF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
