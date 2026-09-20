import * as React from "react";
import { cn } from "@qlxion-ui/utils";

interface DropdownContextValue {
  open: boolean;
  setOpen: (o: boolean) => void;
  selectedValues: string[];
  toggleValue: (val: string) => void;
}

const DropdownContext = React.createContext<DropdownContextValue | undefined>(undefined);

export interface DropdownProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  multiple?: boolean;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  open: ctrlOpen,
  onOpenChange,
  multiple = false,
  value: ctrlVal,
  onValueChange,
  children,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const [uncontrolledValues, setUncontrolledValues] = React.useState<string[]>([]);
  const open = ctrlOpen !== undefined ? ctrlOpen : uncontrolledOpen;
  const selectedValues = ctrlVal !== undefined ? ctrlVal : uncontrolledValues;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (ctrlOpen === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [ctrlOpen, onOpenChange]
  );

  const toggleValue = React.useCallback(
    (val: string) => {
      const next = selectedValues.includes(val)
        ? selectedValues.filter((v) => v !== val)
        : [...selectedValues, val];
      if (ctrlVal === undefined) setUncontrolledValues(next);
      onValueChange?.(next);
      if (!multiple) setOpen(false);
    },
    [selectedValues, ctrlVal, onValueChange, multiple, setOpen]
  );

  return (
    <DropdownContext.Provider value={{ open, setOpen, selectedValues, toggleValue }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, className, children, ...props }, ref) => {
  const ctx = React.useContext(DropdownContext);
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={ctx?.open}
      aria-haspopup="menu"
      onClick={(e) => {
        ctx?.setOpen(!ctx.open);
        onClick?.(e);
      }}
      className={cn(
        "inline-flex items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-xs hover:bg-accent",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
DropdownTrigger.displayName = "DropdownTrigger";

export const DropdownContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const ctx = React.useContext(DropdownContext);
  if (!ctx?.open) return null;
  return (
    <div
      ref={ref}
      role="menu"
      className={cn(
        "absolute right-0 z-50 mt-2 min-w-[8rem] rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownContent.displayName = "DropdownContent";

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className, value, disabled = false, onSelect, children, onClick, ...props }, ref) => {
    const ctx = React.useContext(DropdownContext);
    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        onClick={(e) => {
          if (disabled) return;
          if (value) ctx?.toggleValue(value);
          onSelect?.();
          onClick?.(e);
          if (!value) ctx?.setOpen(false);
        }}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-xs px-2 py-1.5 text-sm outline-none hover:bg-accent",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownItem.displayName = "DropdownItem";

export const DropdownCheckboxItem = React.forwardRef<
  HTMLDivElement,
  DropdownItemProps & { checked?: boolean }
>(({ className, checked, value, children, ...props }, ref) => {
  const ctx = React.useContext(DropdownContext);
  const isChecked =
    checked !== undefined ? checked : value ? ctx?.selectedValues.includes(value) : false;
  return (
    <DropdownItem ref={ref} value={value} className={cn("pl-6", className)} {...props}>
      {isChecked && <span className="absolute left-1.5">✓</span>}
      {children}
    </DropdownItem>
  );
});
DropdownCheckboxItem.displayName = "DropdownCheckboxItem";
