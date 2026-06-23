import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus";

export const linkVariants = cva(
  cn("rounded-sm underline-offset-2 transition-colors", focusRing),
  {
    variants: {
      variant: {
        default: "text-accent-fg hover:underline",
        subtle: "text-fg-muted hover:text-fg hover:underline",
        quiet: "text-fg no-underline hover:underline",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface LinkProps
  extends ComponentPropsWithoutRef<"a">, VariantProps<typeof linkVariants> {
  /**
   * Merge props onto the child element instead of rendering an `<a>`. Use this
   * to render a router-aware link (e.g. React Router's `Link`) as the base:
   *
   * ```tsx
   * <Link asChild>
   *   <RouterLink to="/about">About</RouterLink>
   * </Link>
   * ```
   */
  asChild?: boolean;
}

/**
 * Styled anchor. Pass `href` and standard anchor attributes, or set `asChild`
 * to render a third-party link component (such as React Router's `Link`) as
 * the base while keeping the design-system styling.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, variant, asChild, children, ...props },
  ref,
) {
  const Component = asChild ? Slot : "a";
  return (
    <Component
      ref={ref}
      className={cn(linkVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
});
