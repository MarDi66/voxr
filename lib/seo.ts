import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import type { FAQItem } from "@/lib/site-content";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path,
  index = true,
  type = "website",
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type,
      locale: siteConfig.defaultLocale,
      images: [
        {
          url: absoluteUrl(siteConfig.ogImagePath),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} social preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: siteConfig.xHandle,
      images: [absoluteUrl(siteConfig.ogImagePath)],
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            "max-image-preview": "none",
            "max-snippet": 0,
            "max-video-preview": 0,
          },
        },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/voxr-logo.png"),
    description: siteConfig.description,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
  };
}

export function webApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    url: absoluteUrl("/product"),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Anonymous internal feedback software for collecting employee ideas, praise, concerns, and comments inside a private workspace.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function breadcrumbSchema(
  items: Array<{ label: string; href: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

type ArticleSchemaInput = {
  title: string;
  description: string;
  path: string;
  publishedTime: string;
};

export function articleSchema({
  title,
  description,
  path,
  publishedTime,
}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/voxr-logo.png"),
      },
    },
  };
}

export function definedTermSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: title,
    description,
    url: absoluteUrl(path),
    inDefinedTermSet: absoluteUrl("/glossary"),
  };
}
