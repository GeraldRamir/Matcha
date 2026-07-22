"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer, VIEWPORT } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/hooks/use-locale";

const STEP_NUMBERS = ["01", "02", "03"];

export function HowItWorks() {
  const { dict } = useLocale();
  const steps = dict.howItWorks.steps.map((step, i) => ({
    ...step,
    number: STEP_NUMBERS[i],
  }));

  return (
    <section id="origen" aria-labelledby="origen-title" className="overflow-x-clip py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-3/4 overflow-hidden rounded-sm shadow-lift">
              <Image
                src="/images/gallery-whisking.webp"
                alt={dict.howItWorks.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="glass absolute -right-4 -bottom-5 hidden rounded-2xl px-5 py-4 sm:block lg:-right-8">
              <p className="text-3xl font-semibold tracking-tight text-matcha-deep">
                {dict.howItWorks.stepsLabel}
              </p>
              <p className="mt-0.5 text-xs text-ink-soft">{dict.howItWorks.routeLabel}</p>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow={dict.howItWorks.eyebrow}
              title={dict.howItWorks.title}
              description={dict.howItWorks.description}
              align="left"
              className="mb-10 md:mb-12"
            />

            <motion.ol
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="space-y-2"
            >
              {steps.map((step, index) => (
                <motion.li
                  key={step.number}
                  variants={fadeUp}
                  className="group relative flex gap-6 rounded-sm p-5 transition-colors duration-300 hover:bg-cream-soft sm:p-6"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-sm font-medium text-matcha-mid">
                      {step.number}
                    </span>
                    {index < steps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="mt-3 w-px flex-1 bg-gradient-to-b from-line to-transparent"
                      />
                    )}
                  </div>
                  <div className="pb-2">
                    <h3 className="text-lg font-semibold tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </div>
    </section>
  );
}
