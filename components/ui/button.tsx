import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-ui px-5 text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [@media(hover:hover)]:hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        primary: "glass-button text-white hover:shadow-glow",
        brand: "border border-brand-700 bg-brand-700 text-white shadow-crisp hover:bg-brand-800 hover:text-white",
        secondary: "border border-white/70 bg-white/72 text-ink-900 shadow-deep backdrop-blur-xl hover:bg-white/88 hover:shadow-glow",
        dark: "border border-white/10 bg-ink-900/88 text-white shadow-deep backdrop-blur-xl hover:bg-ink-800",
        ghost: "text-ink-700 hover:bg-white/72 hover:text-ink-900 hover:shadow-crisp",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  ),
);

Button.displayName = "Button";

export { buttonVariants };
