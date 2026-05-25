import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy structure for the HMS marketing website and inquiry system.",
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" body="HMS should document how inquiry data, contact details, operational requirements, analytics events, attachments, CRM records, and email notification metadata are collected, processed, retained, and deleted." />;
}

function LegalPage({ title, body }: { title: string; body: string }) {
  return (
    <main className="bg-[#F6F8FB] text-ink-900">
      <SiteHeader />
      <section className="container-grid min-h-[70svh] py-32">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-700">Legal</p>
        <h1 className="mt-4 text-4xl font-black">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-ink-600">{body}</p>
        <div className="mt-8 rounded-ui border border-border bg-white p-5 text-sm leading-6 text-ink-600 shadow-crisp">
          Replace this structure with counsel-approved terms before production launch. Include controller
          identity, subprocessors, retention, security controls, user rights, breach process, and contact path.
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
