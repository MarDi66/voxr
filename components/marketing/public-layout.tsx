import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.14),transparent_26%),linear-gradient(180deg,#060816_0%,#0c1224_45%,#080b14_100%)]" />
      <div className="fixed inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
