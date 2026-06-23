import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus";

export const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium",
    "whitespace-nowrap transition-colors select-none",
    "disabled:pointer-events-none disabled:opacity-50",
    focusRing,
  ),
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-active",
        secondary: "bg-muted text-fg hover:bg-surface border border-line",
        outline: "border border-line bg-transparent text-fg hover:bg-muted",
        ghost: "bg-transparent text-fg hover:bg-muted",
        danger: "bg-danger text-on-accent hover:bg-danger-hover",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-md",
      },
      fullWidth: { true: "w-full" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends
    ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  /** Merge props onto the child element instead of rendering a `<button>`. */
  asChild?: boolean;
  /** Show a spinner and disable interaction. */
  loading?: boolean;
}

/** Primary interactive control with token-driven variants. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant,
      size,
      fullWidth,
      asChild,
      loading,
      disabled,
      children,
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <Spinner />
            {children}
          </>
        ) : (
          children
        )}
      </Component>
    );
  },
);

function Spinner() {
  return (
    <svg
      className="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
