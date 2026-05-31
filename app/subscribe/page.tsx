import { Suspense } from "react";
import { SubscribeForm, CheckoutMessage } from "@/components/billing/subscribe-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function SubscribePage() {
  return <main className="min-h-screen bg-[#F6F8FB] text-ink-900"><SiteHeader /><section className="container-grid pb-16 pt-36"><Suspense fallback={<CheckoutMessage>Loading checkout...</CheckoutMessage>}><SubscribeForm /></Suspense></section><SiteFooter /></main>;
}
