"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer, VIEWPORT } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  {
    number: "01",
    title: "Cultivo a la sombra",
    description:
      "Tres semanas antes de la cosecha, las plantas se cubren para multiplicar la clorofila y la L-teanina. Así nace el verde jade y el dulzor umami.",
  },
  {
    number: "02",
    title: "Molienda en piedra",
    description:
      "Las hojas tencha se muelen lentamente en molinos de granito: 30 gramos por hora. La fricción mínima protege el aroma y los nutrientes.",
  },
  {
    number: "03",
    title: "Tu ritual de 2 minutos",
    description:
      "Tamiza 2 g, agrega 70 ml de agua a 75 °C y bate en forma de “W” durante 30 segundos. Espuma fina, sabor limpio, energía para todo el día.",
  },
];

export function HowItWorks() {
  return (
    <section id="origen" aria-labelledby="origen-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-3/4 overflow-hidden rounded-sm shadow-lift">
              <Image
                src="/images/gallery-whisking.webp"
                alt="Preparación tradicional de matcha con chasen de bambú"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="glass absolute -right-4 -bottom-5 hidden rounded-2xl px-5 py-4 shadow-glass sm:block lg:-right-8">
              <p className="text-3xl font-semibold tracking-tight text-matcha-700">75 °C</p>
              <p className="mt-0.5 text-xs text-ink-soft">La temperatura exacta del agua</p>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Cómo funciona"
              title="De la hoja a tu taza"
              description="Un proceso de 400 años de tradición, desde los campos nublados de Uji hasta tu ritual de cada mañana."
              align="left"
              className="mb-10 md:mb-12"
            />

            <motion.ol
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="space-y-2"
            >
              {STEPS.map((step, index) => (
                <motion.li
                  key={step.number}
                  variants={fadeUp}
                  className="group relative flex gap-6 rounded-sm p-5 transition-colors duration-300 hover:bg-surface sm:p-6"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-sm font-medium text-matcha-600">
                      {step.number}
                    </span>
                    {index < STEPS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="mt-3 w-px flex-1 bg-gradient-to-b from-line to-transparent"
                      />
                    )}
                  </div>
                  <div className="pb-2">
                    <h3 className="text-lg font-semibold tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </div>
    </section>
  );
}
