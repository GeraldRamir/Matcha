"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, GSAP_EASE } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export type JourneyStep = {
  number: string;
  title: string;
  body: string;
  image: string;
};

type OriginJourneyProps = {
  steps: JourneyStep[];
  className?: string;
};

/**
 * Diagonal journey: circular photos + curved connector path.
 * Odd steps: image left / copy right. Even: copy left / image right.
 */
export function OriginJourney({ steps, className }: OriginJourneyProps) {
  const root = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = root.current;
      const path = pathRef.current;
      if (!el) return;

      const cards = el.querySelectorAll("[data-journey-step]");

      if (reduced) {
        gsap.set(cards, { clearProps: "all", opacity: 1, y: 0 });
        if (path) gsap.set(path, { strokeDashoffset: 0 });
        return;
      }

      gsap.from(cards, {
        opacity: 0,
        y: 36,
        duration: 0.85,
        stagger: 0.18,
        ease: GSAP_EASE,
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          once: true,
        },
      });

      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            once: true,
          },
        });
      }
    },
    { scope: root, dependencies: [reduced, steps.length] }
  );

  return (
    <div ref={root} className={cn("relative", className)}>
      {/* Desktop curved path — sits behind the steps */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
        viewBox="0 0 1000 1100"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          ref={pathRef}
          d="M 220 155 C 420 155, 560 250, 500 340 C 440 430, 640 500, 780 560 C 900 610, 760 760, 240 880"
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-ink/20"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="500" cy="340" r="5" className="fill-matcha-deep/35" />
        <circle cx="500" cy="340" r="2.5" className="fill-gold" />
        <circle cx="780" cy="560" r="5" className="fill-matcha-deep/35" />
        <circle cx="780" cy="560" r="2.5" className="fill-gold" />
      </svg>

      <ol className="relative z-10 space-y-16 sm:space-y-20 lg:space-y-28">
        {steps.map((step, i) => {
          const imageLeft = i % 2 === 0;
          return (
            <li
              key={step.number}
              data-journey-step
              className={cn(
                "grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16",
                !imageLeft && "lg:[&>*:first-child]:order-2"
              )}
            >
              <div className="relative mx-auto w-[min(100%,18rem)] sm:w-[min(100%,20rem)] lg:mx-0 lg:w-[min(100%,22rem)] lg:justify-self-center">
                <div className="relative aspect-square overflow-hidden rounded-full bg-cream-soft shadow-[0_24px_60px_rgba(12,64,53,0.14)] ring-1 ring-ink/5">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 1024px) 80vw, 22rem"
                    className="object-cover"
                  />
                </div>
                <span className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-matcha-deep font-serif text-sm font-semibold text-gold shadow-soft sm:top-3 sm:right-3 sm:h-12 sm:w-12">
                  {step.number}
                </span>
              </div>

              <div
                className={cn(
                  "mx-auto max-w-md text-center lg:mx-0 lg:max-w-sm",
                  imageLeft
                    ? "lg:justify-self-start lg:text-left"
                    : "lg:justify-self-end lg:text-right"
                )}
              >
                <h3 className="font-serif text-2xl font-bold tracking-tight text-matcha-deep sm:text-3xl lg:text-[2.15rem]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:mt-4 sm:text-[15px]">
                  {step.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Mobile vertical connector */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-24 bottom-24 left-1/2 z-0 w-px -translate-x-1/2 bg-gradient-to-b from-ink/15 via-ink/25 to-ink/15 lg:hidden"
      />
    </div>
  );
}
