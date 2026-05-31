"use client";

import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, LogIn, ReceiptText } from "lucide-react";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PaymentHandoff() {
  const payment = useSearchParams().get("payment") ?? "";
  const paymentPath = `/billing/payment${payment ? `?payment=${encodeURIComponent(payment)}` : ""}`;
  const proofUrl = `${site.appUrl}/?next=${encodeURIComponent(paymentPath)}`;

  return <div className="glass-card rounded-ui p-7 sm:p-9"><ReceiptText className="h-10 w-10 text-brand-700" /><h1 className="mt-5 text-3xl font-black text-ink-900">Submit your payment proof in HMS</h1><p className="mt-3 text-sm leading-6 text-ink-600">Billing proof is protected inside the SaaS application. Sign in with the verified owner email, then provide your transaction reference or upload a JPG, PNG, or PDF receipt.</p><div className="mt-6 grid gap-3 text-sm font-bold text-ink-700"><p className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-700" /> Billing payment ID: {payment || "Use the ID from your signup email"}</p><p className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-700" /> Workspace remains pending until super-admin approval</p><p className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand-700" /> Approval automatically activates your workspace</p></div><a href={proofUrl} className={cn(buttonVariants({ className: "mt-7" }))}><LogIn className="h-4 w-4" /> Open HMS payment page <ArrowRight className="h-4 w-4" /></a></div>;
}
