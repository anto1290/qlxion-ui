import * as React from "react";
import { cn } from "@qlxion-ui/utils";

interface AccordionContextValue {
  value: string | string[];
  onValueChange: (value: string) => void;
  type: "single" | "multiple";
  collapsible?: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: any) => void;
  collapsible?: boolean;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      value: controlledValue,
      defaultValue = type === "multiple" ? [] : "",
      onValueChange,
      collapsible = true,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(
      defaultValue
    );
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = React.useCallback(
      (itemValue: string) => {
        let newValue: string | string[];
        if (type === "single") {
          if (value === itemValue) {
            newValue = collapsible ? "" : itemValue;
          } else {
            newValue = itemValue;
          }
        } else {
          const current = Array.isArray(value) ? value : [];
          if (current.includes(itemValue)) {
            newValue = current.filter((v) => v !== itemValue);
          } else {
            newValue = [...current, itemValue];
          }
        }

        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [type, value, collapsible, isControlled, onValueChange]
    );

    return (
      <AccordionContext.Provider
        value={{ value, onValueChange: handleValueChange, type, collapsible }}
      >
        <div ref={ref} className={cn("divide-y divide-border", className)} {...props} />
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

const AccordionItemContext = React.createContext<{ value: string; isOpen: boolean }>({
  value: "",
  isOpen: false,
});

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  const isOpen = Array.isArray(context?.value)
    ? context.value.includes(value)
    : context?.value === value;

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div
        ref={ref}
        data-state={isOpen ? "open" : "closed"}
        className={cn("border-b border-border", className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const accordionContext = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

  return (
    <div className="flex">
      <button
        ref={ref}
        type="button"
        aria-expanded={itemContext.isOpen}
        onClick={() => accordionContext?.onValueChange(itemContext.value)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <svg
          className="h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const itemContext = React.useContext(AccordionItemContext);
    if (!itemContext.isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn("overflow-hidden text-sm pb-4 pt-0 text-muted-foreground", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
