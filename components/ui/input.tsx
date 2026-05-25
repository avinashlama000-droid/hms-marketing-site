import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "focus-ring h-11 w-full rounded-ui border border-border bg-white px-3 text-sm text-ink-900 shadow-crisp placeholder:text-ink-400",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
