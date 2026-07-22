"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/lib/motion";
import { useLocale } from "@/hooks/use-locale";

export function GreenBanner() {
  const { t, dict } = useLocale();

  return (
    <section
      aria-label={dict.greenBanner.aria}
      className="relative overflow-hidden bg-matcha-deep py-14 sm:py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgb(255_238_162/0.12),transparent_55%)]"
      />
      <p
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 font-serif text-[22vw] font-bold leading-none text-gold/[0.08] select-none"
      >
        SOLAE
      </p>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 sm:gap-10 sm:px-8 lg:flex-row lg:justify-between lg:gap-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="max-w-md text-center lg:text-left"
        >
          <h2 className="font-serif text-[1.75rem] font-bold text-gold sm:text-4xl lg:text-5xl">
            {dict.greenBanner.title}
            <br />
            {dict.greenBanner.titleLine2}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cream/75">
            {dict.greenBanner.body}
          </p>
          <Link
            href="/pedido"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-gold px-8 text-sm font-semibold text-matcha-deep transition-colors hover:bg-gold-soft"
          >
            {dict.greenBanner.cta}
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
            className="absolute inset-0 scale-110 rounded-full bg-gold/20 blur-3xl"
          />
          <div className="relative h-full w-full -rotate-8">
            <Image
              src="/images/cutouts/latte-hero.png"
              alt={t("hero.latteAlt")}
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
          <p className="font-serif text-2xl font-bold text-gold">Casa Solae</p>
          <p className="mt-2 text-sm text-cream/55">{dict.greenBanner.route}</p>
        </motion.div>
      </div>
    </section>
  );
}
