import * as React from "react";
import { cva, cn } from "@qlxion-ui/utils";

const bubbleVariants = cva("relative max-w-[80%] rounded-2xl px-4 py-2.5 text-sm", {
  variants: {
    variant: {
      user: "ml-auto bg-primary text-primary-foreground rounded-br-xs",
      bot: "mr-auto bg-muted text-foreground rounded-bl-xs border border-border",
      system: "mx-auto bg-accent/50 text-muted-foreground text-xs rounded-lg py-1 px-3 border border-border/50",
    },
  },
  defaultVariants: {
    variant: "user",
  },
});

export type BubbleVariant = "user" | "bot" | "system";

export interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BubbleVariant;
  timestamp?: string;
  avatar?: React.ReactNode;
}

const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  ({ className, variant = "user", timestamp, avatar, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-end gap-2 my-1",
          variant === "user" ? "justify-end" : variant === "bot" ? "justify-start" : "justify-center"
        )}
      >
        {variant === "bot" && avatar && <div className="shrink-0 mb-1">{avatar}</div>}
        <div
          ref={ref}
          className={cn(bubbleVariants({ variant }), className)}
          {...props}
        >
          <div>{children}</div>
          {timestamp && (
            <span
              className={cn(
                "block text-[10px] mt-1 text-right select-none opacity-70",
                variant === "user" ? "text-primary-foreground" : "text-muted-foreground"
              )}
            >
              {timestamp}
            </span>
          )}
        </div>
        {variant === "user" && avatar && <div className="shrink-0 mb-1">{avatar}</div>}
      </div>
    );
  }
);
Bubble.displayName = "Bubble";

export { Bubble, bubbleVariants };
