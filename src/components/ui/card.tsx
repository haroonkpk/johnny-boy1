import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "light";
  children: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant, children, className, ...props }, ref) => {
    const variantStyles = {
      primary: "glass-card text-white",
      secondary: "bg-[var(--color-secondary-bg)] text-[#053B70]",
      light: "bg-white text-gray-900 border border-gray-100",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-[clamp(8px,1vw,30px)] p-[clamp(1.25rem,2.5vw,2rem)]",
          variant && variantStyles[variant],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
