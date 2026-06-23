import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus";

export type RadioGroupProps = ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;

/** Group of mutually-exclusive radio options (Radix). */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup({ className, ...props }, ref) {
    return (
      <RadioGroupPrimitive.Root
        ref={ref}
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    );
  },
);

export type RadioGroupItemProps = ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
>;

/** A single radio button within a RadioGroup. */
export const RadioGroupItem = forwardRef<
  HTMLButtonElement,
  RadioGroupItemProps
>(function RadioGroupItem({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square size-5 shrink-0 rounded-full border border-line bg-canvas transition-colors",
        "data-[state=checked]:border-accent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        focusRing,
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center after:block after:size-2.5 after:rounded-full after:bg-accent" />
    </RadioGroupPrimitive.Item>
  );
});
