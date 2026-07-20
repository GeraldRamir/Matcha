"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FlaskConical, Leaf, Sparkles, Zap } from "lucide-react";
import { EASE, fadeLeft, fadeRight, staggerContainer } from "@/lib/motion";

const CHIPS = [
  { icon: Leaf, title: "65% less acidity", detail: "Gentler on your stomach" },
  { icon: Zap, title: "2× more caffeine", detail: "Calm, sustained focus" },
  { icon: FlaskConical, title: "21-day shaded", detail: "First-flush Uji leaves" },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative pt-24 pb-8 sm:pt-28 sm:pb-12"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center text-[11px] font-medium tracking-[0.22em] text-ink-faint sm:text-xs"
        >
          Matcha Magic: Just the Leaf, No Additives
        </motion.p>

        <div className="relative mx-auto mt-1 w-full max-w-[92vw] pb-[32%] sm:pb-[28%] lg:pb-[24%]">
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.85, ease: EASE }}
            className="font-hero relative z-0 text-center text-[clamp(4.75rem,18vw,12.75rem)] leading-[0.8] text-ink select-none"
          >
            <span className="relative inline-block">
              MATCHA
              <Sparkles
                className="absolute top-[6%] -left-[3.5%] h-3.5 w-3.5 text-matcha sm:h-5 sm:w-5 lg:h-6 lg:w-6"
                fill="currentColor"
                aria-hidden
              />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.48, duration: 0.55, ease: EASE }}
            className="absolute top-0 right-0 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-matcha-mid/80 bg-matcha/20 text-center sm:right-[2%] sm:h-[4.25rem] sm:w-[4.25rem] lg:right-[4%]"
          >
            <span className="font-serif text-[8px] leading-tight font-bold tracking-wide text-matcha-deep uppercase sm:text-[10px]">
              Pure
              <br />
              Uji
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36, rotate: 10, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, rotate: -18, scale: 1 }}
            transition={{ delay: 0.18, duration: 1.05, ease: EASE }}
            className="pointer-events-none absolute top-[32%] left-1/2 z-10 w-[68%] max-w-[26rem] -translate-x-1/2 -translate-y-[8%] sm:w-[52%] sm:max-w-[30rem] lg:max-w-[32rem]"
          >
            <div
              aria-hidden
              className="glow-matcha absolute top-1/2 left-1/2 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2"
            />
            <div className="relative aspect-square w-full">
              <Image
                src="/images/cutouts/latte-hero.png"
                alt="Iced ceremonial matcha latte"
                width={900}
                height={935}
                priority
                className="h-full w-full object-contain object-center drop-shadow-[0_36px_70px_rgba(61,89,48,0.35)]"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer(0.1, 0.28)}
          initial="hidden"
          animate="visible"
          className="relative z-20 -mt-6 grid items-end gap-8 sm:-mt-10 lg:-mt-14 lg:grid-cols-[1fr_minmax(0,12rem)_1fr]"
        >
          <motion.div variants={fadeLeft} className="max-w-[17rem]">
            <p className="text-sm leading-relaxed text-ink-soft">
              First-flush Uji leaves, stone-milled for a silky umami cup. Calm
              energy without the crash — your daily ritual, elevated.
            </p>
            <Link
              href="/pedido"
              className="mt-5 inline-flex h-11 items-center rounded-md bg-matcha-deep px-7 text-sm font-medium text-cream transition-colors hover:bg-ink"
            >
              Buy Now
            </Link>
          </motion.div>

          <div className="hidden lg:block" aria-hidden />

          <motion.ul variants={fadeRight} className="flex flex-col gap-3 sm:ml-auto sm:max-w-[15rem]">
            {CHIPS.map((chip) => (
              <li
                key={chip.title}
                className="group flex items-center gap-3 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-matcha-100 text-matcha-deep">
                  <chip.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{chip.title}</span>
                  <span className="text-xs text-ink-faint">{chip.detail}</span>
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
