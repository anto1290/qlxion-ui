import * as React from "react";
import { cn } from "@qlxion-ui/utils";
import { Calendar } from "../calendar/calendar";

export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DatePicker({
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "Pick a date",
  className,
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const selectedDate = isControlled ? controlledValue : uncontrolledValue;

  const handleSelect = (date: Date) => {
    if (!isControlled) {
      setUncontrolledValue(date);
    }
    onChange?.(date);
    setOpen(false);
  };

  const formatDate = (d?: Date) => {
    if (!d) return "";
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  };

  return (
    <div className="relative inline-block w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-left",
          !selectedDate && "text-muted-foreground",
          className
        )}
      >
        <span>{selectedDate ? formatDate(selectedDate) : placeholder}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-50"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 rounded-md border border-border bg-popover p-0 shadow-md">
          <Calendar value={selectedDate} onChange={handleSelect} className="border-0 shadow-none" />
        </div>
      )}
    </div>
  );
}
