"use client";

import { Children, type ReactNode, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function FeatureScrollTimeline({
  id,
  eyebrow,
  title,
  body,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 45%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    restDelta: 0.001,
  });
  const items = Children.toArray(children);

  return (
    <section id={id} className="relative scroll-mt-32 py-16 sm:py-20 xl:py-24">
      <div ref={timelineRef} className="container-grid grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:items-start lg:gap-16 xl:gap-20">
        <div className="lg:sticky lg:top-[13rem] lg:h-fit lg:self-start">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl xl:max-w-4xl"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-700 xl:text-sm">{eyebrow}</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-ink-900 sm:text-5xl xl:text-6xl">{title}</h2>
            <p className="mt-5 text-base leading-7 text-ink-600 xl:max-w-3xl xl:text-lg xl:leading-8">{body}</p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="absolute bottom-8 left-5 top-2 w-px bg-brand-100" />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-8 left-5 top-2 w-0.5 origin-top bg-brand-700"
            style={{ scaleY: reduceMotion ? 1 : scaleY }}
          />

          <ol className="relative grid gap-10 sm:gap-12 lg:gap-16">
            {items.map((child, index) => (
              <motion.li
                key={index}
                initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.38 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative grid min-h-[12rem] grid-cols-[2.5rem_minmax(0,1fr)] gap-5 sm:min-h-[13rem] lg:min-h-[15rem]"
              >
                <div className="relative z-10 col-start-1 row-start-1 flex justify-center pt-1">
                  <motion.div
                    initial={reduceMotion ? false : { scale: 0.82 }}
                    whileInView={reduceMotion ? undefined : { scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="grid h-10 w-10 place-items-center rounded-full border border-brand-200 bg-[#F6F8FB] text-xs font-black text-brand-800 shadow-crisp ring-8 ring-[#F6F8FB]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.div>
                </div>
                <div
                  className={cn(
                    "col-start-2 row-start-1 max-w-xl pt-0.5",
                    index === items.length - 1 && "pb-2"
                  )}
                >
                  {child}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
