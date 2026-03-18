import Link from "next/link";
import VoxrLogo from "@/components/common/logo";
import { ArrowRight, Menu } from "lucide-react";

const primaryLinks = [
  { href: "/product", label: "Product" },
  { href: "/features", label: "Features" },
  { href: "/security", label: "Security" },
  { href: "/solutions", label: "Solutions" },
  { href: "/guides", label: "Guides" },
  { href: "/resources", label: "Resources" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0.75 z-40 border-b border-[#2A2722] bg-[#0C0B09]/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Voxr homepage"
        >
          <VoxrLogo className="w-8" />
          <span className="font-display text-xl font-medium tracking-tight text-[#EAE6DF]">
            Voxr
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm text-[#8A857C] md:flex"
        >
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#EAE6DF]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/auth"
            className="text-sm text-[#8A857C] transition-colors hover:text-[#EAE6DF]"
          >
            Sign in
          </Link>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-lg bg-[#c45d3e] px-4 py-2 text-sm font-medium text-white shadow-sm shadow-[#c45d3e]/20 transition-all hover:-translate-y-px hover:shadow-md hover:shadow-[#c45d3e]/25"
          >
            Start with Voxr
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <details className="group relative ml-auto md:hidden">
          <summary className="flex list-none items-center gap-2 rounded-full border border-[#2A2722] bg-[#161310]/90 px-4 py-2 text-sm font-medium text-[#EAE6DF] shadow-[0_10px_35px_rgba(0,0,0,0.28)] transition-colors hover:border-[#4B433A] hover:bg-[#1D1915] [&::-webkit-details-marker]:hidden">
            <Menu className="h-4 w-4" />
            Menu
          </summary>

          <div className="absolute right-0 top-full mt-3 w-[min(18rem,calc(100vw-3rem))] overflow-hidden rounded-[1.5rem] border border-[#2A2722] bg-[linear-gradient(180deg,rgba(29,25,21,0.98),rgba(12,11,9,0.98))] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div >
              <div className="px-3 pb-2 pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8A857C]">
                Navigate
              </div>

              <nav aria-label="Mobile primary" className="flex flex-col">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-3 py-3 text-sm text-[#EAE6DF] transition-colors hover:bg-[#1B1713] hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-2 flex flex-col gap-2 border-t border-[#2A2722] px-2 pb-2 pt-3">
                <Link
                  href="/auth"
                  className="rounded-xl px-3 py-3 text-sm text-[#C4BEB5] transition-colors hover:bg-[#1B1713] hover:text-[#EAE6DF]"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c45d3e] px-4 py-3 text-sm font-medium text-white shadow-sm shadow-[#c45d3e]/20 transition-all hover:-translate-y-px hover:shadow-md hover:shadow-[#c45d3e]/25"
                >
                  Start with Voxr
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
