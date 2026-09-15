import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", icon, children, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-mono uppercase tracking-widest text-xs font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-precision-cyan disabled:opacity-50 disabled:pointer-events-none min-h-[44px] select-none";

    const variantStyles = {
      primary:
        "bg-precision-blue hover:bg-precision-cyan text-white shadow-sm hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] active:translate-y-px",
      secondary:
        "bg-graphite-850 hover:bg-graphite-800 text-offwhite border border-steel-700 hover:border-steel-500 active:translate-y-px",
      outline:
        "bg-transparent hover:bg-graphite-900 text-steel-200 border border-steel-700 hover:border-precision-cyan/50 hover:text-white active:translate-y-px",
      ghost:
        "bg-transparent hover:bg-graphite-900 text-steel-400 hover:text-offwhite",
    };

    const sizeStyles = {
      sm: "px-3 py-2 text-[11px]",
      md: "px-5 py-2.5 text-xs",
      lg: "px-7 py-3.5 text-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        <span className="flex items-center gap-2">
          {children}
          {icon && <span className="text-current">{icon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
