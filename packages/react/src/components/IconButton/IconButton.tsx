import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus";

const iconButtonVariants = cva(
  cn(
    "inline-flex items-center justify-center rounded-md transition-colors select-none",
    "disabled:pointer-events-none disabled:opacity-50",
    focusRing,
  ),
  {
    variants: {
      variant: {
        primary: "bg-accent text-on-accent hover:bg-accent-hover",
        outline: "border border-line bg-transparent text-fg hover:bg-muted",
        ghost: "bg-transparent text-fg hover:bg-muted",
        danger: "bg-danger text-on-accent hover:bg-danger-hover",
      },
      size: {
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
      },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

export interface IconButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof iconButtonVariants> {
  /** Accessible label; required since the button has no text content. */
  "aria-label": string;
  asChild?: boolean;
}

/** Square button for a single icon. Requires an `aria-label`. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ className, variant, size, asChild, ...props }, ref) {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
