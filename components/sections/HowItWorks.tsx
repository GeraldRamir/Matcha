"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { OriginJourney } from "@/components/sections/OriginJourney";
import { useLocale } from "@/hooks/use-locale";

const STEP_IMAGES = [
  "/images/gallery-field.webp",
  "/images/gallery-sifting.webp",
  "/images/gallery-whisking.webp",
];

export function HowItWorks() {
  const { dict } = useLocale();
  const steps = dict.howItWorks.steps.map((step, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: step.title,
    body: step.description,
    image: STEP_IMAGES[i] ?? STEP_IMAGES[0],
  }));

  return (
    <section
      id="origen"
      aria-labelledby="origen-title"
      className="overflow-x-clip py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          eyebrow={dict.howItWorks.eyebrow}
          title={dict.howItWorks.title}
          description={dict.howItWorks.description}
          className="mb-12 md:mb-16"
        />

        <OriginJourney steps={steps} />
      </div>
    </section>
  );
}
