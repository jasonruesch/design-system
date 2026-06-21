import { forwardRef, type ElementType, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const text = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    tone: {
      default: "text-fg",
      muted: "text-fg-muted",
      subtle: "text-fg-subtle",
      accent: "text-accent-fg",
      danger: "text-danger-fg",
      success: "text-success-fg",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    truncate: {
      true: "truncate",
    },
  },
  defaultVariants: { size: "md", weight: "normal", tone: "default" },
});

export interface TextProps
  extends ComponentPropsWithoutRef<"p">,
    VariantProps<typeof text> {
  as?: ElementType;
}

/** Body text with token-driven size, weight, and tone. */
export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
  { as: Component = "p", className, size, weight, tone, align, truncate, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(text({ size, weight, tone, align, truncate }), className)}
      {...props}
    />
  );
});
