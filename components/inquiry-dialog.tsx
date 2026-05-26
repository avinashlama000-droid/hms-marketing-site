"use client";

import { Check, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { cloneElement, isValidElement, type MouseEvent, type ReactElement, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  inquirySchema,
  moduleOptions,
  priorityOptions,
  type InquiryPayload,
} from "@/lib/inquiry-schema";
import { cn } from "@/lib/utils";

const steps = ["Contact", "Operation", "Rollout"];

const defaults: Partial<InquiryPayload> = {
  propertyType: "student-hostel",
  priorities: ["Dues and payment discipline"],
  modules: ["Students", "Rooms and blocks", "Payments and dues"],
  consent: true,
};

type TriggerElement = ReactElement<{ onClick?: (event: MouseEvent<HTMLElement>) => void }>;

export function InquiryDialog({ trigger }: { trigger: TriggerElement }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Partial<InquiryPayload>>(defaults);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  const triggerWithHandler = isValidElement(trigger)
    ? cloneElement(trigger, {
        onClick: (event: MouseEvent<HTMLElement>) => {
          trigger.props.onClick?.(event);
          setOpen(true);
        },
      })
    : trigger;

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function update<K extends keyof InquiryPayload>(key: K, value: InquiryPayload[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function toggleArray(key: "priorities" | "modules", value: string) {
    const current = new Set(form[key] || []);
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    update(key, Array.from(current));
  }

  function validateCurrentStep() {
    const fieldsByStep = [
      ["organizationName", "contactName", "email", "phone", "role"],
      ["propertyType", "beds", "locations", "priorities", "modules"],
      ["timeline", "budget", "consent"],
    ];

    const result = inquirySchema.safeParse({
      ...defaults,
      ...form,
    });

    if (result.success) {
      setErrors({});
      return true;
    }

    const allowed = new Set(fieldsByStep[step]);
    const stepErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      if (allowed.has(key)) {
        stepErrors[key] = issue.message;
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }

  async function submit() {
    const result = inquirySchema.safeParse({ ...defaults, ...form });
    if (!result.success) {
      setErrors(flattenErrors(result.error));
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        throw new Error("Unable to submit inquiry");
      }

      setDone(true);
    } catch {
      setErrors({ form: "We could not submit this right now. Please email the HMS team directly." });
    } finally {
      setSubmitting(false);
    }
  }

  const dialog =
    open && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[100] grid place-items-end bg-ink-900/45 p-0 backdrop-blur-sm sm:place-items-center sm:p-5">
            <div
              className="max-h-[92svh] w-full overflow-y-auto rounded-t-ui bg-[#F6F8FB] shadow-lift sm:max-w-3xl sm:rounded-ui"
              role="dialog"
              aria-modal="true"
              aria-labelledby="inquiry-title"
            >
              <div className="sticky top-0 z-10 border-b border-border bg-[#F6F8FB]/95 px-5 py-4 backdrop-blur">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">Book implementation call</p>
                    <h2 id="inquiry-title" className="mt-1 text-xl font-black text-ink-900">
                      Tell us how your hostel operates
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="focus-ring grid h-9 w-9 place-items-center rounded-ui border border-border bg-white"
                    onClick={() => setOpen(false)}
                    aria-label="Close inquiry form"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full bg-brand-700 transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="px-5 py-5">
                {done ? (
                  <div className="py-10 text-center">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-ui bg-brand-100 text-brand-800">
                      <Check className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-2xl font-black text-ink-900">Inquiry received</h3>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-600">
                      Your request is ready for the HMS inquiry pipeline. The team can route it into CRM,
                      email notifications, admin assignment, and follow-up tracking.
                    </p>
                    <Button type="button" className="mt-6" onClick={() => setOpen(false)}>
                      Close
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-5 grid grid-cols-3 gap-2">
                      {steps.map((label, index) => (
                        <div
                          key={label}
                          className={cn(
                            "rounded-ui border px-3 py-2 text-xs font-bold",
                            index === step
                              ? "border-brand-700 bg-brand-50 text-brand-800"
                              : "border-border bg-white text-ink-500",
                          )}
                        >
                          {label}
                        </div>
                      ))}
                    </div>

                    {errors.form ? (
                      <div className="mb-4 rounded-ui border border-signal-coral/30 bg-white px-3 py-2 text-sm font-semibold text-signal-coral">
                        {errors.form}
                      </div>
                    ) : null}

                  {step === 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Organization" error={errors.organizationName}>
                        <Input value={form.organizationName || ""} onChange={(event) => update("organizationName", event.target.value)} />
                      </Field>
                      <Field label="Your name" error={errors.contactName}>
                        <Input value={form.contactName || ""} onChange={(event) => update("contactName", event.target.value)} />
                      </Field>
                      <Field label="Email" error={errors.email}>
                        <Input type="email" value={form.email || ""} onChange={(event) => update("email", event.target.value)} />
                      </Field>
                      <Field label="Phone" error={errors.phone}>
                        <Input value={form.phone || ""} onChange={(event) => update("phone", event.target.value)} />
                      </Field>
                      <Field label="Role" error={errors.role}>
                        <Input placeholder="Owner, warden, operations lead" value={form.role || ""} onChange={(event) => update("role", event.target.value)} />
                      </Field>
                      <Field label="Current system">
                        <Input placeholder="Sheets, paper, existing software" value={form.currentSystem || ""} onChange={(event) => update("currentSystem", event.target.value)} />
                      </Field>
                    </div>
                  ) : null}

                  {step === 1 ? (
                    <div className="grid gap-5">
                      <div className="grid gap-4 sm:grid-cols-3">
                        <Field label="Property type" error={errors.propertyType}>
                          <Select value={form.propertyType || "student-hostel"} onChange={(event) => update("propertyType", event.target.value as InquiryPayload["propertyType"])}>
                            <option value="student-hostel">Student hostel</option>
                            <option value="staff-hostel">Staff hostel</option>
                            <option value="co-living">Co-living</option>
                            <option value="training-campus">Training campus</option>
                            <option value="multi-branch">Multi-branch</option>
                          </Select>
                        </Field>
                        <Field label="Beds" error={errors.beds}>
                          <Select value={form.beds || ""} onChange={(event) => update("beds", event.target.value)}>
                            <option value="">Select</option>
                            <option>Under 50</option>
                            <option>50-150</option>
                            <option>151-500</option>
                            <option>500+</option>
                          </Select>
                        </Field>
                        <Field label="Locations" error={errors.locations}>
                          <Select value={form.locations || ""} onChange={(event) => update("locations", event.target.value)}>
                            <option value="">Select</option>
                            <option>1 location</option>
                            <option>2-5 locations</option>
                            <option>6+ locations</option>
                          </Select>
                        </Field>
                      </div>
                      <Checklist title="Operational priorities" options={priorityOptions} selected={form.priorities || []} onToggle={(value) => toggleArray("priorities", value)} error={errors.priorities} />
                      <Checklist title="Modules to evaluate" options={moduleOptions} selected={form.modules || []} onToggle={(value) => toggleArray("modules", value)} error={errors.modules} />
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="grid gap-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Timeline" error={errors.timeline}>
                          <Select value={form.timeline || ""} onChange={(event) => update("timeline", event.target.value)}>
                            <option value="">Select</option>
                            <option>Immediately</option>
                            <option>Within 30 days</option>
                            <option>1-3 months</option>
                            <option>Planning phase</option>
                          </Select>
                        </Field>
                        <Field label="Monthly budget" error={errors.budget}>
                          <Select value={form.budget || ""} onChange={(event) => update("budget", event.target.value)}>
                            <option value="">Select</option>
                            <option>Need guidance</option>
                            <option>Starter</option>
                            <option>Growth</option>
                            <option>Enterprise</option>
                          </Select>
                        </Field>
                      </div>
                      <Field label="Notes">
                        <Textarea value={form.message || ""} onChange={(event) => update("message", event.target.value)} placeholder="Current pain points, existing data, branches, approval process, or migration needs." />
                      </Field>
                      <label className="flex gap-3 rounded-ui border border-border bg-white p-3 text-sm font-medium text-ink-700">
                        <input
                          type="checkbox"
                          checked={form.consent === true}
                          onChange={(event) => update("consent", event.target.checked as true)}
                          className="mt-1 h-4 w-4 accent-brand-700"
                        />
                        <span>I agree to be contacted about HMS implementation, pricing, and product fit.</span>
                      </label>
                      {errors.consent ? <p className="text-xs font-semibold text-signal-coral">{errors.consent}</p> : null}
                    </div>
                  ) : null}

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <Button type="button" variant="secondary" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </Button>
                    {step < steps.length - 1 ? (
                      <Button
                        type="button"
                        variant="brand"
                        onClick={() => {
                          if (validateCurrentStep()) setStep((value) => value + 1);
                        }}
                      >
                        Continue
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button type="button" onClick={submit} disabled={submitting}>
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        Submit inquiry
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>,
          document.body,
        )
      : null;

  return (
    <div className="contents">
      {triggerWithHandler}
      {dialog}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactElement }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink-800">
      {label}
      {children}
      {error ? <span className="text-xs font-semibold text-signal-coral">{error}</span> : null}
    </label>
  );
}

function Checklist({
  title,
  options,
  selected,
  onToggle,
  error,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-black text-ink-900">{title}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={cn(
                "focus-ring flex min-h-11 items-center justify-between gap-2 rounded-ui border px-3 py-2 text-left text-sm font-semibold",
                active ? "border-brand-700 bg-brand-50 text-brand-900" : "border-border bg-white text-ink-700",
              )}
            >
              {option}
              {active ? <Check className="h-4 w-4 text-brand-700" /> : null}
            </button>
          );
        })}
      </div>
      {error ? <p className="mt-2 text-xs font-semibold text-signal-coral">{error}</p> : null}
    </div>
  );
}

function flattenErrors(error: z.ZodError) {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    result[String(issue.path[0])] = issue.message;
  }
  return result;
}
