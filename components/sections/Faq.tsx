"use client";

import { motion } from "framer-motion";
import { buildContactWhatsAppUrl } from "@/lib/order";
import { fadeUp, VIEWPORT } from "@/lib/motion";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/hooks/use-locale";

type FaqProps = {
  showHeading?: boolean;
};

export function Faq({ showHeading = true }: FaqProps) {
  const { dict, locale } = useLocale();
  const page = dict.pages.faq;

  return (
    <section
      id="faq"
      aria-label={page.eyebrow}
      className={showHeading ? "bg-surface py-24 sm:py-32" : "py-16 sm:py-20"}
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        {showHeading && (
          <SectionHeading
            eyebrow={page.eyebrow}
            title={page.title}
            description={page.description}
          />
        )}

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <Accordion items={dict.faqs} />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-8 text-center text-sm text-ink-soft"
        >
          {locale === "en" ? (
            <>
              Another question?{" "}
              <a
                href={buildContactWhatsAppUrl(undefined, dict)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-forest underline decoration-matcha-300 underline-offset-4 transition-colors hover:text-forest-mid"
              >
                Message us on WhatsApp
              </a>{" "}
              and a real person will reply.
            </>
          ) : (
            <>
              ¿Otra duda?{" "}
              <a
                href={buildContactWhatsAppUrl(undefined, dict)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-forest underline decoration-matcha-300 underline-offset-4 transition-colors hover:text-forest-mid"
              >
                Escríbenos por WhatsApp
              </a>{" "}
              y una persona real te responde.
            </>
          )}
        </motion.p>
      </div>
    </section>
  );
}
