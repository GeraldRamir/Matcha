"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, fadeUp, VIEWPORT } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURES = [
  {
    id: "01",
    title: "Energía sin bajón",
    body: "L-teanina + cafeína natural: foco estable 4–6 horas, sin el crash del café.",
    image: "/images/gallery-whisking.webp",
  },
  {
    id: "02",
    title: "Hoja entera",
    body: "Bebes la hoja molida. Densidad de nutrientes, no agua teñida de verde.",
    image: "/images/gallery-sifting.webp",
  },
  {
    id: "03",
    title: "Ritual, no hábito",
    body: "Dos minutos de batido consciente. Se prepara, se respira, se disfruta.",
    image: "/images/gallery-latte-art.webp",
  },
];

export function Features() {
  return (
    <section id="beneficios" aria-label="Beneficios" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why matcha"
          title="Lo que el café nunca"
          scriptWord="capturará"
          description="La única bebida que combina cafeína natural con L-teanina: energía estable y calma alerta."
        />

        <div className="space-y-16 lg:space-y-24">
          {FEATURES.map((f, i) => (
            <div
              key={f.id}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14 lg:odd:[&>*:first-child]:order-2"
            >
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
              >
                <p className="text-xs font-medium tracking-[0.25em] text-olive uppercase">
                  {f.id}
                </p>
                <h3 className="mt-3 font-serif text-3xl font-medium text-ink">{f.title}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">{f.body}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.8, ease: EASE }}
                className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-soft"
              >
                <Image
                  src={f.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
