"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GsapReveal } from "@/components/ui/GsapReveal";
import { OriginJourney } from "@/components/sections/OriginJourney";
import { useLocale } from "@/hooks/use-locale";

const NODE_IMAGES = [
  "/images/gallery-field.webp",
  "/images/gallery-sifting.webp",
  "/images/gallery-whisking.webp",
];

export function WhyMatcha() {
  const { t, dict } = useLocale();
  const steps = dict.whyMatcha.nodes.map((node, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: node.title,
    body: node.body,
    image: NODE_IMAGES[i] ?? NODE_IMAGES[0],
  }));

  return (
    <section
      id="about-matcha"
      aria-labelledby="why-title"
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
            {dict.whyMatcha.eyebrow}
          </p>
          <h2
            id="why-title"
            data-reveal
            className="mt-4 font-serif text-[1.75rem] font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            {dict.whyMatcha.title}
            <br />
            {dict.whyMatcha.titleLine2}
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base"
          >
            {dict.whyMatcha.body}
          </p>
        </GsapReveal>

        <OriginJourney steps={steps} className="mt-14 sm:mt-20" />

        <GsapReveal className="mt-16 text-center sm:mt-20">
          <Link
            href="/origen"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-matcha-deep"
          >
            {t("whyMatcha.cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </GsapReveal>
      </div>
    </section>
  );
}
