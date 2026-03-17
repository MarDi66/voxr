import { notFound } from "next/navigation";
import { ContentPage } from "@/components/marketing/content-page";
import { glossaryPages } from "@/lib/site-content";
import { articleSchema, buildMetadata, breadcrumbSchema, definedTermSchema, faqSchema } from "@/lib/seo";

export function generateStaticParams() {
  return glossaryPages.map((page) => ({
    slug: page.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const page = glossaryPages.find((entry) => entry.slug === slug);

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

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = glossaryPages.find((entry) => entry.slug === slug);

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
        definedTermSchema({
          title: page.title,
          description: page.description,
          path: page.path,
        }),
        faqSchema(page.faqs),
      ]}
    />
  );
}
