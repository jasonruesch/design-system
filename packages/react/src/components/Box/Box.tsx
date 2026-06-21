import { forwardRef, type ElementType, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn";

export interface BoxProps extends ComponentPropsWithoutRef<"div"> {
  /** Render as a different element (e.g. `section`, `main`, `ul`). */
  as?: ElementType;
}

/**
 * The lowest-level layout primitive: a styleable element with class merging.
 * Every other layout component composes Box.
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { as: Component = "div", className, ...props },
  ref,
) {
  return <Component ref={ref} className={cn(className)} {...props} />;
});
