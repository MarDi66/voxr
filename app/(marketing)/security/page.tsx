import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Security and Privacy for Anonymous Internal Feedback",
  description:
    "Review how Voxr describes security and privacy for anonymous internal feedback, including private workspace visibility and careful product positioning.",
  path: "/security",
});

const securityPrinciples = [
  {
    title: "Private by product model",
    body:
      "Voxr is built for internal company use. Feedback is visible only to members of the same workspace rather than being published publicly.",
  },
  {
    title: "Clearer trust boundaries",
    body:
      "The public site describes the product plainly so teams can understand what the private workspace model is designed to do without inflated claims.",
  },
  {
    title: "Useful for sensitive internal communication",
    body:
      "The goal is to make honest employee feedback easier to share while keeping the conversation scoped to the relevant internal group.",
  },
];

export default function SecurityPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Security", href: "/security" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="space-y-6">
        <Breadcrumbs items={crumbs} />
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Security and privacy
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
              A security and privacy page that matches the actual product model.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              Voxr is a private SaaS for anonymous internal company feedback. The
              product is positioned around safer internal communication inside
              workspaces, and this page is intentionally careful not to invent
              guarantees the product does not claim.
            </p>
          </div>
          <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              What this page is for
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Help evaluators understand the trust boundaries of the product:
              private workspace visibility, anonymous internal feedback, and a
              product description that stays grounded in what is actually known.
            </p>
          </div>
        </section>
      </div>

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        {securityPrinciples.map((item) => (
          <article
            key={item.title}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8"
          >
            <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              {item.body}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-10">
          <article className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              Private workspace visibility
            </h2>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              Voxr is designed so employees inside a workspace can share
              anonymous feedback, ideas, praise, concerns, and comments visible
              only to members of that same workspace. That is the core public
              trust boundary the site can explain clearly.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              Honest positioning instead of inflated security copy
            </h2>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              This implementation avoids unverifiable claims, fake compliance
              language, or invented assurances. Teams reviewing the product should
              be able to understand the model quickly without marketing noise.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              A practical next step for evaluators
            </h2>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              If the trust model fits your team, the next evaluation step is to
              review the product and feature pages and decide how you want to run
              feedback ownership, moderation, and follow-through internally.
            </p>
          </article>
        </div>
        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Recommended reading
          </p>
          <ul className="mt-5 space-y-4">
            <li>
              <Link href="/product" className="space-y-1">
                <span className="block text-sm font-medium">Product overview</span>
                <span className="block text-sm leading-6 text-muted-foreground">
                  Understand how the workspace model works at a high level.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/guides/workplace-trust-feedback-guide"
                className="space-y-1"
              >
                <span className="block text-sm font-medium">
                  Workplace trust guide
                </span>
                <span className="block text-sm leading-6 text-muted-foreground">
                  See why trust matters as much as software in feedback systems.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/resources/anonymous-feedback-policy-template"
                className="space-y-1"
              >
                <span className="block text-sm font-medium">
                  Policy template
                </span>
                <span className="block text-sm leading-6 text-muted-foreground">
                  Write clear expectations around visibility and response.
                </span>
              </Link>
            </li>
          </ul>
        </aside>
      </section>

      <section className="mt-14 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          Evaluate Voxr with the real trust boundaries in view
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Use Voxr when your team wants a private channel for anonymous internal
          feedback and a public-facing product explanation that stays grounded in
          what the software is actually designed to do.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-medium text-slate-950"
          >
            Create a workspace
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium"
          >
            See the product
          </Link>
        </div>
      </section>

      <JsonLd data={[breadcrumbSchema(crumbs)]} />
    </main>
  );
}
