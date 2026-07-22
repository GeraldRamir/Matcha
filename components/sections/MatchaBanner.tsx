"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scaleIn, VIEWPORT } from "@/lib/motion";
import { ButtonNav } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

/** Mid-page editorial banner — oversized MATCHA wordmark (right-ref style). */
export function MatchaBanner() {
  return (
    <section aria-label="Banner matcha" className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative overflow-hidden rounded-[2rem] bg-forest px-6 py-16 text-center shadow-lift sm:px-12 sm:py-20"
        >
          <h2
            aria-hidden
            className="font-hero pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-[clamp(4rem,18vw,12rem)] text-cream/10 select-none"
          >
            MATCHA
          </h2>

          <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center">
            <div className="relative mb-6 h-36 w-36 overflow-hidden rounded-full ring-4 ring-cream/20 sm:h-44 sm:w-44">
              <Image
                src="/images/gallery-latte-art.webp"
                alt=""
                fill
                className="object-cover"
                sizes="176px"
              />
            </div>
            <p className="font-serif text-2xl font-bold text-cream sm:text-3xl">
              Vibrant matcha, quiet energy
            </p>
            <p className="mt-3 text-sm text-cream/70">
              De Japón a tu ritual diario.
            </p>
            <ButtonNav
              href="/pedido"
              size="lg"
              className="mt-7 bg-cream text-forest hover:bg-white"
            >
              Ordenar ahora
              <ArrowRight className="h-4 w-4" />
            </ButtonNav>
          </div>

          <div className="absolute top-6 right-6 flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-cream/40 text-[9px] font-bold tracking-wide text-cream/80 uppercase">
            Since
            <br />
            2024
          </div>
        </motion.div>
      </div>
    </section>
  );
}
