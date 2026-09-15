import React from "react";
import { cn } from "../../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "accent" | "pending";
  indicator?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "default",
  indicator = false,
  ...props
}) => {
  const variantStyles = {
    default: "bg-graphite-900 border-graphite-800 text-steel-300",
    outline: "bg-transparent border-steel-700 text-steel-200",
    accent: "bg-precision-cyan/10 border-precision-cyan/30 text-precision-cyan",
    pending: "bg-amber-950/20 border-amber-800/40 text-amber-300",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono tracking-wider uppercase rounded-sm border",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {indicator && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            variant === "accent" ? "bg-precision-cyan animate-pulse" : "bg-steel-400"
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
};
