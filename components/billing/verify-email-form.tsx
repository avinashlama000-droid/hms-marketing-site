"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, MailCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { firstBillingError, marketingBillingApi } from "@/lib/billing";
import { cn } from "@/lib/utils";

export function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [payment, setPayment] = useState("");
  const [quote, setQuote] = useState("");
  const [verified, setVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setEmail(searchParams.get("email") ?? "");
    setToken(searchParams.get("token") ?? "");
    setPayment(searchParams.get("payment") ?? "");
    setQuote(searchParams.get("quote") ?? "");
  }, [searchParams]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await marketingBillingApi.verifyEmail(email, token);
      setVerified(true);
    } catch (reason) {
      setError(firstBillingError(reason));
    } finally {
      setSubmitting(false);
    }
  };

  if (verified) {
    return <div className="glass-card rounded-ui p-7 sm:p-9"><CheckCircle2 className="h-10 w-10 text-green-600" /><h1 className="mt-5 text-3xl font-black text-ink-900">Owner email verified</h1><p className="mt-3 text-sm leading-6 text-ink-600">{quote ? "Your custom capacity request is waiting for review. We will email you when the approved quote is ready for payment proof." : "Your pending workspace is ready for payment proof. Sign in to the SaaS application with the owner account and submit your manual payment reference or receipt."}</p>{payment ? <Link href={`/subscribe/payment?payment=${encodeURIComponent(payment)}`} className={cn(buttonVariants({ className: "mt-6" }))}>Continue to payment <ArrowRight className="h-4 w-4" /></Link> : null}</div>;
  }

  return <form onSubmit={submit} className="glass-card rounded-ui p-7 sm:p-9"><MailCheck className="h-10 w-10 text-brand-700" /><h1 className="mt-5 text-3xl font-black text-ink-900">Verify the owner email</h1><p className="mt-3 text-sm leading-6 text-ink-600">We sent a verification link to the workspace owner. In local development the token is filled automatically.</p>{error ? <p className="mt-5 rounded-ui border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}<label className="mt-6 block text-sm font-black text-ink-700">Owner email<Input className="mt-1" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label className="mt-4 block text-sm font-black text-ink-700">Verification token<Input className="mt-1" required value={token} onChange={(event) => setToken(event.target.value)} placeholder="Paste token from the email link" /></label><Button type="submit" className="mt-6 w-full" disabled={submitting}>{submitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}Verify email</Button></form>;
}
