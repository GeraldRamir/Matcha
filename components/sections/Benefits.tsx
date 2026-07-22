"use client";

import { GsapReveal } from "@/components/ui/GsapReveal";
import { OriginJourney } from "@/components/sections/OriginJourney";
import { useLocale } from "@/hooks/use-locale";

const BENEFIT_IMAGES = [
  "/images/gallery-leaves.webp",
  "/images/hero-matcha.webp",
  "/images/gallery-whisking.webp",
];

export function Benefits() {
  const { dict } = useLocale();
  const steps = dict.benefits.items.map((item, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: item.title,
    body: item.body,
    image: BENEFIT_IMAGES[i] ?? BENEFIT_IMAGES[0],
  }));

  return (
    <section
      id="benefits"
      aria-label={dict.benefits.aria}
      className="overflow-x-clip py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <GsapReveal
          className="mx-auto max-w-2xl text-center"
          childSelector="[data-reveal]"
          stagger={0.08}
        >
          <p
            data-reveal
            className="text-xs font-medium tracking-[0.22em] text-matcha-mid uppercase"
          >
            {dict.benefits.eyebrow}
          </p>
          <h2
            data-reveal
            className="mt-4 font-serif text-[1.75rem] font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            {dict.benefits.title}
            <br />
            {dict.benefits.titleLine2}
          </h2>
        </GsapReveal>

        <OriginJourney steps={steps} className="mt-14 sm:mt-20" />
      </div>
    </section>
  );
}
