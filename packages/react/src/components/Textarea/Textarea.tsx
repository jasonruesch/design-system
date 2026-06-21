import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus";
import { useFieldControl } from "../Field";

export type TextareaProps = ComponentPropsWithoutRef<"textarea">;

/** Multi-line text input. Inherits accessibility wiring from a parent Field. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, ...props }, ref) {
    const fieldProps = useFieldControl(props);
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-20 w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm text-fg",
          "placeholder:text-fg-subtle transition-colors disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-danger aria-invalid:focus-visible:ring-danger",
          focusRing,
          className,
        )}
        {...props}
        {...fieldProps}
      />
    );
  },
);
