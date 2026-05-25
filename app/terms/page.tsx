import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms structure for the HMS marketing website.",
};

export default function TermsPage() {
  return (
    <main className="bg-[#F6F8FB] text-ink-900">
      <SiteHeader />
      <section className="container-grid min-h-[70svh] py-32">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-700">Legal</p>
        <h1 className="mt-4 text-4xl font-black">Terms of Service</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-ink-600">
          Define evaluation, implementation, subscription, acceptable use, data ownership, payment,
          service availability, support, limitation of liability, and termination terms before launch.
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
