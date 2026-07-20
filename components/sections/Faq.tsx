"use client";

import { motion } from "framer-motion";
import { FAQS } from "@/data/faqs";
import { buildContactWhatsAppUrl } from "@/lib/order";
import { fadeUp, VIEWPORT } from "@/lib/motion";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FaqProps = {
  /** Oculta el encabezado cuando la página ya tiene un PageHeader propio. */
  showHeading?: boolean;
};

export function Faq({ showHeading = true }: FaqProps) {
  return (
    <section
      id="faq"
      aria-label="Preguntas frecuentes"
      className={showHeading ? "bg-surface py-24 sm:py-32" : "py-16 sm:py-20"}
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        {showHeading && (
          <SectionHeading
            eyebrow="FAQ"
            title="Todo lo que querías"
            scriptWord="saber"
            description="Y si tu pregunta no está aquí, escríbenos por WhatsApp."
          />
        )}

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <Accordion items={FAQS} />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-8 text-center text-sm text-ink-soft"
        >
          ¿Otra duda?{" "}
          <a
            href={buildContactWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-forest underline decoration-matcha-300 underline-offset-4 transition-colors hover:text-forest-mid"
          >
            Escríbenos por WhatsApp
          </a>{" "}
          y una persona real te responde.
        </motion.p>
      </div>
    </section>
  );
}
