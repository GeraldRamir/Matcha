"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { IconChat, IconLeaf, IconShield, IconTruck } from "@/components/ui/icons";

const ITEMS = [
  {
    icon: IconLeaf,
    title: "Origen único",
    detail: "Uji, Japón · primera cosecha",
  },
  {
    icon: IconShield,
    title: "Pureza verificada",
    detail: "Análisis en cada lote",
  },
  {
    icon: IconTruck,
    title: "Entrega 24–48 h",
    detail: "Pagas al recibir",
  },
  {
    icon: IconChat,
    title: "Atención humana",
    detail: "WhatsApp, respuesta en minutos",
  },
];

/** Franja de confianza bajo el hero: responde “¿puedo confiar?” antes del scroll. */
export function TrustBar() {
  return (
    <section aria-label="Garantías" className="border-y border-line bg-surface">
      <motion.ul
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-5 py-6 sm:px-8 lg:grid-cols-4 lg:py-0"
      >
        {ITEMS.map((item) => (
          <motion.li
            key={item.title}
            variants={fadeUp}
            className="flex items-center gap-3.5 py-3 lg:justify-center lg:border-l lg:border-line lg:py-7 lg:first:border-l-0"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-matcha-50 text-matcha-700">
              <item.icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-tight text-ink">
                {item.title}
              </span>
              <span className="block text-xs text-ink-faint">{item.detail}</span>
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
