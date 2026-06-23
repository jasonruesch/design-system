import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn";

/** Surface container that groups related content. */
export const Card = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  function Card({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-line bg-canvas text-fg shadow-sm",
          className,
        )}
        {...props}
      />
    );
  },
);

export const CardHeader = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function CardHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  );
});

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<"h3">
>(function CardTitle({ className, children, ...props }, ref) {
  return (
    <h3
      ref={ref}
      className={cn("text-lg leading-tight font-semibold", className)}
      {...props}
    >
      {children}
    </h3>
  );
});

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<"p">
>(function CardDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-fg-muted", className)}
      {...props}
    />
  );
});

export const CardContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />;
});

export const CardFooter = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function CardFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 p-6 pt-0", className)}
      {...props}
    />
  );
});
