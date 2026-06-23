import { forwardRef, type ComponentPropsWithoutRef } from "react";
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
  extends ComponentPropsWithoutRef<"a">, VariantProps<typeof linkVariants> {}

/** Styled anchor. Pass `href` and standard anchor attributes. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, variant, children, ...props },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cn(linkVariants({ variant }), className)}
      {...props}
    >
      {children}
    </a>
  );
});
