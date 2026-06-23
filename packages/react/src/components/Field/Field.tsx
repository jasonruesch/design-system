import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { Label } from "../Label";

interface FieldContextValue {
  id: string;
  describedBy?: string;
  invalid: boolean;
  required: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/**
 * Read field wiring from the nearest Field. Form controls call this to inherit
 * `id`, `aria-describedby`, `aria-invalid`, and `required`.
 */
export function useField(): FieldContextValue | null {
  return useContext(FieldContext);
}

/** Merge a control's own props with inherited Field wiring. */
export function useFieldControl(props: {
  id?: string;
  "aria-describedby"?: string;
  required?: boolean;
}) {
  const field = useField();
  if (!field) return props;
  return {
    id: props.id ?? field.id,
    required: props.required ?? field.required,
    "aria-describedby":
      [props["aria-describedby"], field.describedBy]
        .filter(Boolean)
        .join(" ") || undefined,
    "aria-invalid": field.invalid || undefined,
  };
}

export interface FieldProps extends ComponentPropsWithoutRef<"div"> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
}

/**
 * Form-control wrapper that renders a label, description, and error message,
 * and wires up the accessibility attributes for the control it contains.
 */
export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  {
    className,
    label,
    description,
    error,
    required = false,
    children,
    id,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy =
    [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  return (
    <FieldContext.Provider
      value={{ id: fieldId, describedBy, invalid, required }}
    >
      <div
        ref={ref}
        className={cn("flex flex-col gap-1.5", className)}
        {...props}
      >
        {label ? (
          <Label htmlFor={fieldId} required={required}>
            {label}
          </Label>
        ) : null}
        {children}
        {description ? (
          <p id={descriptionId} className="text-sm text-fg-muted">
            {description}
          </p>
        ) : null}
        {error ? (
          <p id={errorId} role="alert" className="text-sm text-danger-fg">
            {error}
          </p>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
});
