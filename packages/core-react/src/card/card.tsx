import * as React from "react";
import { cn } from "@qlxion-ui/utils";

type CardVariant = "default" | "outline";
type CardPadding = "sm" | "md" | "lg";
type CardRadius = "sm" | "md" | "lg";

// Tailwind + token mapping
const paddingMap = {
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};
const radiusMap = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
};
const variantMap = {
  default: "bg-background text-foreground shadow-sm border border-transparent",
  outline: "bg-background text-foreground shadow-sm border border-border",
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  as?: React.ElementType;
  padding?: CardPadding;
  radius?: CardRadius;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = "default", as: Comp = "div", padding = "md", radius = "md", ...props },
    ref
  ) => (
    <Comp
      className={cn(
        "relative",
        variantMap[variant],
        paddingMap[padding],
        radiusMap[radius],
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Card.displayName = "Card";
