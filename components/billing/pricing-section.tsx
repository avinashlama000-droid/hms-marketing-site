"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MotionReveal } from "@/components/motion-reveal";
import { buttonVariants } from "@/components/ui/button";
import { activeStudentLimit, type BillingPlan, firstBillingError, formatNpr, marketingBillingApi } from "@/lib/billing";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  useEffect(() => {
    marketingBillingApi.plans()
      .then(setPlans)
      .catch((reason) => setError(firstBillingError(reason)))
      .finally(() => setLoading(false));
  }, []);

  const packages = useMemo(() => {
    const grouped = new Map<string, BillingPlan[]>();
    plans.forEach((plan) => {
      const key = plan.package_key ?? plan.slug;
      grouped.set(key, [...(grouped.get(key) ?? []), plan]);
    });

    return Array.from(grouped.values())
      .map((variants) => variants.find((plan) => plan.billing_cycle === billingCycle) ?? variants[0])
      .filter((plan): plan is BillingPlan => Boolean(plan));
  }, [billingCycle, plans]);

  return (
    <section id="pricing" className="scroll-mt-32 py-16 sm:py-20 xl:py-24">
      <div className="container-grid">
        <MotionReveal>
          <div className="mb-10 max-w-4xl xl:mb-12">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-700 xl:text-sm">Pricing</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-ink-900 sm:text-5xl xl:text-6xl">Choose a plan and start your workspace.</h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-ink-600 xl:text-lg xl:leading-8">
              Plans are managed by HMS super admins. Your workspace activates after owner email verification and manual payment approval.
            </p>
          </div>
        </MotionReveal>

        {error ? <p className="rounded-ui border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p> : null}
        {loading ? <p className="flex items-center gap-2 text-sm font-semibold text-ink-600"><LoaderCircle className="h-4 w-4 animate-spin" /> Loading current plans...</p> : null}
        {!loading && !error && plans.length === 0 ? <p className="rounded-ui border border-brand-100 bg-brand-50 p-4 text-sm font-semibold text-brand-900">Subscription plans are being configured. Please check back shortly to subscribe.</p> : null}

        <div className="mb-5 inline-flex rounded-ui border border-brand-100 bg-white p-1 shadow-crisp">
          {(["monthly", "yearly"] as const).map((cycle) => <button key={cycle} type="button" onClick={() => setBillingCycle(cycle)} className={cn("rounded px-4 py-2 text-sm font-black capitalize", billingCycle === cycle ? "bg-brand-700 text-white" : "text-ink-600")}>{cycle}</button>)}
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          {packages.map((plan) => {
            const highlighted = Boolean(plan.is_highlighted);
            return (
              <div key={plan.id} className={cn("rounded-ui border p-6", highlighted ? "border-white/20 bg-gradient-to-br from-brand-900 via-brand-700 to-signal-cyan text-white shadow-glow" : "glass-card text-ink-900")}>
                {highlighted ? <div className="mb-4 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-brand-800">Most popular</div> : null}
                <h3 className="text-2xl font-black">{plan.name}</h3>
                <p className={cn("mt-3 min-h-12 text-sm leading-6", highlighted ? "text-brand-50" : "text-ink-600")}>{plan.description}</p>
                <p className="mt-6 text-3xl font-black">{formatNpr(plan.price_minor)}</p>
                <p className={cn("mt-1 text-sm font-bold", highlighted ? "text-brand-50" : "text-ink-500")}>per {plan.billing_cycle === "monthly" ? "month" : "year"}</p>
                <div className="mt-6 grid gap-3">
                  <PlanFeature highlighted={highlighted}>{plan.max_blocks ?? "Unlimited"} blocks per workspace</PlanFeature>
                  <PlanFeature highlighted={highlighted}>{activeStudentLimit(plan) ?? "Unlimited"} active students total</PlanFeature>
                  {(plan.features_json ?? []).map((feature) => <PlanFeature key={feature} highlighted={highlighted}>{feature}</PlanFeature>)}
                </div>
                <Link href={`/subscribe?plan=${encodeURIComponent(plan.slug)}`} className={cn(buttonVariants({ variant: highlighted ? "secondary" : "primary", className: cn("mt-7 w-full", highlighted && "text-white hover:text-white") }))}>
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-ui border border-brand-100 bg-brand-50 p-4 text-sm text-brand-900">
          <p><b>Ready to start?</b> Subscribe and create your HMS workspace in minutes.</p>
          <Link href="/subscribe" className={cn(buttonVariants({ variant: "brand", size: "sm" }))}>Subscribe</Link>
        </div>
      </div>
    </section>
  );
}

function PlanFeature({ children, highlighted }: { children: React.ReactNode; highlighted: boolean }) {
  return <div className="flex items-start gap-2 text-sm font-bold"><CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", highlighted ? "text-white" : "text-brand-700")} />{children}</div>;
}
