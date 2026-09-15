import React from "react";
import { cn } from "../../lib/utils";

interface SectionHeaderProps {
  index: string; // e.g. "01", "02"
  tag: string;   // e.g. "PRODUCT SYSTEMS", "MANUFACTURING"
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  tag,
  title,
  description,
  className,
  align = "left",
}) => {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-2xl",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-steel-400 mb-3",
          align === "center" && "justify-center"
        )}
      >
        <span className="text-precision-cyan font-semibold">[{index}]</span>
        <span className="w-6 h-px bg-steel-700" aria-hidden="true" />
        <span>{tag}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-steel-400 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
