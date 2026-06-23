import {
  forwardRef,
  type ElementType,
  type ComponentPropsWithoutRef,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      6: "grid-cols-6",
      12: "grid-cols-12",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
    },
  },
  defaultVariants: { cols: 2, gap: 4 },
});

export interface GridProps
  extends ComponentPropsWithoutRef<"div">, VariantProps<typeof gridVariants> {
  as?: ElementType;
}

/** CSS grid layout with token-based column count and spacing. */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { as: Component = "div", className, cols, gap, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(gridVariants({ cols, gap }), className)}
      {...props}
    />
  );
});
