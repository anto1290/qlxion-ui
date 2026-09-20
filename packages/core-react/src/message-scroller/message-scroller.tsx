import * as React from "react";
import { cn } from "@qlxion-ui/utils";

export interface MessageScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  autoScroll?: boolean;
}

const MessageScroller = React.forwardRef<HTMLDivElement, MessageScrollerProps>(
  ({ className, autoScroll = true, children, ...props }, ref) => {
    const internalRef = React.useRef<HTMLDivElement>(null);
    const bottomRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
      bottomRef.current?.scrollIntoView?.({ behavior });
    };

    React.useEffect(() => {
      if (autoScroll) {
        scrollToBottom("auto");
      }
    }, [children, autoScroll]);

    return (
      <div
        ref={internalRef}
        className={cn("flex flex-col overflow-y-auto p-4 w-full h-full space-y-2", className)}
        {...props}
      >
        {children}
        <div ref={bottomRef} className="h-0 w-0 shrink-0" />
      </div>
    );
  }
);
MessageScroller.displayName = "MessageScroller";

export { MessageScroller };
