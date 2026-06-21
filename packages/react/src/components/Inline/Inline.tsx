import { forwardRef, type ElementType, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const inline = cva("flex flex-row", {
  variants: {
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: { gap: 2, align: "center", wrap: false },
});

export interface InlineProps
  extends Omit<ComponentPropsWithoutRef<"div">, "wrap">,
    VariantProps<typeof inline> {
  as?: ElementType;
}

/** Horizontal flex layout with token-based spacing and optional wrapping. */
export const Inline = forwardRef<HTMLDivElement, InlineProps>(function Inline(
  { as: Component = "div", className, gap, align, justify, wrap, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(inline({ gap, align, justify, wrap }), className)}
      {...props}
    />
  );
});
