import Link from "next/link";
import { ArrowRight, MessageSquareText, ShieldCheck, Waypoints } from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import { buildMetadata, breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Voxr Product Overview",
  description:
    "Explore the Voxr product: anonymous internal feedback, private workspaces, comments, reactions, and forms for modern teams.",
  path: "/product",
});

const faqItems = [
  {
    question: "What can employees share in Voxr?",
    answer:
      "Employees can share anonymous feedback, ideas, praise, concerns, comments, and structured form responses inside their workspace.",
  },
  {
    question: "Is Voxr a public community platform?",
    answer:
      "No. Voxr is designed for private internal use. Feedback is visible only to members of the same workspace.",
  },
  {
    question: "Why include both posts and forms?",
    answer:
      "Open-ended posts are useful when employees need speed and candor. Forms help when teams need more structure for recurring collection moments.",
  },
];

const productCapabilities = [
  {
    icon: MessageSquareText,
    title: "Anonymous feedback feed",
    body:
      "Capture day-to-day input in a living workspace feed instead of burying it in one-way submissions.",
  },
  {
    icon: Waypoints,
    title: "Comments, reactions, and follow-through",
    body:
      "Keep useful feedback visible enough for clarification, discussion, and action instead of letting it disappear into a backlog.",
  },
  {
    icon: ShieldCheck,
    title: "Private workspace model",
    body:
      "Scope feedback to the relevant workspace so the conversation stays contextual and safer for employees.",
  },
];

export default function ProductPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Product", href: "/product" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="space-y-6">
        <Breadcrumbs items={crumbs} />
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Product
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Voxr gives each team a private place for honest internal feedback.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              The product is designed around anonymous internal company feedback.
              Employees can share ideas, praise, concerns, and comments inside a
              workspace where the discussion stays relevant to the members who
              need it.
            </p>
          </div>
          <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Product summary
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Voxr is a SaaS for anonymous internal company feedback. It helps
              teams collect honest input without forcing employees into exposed
              internal channels.
            </p>
          </div>
        </section>
      </div>

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        {productCapabilities.map((item) => (
          <article
            key={item.title}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8"
          >
            <div className="inline-flex rounded-2xl bg-cyan-300/15 p-3 text-cyan-200">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight">
              {item.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              {item.body}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-10">
          <article className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              Built for the truth employees usually hold back
            </h2>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              Voxr is not a general social feed. It is designed for the internal
              feedback moments that are easy to suppress in visible channels:
              frustrations, ideas, concerns, process observations, and praise
              employees want to share without creating unnecessary exposure.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              One product for open feedback and structured collection
            </h2>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              Teams can use feedback posts for always-on employee voice and use
              forms when they need more structure. That makes Voxr practical for
              day-to-day input and deliberate collection campaigns without
              fragmenting the workflow.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              Better fit for modern teams and startups
            </h2>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              Voxr works well for teams that want a lightweight internal feedback
              loop instead of another heavy process. The workspace model keeps
              context intact while making honest communication easier to sustain.
            </p>
          </article>
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Continue exploring
          </p>
          <ul className="mt-5 space-y-4">
            <li>
              <Link href="/features" className="space-y-1">
                <span className="block text-sm font-medium">Features</span>
                <span className="block text-sm leading-6 text-muted-foreground">
                  See the capabilities that support private feedback workflows.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/anonymous-feedback-software"
                className="space-y-1"
              >
                <span className="block text-sm font-medium">
                  Anonymous feedback software
                </span>
                <span className="block text-sm leading-6 text-muted-foreground">
                  Match the product to the search intent behind the category.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/guides/how-to-collect-anonymous-employee-feedback"
                className="space-y-1"
              >
                <span className="block text-sm font-medium">
                  Collection guide
                </span>
                <span className="block text-sm leading-6 text-muted-foreground">
                  Learn how to roll out the channel responsibly.
                </span>
              </Link>
            </li>
          </ul>
        </aside>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            FAQ
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Common product questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqItems.map((faq) => (
            <details
              key={faq.question}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <summary className="cursor-pointer list-none text-lg font-medium">
                {faq.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          See whether Voxr fits your internal feedback model
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Use Voxr when your team needs honest employee feedback inside a private
          workspace instead of another exposed channel or static suggestion box.
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
            href="/features"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium"
          >
            Review features
          </Link>
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          webApplicationSchema(),
          faqSchema(faqItems),
        ]}
      />
    </main>
  );
}
