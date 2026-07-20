"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/lib/motion";

const FLOW = [
  {
    title: "Calm, clear energy",
    body: "L-theanine unlocks caffeine slowly — steady focus for hours, without jitters or crash.",
    image: "/images/gallery-leaves.webp",
    align: "start" as const,
  },
  {
    title: "Whole-leaf nutrition",
    body: "You drink the leaf itself. Concentrated antioxidants and catechins in every silky sip.",
    image: "/images/hero-matcha.webp",
    align: "end" as const,
  },
  {
    title: "A daily pause",
    body: "Three quiet minutes with a whisk and a bowl — ritual that resets body and mind.",
    image: "/images/gallery-whisking.webp",
    align: "start" as const,
  },
];

export function Benefits() {
  return (
    <section id="benefits" aria-label="Benefits" className="overflow-x-clip py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="max-w-xl"
        >
          <p className="text-xs font-medium tracking-[0.22em] text-matcha-mid uppercase">
            Experience
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Energize Your Day
            <br />
            With Vibrant Matcha.
          </h2>
        </motion.div>

        <div className="relative mt-16 sm:mt-20">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full text-matcha/30 lg:block"
            viewBox="0 0 1100 780"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M220 90 C 380 160, 520 200, 680 260 S 920 380, 860 480 S 520 560, 360 640 S 180 720, 260 760"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>

          <ul className="relative space-y-20 lg:space-y-28">
            {FLOW.map((item) => (
              <motion.li
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className={`flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-20 ${
                  item.align === "end" ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="relative h-52 w-52 shrink-0 sm:h-64 sm:w-64 lg:h-72 lg:w-72">
                  <div aria-hidden className="glow-matcha absolute -inset-8" />
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="288px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div
                  className={`max-w-md text-center lg:text-left ${
                    item.align === "end" ? "lg:text-right" : ""
                  }`}
                >
                  <h3 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
                    {item.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
