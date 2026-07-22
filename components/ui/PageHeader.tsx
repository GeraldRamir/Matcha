"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, GSAP_EASE } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Background splash behind the lettering */
  imageSrc?: string;
  imageAlt?: string;
  /** Small meta chips under the title */
  badges?: string[];
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt = "",
  badges,
  className,
}: PageHeaderProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const editorial = Boolean(imageSrc);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const copy = el.querySelectorAll("[data-header-copy]");
      const visual = el.querySelector("[data-header-visual]");

      if (reduced) {
        gsap.set(copy, { clearProps: "all", opacity: 1, y: 0 });
        if (visual) gsap.set(visual, { opacity: 0.42 });
        return;
      }

      gsap.from(copy, {
        opacity: 0,
        y: 22,
        duration: 0.75,
        stagger: 0.08,
        ease: GSAP_EASE,
      });

      if (visual) {
        gsap.fromTo(
          visual,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 0.44,
            scale: 1,
            duration: 1.2,
            delay: 0.06,
            ease: GSAP_EASE,
          }
        );
      }
    },
    { scope: root, dependencies: [reduced, imageSrc, editorial] }
  );

  return (
    <header
      ref={root}
      className={cn(
        "relative overflow-hidden bg-cream pt-24 pb-8 sm:pt-32 sm:pb-14",
        editorial && "border-b border-line",
        className
      )}
    >
      {editorial && (
        <div
          data-header-visual
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-[8%] z-0 w-[min(140vw,54rem)] -translate-y-[46%] -rotate-[18deg] sm:left-[18%] sm:w-[min(95vw,58rem)] lg:left-[22%] lg:w-[62rem]"
        >
          <Image
            src={imageSrc!}
            alt={imageAlt || ""}
            width={1200}
            height={1200}
            priority
            className="h-auto w-full origin-center object-contain mix-blend-multiply"
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
        <p
          data-header-copy
          className="text-[11px] font-medium tracking-[0.2em] text-matcha-mid uppercase sm:text-xs sm:tracking-[0.22em]"
        >
          {eyebrow}
        </p>

        <h1
          data-header-copy
          className={cn(
            "mt-3 max-w-3xl font-serif font-bold tracking-tight text-matcha-deep sm:mt-4",
            editorial
              ? "relative text-[clamp(2rem,6vw,4.5rem)] leading-[0.98]"
              : "text-[1.85rem] leading-tight text-ink sm:text-5xl lg:text-6xl"
          )}
        >
          {title}
        </h1>

        {badges && badges.length > 0 && (
          <ul data-header-copy className="mt-5 flex flex-wrap gap-2 sm:mt-6">
            {badges.map((badge) => (
              <li
                key={badge}
                className="rounded-md border border-matcha-deep/12 bg-cream/80 px-3 py-1.5 text-xs font-medium text-ink-soft backdrop-blur-[1px]"
              >
                {badge}
              </li>
            ))}
          </ul>
        )}

        {description && (
          <p
            data-header-copy
            className={cn(
              "mt-4 text-[15px] leading-relaxed text-ink-soft sm:mt-5 sm:text-lg",
              editorial ? "max-w-lg sm:max-w-xl" : "max-w-2xl"
            )}
          >
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
