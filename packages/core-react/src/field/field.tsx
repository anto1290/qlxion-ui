import * as React from "react";
import { cn } from "@qlxion-ui/utils";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, label, description, error, required, htmlFor, children, ...props }, ref) => {
    const labelId = React.useId();
    const descriptionId = React.useId();
    const errorId = React.useId();

    const childWithLabel = React.isValidElement(children)
      ? React.cloneElement(children as React.ReactElement<any>, {
          id: htmlFor,
          "aria-describedby": cn(description && descriptionId, error && errorId),
          "aria-invalid": error ? "true" : undefined,
        } as any)
      : children;

    return (
      <div ref={ref} className={cn("space-y-1.5", className)} {...props}>
        {label && (
          <label
            id={labelId}
            htmlFor={htmlFor}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              error && "text-destructive"
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative" aria-describedby={cn(description && descriptionId, error && errorId)}>
          {childWithLabel}
          {error && (
            <p id={errorId} className="mt-1 text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>
        {description && !error && (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    );
  }
);
Field.displayName = "Field";