"use client";

import { Building2, CalendarCheck, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { InquiryDialog } from "@/components/inquiry-dialog";
import { site } from "@/lib/site";

const nav = [
  ["Home", "#top"],
  ["About", "#product"],
  ["Features", "#modules"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frameId: number | null = null;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

      setScrollProgress(Math.min(Math.max(progress, 0), 100));
      frameId = null;
    };

    const scheduleUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateScrollProgress);
      }
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white/94 shadow-crisp backdrop-blur-xl">
      <div className="bg-brand-700 text-white">
        <div className="container-grid flex h-10 items-center justify-between gap-4 text-sm font-semibold xl:h-12 xl:text-base">
          <div className="flex items-center gap-5">
            <a href={`tel:${site.contactPhone}`} className="hidden items-center gap-2 hover:text-brand-100 sm:flex">
              <Phone className="h-4 w-4" />
              {site.contactPhone}
            </a>
            <a href={`mailto:${site.contactEmail}`} className="flex items-center gap-2 hover:text-brand-100">
              <Mail className="h-4 w-4" />
              {site.contactEmail}
            </a>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <a href={site.social.facebook} className="hover:text-brand-100">Facebook</a>
            <a href={site.social.instagram} className="hover:text-brand-100">Instagram</a>
            <a href={site.social.linkedin} className="hover:text-brand-100">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="container-grid flex h-20 items-center justify-between gap-4 xl:h-24">
        <a href="#top" className="focus-ring flex items-center gap-3 rounded-ui">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-700 text-white shadow-crisp xl:h-14 xl:w-14">
            <Building2 className="h-6 w-6 xl:h-7 xl:w-7" />
          </span>
          <span>
            <span className="block text-xl font-black tracking-tight text-brand-800 xl:text-2xl">{site.name}</span>
            <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-ink-500 xl:text-xs">
              Hostel Management System
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-brand-100 bg-brand-50/70 p-1 lg:flex" aria-label="Primary navigation">
          {nav.map(([label, href], index) => (
            <a
              key={href}
              href={href}
              className={`focus-ring rounded-full px-5 py-3 text-sm font-bold transition-colors xl:px-6 xl:py-3.5 xl:text-base ${
                index === 0 ? "bg-brand-700 text-white shadow-crisp" : "text-ink-700 hover:bg-white hover:text-brand-800"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={site.appUrl}
            className="focus-ring rounded-ui px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-white xl:px-4 xl:text-base"
          >
            Login
          </a>
          <InquiryDialog
            trigger={
              <Button type="button" size="sm" className="xl:h-11 xl:px-4 xl:text-sm">
                <CalendarCheck className="h-4 w-4 xl:h-5 xl:w-5" />
                Book Now
              </Button>
            }
          />
        </div>
        <button
          type="button"
          className="focus-ring grid h-10 w-10 place-items-center rounded-ui border border-border bg-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div aria-hidden="true" className="h-[3px] bg-brand-100/70">
        <div
          className="h-full origin-left bg-[linear-gradient(90deg,#91accc,#235999,#183e6b,#235999,#91accc)] bg-[length:220%_100%] shadow-[0_0_12px_rgba(35,89,153,0.45)] animate-loading-gradient-bar transition-transform duration-150 ease-out will-change-transform"
          style={{ transform: `scaleX(${Math.max(scrollProgress, 2) / 100})` }}
        />
      </div>
      {open ? (
        <div className="border-t border-border bg-white lg:hidden">
          <div className="container-grid grid gap-2 py-4">
            {nav.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-ui px-3 py-3 text-sm font-semibold text-ink-700"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <InquiryDialog
              trigger={
                <Button type="button" className="mt-2 w-full">
                  <CalendarCheck className="h-4 w-4" />
                  Book Now
                </Button>
              }
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
