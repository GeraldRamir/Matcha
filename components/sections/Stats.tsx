"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";

const STATS = [
  { end: 30, suffix: "K+", label: "Cups Served" },
  { end: 80, suffix: "K+", label: "Orders Delivered" },
  { end: 98, suffix: "%", label: "Positive Reviews" },
  { end: 100, suffix: "%", label: "Organic Matcha" },
];

function StatItem({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref}>
      <p className="font-serif text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        {inView ? <CountUp end={end} duration={1.8} suffix={suffix} /> : `0${suffix}`}
      </p>
      <p className="mt-2 text-sm text-ink-faint">{label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section aria-label="Statistics" className="border-y border-line py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-10 lg:grid-cols-[1.2fr_1fr]"
        >
          <motion.div variants={fadeUp}>
            <h2 className="max-w-md font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Crafting Triumph With Every Matcha Sip.
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <StatItem key={s.label} {...s} />
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["V", "D", "C", "S"].map((i) => (
                  <span
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-cream bg-matcha-100 text-xs font-semibold text-matcha-deep"
                  >
                    {i}
                  </span>
                ))}
              </div>
              <p className="text-sm text-ink-soft">Loved by 2,400+ customers</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative min-h-[14rem] overflow-hidden rounded-3xl sm:min-h-[18rem]"
          >
            <Image
              src="/images/gallery-whisking.webp"
              alt="Traditional matcha bowls"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
