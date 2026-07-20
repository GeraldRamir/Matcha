"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AccordionItem = { question: string; answer: string };
type AccordionProps = { items: AccordionItem[]; className?: string };

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div
      className={cn(
        "divide-y divide-line overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-soft",
        className
      )}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const headerId = `${baseId}-header-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left hover:bg-cream-soft/50 sm:px-8 sm:py-6"
              >
                <span className="font-serif text-lg text-ink transition-colors group-hover:text-forest sm:text-xl">
                  {item.question}
                </span>
                <motion.span
                  aria-hidden
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft group-hover:border-forest group-hover:text-forest"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-ink-soft sm:px-8 sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
