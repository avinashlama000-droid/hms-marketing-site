import {
  ArrowRight,
  BedDouble,
  BellRing,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileBarChart,
  GitBranch,
  Headphones,
  Layers3,
  LockKeyhole,
  MessageSquare,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { FeatureScrollTimeline } from "@/components/feature-scroll-timeline";
import { InquiryDialog } from "@/components/inquiry-dialog";
import { MotionReveal } from "@/components/motion-reveal";
import { ScrollParallax } from "@/components/scroll-parallax";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HeroSystemPreview, SystemDashboardPreview } from "@/components/system-dashboard-preview";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const modules = [
  {
    icon: <CalendarCheck />,
    title: "Inquiry CRM",
    body: "Capture prospects, preferred seater type, block interest, follow-up dates, priority, source, attachments, and conversion status.",
  },
  {
    icon: <Users />,
    title: "Student lifecycle",
    body: "Create residents, manage documents, amenities, dues, refunds, notices, portal access, and financial history from one profile.",
  },
  {
    icon: <BedDouble />,
    title: "Rooms and blocks",
    body: "Track room codes, capacity, occupancy policy, tariffs, maintenance windows, allocations, histories, and hostel branches.",
  },
  {
    icon: <WalletCards />,
    title: "Payments and dues",
    body: "Keep monthly fees, payment histories, income types, multi-method collections, student dues, and balances consistent.",
  },
  {
    icon: <ClipboardCheck />,
    title: "Check-in/out rules",
    body: "Apply student and staff attendance rules, checkout deductions, fine logic, BS/AD dates, and audit-ready payroll handoffs.",
  },
  {
    icon: <MessageSquare />,
    title: "Complaints and notices",
    body: "Route complaints with assignments, SLA monitoring, chat, attachments, read states, internal notes, and resident notices.",
  },
  {
    icon: <CreditCard />,
    title: "Suppliers and expenses",
    body: "Control supplier ledgers, vouchers, reconciliations, aging, purchases, expenses, and category-level financial visibility.",
  },
  {
    icon: <BellRing />,
    title: "Email notifications",
    body: "Use templated operational emails for payments, notices, salary, check-in/out events, invitations, and password flows.",
  },
];

const workflow = [
  ["Contact support", "The visitor books a demo and submits requirements, current system, preferred modules, and implementation timeline."],
  ["Qualify inquiry", "Admins review source, priority, seater need, block interest, follow-up owner, notes, and sales status."],
  ["Convert resident", "A qualified inquiry becomes a student record with room allocation, fee plan, portal access, and notifications."],
  ["Operate daily", "Payments, dues, complaints, notices, attendance, suppliers, and reports stay connected after admission."],
];

const useCases = [
  ["Student hostels", "Admissions, room allocation, monthly dues, parent communication, notices, complaints, and resident portal workflows."],
  ["Multi-branch operators", "Scope by block, branch, campus, or hostel while keeping reporting, permissions, and finance controls centralized."],
  ["Staff accommodation", "Staff check-in/out, salary payment records, payroll deductions, financial balances, and operational messages."],
  ["Training campuses", "Batch-based occupancy, temporary allocation, supplier control, shared notices, and reporting for administrators."],
];

const clients = ["City Hostel", "Campus Stay", "Apex Residency", "Block 360", "Smart Warden", "Urban Hostel", "Edu Living", "Hostel Desk"];

const faqs = [
  ["Is this only for booking rooms?", "No. Booking and inquiries are the front door. HMS also manages residents, rooms, blocks, dues, payments, staff, complaints, suppliers, notices, email notifications, and reporting."],
  ["Can Book Now connect to the current backend?", "Yes. The marketing site includes a typed API route that can forward inquiries to an HMS backend endpoint with token-based authentication."],
  ["Does it support multi-role operations?", "Yes. The product architecture already includes admin, tenant admin, staff, and resident-facing flows with permission-aware modules."],
  ["Can the design system scale?", "Yes. The site uses typed content, reusable UI primitives, a strict spacing and color system, accessible controls, and CMS-ready section data."],
  ["What happens after an inquiry is submitted?", "The recommended pipeline is new, contacted, follow-up, qualified, converted, closed, or lost, matching the existing HMS inquiry model."],
];

