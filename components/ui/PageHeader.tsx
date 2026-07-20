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
    <header className="relative overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-14">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-matcha/15 blur-3xl"
      />
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-7xl px-5 sm:px-8"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-medium tracking-[0.22em] text-matcha-mid uppercase"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="mt-4 max-w-3xl font-serif text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </header>
  );
}
