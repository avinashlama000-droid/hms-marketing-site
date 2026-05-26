"use client";

import { motion, useReducedMotion, useScroll, useTransform, type HTMLMotionProps, type UseScrollOptions } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ScrollParallaxProps = Omit<HTMLMotionProps<"div">, "style"> & {
  children: ReactNode;
  className?: string;
  speed?: number;
  offset?: UseScrollOptions["offset"];
  axis?: "x" | "y";
};

export function ScrollParallax({
  children,
  className,
  speed = 18,
  offset = ["start end", "end start"],
  axis = "y",
  ...props
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  const travel = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  const style = reduceMotion ? undefined : axis === "x" ? { x: travel } : { y: travel };

  return (
    <motion.div ref={ref} className={className} style={style} {...props}>
      {children}
    </motion.div>
  );
}
