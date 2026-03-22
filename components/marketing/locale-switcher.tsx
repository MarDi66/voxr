"use client";

import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import {
  localizeStaticSlug,
  localizeDynamicSlug,
  resolveStaticSlug,
  resolveDynamicSlug,
  marketingStaticSlugs,
} from "@/lib/i18n/slugs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Build the target URL from the current browser pathname.
 * We read `window.location.pathname` directly to get the real URL
 * (including any translated slugs), not the internally rewritten path.
 */
function buildTargetUrl(targetLocale: Locale): string {
  const pathname = window.location.pathname;
  // Strip current locale prefix: "/en/resources" → "resources"
  const segments = pathname.split("/").filter(Boolean);

  // First segment is the current locale
  const currentLocale = segments[0] as Locale;
  const pathSegments = segments.slice(1);

  if (pathSegments.length === 0) {
    return `/${targetLocale}`;
  }

  // Resolve current locale's slugs back to English
  const firstSegment = pathSegments[0];
  const isMarketing =
    marketingStaticSlugs.has(firstSegment) ||
    resolveStaticSlug(firstSegment, currentLocale) !== firstSegment;

  if (!isMarketing) {
    // Non-marketing path — just swap locale prefix
    return `/${targetLocale}/${pathSegments.join("/")}`;
  }

  // Resolve to English, then translate to target
  const englishSegments = pathSegments.map((segment, index) => {
    if (index === 0) return resolveStaticSlug(segment, currentLocale);
    return resolveDynamicSlug(segment, currentLocale);
  });

  const targetSegments = englishSegments.map((segment, index) => {
    if (index === 0) return localizeStaticSlug(segment, targetLocale);
    return localizeDynamicSlug(segment, targetLocale);
  });

  return `/${targetLocale}/${targetSegments.join("/")}`;
}

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;

  function handleSwitch(targetLocale: Locale) {
    if (targetLocale === locale) return;
    window.location.assign(buildTargetUrl(targetLocale));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1.5 text-sm text-[#8A857C] transition-colors hover:text-[#EAE6DF] outline-none"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        {locale.toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleSwitch(loc)}
            className={loc === locale ? "font-medium" : ""}
          >
            {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
