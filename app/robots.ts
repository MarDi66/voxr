import type { MetadataRoute } from "next";
import { absoluteUrl, getBaseUrl } from "@/lib/site-config";
import { locales } from "@/lib/i18n/config";

const privateRoutes = ["auth", "onboarding", "w", "app", "dashboard"];

const disallowPaths = locales.flatMap((locale) =>
  privateRoutes.flatMap((route) => [
    `/${locale}/${route}`,
    `/${locale}/${route}/`,
  ])
);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: disallowPaths,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getBaseUrl(),
  };
}
