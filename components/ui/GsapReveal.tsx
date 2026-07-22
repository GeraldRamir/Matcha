"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, GSAP_EASE } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type GsapRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay between direct children that match `childSelector` */
  stagger?: number;
  y?: number;
  delay?: number;
  as?: "div" | "section" | "article" | "header";
  childSelector?: string;
};

/**
 * Scroll-triggered fade-up. Animates the root, or its children when
 * `childSelector` is set (e.g. "[data-reveal]").
 */
export function GsapReveal({
  children,
  className,
  stagger = 0.1,
  y = 28,
  delay = 0,
  as: Tag = "div",
  childSelector,
}: GsapRevealProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const targets = childSelector
        ? el.querySelectorAll(childSelector)
        : [el];

      if (!targets.length) return;

      if (reduced) {
        gsap.set(targets, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.75,
        delay,
        stagger: childSelector ? stagger : 0,
        ease: GSAP_EASE,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: root, dependencies: [reduced, stagger, y, delay, childSelector] }
  );

  return (
    <Tag ref={root as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
