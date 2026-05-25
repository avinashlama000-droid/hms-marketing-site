import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Security",
  description: "Security posture structure for HMS.",
};

export default function SecurityPage() {
  return (
    <main className="bg-[#F6F8FB] text-ink-900">
      <SiteHeader />
      <section className="container-grid min-h-[70svh] py-32">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-700">Security</p>
        <h1 className="mt-4 text-4xl font-black">Security and Trust</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-ink-600">
          Publish role-based access, tenant scope, audit logging, attachment handling, backup,
          notification outbox, incident response, and data retention practices here.
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
