import * as React from "react";
import { cn } from "@qlxion-ui/utils";
import { Toggle, type ToggleVariant, type ToggleSize } from "../toggle/toggle";

interface ToggleGroupContextValue {
  type: "single" | "multiple";
  value: string | string[];
  onItemClick: (val: string) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null);

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (val: string | string[]) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      className,
      type = "single",
      value: controlledValue,
      defaultValue,
      onValueChange,
      variant = "default",
      size = "default",
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(
      defaultValue ?? (type === "single" ? "" : [])
    );
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    const onItemClick = (itemValue: string) => {
      let nextValue: string | string[];
      if (type === "single") {
        nextValue = currentValue === itemValue ? "" : itemValue;
      } else {
        const arr = Array.isArray(currentValue) ? [...currentValue] : [];
        const index = arr.indexOf(itemValue);
        if (index > -1) {
          arr.splice(index, 1);
        } else {
          arr.push(itemValue);
        }
        nextValue = arr;
      }
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onValueChange?.(nextValue);
    };

    return (
      <ToggleGroupContext.Provider
        value={{ type, value: currentValue, onItemClick, variant, size }}
      >
        <div
          ref={ref}
          role="group"
          className={cn("inline-flex items-center justify-center gap-1 rounded-md", className)}
          {...props}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  }
);
ToggleGroup.displayName = "ToggleGroup";

export interface ToggleGroupItemProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "value"
> {
  value: string;
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const ctx = React.useContext(ToggleGroupContext);
    if (!ctx) {
      throw new Error("ToggleGroupItem must be used within a ToggleGroup");
    }

    const isPressed =
      ctx.type === "single"
        ? ctx.value === value
        : Array.isArray(ctx.value) && ctx.value.includes(value);

    return (
      <Toggle
        ref={ref}
        variant={ctx.variant}
        size={ctx.size}
        pressed={isPressed}
        onPressedChange={() => ctx.onItemClick(value)}
        className={className}
        {...props}
      >
        {children}
      </Toggle>
    );
  }
);
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
