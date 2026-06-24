import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const spinnerVariants = cva("animate-spin", {
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
  extends
    ComponentPropsWithoutRef<"span">,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label announced to assistive tech. */
  label?: string;
}

/** Indeterminate loading indicator. */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner({ className, size, label = "Loading", ...props }, ref) {
    return (
      <span ref={ref} role="status" aria-live="polite" {...props}>
        <svg
          className={cn(spinnerVariants({ size }), className)}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            className="opacity-25"
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
          />
        </svg>
        <span className="sr-only">{label}</span>
      </span>
    );
  },
);
