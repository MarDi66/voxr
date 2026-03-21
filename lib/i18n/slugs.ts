import type { Locale } from "./config";

/**
 * Bidirectional slug mapping for marketing pages.
 * Keys are English slugs, values are French slugs.
 */

// Static marketing page slugs
const staticSlugMap: Record<string, Record<string, string>> = {
  en: {
    product: "product",
    features: "features",
    security: "security",
    solutions: "solutions",
    guides: "guides",
    resources: "resources",
    glossary: "glossary",
    pricing: "pricing",
  },
  fr: {
    product: "produit",
    features: "fonctionnalites",
    security: "securite",
    solutions: "solutions",
    guides: "guides",
    resources: "ressources",
    glossary: "glossaire",
    pricing: "tarifs",
  },
};

// Dynamic content page slugs (English → French)
const dynamicSlugMap: Record<string, string> = {
  // Solutions
  "anonymous-feedback-software": "logiciel-feedback-anonyme",
  "employee-feedback-platform": "plateforme-feedback-employes",
  "internal-feedback-tool": "outil-feedback-interne",
  "employee-suggestion-box-software": "logiciel-boite-a-idees",
  // Guides
  "what-is-anonymous-employee-feedback": "quest-ce-que-le-feedback-anonyme",
  "how-to-collect-anonymous-employee-feedback":
    "comment-collecter-du-feedback-anonyme",
  "internal-feedback-best-practices":
    "bonnes-pratiques-feedback-interne",
  "workplace-trust-feedback-guide": "guide-confiance-et-feedback",
  // Resources
  "employee-feedback-template": "modele-feedback-employes",
  "anonymous-feedback-policy-template":
    "modele-politique-feedback-anonyme",
  "manager-response-template-anonymous-feedback":
    "modele-reponse-manager-feedback-anonyme",
  // Glossary
  "anonymous-feedback": "feedback-anonyme",
  "employee-voice": "voix-des-employes",
  "employee-suggestion-box": "boite-a-idees",
  "workplace-trust": "confiance-en-entreprise",
};

// Build reverse map (French → English)
const reverseDynamicSlugMap: Record<string, string> = Object.fromEntries(
  Object.entries(dynamicSlugMap).map(([en, fr]) => [fr, en])
);

/**
 * Get the localized static slug for a marketing section.
 * e.g. localizeStaticSlug("product", "fr") → "produit"
 */
export function localizeStaticSlug(enSlug: string, locale: Locale): string {
  return staticSlugMap[locale]?.[enSlug] ?? enSlug;
}

/**
 * Resolve a localized static slug back to the English canonical.
 * e.g. resolveStaticSlug("produit", "fr") → "product"
 */
export function resolveStaticSlug(
  localizedSlug: string,
  locale: Locale
): string {
  if (locale === "en") return localizedSlug;
  const reverseMap = Object.fromEntries(
    Object.entries(staticSlugMap.fr).map(([en, fr]) => [fr, en])
  );
  return reverseMap[localizedSlug] ?? localizedSlug;
}

/**
 * Get the localized dynamic slug.
 * e.g. localizeDynamicSlug("anonymous-feedback-software", "fr") → "logiciel-feedback-anonyme"
 */
export function localizeDynamicSlug(enSlug: string, locale: Locale): string {
  if (locale === "en") return enSlug;
  return dynamicSlugMap[enSlug] ?? enSlug;
}

/**
 * Resolve a localized dynamic slug back to the English canonical.
 * e.g. resolveDynamicSlug("logiciel-feedback-anonyme", "fr") → "anonymous-feedback-software"
 */
export function resolveDynamicSlug(
  localizedSlug: string,
  locale: Locale
): string {
  if (locale === "en") return localizedSlug;
  return reverseDynamicSlugMap[localizedSlug] ?? localizedSlug;
}

/**
 * Convert a full English path to a localized path.
 * e.g. localizePathname("/solutions/anonymous-feedback-software", "fr")
 *   → "/fr/solutions/logiciel-feedback-anonyme"
 */
export function localizePathname(enPath: string, locale: Locale): string {
  const segments = enPath.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${locale}`;
  }

  const localizedSegments = segments.map((segment, index) => {
    if (index === 0) {
      // First segment is a static marketing slug
      return localizeStaticSlug(segment, locale);
    }
    // Subsequent segments are dynamic slugs
    return localizeDynamicSlug(segment, locale);
  });

  return `/${locale}/${localizedSegments.join("/")}`;
}

/**
 * Resolve a localized pathname back to the English canonical path (without locale prefix).
 * e.g. resolvePathname("/fr/solutions/logiciel-feedback-anonyme", "fr")
 *   → "/solutions/anonymous-feedback-software"
 */
export function resolvePathname(
  localizedPath: string,
  locale: Locale
): string {
  // Strip locale prefix
  const withoutLocale = localizedPath.replace(`/${locale}`, "") || "/";
  if (locale === "en" || withoutLocale === "/") return withoutLocale;

  const segments = withoutLocale.split("/").filter(Boolean);

  const resolvedSegments = segments.map((segment, index) => {
    if (index === 0) {
      return resolveStaticSlug(segment, locale);
    }
    return resolveDynamicSlug(segment, locale);
  });

  return `/${resolvedSegments.join("/")}`;
}

/**
 * Localize slugs in a path WITHOUT adding locale prefix.
 * For use with the next-intl Link component (which adds the prefix automatically).
 * e.g. localizeHref("/solutions/anonymous-feedback-software", "fr")
 *   → "/solutions/logiciel-feedback-anonyme"
 * Non-marketing paths (e.g., "/auth", "/w/slug") pass through unchanged.
 */
export function localizeHref(enPath: string, locale: Locale): string {
  if (locale === "en" || enPath === "/") return enPath;

  const segments = enPath.split("/").filter(Boolean);
  if (segments.length === 0) return enPath;

  // Check if the first segment is a marketing slug
  const firstSegment = segments[0];
  if (!marketingStaticSlugs.has(firstSegment)) {
    // Not a marketing path — return as-is
    return enPath;
  }

  const localizedSegments = segments.map((segment, index) => {
    if (index === 0) return localizeStaticSlug(segment, locale);
    return localizeDynamicSlug(segment, locale);
  });

  return `/${localizedSegments.join("/")}`;
}

/** Set of all French static marketing slugs for fast middleware lookup */
export const frenchStaticSlugs = new Set(Object.values(staticSlugMap.fr));

/** Set of all French dynamic slugs for fast middleware lookup */
export const frenchDynamicSlugs = new Set(Object.values(dynamicSlugMap));

/** All marketing static slugs (English) */
export const marketingStaticSlugs = new Set(Object.keys(staticSlugMap.en));
