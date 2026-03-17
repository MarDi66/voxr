import { notFound } from "next/navigation";
import { ContentPage } from "@/components/marketing/content-page";
import { solutionPages } from "@/lib/site-content";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

export function generateStaticParams() {
  return solutionPages.map((page) => ({
    slug: page.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const page = solutionPages.find((entry) => entry.slug === slug);

    if (!page) {
      return {};
    }

    return buildMetadata({
      title: page.title,
      description: page.description,
      path: page.path,
    });
  });
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = solutionPages.find((entry) => entry.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <ContentPage
      page={page}
      schema={[breadcrumbSchema(page.breadcrumbs), faqSchema(page.faqs)]}
    />
  );
}
