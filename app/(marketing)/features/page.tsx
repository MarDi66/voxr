import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Anonymous Feedback Platform Features",
  description:
    "See the Voxr features built for anonymous internal feedback: private workspaces, posts, comments, reactions, forms, and moderation-friendly workflows.",
  path: "/features",
});

const featureGroups = [
  {
    title: "Private workspace structure",
    points: [
      "Feedback stays visible only to members of the same workspace.",
      "Teams can keep internal discussion contextual instead of broadly exposed.",
      "Useful for startups, departments, and modern distributed teams.",
    ],
  },
  {
    title: "Anonymous feedback posts",
    points: [
      "Employees can share ideas, praise, concerns, and comments.",
      "The feed format keeps ongoing internal feedback easier to revisit.",
      "A better fit than one-off submissions when teams need recurring signals.",
    ],
  },
  {
    title: "Comments and reactions",
    points: [
      "Useful threads can gather context instead of stopping at submission.",
      "Teams can clarify, acknowledge, and discuss what matters.",
      "That improves follow-through without forcing employees into exposed channels.",
    ],
  },
  {
    title: "Forms for structured collection",
    points: [
      "Use forms when teams need more consistency than an open prompt.",
      "Helpful for targeted internal feedback campaigns or recurring check-ins.",
      "Keeps structured collection in the same product as everyday feedback.",
    ],
  },
];

export default function FeaturesPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="space-y-6">
        <Breadcrumbs items={crumbs} />
        <section className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Features
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Product features built for honest internal feedback, not just collection.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
            Voxr combines private workspaces, anonymous feedback posts, comments,
            reactions, and forms so teams can run a lighter feedback loop without
            splitting the workflow across multiple tools.
          </p>
        </section>
      </div>

      <section className="mt-14 grid gap-5 lg:grid-cols-2">
        {featureGroups.map((group) => (
          <article
            key={group.title}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8"
          >
            <h2 className="text-2xl font-semibold tracking-tight">{group.title}</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
              {group.points.map((point) => (
                <li key={point} className="rounded-2xl border border-white/10 px-4 py-3">
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-10">
          <article className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              Lightweight enough for day-to-day use
            </h2>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              Features matter most when employees and managers will actually use
              them repeatedly. Voxr is designed to keep the workflow simple enough
              for frequent use while still giving teams structure when they need it.
            </p>
          </article>
          <article className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              A better fit than disconnected forms and exposed chat channels
            </h2>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              The feature set is aimed at one practical outcome: more useful
              employee honesty with less friction. That means a private place to
              speak, enough context to understand the issue, and a clear path to
              follow-up.
            </p>
          </article>
        </div>
        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Related pages
          </p>
          <ul className="mt-5 space-y-4">
            <li>
              <Link href="/product" className="space-y-1">
                <span className="block text-sm font-medium">Product overview</span>
                <span className="block text-sm leading-6 text-muted-foreground">
                  See how the features fit the overall product model.
                </span>
              </Link>
            </li>
            <li>
              <Link href="/security" className="space-y-1">
                <span className="block text-sm font-medium">Security and privacy</span>
                <span className="block text-sm leading-6 text-muted-foreground">
                  Review how the product is described for safer internal use.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/internal-feedback-tool"
                className="space-y-1"
              >
                <span className="block text-sm font-medium">
                  Internal feedback tool
                </span>
                <span className="block text-sm leading-6 text-muted-foreground">
                  Connect the features to a higher-intent solution page.
                </span>
              </Link>
            </li>
          </ul>
        </aside>
      </section>

      <section className="mt-14 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          Put these features into a feedback workflow that feels safe enough to use
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Create a Voxr workspace when you want private internal feedback, useful
          discussion, and structured collection in the same product.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-medium text-slate-950"
          >
            Start with Voxr
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/guides/internal-feedback-best-practices"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium"
          >
            Read best practices
          </Link>
        </div>
      </section>

      <JsonLd data={[breadcrumbSchema(crumbs)]} />
    </main>
  );
}
