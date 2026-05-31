"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { activeStudentLimit, type BillingPlan, type BillingQuote, firstBillingError, formatNpr, marketingBillingApi } from "@/lib/billing";
import { buttonVariants, Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const initialForm = {
  workspace_name: "",
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  capacity_mode: "standard",
  requested_max_blocks: "",
  requested_max_students_total: "",
};

export function SubscribeForm() {
  const searchParams = useSearchParams();
  const requestedPlan = searchParams.get("plan") ?? "";
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [plan, setPlan] = useState(requestedPlan);
  const [form, setForm] = useState(initialForm);
  const [baseQuote, setBaseQuote] = useState<BillingQuote>();
  const [quote, setQuote] = useState<BillingQuote>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const selectedPlan = useMemo(() => plans.find((item) => item.slug === plan), [plan, plans]);

  useEffect(() => {
    marketingBillingApi.plans()
      .then((items) => {
        setPlans(items);
        setPlan((current) => items.some((item) => item.slug === current) ? current : items[0]?.slug ?? "");
      })
      .catch((reason) => setError(firstBillingError(reason)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!plan) return;
    let ignore = false;

    marketingBillingApi.quote(plan)
      .then((value) => {
        if (ignore) return;
        setBaseQuote(value);
        setQuote(value);
      })
      .catch((reason) => setError(firstBillingError(reason)));

    return () => {
      ignore = true;
    };
  }, [plan]);

  const update = (key: keyof typeof initialForm, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const result = await marketingBillingApi.signup({
        ...form,
        plan,
      });
      const params = new URLSearchParams({ email: form.email });
      if (result.payment) params.set("payment", String(result.payment.id));
      if (result.quote) params.set("quote", String(result.quote.id));
      if (result.verification_token) params.set("token", result.verification_token);
      window.location.assign(`/subscribe/verify-email?${params}`);
    } catch (reason) {
      setError(firstBillingError(reason));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <CheckoutMessage><LoaderCircle className="h-5 w-5 animate-spin" /> Loading current plans...</CheckoutMessage>;
  if (plans.length === 0) {
    return (
      <div className="glass-card rounded-ui p-6 text-sm font-semibold text-ink-700">
        <Link href="/#pricing" className="inline-flex items-center gap-2 text-sm font-black text-brand-700"><ArrowLeft className="h-4 w-4" /> Back to plans</Link>
        <p className={cn("mt-5 rounded-ui border p-4", error ? "border-red-200 bg-red-50 text-red-700" : "border-brand-100 bg-brand-50 text-brand-900")}>
          {error || "Subscription plans are being configured. Please check back shortly to subscribe."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form onSubmit={submit} className="glass-card rounded-ui p-6 sm:p-8">
        <Link href="/#pricing" className="inline-flex items-center gap-2 text-sm font-black text-brand-700"><ArrowLeft className="h-4 w-4" /> Back to plans</Link>
        <h1 className="mt-5 text-3xl font-black text-ink-900">Create your HMS workspace</h1>
        <p className="mt-2 text-sm leading-6 text-ink-600">Choose a plan and verify the owner email. Your workspace activates after manual payment approval.</p>

        {error ? <p className="mt-5 rounded-ui border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <Field label="Workspace name"><Input required value={form.workspace_name} onChange={(event) => update("workspace_name", event.target.value)} placeholder="Sunrise Student Hostel" /></Field>
          <Field label="Owner name"><Input required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Workspace owner" /></Field>
          <Field label="Owner email"><Input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="owner@example.com" /></Field>
          <Field label="Plan">
            <select value={plan} onChange={(event) => setPlan(event.target.value)} className="focus-ring h-11 w-full rounded-ui border border-border bg-white px-3 text-sm text-ink-900 shadow-crisp">
              {plans.map((item) => <option key={item.id} value={item.slug}>{item.name} - {formatNpr(item.price_minor)} / {item.billing_cycle}</option>)}
            </select>
          </Field>
          <PasswordField id="workspace_password" label="Password" required value={form.password} onChange={(event) => update("password", event.target.value)} placeholder="At least 8 characters" autoComplete="new-password" />
          <PasswordField id="workspace_password_confirmation" label="Confirm password" required value={form.password_confirmation} onChange={(event) => update("password_confirmation", event.target.value)} placeholder="Repeat password" autoComplete="new-password" />
          <Field label="Capacity">
            <select value={form.capacity_mode} onChange={(event) => { update("capacity_mode", event.target.value); setQuote(baseQuote); }} className="focus-ring h-11 w-full rounded-ui border border-border bg-white px-3 text-sm text-ink-900 shadow-crisp">
              <option value="standard">Use standard plan limits</option>
              <option value="custom">Request custom capacity quote</option>
            </select>
          </Field>
          {form.capacity_mode === "custom" ? <>
            <Field label="Requested blocks"><Input required min="1" type="number" value={form.requested_max_blocks} onChange={(event) => update("requested_max_blocks", event.target.value)} /></Field>
            <Field label="Requested active students"><Input required min="1" type="number" value={form.requested_max_students_total} onChange={(event) => update("requested_max_students_total", event.target.value)} /></Field>
          </> : null}
        </div>
        <p className="mt-2 text-xs font-semibold text-ink-500">Use at least 8 characters with upper and lower case letters and a number.</p>

        <Button type="submit" className="mt-7 w-full" disabled={submitting || !plan}>
          {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
          Create pending workspace
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <aside className="h-fit rounded-ui border border-brand-100 bg-brand-50 p-6 shadow-crisp">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-700">Order summary</p>
        <h2 className="mt-3 text-xl font-black text-ink-900">{selectedPlan?.name ?? "Select a plan"}</h2>
        <div className="mt-5 grid gap-3 text-sm font-semibold text-ink-700">
          <Summary label="Plan price" value={quote ? formatNpr(quote.planPriceMinor) : "-"} />
          <Summary label="Amount due" value={quote ? formatNpr(quote.finalAmountMinor) : "-"} strong />
        </div>
        <div className="mt-6 grid gap-2 text-sm font-bold text-ink-700">
          <p className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-700" /> {selectedPlan?.max_blocks ?? "Unlimited"} workspace blocks</p>
          <p className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-700" /> {activeStudentLimit(selectedPlan) ?? "Unlimited"} active students total</p>
          <p className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-700" /> Manual approval in V1</p>
          {form.capacity_mode === "custom" ? <p className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-700" /> Final limits and price reviewed by sales</p> : null}
        </div>
      </aside>
    </div>
  );
}

export function CheckoutMessage({ children }: { children: React.ReactNode }) {
  return <div className="glass-card flex items-center gap-3 rounded-ui p-6 text-sm font-semibold text-ink-700">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="text-sm font-black text-ink-700">{label}<span className="mt-1 block">{children}</span></label>;
}

function PasswordField({ label, className, id, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false);
  const Icon = showPassword ? EyeOff : Eye;

  return (
    <div className="text-sm font-black text-ink-700">
      <label htmlFor={id}>{label}</label>
      <span className="relative mt-1 block">
        <Input id={id} {...props} type={showPassword ? "text" : "password"} className={cn("pr-11", className)} />
        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          className="focus-ring absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-ui text-ink-500 transition-colors hover:bg-brand-50 hover:text-brand-800"
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-controls={id}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </button>
      </span>
    </div>
  );
}

function Summary({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return <p className={cn("flex justify-between gap-3 border-b border-brand-100 pb-3", strong && "text-base font-black text-brand-900")}><span>{label}</span><span>{value}</span></p>;
}
