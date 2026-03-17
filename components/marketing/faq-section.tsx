import { FAQItem } from "@/lib/site-content";

export function FaqSection({ items }: { items: FAQItem[] }) {
  return (
    <section aria-labelledby="faq-heading" className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          FAQ
        </p>
        <h2 id="faq-heading" className="text-3xl font-semibold tracking-tight">
          Common questions
        </h2>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <summary className="cursor-pointer list-none text-lg font-medium">
              {item.question}
            </summary>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
