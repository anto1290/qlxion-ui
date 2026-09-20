import * as React from "react";
import { cn } from "@qlxion-ui/utils";
import { Bubble, type BubbleVariant } from "../bubble/bubble";

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BubbleVariant;
  sender?: string;
  avatar?: React.ReactNode;
  timestamp?: string;
  status?: "sending" | "sent" | "delivered" | "read" | "failed";
}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ className, variant = "user", sender, avatar, timestamp, status, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-1 my-2",
          variant === "user" ? "items-end" : variant === "bot" ? "items-start" : "items-center",
          className
        )}
        {...props}
      >
        {sender && <span className="text-xs text-muted-foreground px-1 font-medium">{sender}</span>}
        <Bubble variant={variant} timestamp={timestamp} avatar={avatar}>
          {children}
        </Bubble>
        {status && variant === "user" && (
          <span className="text-[10px] text-muted-foreground px-1 capitalize">{status}</span>
        )}
      </div>
    );
  }
);
Message.displayName = "Message";

export { Message };
