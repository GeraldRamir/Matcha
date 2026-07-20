"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Focus, Leaf, Moon, Sparkles } from "lucide-react";
import { fadeUp, scaleIn, VIEWPORT } from "@/lib/motion";
import { ButtonNav } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Mood = {
  id: string;
  label: string;
  icon: typeof Leaf;
  product: string;
  productId: string;
  image: string;
  taste: string;
  ingredients: string;
  time: string;
  blurb: string;
};

const MOODS: Mood[] = [
  {
    id: "calm",
    label: "Calm",
    icon: Leaf,
    product: "Ceremonial Uji",
    productId: "ceremonial",
    image: "/images/product-ceremonial.webp",
    taste: "Umami dulce · sedoso",
    ingredients: "Tencha 1ª cosecha, agua a 75°C",
    time: "2 min",
    blurb: "La pausa clásica. Silencio en taza, color de jade.",
  },
  {
    id: "unwind",
    label: "Unwind",
    icon: Sparkles,
    product: "Blend para Latte",
    productId: "latte",
    image: "/images/product-latte.webp",
    taste: "Intenso · cremoso",
    ingredients: "Matcha + leche vegetal + hielo",
    time: "3 min",
    blurb: "Un latte frío para bajar el ritmo sin apagar el día.",
  },
  {
    id: "reset",
    label: "Reset",
    icon: Moon,
    product: "Blend Diario",
    productId: "diario",
    image: "/images/product-daily.webp",
    taste: "Vegetal fresco · limpio",
    ingredients: "2 g matcha, agua o leche",
    time: "2 min",
    blurb: "Reinicia la mente a media tarde, sin ansiedad.",
  },
  {
    id: "focus",
    label: "Focus",
    icon: Focus,
    product: "Kit Ceremonial",
    productId: "kit",
    image: "/images/product-kit.webp",
    taste: "Ritual completo",
    ingredients: "Chawan + chasen + Ceremonial Uji",
    time: "5 min",
    blurb: "El ritual completo: prepara, respira, enfoca.",
  },
];

/** Interactive mood → product composer (Pause Matcha Bar inspired). */
export function MoodComposer() {
  const [active, setActive] = useState(MOODS[0]);

  return (
    <section aria-labelledby="composer-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-12"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[-10%] h-64 w-64 rounded-full bg-matcha-200/40 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <p className="text-xs font-medium tracking-[0.25em] text-olive uppercase">
                Matcha composer
              </p>
              <h2
                id="composer-title"
                className="mt-3 font-serif text-3xl font-medium text-ink sm:text-4xl"
              >
                Choose the mood for your{" "}
                <span className="font-script text-[1.2em] text-forest-mid">pause</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Selecciona cómo quieres sentirte. Componemos el matcha ideal
                para ese momento.
              </p>

              <div
                role="radiogroup"
                aria-label="Estado de ánimo"
                className="mt-8 grid grid-cols-2 gap-3"
              >
                {MOODS.map((mood) => {
                  const selected = active.id === mood.id;
                  return (
                    <button
                      key={mood.id}
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setActive(mood)}
                      className={cn(
                        "flex cursor-pointer flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300",
                        selected
                          ? "border-forest bg-forest text-cream shadow-soft"
                          : "border-line bg-surface/60 text-ink hover:border-forest-soft hover:bg-surface"
                      )}
                    >
                      <mood.icon
                        className={cn("h-5 w-5", selected ? "text-cream" : "text-forest")}
                        strokeWidth={1.5}
                      />
                      <span className="text-sm font-medium">{mood.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="rounded-[1.5rem] border border-line bg-surface p-5 shadow-soft sm:p-7"
              >
                <p className="text-[10px] font-medium tracking-[0.2em] text-olive uppercase">
                  Composed for you
                </p>
                <div className="mt-4 flex flex-col gap-5 sm:flex-row">
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl bg-stage sm:w-44">
                    <Image
                      src={active.image}
                      alt={active.product}
                      fill
                      sizes="176px"
                      className="object-contain p-3"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="font-serif text-2xl font-semibold text-ink">
                      {active.product}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {active.blurb}
                    </p>
                    <dl className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between gap-4 border-b border-line-soft pb-2">
                        <dt className="text-ink-faint">Perfil</dt>
                        <dd className="font-medium text-ink">{active.taste}</dd>
                      </div>
                      <div className="flex justify-between gap-4 border-b border-line-soft pb-2">
                        <dt className="text-ink-faint">Preparación</dt>
                        <dd className="font-medium text-ink">{active.time}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-ink-faint">Notas</dt>
                        <dd className="max-w-[60%] text-right text-ink-soft">
                          {active.ingredients}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-6">
                      <ButtonNav href="/pedido" size="md">
                        Pedir este matcha
                        <ArrowRight className="h-4 w-4" />
                      </ButtonNav>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Process micro-steps */}
          <motion.ol
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative mt-10 grid gap-4 border-t border-line/60 pt-8 sm:grid-cols-3"
          >
            {[
              { n: "01", t: "Sense", d: "Elige tu mood" },
              { n: "02", t: "Compose", d: "Recibe tu blend" },
              { n: "03", t: "Pause", d: "Disfruta el ritual" },
            ].map((step) => (
              <li key={step.n} className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-soft font-serif text-lg text-forest">
                  {step.n}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{step.t}</span>
                  <span className="text-xs text-ink-faint">{step.d}</span>
                </span>
              </li>
            ))}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
}
