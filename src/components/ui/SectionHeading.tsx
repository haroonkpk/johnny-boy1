import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string | React.ReactNode;
  subtitle?: string;
  badge?: string;
  mode?: "light" | "dark";
  className?: string;
}

export const SectionHeading = ({
  title,
  subtitle,
  badge,
  mode = "dark",
  className,
}: SectionHeadingProps) => {
  const isDark = mode === "dark";

  return (
    <div className={cn("relative mb-[clamp(2rem,6vw,5rem)] ", className)}>
      {/* Decorative Background Element */}
      <div
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-[80px] opacity-20 pointer-events-none"
        // style={{ backgroundColor: 'var(--heading-bg)' }}
      />

      <div className="relative z-10 flex flex-col items-start text-left">
        {badge && (
          <div className="flex items-center gap-2 mb-[clamp(1rem,2vw,1.5rem)]">
            <span className="text-[clamp(0.65rem,1.5vw,0.75rem)] font-black uppercase tracking-[0.3em] text-heading-bg">
              {badge}
            </span>
          </div>
        )}

        <div className="inline-block border-2 border-[#7A7D8F] p-1 -skew-x-[8deg]">
          <h2
            className={cn(
              "text-[clamp(2rem,6vw,3.5rem)] font-black bg-black tracking-tighter leading-[0.95] uppercase italic",
              "border-2 border-[#7A7D8F]",
              "-skew-x-[8deg]",
              isDark ? "text-(--gold)" : "text-(--color-cream)",
            )}
            style={{
              padding: "1.25rem 3rem 1.25rem 2rem",
              fontStyle: "normal",
            }}
          >
            {title}
          </h2>
        </div>

        {subtitle && (
          <p
            className={cn(
              "tex t-[clamp(1rem,2vw,1.25rem)] mt-[clamp(1rem,3vw,1.5rem)] max-w-2xl font-medium leading-relaxed opacity-60",
              isDark ? "text-gray-400 " : "text-gray-600",
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
