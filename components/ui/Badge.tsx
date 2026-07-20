import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "default" | "solid" | "outline" | "accent";

const VARIANTS: Record<BadgeVariant, string> = {
  default: "bg-cream-soft text-forest-mid border border-line",
  solid: "bg-forest text-cream border border-transparent",
  outline: "bg-transparent text-ink-soft border border-line",
  accent: "bg-olive/20 text-forest border border-olive/30",
};

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
