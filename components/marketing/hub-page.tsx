import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import type { RelatedLink } from "@/lib/site-content";

type HubPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  crumbs: Array<{ label: string; href: string }>;
  items: RelatedLink[];
  cta: {
    title: string;
    body: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref?: string;
    secondaryLabel?: string;
  };
  schema: Array<Record<string, unknown>>;
};

export function HubPage({
  eyebrow,
  title,
  description,
  crumbs,
  items,
  cta,
  schema,
}: HubPageProps) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="space-y-6">
        <Breadcrumbs items={crumbs} />
        <section className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        </section>
      </div>

      <section className="mt-14 grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-7 transition-transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold tracking-tight">{item.label}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {item.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
              Open page
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </section>

      <section className="mt-14 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8">
        <h2 className="text-3xl font-semibold tracking-tight">{cta.title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          {cta.body}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href={cta.primaryHref}
            className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-medium text-slate-950"
          >
            {cta.primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          {cta.secondaryHref && cta.secondaryLabel ? (
            <Link
              href={cta.secondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium"
            >
              {cta.secondaryLabel}
            </Link>
          ) : null}
        </div>
      </section>

      <JsonLd data={schema} />
    </main>
  );
}
