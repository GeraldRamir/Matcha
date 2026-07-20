"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, scaleIn, VIEWPORT } from "@/lib/motion";
import { ButtonNav } from "@/components/ui/Button";

type CtaBannerProps = {
  title?: string;
  description?: string;
};

export function CtaBanner({
  title = "Tu ritual empieza hoy",
  description = "Arma tu pedido en 2 minutos. Recíbelo en 24–48 h. Sin registro — confirmas por WhatsApp o email.",
}: CtaBannerProps) {
  return (
    <section aria-label="Llamado a ordenar" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative overflow-hidden rounded-[2rem] bg-forest px-7 py-16 text-center shadow-lift sm:px-12 sm:py-20"
        >
          <div
            aria-hidden
            className="absolute -top-20 left-1/2 h-64 w-[28rem] -translate-x-1/2 rounded-full bg-forest-soft/50 blur-3xl"
          />
          <motion.p
            variants={fadeUp}
            className="relative text-xs font-medium tracking-[0.3em] text-olive-soft uppercase"
          >
            Begin your pause
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="relative mx-auto mt-4 max-w-2xl font-serif text-3xl font-medium text-balance text-cream sm:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/75"
          >
            {description}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="relative mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <ButtonNav
              href="/pedido"
              size="lg"
              className="bg-cream text-forest shadow-lift hover:bg-white"
            >
              Hacer mi pedido
              <ArrowRight className="h-4 w-4" />
            </ButtonNav>
            <ButtonNav
              href="/productos"
              size="lg"
              className="border border-cream/30 bg-transparent text-cream hover:bg-forest-mid"
            >
              Ver la tienda
            </ButtonNav>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
