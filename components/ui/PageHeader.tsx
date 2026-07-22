"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden pt-24 pb-8 sm:pt-32 sm:pb-14">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-48 w-[min(100vw,36rem)] -translate-x-1/2 rounded-full bg-matcha/15 blur-3xl sm:h-64"
      />
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-7xl px-4 sm:px-8"
      >
        <motion.p
          variants={fadeUp}
          className="text-[11px] font-medium tracking-[0.2em] text-matcha-mid uppercase sm:text-xs sm:tracking-[0.22em]"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="mt-3 max-w-3xl font-serif text-[1.85rem] leading-tight font-bold tracking-tight text-ink sm:mt-4 sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft sm:mt-5 sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </header>
  );
}
