"use client";

import { Building2, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const nav = [
  ["Home", "/#top"],
  ["About", "/#product"],
  ["Features", "/#modules"],
  ["Pricing", "/#pricing"],
  ["FAQ", "/#faq"],
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
    <header className="fixed inset-x-0 top-0 z-40 border-b border-brand-100 bg-white shadow-crisp">
      <div className="bg-brand-800 text-white">
        <div className="container-grid flex h-8 items-center justify-between gap-4 text-xs font-semibold xl:h-9 xl:text-sm">
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
      <div className="container-grid flex h-16 items-center justify-between gap-4 xl:h-[72px]">
        <a href="/#top" className="focus-ring flex items-center gap-3 rounded-ui">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-700 text-white shadow-crisp xl:h-11 xl:w-11">
            <Building2 className="h-5 w-5 xl:h-6 xl:w-6" />
          </span>
          <span>
            <span className="block text-lg font-black tracking-tight text-brand-800 xl:text-xl">{site.name}</span>
            <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-ink-500 xl:text-xs">
              Hostel Management System
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-brand-100 bg-white p-1 shadow-crisp lg:flex" aria-label="Primary navigation">
          {nav.map(([label, href], index) => (
            <a
              key={href}
              href={href}
              className={`focus-ring rounded-full px-4 py-2.5 text-sm font-bold transition-colors xl:px-5 xl:py-3 xl:text-sm ${
                index === 0 ? "bg-brand-700 text-white shadow-crisp" : "text-ink-700 hover:bg-brand-50 hover:text-brand-800"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={site.appUrl}
            className="focus-ring rounded-ui px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-brand-50 hover:shadow-crisp xl:px-4"
          >
            Login
          </a>
          <a
            href="/subscribe"
            className="focus-ring rounded-ui border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-100 xl:px-4"
          >
            Subscribe
          </a>
        </div>
        <button
          type="button"
          className="focus-ring grid h-10 w-10 place-items-center rounded-ui border border-brand-100 bg-white shadow-crisp lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div aria-hidden="true" className="h-[3px] bg-brand-100/70">
        <div
          className="h-full origin-left bg-brand-700 shadow-[0_0_12px_rgba(35,89,153,0.36)] transition-transform duration-150 ease-out will-change-transform"
          style={{ transform: `scaleX(${Math.max(scrollProgress, 2) / 100})` }}
        />
      </div>
      {open ? (
        <div className="border-t border-brand-100 bg-white shadow-deep lg:hidden">
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
            <a href="/subscribe" className="mt-2 rounded-ui bg-brand-700 px-3 py-3 text-center text-sm font-black text-white" onClick={() => setOpen(false)}>
              Subscribe
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