export default function Home() {
  return (
    <main id="top" className="bg-[#F6F8FB] text-ink-900">
      <SiteHeader />
      <Hero />
      <ProductGlimpse />
      <ClientProofSection />
      <ProductSection />
      <WorkflowSection />
      <ModulesSection />
      <BenefitsSection />
      <UseCasesSection />
      <ProfitChannelSection />
      <TrustSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section className="futuristic-surface relative min-h-[92svh] overflow-hidden border-b border-white/70 pt-28 xl:pt-36">
      <div className="pointer-events-none absolute inset-0 dashboard-grid opacity-45" aria-hidden="true" />
      <div className="container-grid relative z-10 grid min-h-[calc(92svh-7rem)] items-center gap-10 py-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(420px,1.12fr)] xl:min-h-[calc(92svh-9rem)] xl:gap-14 xl:py-14">
        <div className="max-w-xl lg:max-w-[38rem] xl:max-w-[42rem] min-[1800px]:max-w-[46rem]">
          <div className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.525rem] font-black uppercase tracking-[0.16em] text-brand-800 xl:px-5 xl:py-3 xl:text-[0.6125rem]">
            <Sparkles className="h-3 w-3 xl:h-3.5 xl:w-3.5" />
            Easy and reliable hostel management software
          </div>
          <h1 className="mt-6 max-w-[25rem] text-[1.575rem] font-black leading-[1.02] tracking-tight text-ink-900 sm:max-w-[34rem] sm:text-[2.1rem] lg:max-w-[39rem] lg:text-[2.625rem] xl:max-w-[44rem] xl:text-[3.15rem] min-[1800px]:max-w-[50rem] min-[1800px]:text-[3.5rem]">
            Run admissions, rooms, dues, and residents from one calm system.
          </h1>
          <p className="mt-6 max-w-xl text-[0.7rem] leading-[1.225rem] text-ink-700 sm:text-[0.7875rem] sm:leading-[1.4rem] xl:max-w-2xl xl:text-sm xl:leading-[1.575rem]">
            HMS helps hostel owners, wardens, accountants, and staff replace scattered spreadsheets with a connected operating desk for every resident workflow.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row xl:mt-10">
            <InquiryDialog
              trigger={
                <button type="button" className={cn(buttonVariants({ size: "lg", className: "xl:h-14 xl:px-8 xl:text-lg" }))}>
                  Book Now
                  <ArrowRight className="h-5 w-5 xl:h-6 xl:w-6" />
                </button>
              }
            />
            <a href="#glimpse" className={cn(buttonVariants({ variant: "secondary", size: "lg", className: "xl:h-14 xl:px-8 xl:text-lg" }))}>
              Explore Product
            </a>
          </div>
          <div className="mt-8 grid max-w-xl gap-2 sm:grid-cols-3 xl:mt-10 xl:max-w-3xl xl:gap-3">
            <Proof label="Connected modules" value="18+" />
            <Proof label="Inquiry pipeline" value="CRM ready" />
            <Proof label="Portals" value="Admin / Staff / Student" />
          </div>
        </div>
        <HeroSystemPreview />
      </div>
    </section>
  );
}

function ProductGlimpse() {
  return (
    <section id="glimpse" className="scroll-mt-24 border-b border-white/70 bg-white pb-16 pt-24 sm:pb-20 sm:pt-28 xl:pb-24 xl:pt-32">
      <div className="container-grid">
        <MotionReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-700">Product glimpse</p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-ink-900 sm:text-4xl">
              Explore HMS across every daily operating view.
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink-600 sm:text-base">
              The visual story follows the same shape buyers expect from premium SaaS: dashboard first, operations next, mobile-ready context always nearby.
            </p>
          </div>
        </MotionReveal>

        <SystemDashboardPreview />
      </div>
    </section>
  );
}

