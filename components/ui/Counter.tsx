"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type CounterProps = {
  value: number;
  /** Decimales a mostrar (ej. 4.9 → 1). */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Número que cuenta hasta `value` al entrar en el viewport. Respeta prefers-reduced-motion. */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const format = (n: number) =>
    `${prefix}${n.toLocaleString("es-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        el.textContent = format(latest);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration]);

  return (
    <span ref={ref} aria-label={format(value)} className={className}>
      {format(0)}
    </span>
  );
}
