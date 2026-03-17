import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { FaqSection } from "@/components/marketing/faq-section";
import { JsonLd } from "@/components/marketing/json-ld";
import type { ContentPageRecord } from "@/lib/site-content";

export function ContentPage({
  page,
  schema,
}: {
  page: ContentPageRecord;
  schema: Array<Record<string, unknown>>;
}) {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="space-y-6">
          <Breadcrumbs items={page.breadcrumbs} />
          <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                {page.eyebrow}
              </p>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  {page.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                  {page.intro}
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {page.summaryPoints.map((point) => (
                  <li
                    key={point}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-muted-foreground"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Quick answer
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {page.definition}
              </p>
            </aside>
          </section>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article className="space-y-14">
            {page.comparison ? (
              <section className="space-y-5">
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold tracking-tight">
                    {page.comparison.title}
                  </h2>
                  {page.comparison.description ? (
                    <p className="max-w-3xl text-base leading-7 text-muted-foreground">
                      {page.comparison.description}
                    </p>
                  ) : null}
                </div>
                <div className="overflow-hidden rounded-[2rem] border border-white/10">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <caption className="sr-only">{page.comparison.title}</caption>
                    <thead className="bg-white/5">
                      <tr>
                        {page.comparison.headers.map((header) => (
                          <th key={header} className="px-5 py-4 font-medium text-foreground">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {page.comparison.rows.map((row) => (
                        <tr key={row[0]} className="border-t border-white/10 align-top">
                          {row.map((cell) => (
                            <td key={cell} className="px-5 py-4 leading-7 text-muted-foreground">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {page.sections.map((section) => (
              <section key={section.title} className="space-y-5">
                <div className="space-y-3">
                  <h2 className="text-3xl font-semibold tracking-tight">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-3xl text-base leading-7 text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-7 text-muted-foreground"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <FaqSection items={page.faqs} />

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                  Next step
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  {page.cta.title}
                </h2>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                  {page.cta.body}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href={page.cta.primary.href}
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 transition-transform hover:-translate-y-0.5"
                >
                  {page.cta.primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {page.cta.secondary ? (
                  <Link
                    href={page.cta.secondary.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium"
                  >
                    {page.cta.secondary.label}
                  </Link>
                ) : null}
              </div>
            </section>
          </article>

          <aside className="space-y-4 lg:pt-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Related pages
              </p>
              <ul className="mt-5 space-y-4">
                {page.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group block space-y-1">
                      <span className="text-sm font-medium transition-colors group-hover:text-cyan-300">
                        {link.label}
                      </span>
                      <span className="block text-sm leading-6 text-muted-foreground">
                        {link.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
      <JsonLd data={schema} />
    </main>
  );
}
