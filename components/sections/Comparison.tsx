"use client";

import { motion } from "framer-motion";
import { COMPARISON_COLUMNS, COMPARISON_ROWS } from "@/data/comparison";
import { fadeUp, VIEWPORT } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

function CellValue({ value, highlight }: { value: string | boolean; highlight?: boolean }) {
  if (value === true) {
    return (
      <span
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-full",
          highlight ? "bg-matcha-700 text-cream" : "bg-matcha-100 text-matcha-700"
        )}
      >
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
          <path
            d="M3 8.5l3.5 3.5L13 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="sr-only">Sí</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cream-soft text-ink-faint">
        <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="sr-only">No</span>
      </span>
    );
  }
  return (
    <span className={cn("text-sm", highlight ? "font-medium text-ink" : "text-ink-soft")}>
      {value}
    </span>
  );
}

export function Comparison() {
  return (
    <section aria-labelledby="comparacion-title" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Comparación"
          title="No todos los verdes son iguales"
          description="La diferencia entre un matcha ceremonial auténtico y el resto se nota en el color, en el sabor y en cómo te sientes una hora después."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="overflow-x-auto rounded-sm border border-line shadow-soft"
        >
          <table className="w-full min-w-[640px] border-collapse bg-surface text-left">
            <caption className="sr-only">
              Comparación entre KUMO Ceremonial, matcha comercial y café
            </caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-6 py-5 text-sm font-medium text-ink-faint">
                  Característica
                </th>
                <th
                  scope="col"
                  className="bg-matcha-50/70 px-6 py-5 text-sm font-semibold text-matcha-800"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-matcha-600" aria-hidden="true" />
                    {COMPARISON_COLUMNS.kumo}
                  </span>
                </th>
                <th scope="col" className="px-6 py-5 text-sm font-medium text-ink-soft">
                  {COMPARISON_COLUMNS.commercial}
                </th>
                <th scope="col" className="px-6 py-5 text-sm font-medium text-ink-soft">
                  {COMPARISON_COLUMNS.coffee}
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={cn(
                    "transition-colors hover:bg-cream/60",
                    i < COMPARISON_ROWS.length - 1 && "border-b border-line"
                  )}
                >
                  <th scope="row" className="px-6 py-4 text-sm font-medium text-ink">
                    {row.feature}
                  </th>
                  <td className="bg-matcha-50/70 px-6 py-4">
                    <CellValue value={row.kumo} highlight />
                  </td>
                  <td className="px-6 py-4">
                    <CellValue value={row.commercial} />
                  </td>
                  <td className="px-6 py-4">
                    <CellValue value={row.coffee} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
