import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus";

/** Root, value, and grouping primitives re-exported as-is. */
export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export type SelectTriggerProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
>;

/** Button that opens the select listbox. */
export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ className, children, ...props }, ref) {
    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-line bg-canvas px-3 text-sm text-fg",
          "transition-colors data-[placeholder]:text-fg-subtle",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-danger",
          focusRing,
          className,
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <svg
            viewBox="0 0 16 16"
            className="size-4 opacity-60"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  },
);

export type SelectContentProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
>;

/** Floating listbox panel. Rendered in a portal. */
export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent(
    { className, children, position = "popper", ...props },
    ref,
  ) {
    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          position={position}
          className={cn(
            "relative z-50 max-h-(--radix-select-content-available-height) min-w-32 overflow-hidden rounded-md border border-line bg-canvas text-fg shadow-md",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
            position === "popper" &&
              "w-full min-w-(--radix-select-trigger-width)",
            className,
          )}
          {...props}
        >
          <SelectPrimitive.Viewport className="p-1">
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  },
);

export type SelectItemProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
>;

/** A selectable option. */
export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem({ className, children, ...props }, ref) {
    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(
          "relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none",
          "data-[highlighted]:bg-muted data-[highlighted]:outline-none",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className,
        )}
        {...props}
      >
        <span className="absolute left-2 flex size-4 items-center justify-center">
          <SelectPrimitive.ItemIndicator>
            <svg
              viewBox="0 0 16 16"
              className="size-3.5"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M13 4.5L6.5 11L3 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  },
);

/** Non-interactive group heading. */
export const SelectLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(function SelectLabel({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn("px-2 py-1.5 text-xs font-medium text-fg-muted", className)}
      {...props}
    />
  );
});

/** Divider between groups of options. */
export const SelectSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(function SelectSeparator({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-line", className)}
      {...props}
    />
  );
});
