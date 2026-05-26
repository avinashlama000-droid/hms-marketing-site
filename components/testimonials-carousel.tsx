"use client";

import { BadgeCheck } from "lucide-react";

type Testimonial = {
  role: string;
  quote: string;
  context?: string;
};

const testimonials: Testimonial[] = [
  {
    role: "Operations owner",
    context: "Multi-block hostel",
    quote: "We finally see inquiries, room pressure, and payment risk together before it becomes a daily firefight.",
  },
  {
    role: "Hostel warden",
    context: "Daily resident desk",
    quote: "The value is speed. When someone asks about a room, dues, or a complaint, the answer is already in context.",
  },
  {
    role: "Finance lead",
    context: "Student and supplier accounts",
    quote: "Payments, salary, supplier balances, and student dues need discipline. HMS gives the team a shared ledger mindset.",
  },
  {
    role: "Front desk team",
    context: "Admissions and follow-up",
    quote: "Inquiry follow-ups no longer disappear into calls and notebooks. Everyone can see the next action and room fit.",
  },
  {
    role: "Tenant admin",
    context: "Branch oversight",
    quote: "The system makes hostel work feel less scattered because rooms, residents, notices, and finance move together.",
  },
  {
    role: "Resident support lead",
    context: "Complaints and notices",
    quote: "Complaints are easier to own when assignment, status, attachments, and communication history stay in one place.",
  },
];

export function TestimonialsCarousel() {
  const rollingTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="testimonials-marquee" aria-label="Auto-rolling testimonials">
      <div className="testimonials-marquee__viewport">
        <div className="testimonials-marquee__track">
          {rollingTestimonials.map((testimonial, index) => (
            <blockquote
              key={`${testimonial.role}-${index}`}
              className="glass-card testimonials-marquee__card rounded-ui p-6 sm:p-7"
              aria-hidden={index >= testimonials.length}
            >
              <div className="flex items-center justify-between gap-4">
                <BadgeCheck className="h-6 w-6 shrink-0 text-brand-700" />
                <span className="rounded-full bg-brand-50 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em] text-brand-800">
                  HMS
                </span>
              </div>
              <p className="mt-6 text-lg font-bold italic leading-8 text-ink-900 sm:text-xl sm:leading-9">
                &quot;{testimonial.quote}&quot;
              </p>
              <footer className="mt-6">
                <p className="text-base font-black text-brand-800">{testimonial.role}</p>
                {testimonial.context ? <p className="mt-1 text-sm font-bold text-ink-500">{testimonial.context}</p> : null}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  );
}
