"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { Counter } from "@/components/ui/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";

const METRICS = [
  { value: 2400, prefix: "+", suffix: "", label: "Pedidos entregados" },
  { value: 4.9, decimals: 1, prefix: "", suffix: "/5", label: "Valoración" },
  { value: 21, prefix: "", suffix: " días", label: "Cultivo a la sombra" },
  { value: 48, prefix: "", suffix: " h", label: "Entrega máxima" },
];

export function Metrics() {
  return (
    <section aria-label="Métricas" className="border-y border-line bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Numbers"
          title="Datos suaves,"
          scriptWord="hechos firmes"
          className="mb-10 md:mb-12"
        />
        <motion.ul
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {METRICS.map((m) => (
            <motion.li key={m.label} variants={fadeUp} className="text-center sm:text-left">
              <p className="font-serif text-4xl font-semibold text-forest sm:text-5xl">
                <Counter
                  value={m.value}
                  decimals={m.decimals ?? 0}
                  prefix={m.prefix}
                  suffix={m.suffix}
                />
              </p>
              <p className="mt-2 text-sm text-ink-soft">{m.label}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
