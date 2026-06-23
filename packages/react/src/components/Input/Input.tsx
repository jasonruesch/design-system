import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus";
import { useFieldControl } from "../Field";

export const inputVariants = cva(
  cn(
    "flex w-full rounded-md border bg-canvas text-fg placeholder:text-fg-subtle",
    "transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-danger aria-invalid:focus-visible:ring-danger",
    focusRing,
  ),
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-md",
      },
      tone: {
        default: "border-line",
        invalid: "border-danger",
      },
    },
    defaultVariants: { size: "md", tone: "default" },
  },
);

export interface InputProps
  extends
    Omit<ComponentPropsWithoutRef<"input">, "size">,
    VariantProps<typeof inputVariants> {}

/** Single-line text input. Inherits accessibility wiring from a parent Field. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size, tone, ...props },
  ref,
) {
  const fieldProps = useFieldControl(props);
  return (
    <input
      ref={ref}
      className={cn(inputVariants({ size, tone }), className)}
      {...props}
      {...fieldProps}
    />
  );
});
