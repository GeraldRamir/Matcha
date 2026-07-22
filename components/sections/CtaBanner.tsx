"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, scaleIn, VIEWPORT } from "@/lib/motion";
import { ButtonNav } from "@/components/ui/Button";
import { useLocale } from "@/hooks/use-locale";

type CtaBannerProps = {
  title?: string;
  description?: string;
};

export function CtaBanner({ title, description }: CtaBannerProps) {
  const { dict } = useLocale();
  const resolvedTitle = title ?? dict.ctaBanner.defaultTitle;
  const resolvedDescription = description ?? dict.ctaBanner.defaultBody;

  return (
    <section aria-label="Llamado a ordenar" className="py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative overflow-hidden rounded-[1.5rem] bg-forest px-5 py-12 text-center shadow-lift sm:rounded-[2rem] sm:px-12 sm:py-20"
        >
          <div
            aria-hidden
            className="absolute -top-20 left-1/2 h-64 w-[min(100vw,28rem)] -translate-x-1/2 rounded-full bg-forest-soft/50 blur-3xl"
          />
          <motion.p
            variants={fadeUp}
            className="relative text-xs font-medium tracking-[0.3em] text-olive-soft uppercase"
          >
            {dict.ctaBanner.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="relative mx-auto mt-4 max-w-2xl font-serif text-[1.75rem] font-medium text-balance text-cream sm:text-5xl"
          >
            {resolvedTitle}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="relative mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/75 sm:text-base"
          >
            {resolvedDescription}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="relative mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <ButtonNav
              href="/pedido"
              size="lg"
              className="w-full bg-cream text-forest shadow-lift hover:bg-white sm:w-auto"
            >
              {dict.ctaBanner.order}
              <ArrowRight className="h-4 w-4" />
            </ButtonNav>
            <ButtonNav
              href="/productos"
              size="lg"
              className="w-full border border-cream/30 bg-transparent text-cream hover:bg-forest-mid sm:w-auto"
            >
              {dict.ctaBanner.shop}
            </ButtonNav>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
