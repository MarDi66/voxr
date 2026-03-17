export const siteConfig = {
  name: "Voxr",
  shortName: "Voxr",
  description:
    "Voxr is anonymous internal feedback software for modern teams that want more honest employee feedback, ideas, praise, and concerns inside each workspace.",
  defaultTitle: "Anonymous Internal Feedback Software for Modern Teams",
  ogImagePath: "/opengraph-image",
  defaultLocale: "en_US",
  xHandle: "@voxr",
};

function withProtocol(value: string) {
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;
}

export function getBaseUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (!configuredUrl) {
    return "http://localhost:3000";
  }

  return withProtocol(configuredUrl);
}

export function absoluteUrl(path = "/") {
  return new URL(path, getBaseUrl()).toString();
}

export const searchVerification = {
  google: process.env.GOOGLE_SITE_VERIFICATION,
  other: process.env.BING_SITE_VERIFICATION
    ? {
        "msvalidate.01": process.env.BING_SITE_VERIFICATION,
      }
    : undefined,
};
