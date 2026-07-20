"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer, VIEWPORT } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const REASONS = [
  {
    title: "Origen único, no mezclas anónimas",
    description:
      "Trabajamos con una sola cooperativa familiar en Uji. Sabemos el nombre del campo del que viene cada lata.",
  },
  {
    title: "Frescura garantizada",
    description:
      "Importamos en pequeños lotes cada temporada y envasamos en atmósfera protegida. Nunca venderemos matcha viejo.",
  },
  {
    title: "Análisis de pureza por lote",
    description:
      "Cada importación se analiza para verificar pureza y ausencia de contaminantes. El certificado viaja con tu pedido.",
  },
  {
    title: "Atención humana, respuesta en minutos",
    description:
      "Sin bots ni tickets. Escribes por WhatsApp y te responde una persona que toma matcha todos los días.",
  },
];

export function WhyUs() {
  return (
    <section aria-labelledby="porque-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Por qué elegirnos"
              title="Obsesionados con lo que no se ve"
              description="Cualquiera puede vender polvo verde. Nosotros construimos una cadena de frescura desde el campo hasta tu taza."
              align="left"
              className="mb-10 md:mb-12"
            />

            <motion.ul
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="space-y-6"
            >
              {REASONS.map((reason) => (
                <motion.li key={reason.title} variants={fadeUp} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-matcha-100 text-matcha-700">
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                      <path
                        d="M3 8.5l3.5 3.5L13 5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight text-ink">{reason.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {reason.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative"
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-sm shadow-lift">
              <Image
                src="/images/gallery-field.webp"
                alt="Campos de té de Uji al amanecer, cubiertos de niebla"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="glass absolute -bottom-6 right-5 rounded-2xl px-5 py-4 shadow-glass sm:right-8">
              <p className="text-sm font-semibold text-ink">Uji, Kioto — Japón</p>
              <p className="mt-0.5 text-xs text-ink-soft">
                La cuna del matcha desde el siglo XII
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
