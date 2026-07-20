"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  className?: string;
};

export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 20,
  label,
  className,
}: QuantityStepperProps) {
  return (
    <div
      role="group"
      aria-label={`Cantidad de ${label}`}
      className={cn(
        "inline-flex h-10 items-center rounded-md border border-line bg-surface",
        className
      )}
    >
      <button
        type="button"
        aria-label={`Quitar una unidad de ${label}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-10 w-10 cursor-pointer items-center justify-center text-ink-soft hover:text-ink disabled:opacity-30"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
      <span aria-live="polite" className="w-8 text-center text-sm font-semibold tabular-nums text-ink">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Agregar una unidad de ${label}`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-10 w-10 cursor-pointer items-center justify-center text-ink-soft hover:text-ink disabled:opacity-30"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
