import {
  forwardRef,
  type ElementType,
  type ComponentPropsWithoutRef,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const stackVariants = cva("flex flex-col", {
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
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: { gap: 4, align: "stretch" },
});

export interface StackProps
  extends ComponentPropsWithoutRef<"div">, VariantProps<typeof stackVariants> {
  as?: ElementType;
}

/** Vertical flex layout with token-based spacing. */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { as: Component = "div", className, gap, align, justify, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(stackVariants({ gap, align, justify }), className)}
      {...props}
    />
  );
});
