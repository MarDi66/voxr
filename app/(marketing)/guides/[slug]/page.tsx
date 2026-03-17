import { notFound } from "next/navigation";
import { ContentPage } from "@/components/marketing/content-page";
import { guidePages } from "@/lib/site-content";
import { articleSchema, buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

export function generateStaticParams() {
  return guidePages.map((page) => ({
    slug: page.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const page = guidePages.find((entry) => entry.slug === slug);

    if (!page) {
      return {};
    }

    return buildMetadata({
      title: page.title,
      description: page.description,
      path: page.path,
      type: "article",
    });
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = guidePages.find((entry) => entry.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <ContentPage
      page={page}
      schema={[
        breadcrumbSchema(page.breadcrumbs),
        articleSchema({
          title: page.title,
          description: page.description,
          path: page.path,
          publishedTime: page.publishedTime,
        }),
        faqSchema(page.faqs),
      ]}
    />
  );
}
