import type { MetadataRoute } from "next";
import { allContentPages, staticPublicPages } from "@/lib/site-content";
import { absoluteUrl } from "@/lib/site-config";
import { locales, type Locale } from "@/lib/i18n/config";
import { localizePathname } from "@/lib/i18n/slugs";

function buildAlternates(enPath: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(localizePathname(enPath, locale));
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-03-17T12:00:00.000Z");
  const entries: MetadataRoute.Sitemap = [];

  // Static marketing pages — one entry per locale
  for (const locale of locales) {
    for (const page of staticPublicPages) {
      entries.push({
        url: absoluteUrl(localizePathname(page.path, locale as Locale)),
        lastModified,
        changeFrequency: "weekly",
        priority: page.priority,
        alternates: buildAlternates(page.path),
      });
    }
  }

  // Dynamic content pages — one entry per locale
  for (const locale of locales) {
    for (const page of allContentPages) {
      entries.push({
        url: absoluteUrl(localizePathname(page.path, locale as Locale)),
        lastModified: new Date(`${page.publishedTime}T12:00:00.000Z`),
        changeFrequency:
          page.type === "glossary" ? "monthly" : "weekly",
        priority:
          page.type === "solution"
            ? 0.85
            : page.type === "guide"
              ? 0.75
              : 0.7,
        alternates: buildAlternates(page.path),
      });
    }
  }

  return entries;
}
