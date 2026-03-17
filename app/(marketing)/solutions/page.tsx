import { HubPage } from "@/components/marketing/hub-page";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { solutionPages } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "Anonymous Employee Feedback Solutions",
  description:
    "Browse Voxr solution pages for anonymous feedback software, employee feedback platforms, internal feedback tools, and employee suggestion box software.",
  path: "/solutions",
});

export default function SolutionsHubPage() {
  return (
    <HubPage
      eyebrow="Solutions"
      title="High-intent solution pages for teams evaluating anonymous employee feedback software"
      description="Use these pages to understand where Voxr fits: anonymous feedback software, employee feedback platforms, internal feedback tools, and better alternatives to a passive suggestion box."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
      ]}
      items={solutionPages.map((page) => ({
        href: page.path,
        label: page.title,
        description: page.description,
      }))}
      cta={{
        title: "Evaluate whether Voxr matches your team’s feedback model",
        body: "Start with the solution page that best matches your current search intent, then move into the product and security pages when you are ready to assess fit.",
        primaryHref: "/product",
        primaryLabel: "See the product",
        secondaryHref: "/auth",
        secondaryLabel: "Create a workspace",
      }}
      schema={[
        breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
        ]),
      ]}
    />
  );
}
