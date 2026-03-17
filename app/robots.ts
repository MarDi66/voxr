import type { MetadataRoute } from "next";
import { absoluteUrl, getBaseUrl } from "@/lib/site-config";

const disallowPaths = [
  "/auth",
  "/auth/",
  "/onboarding",
  "/onboarding/",
  "/w",
  "/w/",
  "/app",
  "/app/",
  "/dashboard",
  "/dashboard/",
];

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
