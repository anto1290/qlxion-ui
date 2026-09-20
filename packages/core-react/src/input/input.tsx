"use client";

import * as React from "react";
import { cva, cn } from "@qlxion-ui/utils";

const inputVariants = cva(
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        destructive: "border-destructive focus-visible:ring-destructive",
      },
      size: {
        default: "h-9 rounded-md px-3 py-1",
        sm: "h-8 rounded-md px-2 py-1 text-xs",
        lg: "h-10 rounded-md px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type InputVariant = "default" | "destructive";
export type InputSize = "default" | "sm" | "lg";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix"
> {
  variant?: InputVariant;
  size?: InputSize;
  asChild?: boolean;
  error?: string;
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      size,
      asChild = false,
      error,
      label,
      prefix,
      suffix,
      icon,
      disabled,
      id,
      name,
      required,
      placeholder,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const errorId = `${inputId}-error`;
    const Comp = asChild ? React.Fragment : "div";

    const inputEl = (
      <input
        type={type}
        className={cn(
          inputVariants({ variant: variant ?? "default", size: size ?? "default" }),
          className,
          {
            "border-destructive focus-visible:ring-destructive": !!error,
          }
        )}
        ref={ref}
        disabled={disabled}
        id={inputId}
        name={name}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        aria-disabled={disabled ? true : undefined}
        {...props}
      />
    );

    if (asChild) {
      return inputEl;
    }

    return (
      <Comp className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className={cn("relative flex items-center", label && "mt-2")}>
          {icon && <span className="absolute left-3 text-muted-foreground">{icon}</span>}
          {prefix && <span className="absolute left-3 text-muted-foreground">{prefix}</span>}
          <div className={cn("flex-1", icon || prefix ? "pl-8" : "", suffix ? "pr-8" : "")}>
            {inputEl}
          </div>
          {suffix && <span className="absolute right-3 text-muted-foreground">{suffix}</span>}
        </div>
        {error && (
          <p id={errorId} className="text-sm text-destructive mt-1" role="alert">
            {error}
          </p>
        )}
      </Comp>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
