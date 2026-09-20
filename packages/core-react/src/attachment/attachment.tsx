import * as React from "react";
import { cn } from "@qlxion-ui/utils";

export interface AttachmentProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  size?: string;
  icon?: React.ReactNode;
  onRemove?: () => void;
  disabled?: boolean;
}

const Attachment = React.forwardRef<HTMLDivElement, AttachmentProps>(
  ({ className, name, size, icon, onRemove, disabled = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-3 rounded-lg border border-border bg-card p-2.5 text-card-foreground shadow-xs text-sm max-w-sm w-full transition-colors",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
          {icon ?? (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0 overflow-hidden text-left">
          <p className="truncate font-medium text-foreground text-xs leading-none mb-1">
            {name}
          </p>
          {size && (
            <p className="text-[11px] text-muted-foreground leading-none">
              {size}
            </p>
          )}
        </div>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            disabled={disabled}
            aria-label={`Hapus lampiran ${name}`}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);
Attachment.displayName = "Attachment";

export { Attachment };
