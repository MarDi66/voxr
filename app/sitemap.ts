import type { MetadataRoute } from "next";
import { allContentPages, staticPublicPages } from "@/lib/site-content";
import { absoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-03-17T12:00:00.000Z");

  return [
    ...staticPublicPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: page.priority,
    })),
    ...allContentPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: new Date(`${page.publishedTime}T12:00:00.000Z`),
      changeFrequency:
        page.type === "glossary" ? ("monthly" as const) : ("weekly" as const),
      priority:
        page.type === "solution"
          ? 0.85
          : page.type === "guide"
            ? 0.75
            : 0.7,
    })),
  ];
}
