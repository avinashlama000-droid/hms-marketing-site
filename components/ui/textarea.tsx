import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "focus-ring min-h-28 w-full rounded-ui border border-border bg-white px-3 py-3 text-sm text-ink-900 shadow-crisp placeholder:text-ink-400",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
