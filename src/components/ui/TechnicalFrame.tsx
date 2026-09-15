import React from "react";
import { cn } from "../../lib/utils";

interface TechnicalFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  headerLabel?: string;
  headerMeta?: string;
  showCorners?: boolean;
}

export const TechnicalFrame: React.FC<TechnicalFrameProps> = ({
  children,
  className,
  headerLabel,
  headerMeta,
  showCorners = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative bg-graphite-900 border border-graphite-800 transition-colors duration-200",
        showCorners && "precision-corner",
        className
      )}
      {...props}
    >
      {(headerLabel || headerMeta) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-graphite-800 bg-graphite-950/60 font-mono text-[11px] text-steel-400">
          <span className="uppercase tracking-wider text-steel-300">
            {headerLabel}
          </span>
          {headerMeta && (
            <span className="text-steel-500 font-mono">{headerMeta}</span>
          )}
        </div>
      )}
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
};
