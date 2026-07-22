"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/lib/motion";

export function FinalCta() {
  return (
    <section aria-label="Llamado a la acción" className="bg-cream pt-12 pb-4 sm:pt-16 sm:pb-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative overflow-hidden rounded-[1.75rem] bg-matcha-deep px-6 py-16 text-center sm:rounded-[2rem] sm:px-12 sm:py-20 lg:rounded-[2.25rem] lg:py-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-10 h-56 bg-[radial-gradient(ellipse_at_top,rgb(255_238_162_/_0.28),transparent_60%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_120%,rgb(26_92_77_/_0.55),transparent_45%)]"
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-cream sm:text-4xl lg:text-[3.25rem] lg:leading-[1.1]">
              ¿Listo para tu ritual de matcha?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-gold-muted/90 sm:text-base">
              Matcha ceremonial premium de Casa Solae. Pide por WhatsApp o email
              y lleva el bienestar a cada taza.
            </p>
            <Link
              href="/pedido"
              className="mt-9 inline-flex h-12 items-center justify-center rounded-full bg-cream px-9 text-sm font-bold text-matcha-deep transition-colors hover:bg-gold"
            >
              Empezar pedido
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