function ClientProofSection() {
  return (
    <section className="border-b border-white/70 bg-[#F6F8FB] py-16 sm:py-20 xl:py-24">
      <div className="container-grid">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-700">Social proof</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-ink-900">
              Built for hostel teams that need answers quickly.
            </h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-4">
            {clients.map((client) => (
              <div key={client} className="rounded-ui border border-white/70 bg-white/78 px-3 py-4 text-center text-sm font-black text-ink-700 shadow-deep backdrop-blur">
                {client}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <Proof label="Go live with clean onboarding" value="Fast setup" />
          <Proof label="Admissions to operations" value="All-in-one" />
          <Proof label="Designed for Nepal-hostel workflows" value="Local fit" />
        </div>
      </div>
    </section>
  );
}

function ProductSection() {
  return (
    <Section id="product" eyebrow="About HMS" title="Hostel management that feels simple for every team." body="HMS is positioned as an operational command center because the product already connects lead capture, room allocation, resident finance, staff work, supplier activity, and communication into one workflow.">
      <div className="grid gap-3 lg:grid-cols-3">
        <Insight title="The user" body="Owners, wardens, accountants, front desk staff, and resident-facing teams who need one source of truth." />
        <Insight title="The pain" body="Room status lives in one place, dues in another, complaints in chat, and admissions in a spreadsheet." />
        <Insight title="The trigger" body="A parent asks about dues, a student checks out, a room goes under maintenance, and the team needs an answer now." />
      </div>
    </Section>
  );
}

function WorkflowSection() {
  return (
    <Section id="workflow" eyebrow="How it works" title="From inquiry to resident operations without handoff loss." body="The conversion story is simple: every booking request becomes structured data that can move through follow-up, conversion, room allocation, finance, and ongoing service.">
      <div className="grid gap-3 lg:grid-cols-4">
        {workflow.map(([title, body], index) => (
          <MotionReveal key={title} delay={index * 0.04}>
            <div className="glass-card h-full rounded-ui p-6">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#235999] to-[#1e4d87] text-sm font-black text-white shadow-[0_14px_30px_rgba(35,89,153,0.32)] ring-4 ring-brand-100/70">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-5 text-lg font-black text-ink-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-600">{body}</p>
            </div>
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}

function ModulesSection() {
  return (
    <FeatureScrollTimeline
      id="modules"
      eyebrow="Features"
      title="Everything you need to run hostel operations smoothly."
      body="Each module is positioned as part of a connected operating model, not a disconnected feature list."
    >
      {modules.map((module) => (
        <div key={module.title} className="group relative">
          <div className="mb-4 grid h-11 w-11 place-items-center rounded-ui bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-700 group-hover:text-white [&>svg]:h-5 [&>svg]:w-5">
            {module.icon}
          </div>
          <h3 className="text-xl font-black text-ink-900">{module.title}</h3>
          <p className="mt-3 text-sm leading-6 text-ink-600">{module.body}</p>
        </div>
      ))}
    </FeatureScrollTimeline>
  );
}

function BenefitsSection() {
  return (
    <section className="relative isolate overflow-hidden border-y border-border bg-ink-900 py-24 text-white sm:py-28 lg:py-32">
      <ScrollParallax speed={34} className="pointer-events-none absolute inset-0 z-0 transform-gpu will-change-transform" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.16] dashboard-grid" />
      </ScrollParallax>
      <ScrollParallax speed={-56} className="pointer-events-none absolute inset-x-0 top-16 z-0 h-48 transform-gpu will-change-transform" aria-hidden="true">
        <div className="finance-ledger-strip h-full border-y border-brand-200/10 bg-brand-500/10" />
      </ScrollParallax>
      <ScrollParallax speed={74} axis="x" className="pointer-events-none absolute inset-y-12 right-[8%] z-0 hidden w-px bg-brand-200/20 transform-gpu will-change-transform lg:block" aria-hidden="true">
        <span className="block h-full w-px" />
      </ScrollParallax>

      <div className="container-grid relative z-10 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 xl:gap-20">
        <ScrollParallax speed={-44} className="transform-gpu will-change-transform">
          <MotionReveal>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-200">Why it converts</p>
            <h2 className="mt-5 max-w-2xl text-3xl font-black leading-tight sm:text-5xl xl:text-6xl">
              It sells control, not software screens.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-ink-200 xl:text-lg xl:leading-9">
              Hostel teams do not wake up wanting another dashboard. They want fewer missed dues,
              cleaner room decisions, faster complaint routing, and confidence that staff can answer
              operational questions without searching five places.
            </p>
          </MotionReveal>
        </ScrollParallax>
        <div className="grid gap-4 sm:grid-cols-2">
          <ScrollParallax speed={42} className="transform-gpu will-change-transform">
            <MotionReveal delay={0.04}>
              <Benefit icon={<ShieldCheck />} title="Trust through auditability" body="Every sensitive workflow is framed around status, ownership, permissions, history, and notifications." />
            </MotionReveal>
          </ScrollParallax>
          <ScrollParallax speed={68} className="transform-gpu will-change-transform">
            <MotionReveal delay={0.08}>
              <Benefit icon={<Route />} title="Less operational drift" body="Inquiries, students, rooms, dues, complaints, and salaries share the same operating context." />
            </MotionReveal>
          </ScrollParallax>
          <ScrollParallax speed={56} className="transform-gpu will-change-transform">
            <MotionReveal delay={0.12}>
              <Benefit icon={<FileBarChart />} title="Finance-ready reporting" body="Dues, supplier balances, payments, expenses, income, and payroll activity become easier to reconcile." />
            </MotionReveal>
          </ScrollParallax>
          <ScrollParallax speed={88} className="transform-gpu will-change-transform">
            <MotionReveal delay={0.16}>
              <Benefit icon={<LockKeyhole />} title="Enterprise posture" body="Role-based access, multi-tenant scope, attachment handling, and backend-ready integrations support growth." />
            </MotionReveal>
          </ScrollParallax>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <Section id="use-cases" eyebrow="Use cases" title="Designed for teams with real resident operations." body="The message shifts by audience while keeping one product identity: clarity for operators, confidence for owners, and responsiveness for residents.">
      <div className="grid gap-3 md:grid-cols-2">
        {useCases.map(([title, body]) => (
          <div key={title} className="glass-card rounded-ui p-6">
            <h3 className="text-xl font-black text-ink-900">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink-600">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ProfitChannelSection() {
  return (
    <section className="border-y border-white/70 bg-white py-16 sm:py-20 xl:py-24">
      <div className="container-grid">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 xl:gap-20">
          <MotionReveal>
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black leading-tight text-ink-900 sm:text-5xl xl:text-6xl">
                Turn your thank you page into your newest profit channel
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-ink-600 sm:text-lg sm:leading-9">
                Deliver personalized, brand-aligned offers on the confirmation page
              </p>
              <a
                href="#pricing"
                className="mt-8 inline-flex items-center gap-2 text-base font-black text-ink-900 transition-colors hover:text-brand-700"
              >
                Learn More
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="relative">
              <Image
                src="/marketing/booking-success-laptop.png"
                alt="Tenant admin dashboard showing a booking successfully confirmation and personalized offer flow"
                width={1792}
                height={1024}
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="h-auto w-full"
                priority={false}
              />
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <Section eyebrow="Trust" title="Credibility comes from operational depth." body="Instead of relying on vague claims, the site exposes the product's real infrastructure: module boundaries, notification flows, audit paths, and conversion-ready inquiry management.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <TrustItem value="Tenant scoped" label="Built for organizations, blocks, branches, campuses, and hostels." />
        <TrustItem value="Permission aware" label="Admin, tenant admin, staff, and student flows map to actual duties." />
        <TrustItem value="Notification ready" label="Email templates and outbox concepts support operational automation." />
        <TrustItem value="Audit friendly" label="Follow-ups, attachments, statuses, owners, and histories are trackable." />
      </div>
    </Section>
  );
}

function PricingSection() {
  const plans = [
    ["Starter", "Small hostels moving away from manual tracking.", "Up to 50 beds", ["Inquiry CRM", "Students and rooms", "Dues and payment history", "Complaints and notices"]],
    ["Growth", "Hostels with finance, staff, and multi-block operations.", "50-250 beds", ["Everything in Starter", "Supplier and expenses", "Staff check-in/out", "Email notifications", "Reports"]],
    ["Enterprise", "Multi-branch operators that need controls and rollout support.", "Custom capacity", ["Everything in Growth", "Multi-tenant scope", "Migration support", "CRM and automation integrations", "Custom implementation"]],
  ];

  return (
    <Section id="pricing" eyebrow="Pricing" title="Flexible plans for every hostel size." body="Pricing is structured as inquiry-led because implementation depends on beds, locations, modules, migration, integrations, and automation depth.">
      <div className="grid gap-3 lg:grid-cols-3">
        {plans.map(([name, intro, capacity, features], index) => (
          <div key={name as string} className={cn("rounded-ui border p-6", index === 1 ? "border-white/20 bg-gradient-to-br from-brand-900 via-brand-700 to-signal-cyan text-white shadow-glow" : "glass-card text-ink-900")}>
            {index === 1 ? (
              <div className="mb-4 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-brand-800">
                Most popular
              </div>
            ) : null}
            <h3 className="text-2xl font-black">{name}</h3>
            <p className={cn("mt-3 text-sm leading-6", index === 1 ? "text-brand-50" : "text-ink-600")}>{intro}</p>
            <p className="mt-6 text-3xl font-black">{capacity}</p>
            <div className="mt-6 grid gap-3">
              {(features as string[]).map((feature) => (
                <div key={feature} className="flex items-start gap-2 text-sm font-bold">
                  <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", index === 1 ? "text-white" : "text-brand-700")} />
                  {feature}
                </div>
              ))}
            </div>
            <InquiryDialog
              trigger={
                <button type="button" className={cn(buttonVariants({ variant: index === 1 ? "secondary" : "primary", className: "mt-7 w-full" }))}>
                  Get Started
                </button>
              }
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

function TestimonialsSection() {
  return (
    <section className="overflow-hidden border-y border-border bg-white py-16 sm:py-20 xl:py-24">
      <div className="container-grid">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-700">Testimonials</p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-ink-900 sm:text-5xl">
            The promise is calm, accountable operations.
          </h2>
        </div>
        <div className="mt-10">
          <TestimonialsCarousel />
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Clear answers for serious buyers." body="Visitors should understand both the product value and the implementation path before they talk to sales.">
      <div className="grid gap-3">
        {faqs.map(([question, answer]) => (
          <details key={question} className="group rounded-ui border border-border bg-white p-6 shadow-crisp">
            <summary className="cursor-pointer list-none text-base font-black text-ink-900">
              <span className="inline-flex w-full items-center justify-between gap-4">
                {question}
                <ArrowRight className="h-4 w-4 shrink-0 text-brand-700 transition-transform group-open:rotate-90" />
              </span>
            </summary>
            <p className="mt-4 text-sm leading-6 text-ink-600">{answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  body,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 py-16 sm:py-20 xl:py-24">
      <div className="container-grid">
        <MotionReveal>
          <div className="mb-10 max-w-3xl xl:mb-12 xl:max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-700 xl:text-sm">{eyebrow}</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-ink-900 sm:text-5xl xl:text-6xl">{title}</h2>
            <p className="mt-5 text-base leading-7 text-ink-600 xl:max-w-3xl xl:text-lg xl:leading-8">{body}</p>
          </div>
        </MotionReveal>
        {children}
      </div>
    </section>
  );
}

function Proof({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card rounded-ui p-3 xl:p-5">
      <p className="text-lg font-black text-ink-900 xl:text-2xl">{value}</p>
      <p className="mt-1 text-xs font-bold text-ink-500 xl:text-sm">{label}</p>
    </div>
  );
}

function Insight({ title, body }: { title: string; body: string }) {
  return (
    <MotionReveal>
      <div className="glass-card h-full rounded-ui p-6">
        <h3 className="text-xl font-black text-ink-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-ink-600">{body}</p>
      </div>
    </MotionReveal>
  );
}

function Benefit({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="h-full rounded-ui border border-white/[0.12] bg-white/[0.075] p-6 shadow-crisp backdrop-blur transition-transform duration-300 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:bg-white/10">
      <div className="grid h-11 w-11 place-items-center rounded-ui bg-brand-100 text-brand-800 ring-1 ring-white/20 [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-black">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-ink-200">{body}</p>
    </div>
  );
}

function TrustItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-card rounded-ui p-6">
      <p className="text-xl font-black text-brand-800">{value}</p>
      <p className="mt-3 text-sm leading-6 text-ink-600">{label}</p>
    </div>
  );
}
