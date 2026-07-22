"use client";

import { motion } from "framer-motion";
import { MessageCircle, Package, UserRound } from "lucide-react";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { useLocale } from "@/hooks/use-locale";

const STEP_ICONS = [Package, UserRound, MessageCircle];

type OrderProcessProps = { showCta?: boolean };

export function OrderProcess({ showCta = true }: OrderProcessProps) {
  const { dict } = useLocale();
  const steps = dict.orderProcess.steps.map((step, i) => ({
    ...step,
    icon: STEP_ICONS[i],
  }));

  return (
    <section aria-labelledby="proceso-title" className="border-t border-line bg-cream-soft py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
        >
          <p className="text-xs font-medium tracking-[0.22em] text-matcha-mid uppercase">
            {dict.orderProcess.eyebrow}
          </p>
          <h2
            id="proceso-title"
            className="mt-4 font-serif text-[1.75rem] font-bold tracking-tight text-ink sm:text-4xl"
          >
            {dict.orderProcess.title}
          </h2>
          <p className="mt-4 text-ink-soft">
            {dict.orderProcess.body}
          </p>
        </motion.div>

        <motion.ol
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-8 sm:grid-cols-3"
        >
          {steps.map((step, i) => (
            <motion.li key={step.title} variants={fadeUp} className="text-center sm:text-left">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-matcha-100 text-matcha-deep sm:mx-0">
                <step.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <p className="mt-5 text-[11px] font-medium tracking-[0.2em] text-matcha-mid uppercase">
                Paso {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-serif text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
            </motion.li>
          ))}
        </motion.ol>

        {showCta && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-14 text-center"
          >
            <a
              href="/pedido"
              className="inline-flex h-12 items-center justify-center rounded-md bg-ink px-8 text-sm font-semibold text-cream transition-colors hover:bg-matcha-deep"
            >
              {dict.orderProcess.start}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
