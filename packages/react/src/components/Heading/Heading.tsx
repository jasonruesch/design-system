import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const headingVariants = cva(
  "text-fg font-semibold tracking-tight text-balance",
  {
    variants: {
      level: {
        1: "text-4xl",
        2: "text-3xl",
        3: "text-2xl",
        4: "text-xl",
        5: "text-lg",
        6: "text-md",
      },
    },
    defaultVariants: { level: 2 },
  },
);

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps
  extends
    Omit<ComponentPropsWithoutRef<"h2">, "color">,
    VariantProps<typeof headingVariants> {
  /** Heading level; also controls the rendered tag unless `as` is set. */
  level?: HeadingLevel;
  /** Override the rendered tag independently of the visual level. */
  as?: `h${HeadingLevel}`;
}

/** Section heading. Visual size follows `level`; semantic tag follows `as` or `level`. */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({ className, level = 2, as, ...props }, ref) {
    const Component = as ?? (`h${level}` as const);
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level }), className)}
        {...props}
      />
    );
  },
);
