import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  BellRing,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileBarChart,
  GitBranch,
  Headphones,
  Layers3,
  LockKeyhole,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WalletCards,
} from "lucide-react";
import type { ReactNode } from "react";
import { InquiryDialog } from "@/components/inquiry-dialog";
import { MotionReveal } from "@/components/motion-reveal";
import { ProductVisualization } from "@/components/product-visualization";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
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

const industries = [
  ["Boys hostels", "Resident-led operations"],
  ["Girls hostels", "Guardian confidence"],
  ["Colleges", "Campus accommodation"],
  ["Training centers", "Batch occupancy"],
  ["Staff housing", "Attendance and salary"],
  ["Multi-property groups", "Centralized control"],
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
      <ComparisonSection />
      <TrustSection />
      <PricingSection />
      <TestimonialsSection />
      <BookSection />
      <ContactSection />
      <FaqSection />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden border-b border-brand-100 bg-white pt-32 xl:pt-40">
      <ProductVisualization />
      <div className="container-grid relative z-10 flex min-h-[calc(92svh-8rem)] items-center py-12 xl:min-h-[calc(92svh-10rem)] xl:py-16">
        <div className="max-w-xl lg:max-w-[40rem] xl:max-w-[46rem] min-[1800px]:max-w-[50rem]">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-800 shadow-crisp xl:px-5 xl:py-3 xl:text-sm">
            <Sparkles className="h-4 w-4 xl:h-5 xl:w-5" />
            Easy and reliable hostel management software
          </div>
          <h1 className="mt-6 max-w-[25rem] text-2xl font-black leading-[1.02] tracking-tight text-ink-900 sm:text-3xl lg:max-w-[39rem] lg:text-5xl xl:max-w-[44rem] xl:text-6xl min-[1800px]:max-w-[50rem] min-[1800px]:text-[4.75rem]">
            Run admissions, rooms, dues, and residents from one calm system.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink-700 xl:max-w-2xl xl:text-xl xl:leading-9 min-[1800px]:text-2xl min-[1800px]:leading-10">
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
      </div>
    </section>
  );
}

