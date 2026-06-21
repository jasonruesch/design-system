import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const spinner = cva("animate-spin", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
    },
  },
  defaultVariants: { size: "md" },
});

export interface SpinnerProps
  extends ComponentPropsWithoutRef<"span">,
    VariantProps<typeof spinner> {
  /** Accessible label announced to assistive tech. */
  label?: string;
}

/** Indeterminate loading indicator. */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { className, size, label = "Loading", ...props },
  ref,
) {
  return (
    <span ref={ref} role="status" aria-live="polite" {...props}>
      <svg className={cn(spinner({ size }), className)} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
});
