import Link from "next/link";
import VoxrLogo from "@/components/common/logo";
import { Button } from "@/components/ui/button";

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
    <header className="sticky top-0 z-20 border-b border-white/10 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold tracking-tight"
          aria-label="Voxr homepage"
        >
          <VoxrLogo className="w-10" />
          <span className="text-lg">Voxr</span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
        >
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/auth"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </Link>
          <Link href="/auth">
            <Button>Start with Voxr</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
