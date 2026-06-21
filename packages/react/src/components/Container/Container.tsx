import { forwardRef, type ElementType, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const container = cva("mx-auto w-full px-4", {
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      full: "max-w-full",
    },
  },
  defaultVariants: { size: "lg" },
});

export interface ContainerProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof container> {
  as?: ElementType;
}

/** Horizontally-centered, max-width page container with responsive padding. */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ as: Component = "div", className, size, ...props }, ref) {
    return (
      <Component
        ref={ref}
        className={cn(container({ size }), className)}
        {...props}
      />
    );
  },
);
