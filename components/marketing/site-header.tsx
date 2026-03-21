import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import VoxrLogo from "@/components/common/logo";
import { ArrowRight } from "lucide-react";
import { SiteHeaderMobileNav } from "@/components/marketing/site-header-mobile-nav";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { localizeStaticSlug } from "@/lib/i18n/slugs";
import type { Locale } from "@/lib/i18n/config";

function usePrimaryLinks() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;

  return [
    { href: `/${localizeStaticSlug("product", locale)}`, label: t("product") },
    { href: `/${localizeStaticSlug("features", locale)}`, label: t("features") },
    { href: `/${localizeStaticSlug("security", locale)}`, label: t("security") },
    { href: `/${localizeStaticSlug("solutions", locale)}`, label: t("solutions") },
    { href: `/${localizeStaticSlug("guides", locale)}`, label: t("guides") },
    { href: `/${localizeStaticSlug("resources", locale)}`, label: t("resources") },
  ];
}

export function SiteHeader() {
  const t = useTranslations("nav");
  const primaryLinks = usePrimaryLinks();

  return (
    <header className="sticky top-0.75 z-40 border-b border-[#2A2722] bg-[#0C0B09]/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Voxr homepage"
        >
          <VoxrLogo className="w-8" />
          <span className="font-display text-xl font-medium tracking-tight text-[#EAE6DF]">
            Voxr
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm text-[#8A857C] md:flex"
        >
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#EAE6DF]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <LocaleSwitcher />
          <Link
            href="/auth"
            className="text-sm text-[#8A857C] transition-colors hover:text-[#EAE6DF]"
          >
            {t("signIn")}
          </Link>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-4 py-2 text-sm font-medium text-white shadow-sm shadow-terracotta/20 transition-all hover:-translate-y-px hover:shadow-md hover:shadow-terracotta/25"
          >
            {t("getStarted")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <SiteHeaderMobileNav links={primaryLinks} />
      </div>
    </header>
  );
}
