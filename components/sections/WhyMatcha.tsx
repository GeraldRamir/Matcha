"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, VIEWPORT } from "@/lib/motion";
import { useLocale } from "@/hooks/use-locale";

const NODE_META = [
  { image: "/images/gallery-field.webp", side: "left" as const },
  { image: "/images/gallery-sifting.webp", side: "right" as const },
  { image: "/images/gallery-whisking.webp", side: "left" as const },
];

export function WhyMatcha() {
  const { t, dict } = useLocale();
  const nodes = dict.whyMatcha.nodes.map((node, i) => ({
    ...node,
    ...NODE_META[i],
  }));

  return (
    <section id="about-matcha" aria-labelledby="why-title" className="overflow-x-clip py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-medium tracking-[0.22em] text-matcha-mid uppercase">
            {dict.whyMatcha.eyebrow}
          </p>
          <h2
            id="why-title"
            className="mt-4 font-serif text-[1.75rem] font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            {dict.whyMatcha.title}
            <br />
            {dict.whyMatcha.titleLine2}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
            {dict.whyMatcha.body}
          </p>
        </motion.div>

        <div className="relative mt-16 sm:mt-20">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full text-matcha/30 lg:block"
            viewBox="0 0 1000 900"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M180 80 C 320 140, 420 220, 520 280 S 720 360, 780 420 S 620 560, 420 620 S 220 720, 280 820"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="180" cy="80" r="4" fill="currentColor" />
            <circle cx="780" cy="420" r="4" fill="currentColor" />
            <circle cx="280" cy="820" r="4" fill="currentColor" />
          </svg>

          <ul className="relative space-y-16 lg:space-y-24">
            {nodes.map((node, i) => (
              <motion.li
                key={node.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className={`flex flex-col items-center gap-8 lg:flex-row lg:gap-16 ${
                  node.side === "right" ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="relative mx-auto h-44 w-44 shrink-0 sm:h-56 sm:w-56 lg:mx-0 lg:h-64 lg:w-64">
                  <div aria-hidden className="glow-matcha absolute -inset-6 opacity-70" />
                  <div className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-line">
                    <Image
                      src={node.image}
                      alt={node.title}
                      fill
                      sizes="256px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-matcha-deep font-serif text-sm text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div
                  className={`max-w-sm text-center lg:text-left ${
                    node.side === "right" ? "lg:text-right" : ""
                  }`}
                >
                  <h3 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
                    {node.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                    {node.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-16 text-center"
        >
          <Link
            href="/origen"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-matcha-deep"
          >
            {t("whyMatcha.cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
