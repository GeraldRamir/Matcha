"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/lib/motion";

export function GreenBanner() {
  return (
    <section
      aria-label="Call to action"
      className="relative overflow-hidden bg-matcha-deep py-20 sm:py-28"
    >
      <p
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 font-serif text-[22vw] font-bold leading-none text-white/[0.08] select-none"
      >
        MATCHA
      </p>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 px-5 sm:px-8 lg:flex-row lg:justify-between lg:gap-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="max-w-md text-center lg:text-left"
        >
          <h2 className="font-serif text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
            Elevate Your
            <br />
            Morning Ritual
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            Ceremonial grade, stone-milled, ready for your bowl — or your iced latte.
          </p>
          <Link
            href="/pedido"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-cream px-8 text-sm font-semibold text-matcha-deep transition-colors hover:bg-white"
          >
            Shop Now
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80"
        >
          <div
            aria-hidden
            className="absolute inset-0 scale-110 rounded-full bg-matcha/35 blur-3xl"
          />
          <div className="relative h-full w-full -rotate-8">
            <Image
              src="/images/cutouts/latte-hero.png"
              alt="Matcha latte"
              fill
              sizes="320px"
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="hidden max-w-[12rem] text-right lg:block"
        >
          <p className="font-serif text-2xl font-bold text-cream/90">100% Organic</p>
          <p className="mt-2 text-sm text-cream/55">Uji · First Flush · Ceremonial</p>
        </motion.div>
      </div>
    </section>
  );
}