function ProductGlimpse() {
  return (
    <section id="glimpse" className="scroll-mt-32 border-b border-border bg-white py-16 sm:py-20">
      <div className="container-grid">
        <MotionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-700">Product glimpse</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-ink-900 sm:text-5xl">
              Explore HMS across every daily operating view.
            </h2>
            <p className="mt-5 text-base leading-7 text-ink-600">
              The visual story follows the same shape buyers expect from premium SaaS: dashboard first, operations next, mobile-ready context always nearby.
            </p>
          </div>
        </MotionReveal>

        <div className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-2">
          {["Dashboard", "Admin desk", "Student portal"].map((label, index) => (
            <span
              key={label}
              className={cn(
                "rounded-full border px-5 py-3 text-sm font-black",
                index === 0 ? "border-brand-700 bg-brand-700 text-white" : "border-brand-100 bg-brand-50 text-brand-800",
              )}
            >
              {label}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.75fr] lg:items-stretch">
          <div className="rounded-ui border border-border bg-[#F6F8FB] p-4 shadow-lift">
            <div className="rounded-ui border border-border bg-white p-4">
              <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-700 text-white">
                    <Building2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-700">Operations dashboard</p>
                    <p className="text-lg font-black text-ink-900">Today across active blocks</p>
                  </div>
                </div>
                <span className="hidden rounded-full bg-brand-50 px-3 py-2 text-xs font-black text-brand-800 sm:inline-flex">
                  Live occupancy
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                <MiniMetric label="Residents" value="428" />
                <MiniMetric label="Available beds" value="72" />
                <MiniMetric label="Due balance" value="Rs 86k" />
                <MiniMetric label="Open SLAs" value="6" />
              </div>
              <div className="mt-4 overflow-hidden rounded-ui border border-border">
                {[
                  ["A-204", "2/4", "Available", "Rs 14,000", "Ready"],
                  ["B-112", "4/4", "Full", "Rs 0", "Clean"],
                  ["C-018", "1/2", "Hold", "Rs 7,500", "Follow-up"],
                  ["D-301", "0/3", "Maintenance", "Rs 0", "Blocked"],
                ].map((row) => (
                  <div key={row[0]} className="grid grid-cols-2 gap-2 border-b border-border bg-white px-4 py-3 text-sm font-bold last:border-b-0 md:grid-cols-5">
                    {row.map((cell, index) => (
                      <span key={cell} className={index === 0 ? "text-ink-900" : index === 4 ? "text-brand-700" : "text-ink-600"}>
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-ui border border-border bg-brand-700 p-5 text-white shadow-lift">
            <div className="mx-auto max-w-[280px] rounded-[28px] border border-white/20 bg-ink-900 p-3 shadow-lift">
              <div className="rounded-[22px] bg-white p-4 text-ink-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-brand-700">Student portal</p>
                    <h3 className="text-lg font-black">Profile</h3>
                  </div>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-brand-800">
                    <Users className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-4 rounded-ui bg-brand-700 p-4 text-white">
                  <p className="text-sm font-black">Bibisha Acharya</p>
                  <p className="mt-1 text-xs font-semibold text-brand-100">Room B-112, active resident</p>
                </div>
                <div className="mt-4 grid gap-2">
                  {["Dues clear", "Notice read", "Complaint routed", "Checkout synced"].map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-ui bg-brand-50 px-3 py-2 text-xs font-black text-brand-800">
                      {item}
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientProofSection() {
  return (
    <section className="border-b border-border bg-[#F6F8FB] py-14">
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
              <div key={client} className="rounded-ui border border-border bg-white px-3 py-4 text-center text-sm font-black text-ink-700 shadow-crisp">
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
            <div className="h-full rounded-ui border border-border bg-white p-5 shadow-crisp">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-700 text-sm font-black text-white">
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
    <Section id="modules" eyebrow="Features" title="Everything you need to run hostel operations smoothly." body="Each module is positioned as part of a connected operating model, not a disconnected feature list.">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {modules.map((module, index) => (
          <MotionReveal key={module.title} delay={(index % 4) * 0.04}>
            <div className="h-full rounded-ui border border-border bg-white p-5 shadow-crisp transition-transform hover:-translate-y-0.5 hover:shadow-lift">
              <div className="grid h-10 w-10 place-items-center rounded-ui bg-brand-50 text-brand-700 [&>svg]:h-5 [&>svg]:w-5">
                {module.icon}
              </div>
              <h3 className="mt-5 text-base font-black text-ink-900">{module.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-600">{module.body}</p>
            </div>
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}

function BenefitsSection() {
  return (
    <section className="border-y border-border bg-ink-900 py-16 text-white sm:py-20">
      <div className="container-grid grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <MotionReveal>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-200">Why it converts</p>
          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
            It sells control, not software screens.
          </h2>
          <p className="mt-5 text-base leading-7 text-ink-200">
            Hostel teams do not wake up wanting another dashboard. They want fewer missed dues,
            cleaner room decisions, faster complaint routing, and confidence that staff can answer
            operational questions without searching five places.
          </p>
        </MotionReveal>
        <div className="grid gap-3 sm:grid-cols-2">
          <Benefit icon={<ShieldCheck />} title="Trust through auditability" body="Every sensitive workflow is framed around status, ownership, permissions, history, and notifications." />
          <Benefit icon={<Route />} title="Less operational drift" body="Inquiries, students, rooms, dues, complaints, and salaries share the same operating context." />
          <Benefit icon={<FileBarChart />} title="Finance-ready reporting" body="Dues, supplier balances, payments, expenses, income, and payroll activity become easier to reconcile." />
          <Benefit icon={<LockKeyhole />} title="Enterprise posture" body="Role-based access, multi-tenant scope, attachment handling, and backend-ready integrations support growth." />
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
          <div key={title} className="rounded-ui border border-border bg-white p-6 shadow-crisp">
            <h3 className="text-xl font-black text-ink-900">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink-600">{body}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <p className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-brand-700">Industries served</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(([title, body]) => (
            <div key={title} className="flex items-center gap-3 rounded-ui border border-border bg-white p-4 shadow-crisp">
              <span className="grid h-10 w-10 place-items-center rounded-ui bg-brand-50 text-brand-700">
                <BriefcaseBusiness className="h-5 w-5" />
              </span>
              <div>
                <p className="font-black text-ink-900">{title}</p>
                <p className="text-sm font-semibold text-ink-500">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ComparisonSection() {
  const rows = [
    ["Admission follow-up", "Scattered calls and notes", "CRM-style inquiry status, source, priority, follow-up, and conversion"],
    ["Room decisions", "Manual availability checks", "Room status, policy, tariffs, allocation history, and maintenance context"],
    ["Payments", "Unclear dues and delayed reconciliation", "Student balances, monthly fees, histories, payment methods, and reports"],
    ["Complaints", "Lost in chat threads", "SLA, assignment, audit trail, attachments, and resident communication"],
    ["Staff work", "Attendance and salary disconnected", "Check-in/out rules, salary payments, deduction context, and notifications"],
  ];

  return (
    <Section eyebrow="Comparison" title="What changes when the hostel runs on a system." body="This section makes the buying decision concrete by contrasting familiar operational pain with the HMS operating model.">
      <div className="overflow-hidden rounded-ui border border-border bg-white shadow-crisp">
        <div className="hidden grid-cols-[0.8fr_1fr_1.2fr] border-b border-border bg-ink-900 px-4 py-3 text-sm font-black text-white md:grid">
          <span>Workflow</span>
          <span>Before HMS</span>
          <span>With HMS</span>
        </div>
        {rows.map(([workflowName, before, after]) => (
          <div key={workflowName} className="grid grid-cols-1 gap-2 border-b border-border px-4 py-4 text-sm last:border-b-0 md:grid-cols-[0.8fr_1fr_1.2fr]">
            <span className="font-black text-ink-900">{workflowName}</span>
            <span className="font-medium text-ink-500">{before}</span>
            <span className="font-semibold text-brand-800">{after}</span>
          </div>
        ))}
      </div>
    </Section>
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
          <div key={name as string} className={cn("rounded-ui border p-6 shadow-crisp", index === 1 ? "border-brand-700 bg-brand-700 text-white" : "border-border bg-white text-ink-900")}>
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
    <section className="border-y border-border bg-white py-16 sm:py-20">
      <div className="container-grid">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-700">Testimonials</p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-ink-900 sm:text-5xl">
            The promise is calm, accountable operations.
          </h2>
        </div>
        <div className="mt-10 grid gap-3 lg:grid-cols-3">
          {[
            ["Operations owner", "We finally see inquiries, room pressure, and payment risk together before it becomes a daily firefight."],
            ["Hostel warden", "The value is speed. When someone asks about a room, dues, or a complaint, the answer is already in context."],
            ["Finance lead", "Payments, salary, supplier balances, and student dues need discipline. HMS gives the team a shared ledger mindset."],
          ].map(([role, quote]) => (
            <blockquote key={role} className="rounded-ui border border-border bg-[#F6F8FB] p-6 shadow-crisp">
              <BadgeCheck className="h-6 w-6 text-brand-700" />
              <p className="mt-5 text-lg font-bold leading-7 text-ink-900">&quot;{quote}&quot;</p>
              <footer className="mt-5 text-sm font-black text-ink-500">{role}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookSection() {
  return (
    <section id="book" className="py-16 sm:py-20">
      <div className="container-grid overflow-hidden rounded-ui border border-border bg-white shadow-lift">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.82fr]">
          <div className="p-6 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-700">Book now</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-ink-900 sm:text-5xl">
              Start with a structured implementation inquiry.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-600">
              The inquiry flow is designed to become backend data: requirements, modules, priorities,
              timeline, budget, source, status, email notification, CRM assignment, and admin follow-up.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <InquiryDialog
                trigger={
                  <button type="button" className={cn(buttonVariants({ size: "lg" }))}>
                    Book Now
                    <ArrowRight className="h-5 w-5" />
                  </button>
                }
              />
              <a href={`mailto:${site.contactEmail}`} className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
                Contact Sales
              </a>
            </div>
          </div>
          <div className="border-t border-border bg-ink-900 p-6 text-white sm:p-10 lg:border-l lg:border-t-0">
            <p className="text-sm font-black text-brand-200">Inquiry architecture</p>
            <div className="mt-5 grid gap-3">
              {["Validate fields with Zod", "Forward to HMS inquiry API", "Create CRM status and priority", "Notify sales and admin users", "Track follow-ups and conversion"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-ui border border-white/10 bg-white/5 px-3 py-3 text-sm font-bold text-ink-100">
                  <CheckCircle2 className="h-4 w-4 text-brand-200" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <Section id="contact" eyebrow="Contact" title="Talk to the implementation desk." body="The contact section reinforces trust and gives high-intent buyers a direct path even if they are not ready to complete the full inquiry flow.">
      <div className="grid gap-3 lg:grid-cols-3">
        <ContactCard icon={<Phone />} title="Phone" body={site.contactPhone} href={`tel:${site.contactPhone}`} />
        <ContactCard icon={<Mail />} title="Email" body={site.contactEmail} href={`mailto:${site.contactEmail}`} />
        <ContactCard icon={<MapPin />} title="Location" body={site.address} href="#contact" />
      </div>
    </Section>
  );
}

function FaqSection() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Clear answers for serious buyers." body="Visitors should understand both the product value and the implementation path before they talk to sales.">
      <div className="grid gap-3">
        {faqs.map(([question, answer]) => (
          <details key={question} className="group rounded-ui border border-border bg-white p-5 shadow-crisp">
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
    <div className="rounded-ui border border-white/70 bg-white/86 p-3 shadow-crisp backdrop-blur xl:p-5">
      <p className="text-lg font-black text-ink-900 xl:text-2xl">{value}</p>
      <p className="mt-1 text-xs font-bold text-ink-500 xl:text-sm">{label}</p>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-ui border border-border bg-[#F6F8FB] p-3">
      <p className="text-2xl font-black text-ink-900">{value}</p>
      <p className="text-xs font-bold text-ink-500">{label}</p>
    </div>
  );
}

function Insight({ title, body }: { title: string; body: string }) {
  return (
    <MotionReveal>
      <div className="h-full rounded-ui border border-border bg-white p-6 shadow-crisp">
        <h3 className="text-xl font-black text-ink-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-ink-600">{body}</p>
      </div>
    </MotionReveal>
  );
}

function Benefit({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-ui border border-white/10 bg-white/5 p-5">
      <div className="grid h-10 w-10 place-items-center rounded-ui bg-brand-100 text-brand-800 [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-black">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-ink-200">{body}</p>
    </div>
  );
}

function TrustItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-ui border border-border bg-white p-5 shadow-crisp">
      <p className="text-xl font-black text-brand-800">{value}</p>
      <p className="mt-3 text-sm leading-6 text-ink-600">{label}</p>
    </div>
  );
}

function ContactCard({ icon, title, body, href }: { icon: ReactNode; title: string; body: string; href: string }) {
  return (
    <a href={href} className="rounded-ui border border-border bg-white p-6 shadow-crisp transition-transform hover:-translate-y-0.5 hover:shadow-lift">
      <span className="grid h-11 w-11 place-items-center rounded-ui bg-brand-50 text-brand-700 [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </span>
      <p className="mt-5 text-sm font-black uppercase tracking-[0.14em] text-ink-500">{title}</p>
      <p className="mt-2 text-xl font-black text-ink-900">{body}</p>
    </a>
  );
}
