import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing-theme font-body min-h-screen bg-[#0C0B09] text-[#EAE6DF]">
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-gradient-to-r from-[#c45d3e] via-[#d4785e] to-[#4a7c59]" />
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
