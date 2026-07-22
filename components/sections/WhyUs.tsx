"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer, VIEWPORT } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/hooks/use-locale";

export function WhyUs() {
  const { dict } = useLocale();
  const reasons = dict.whyUs.reasons;

  return (
    <section aria-labelledby="porque-title" className="overflow-x-clip py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={dict.whyUs.eyebrow}
              title={dict.whyUs.title}
              description={dict.whyUs.description}
              align="left"
              className="mb-10 md:mb-12"
            />

            <motion.ul
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="space-y-6"
            >
              {reasons.map((reason) => (
                <motion.li key={reason.title} variants={fadeUp} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-matcha-deep">
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                      <path
                        d="M3 8.5l3.5 3.5L13 5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight text-ink">{reason.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {reason.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative h-full min-h-[20rem] lg:min-h-[28rem]"
          >
            <div className="relative h-full min-h-[20rem] w-full overflow-hidden rounded-sm shadow-lift lg:min-h-[28rem]">
              <Image
                src="/images/gallery-field.webp"
                alt={dict.whyUs.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="glass absolute right-3 -bottom-5 max-w-[calc(100%-1.5rem)] rounded-2xl px-4 py-3 sm:right-8 sm:-bottom-6 sm:px-5 sm:py-4">
              <p className="text-sm font-semibold text-ink">Japón · EE. UU. · RD</p>
              <p className="mt-0.5 text-xs text-ink-soft">
                El camino de Solae Matcha
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
