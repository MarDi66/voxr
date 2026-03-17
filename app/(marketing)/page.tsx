import Link from "next/link";
import { ArrowRight, Lock, MessageSquareText, Shield, Sparkles, Users } from "lucide-react";
import { JsonLd } from "@/components/marketing/json-ld";
import { buildMetadata, faqSchema, organizationSchema, webApplicationSchema, websiteSchema } from "@/lib/seo";
import { homeCollections } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "Anonymous Internal Feedback Software for Modern Teams",
  description:
    "Voxr helps teams collect anonymous internal feedback, employee ideas, praise, concerns, and comments inside a private workspace.",
  path: "/",
});

const homeFaqs = [
  {
    question: "What is Voxr?",
    answer:
      "Voxr is a SaaS product for anonymous internal company feedback. Employees can share ideas, praise, concerns, and comments inside a private workspace.",
  },
  {
    question: "Who can see feedback in Voxr?",
    answer:
      "Feedback is visible only to members of the same workspace, which keeps the conversation private to the relevant internal team or company environment.",
  },
  {
    question: "Is Voxr just a suggestion box?",
    answer:
      "No. Voxr is broader than a suggestion box. It supports ongoing internal feedback, comments, reactions, and structured forms when teams need them.",
  },
];

const trustPoints = [
  {
    icon: Shield,
    title: "Psychological safety first",
    body:
      "Give employees a safer way to raise ideas, friction, and concerns before they become quiet frustration.",
  },
  {
    icon: Users,
    title: "Workspace-based visibility",
    body:
      "Keep feedback inside the team or company workspace that should see it, instead of scattering sensitive input across exposed channels.",
  },
  {
    icon: MessageSquareText,
    title: "From submission to discussion",
    body:
      "Move beyond dead-end forms with comments, reactions, and a feed that keeps useful internal feedback visible.",
  },
];

const contentSections = [
  {
    title: "Solution pages",
    items: homeCollections.solutions.slice(0, 4),
  },
  {
    title: "Guides",
    items: homeCollections.guides.slice(0, 4),
  },
  {
    title: "Templates and glossary",
    items: homeCollections.resources.slice(0, 6),
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center lg:py-24">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Anonymous internal feedback for modern teams
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
              Give employees a safer way to tell the truth at work.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              Voxr helps companies collect anonymous internal feedback, ideas,
              praise, concerns, and comments inside a private workspace built
              for honest team communication.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-medium text-slate-950 transition-transform hover:-translate-y-0.5"
            >
              Start with Voxr
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium"
            >
              See the product
            </Link>
          </div>
          <dl className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <dt className="text-sm text-muted-foreground">Primary use case</dt>
              <dd className="mt-2 text-base font-medium">
                Honest employee feedback without public exposure
              </dd>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <dt className="text-sm text-muted-foreground">Best for</dt>
              <dd className="mt-2 text-base font-medium">
                Startups, modern teams, HR, and operations leads
              </dd>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <dt className="text-sm text-muted-foreground">Channel types</dt>
              <dd className="mt-2 text-base font-medium">
                Feedback posts, comments, reactions, and forms
              </dd>
            </div>
          </dl>
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-2xl shadow-cyan-950/30">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-300/15 p-3 text-cyan-200">
                <Lock className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Plain English summary</p>
                <p className="font-medium">What Voxr does</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              Voxr gives each workspace a private place where employees can share
              anonymous internal feedback that stays visible to the people who
              need it, without turning every concern into a public thread.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="rounded-2xl border border-white/10 px-4 py-3">
                Collect anonymous ideas, praise, concerns, and comments.
              </li>
              <li className="rounded-2xl border border-white/10 px-4 py-3">
                Keep feedback scoped to a workspace instead of exposing it widely.
              </li>
              <li className="rounded-2xl border border-white/10 px-4 py-3">
                Support both open-ended feedback and structured forms.
              </li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-3">
          {trustPoints.map((point) => (
            <article
              key={point.title}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8"
            >
              <div className="inline-flex rounded-2xl bg-cyan-300/15 p-3 text-cyan-200">
                <point.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight">
                {point.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {point.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Why companies use Voxr
          </p>
          <h2 className="text-4xl font-semibold tracking-tight">
            More honest than exposed internal channels. More useful than a forgotten suggestion box.
          </h2>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
            Voxr is designed for the part of internal communication that often
            breaks down first: the moment an employee decides whether it feels
            safe enough to speak honestly. The product gives teams a lightweight
            feedback loop instead of another survey cadence or static form inbox.
          </p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Good fit for
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
            <li>Startup teams that want earlier feedback signals.</li>
            <li>HR and people teams building safer feedback channels.</li>
            <li>Operations leaders collecting internal process friction.</li>
            <li>Remote and hybrid teams where honesty gets filtered by visibility.</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6">
        {contentSections.map((section) => (
          <div key={section.title} className="space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                  Discoverability hub
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  {section.title}
                </h2>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition-transform hover:-translate-y-1"
                >
                  <h3 className="text-xl font-semibold tracking-tight">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
                    Read page
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              FAQ
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Questions teams ask before launching anonymous feedback
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              The product itself is private behind login, so the public site
              needs to explain the model clearly for both humans and search
              systems. These are the common questions that define fit.
            </p>
          </div>
          <div className="space-y-4">
            {homeFaqs.map((faq) => (
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Start here
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight">
            Build a feedback channel employees will actually trust enough to use.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Start with Voxr when your team needs anonymous internal feedback that
            is private, discussion-ready, and easier to turn into action.
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
              href="/solutions/anonymous-feedback-software"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium"
            >
              Explore solution pages
            </Link>
          </div>
        </div>
      </section>
      <JsonLd
        data={[
          organizationSchema(),
          websiteSchema(),
          webApplicationSchema(),
          faqSchema(homeFaqs),
        ]}
      />
    </main>
  );
}
