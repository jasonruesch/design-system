import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const alert = cva("relative w-full rounded-lg border p-4 text-sm", {
  variants: {
    variant: {
      info: "border-line bg-surface text-fg",
      success: "border-success-border bg-success-subtle text-success-fg",
      warning: "border-warning-border bg-warning-subtle text-warning-fg",
      danger: "border-danger-border bg-danger-subtle text-danger-fg",
    },
  },
  defaultVariants: { variant: "info" },
});

export interface AlertProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof alert> {}

/** Contextual message banner. Uses `role="alert"` for danger/warning. */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className, variant = "info", ...props },
  ref,
) {
  const assertive = variant === "danger" || variant === "warning";
  return (
    <div
      ref={ref}
      role={assertive ? "alert" : "status"}
      className={cn(alert({ variant }), className)}
      {...props}
    />
  );
});

/** Bold heading inside an Alert. */
export const AlertTitle = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<"p">
>(function AlertTitle({ className, ...props }, ref) {
  return (
    <p ref={ref} className={cn("mb-1 font-semibold", className)} {...props} />
  );
});

/** Supporting body text inside an Alert. */
export const AlertDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<"p">
>(function AlertDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn("opacity-90", className)} {...props} />;
});
