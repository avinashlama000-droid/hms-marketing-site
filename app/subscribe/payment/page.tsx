import { Suspense } from "react";
import { PaymentHandoff } from "@/components/billing/payment-handoff";
import { CheckoutMessage } from "@/components/billing/subscribe-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function SubscriptionPaymentPage() {
  return <main className="min-h-screen bg-[#F6F8FB] text-ink-900"><SiteHeader /><section className="container-grid mx-auto max-w-2xl pb-16 pt-36"><Suspense fallback={<CheckoutMessage>Loading payment handoff...</CheckoutMessage>}><PaymentHandoff /></Suspense></section><SiteFooter /></main>;
}
