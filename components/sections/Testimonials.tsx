"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { fadeUp, VIEWPORT } from "@/lib/motion";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const current = TESTIMONIALS[selected] ?? TESTIMONIALS[0];

  return (
    <section aria-label="Testimonials" className="overflow-x-clip py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.28em] text-matcha-mid uppercase">
              Customer Reviews
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Loved by Matcha Lovers
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => emblaApi?.scrollPrev()}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-matcha hover:text-matcha-deep"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next review"
              onClick={() => emblaApi?.scrollNext()}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-matcha hover:text-matcha-deep"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6"
        >
          {/* Floating product visuals */}
          <div className="relative mx-auto h-72 w-full max-w-md sm:h-80 lg:h-[26rem]">
            <div className="absolute top-4 left-6 h-36 w-36 overflow-hidden rounded-2xl sm:h-44 sm:w-44">
              <Image
                src="/images/gallery-latte-art.webp"
                alt=""
                fill
                sizes="176px"
                className="object-cover"
              />
            </div>
            <div className="absolute right-4 bottom-2 h-48 w-48 overflow-hidden rounded-full ring-4 ring-cream sm:h-56 sm:w-56 lg:right-8">
              <Image
                src="/images/hero-matcha.webp"
                alt=""
                fill
                sizes="224px"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Large green quote circle */}
          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center lg:max-w-lg">
            <div className="absolute inset-[4%] rounded-full bg-matcha-deep shadow-lift" />

            {/* Avatar clipped on top edge */}
            <div className="absolute top-0 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/4 flex-col items-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-cream bg-matcha-100 font-serif text-xl font-bold text-matcha-deep sm:h-16 sm:w-16">
                {current.name.charAt(0)}
              </span>
            </div>

            <blockquote className="relative z-[1] max-w-[78%] px-4 text-center">
              <p className="font-serif text-lg leading-snug text-cream sm:text-xl lg:text-2xl">
                &ldquo;{current.quote.slice(0, 140)}
                {current.quote.length > 140 ? "…" : ""}&rdquo;
              </p>
              <footer className="mt-6">
                <p className="text-sm font-semibold text-cream">{current.name}</p>
                <p className="mt-1 text-xs text-cream/60">{current.role}</p>
              </footer>
            </blockquote>
          </div>
        </motion.div>

        {/* Embla drives selection (visually hidden track for a11y/sync) */}
        <div className="sr-only" ref={emblaRef} aria-hidden>
          <div className="flex">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="min-w-0 shrink-0 grow-0 basis-full">
                {t.name}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to review ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                selected === i ? "w-6 bg-matcha-deep" : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
