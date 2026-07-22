"use client";

import { useEffect, useRef } from "react";
import { Leaf, MapPin, Package, Sparkles } from "lucide-react";
import { GsapReveal } from "@/components/ui/GsapReveal";
import { useLocale } from "@/hooks/use-locale";

const VIDEO_SRC = "/images/Productos/solae-ritual.mp4";

const PILLAR_ICONS = [Leaf, Package, MapPin, Sparkles];

function StatsVideo({ videoAria }: { videoAria: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden bg-matcha-deep">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={videoAria}
      />
      {/* Soften into cream copy column */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-cream via-cream/75 to-transparent lg:block"
      />
      {/* Mobile: blend into cream above */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-cream via-cream/60 to-transparent lg:hidden"
      />
      {/* Subtle depth at edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-matcha-deep/25 via-transparent to-transparent"
      />
    </div>
  );
}

export function Stats() {
  const { dict } = useLocale();
  const pillars = dict.stats.items.map((item, i) => ({
    ...item,
    icon: PILLAR_ICONS[i] ?? Sparkles,
  }));

  return (
    <section
      aria-label={dict.stats.aria}
      className="overflow-hidden border-y border-line bg-cream"
    >
      <div className="grid lg:grid-cols-2">
        <GsapReveal
          className="relative z-10 flex justify-center bg-cream px-4 py-12 sm:px-8 sm:py-16 lg:justify-end lg:py-20 lg:pr-10 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]"
          childSelector="[data-reveal]"
          stagger={0.1}
        >
          <div className="w-full max-w-xl">
            <h2
              data-reveal
              className="max-w-lg font-serif text-[1.75rem] leading-tight font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              {dict.stats.title}
            </h2>
            <p
              data-reveal
              className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft sm:text-base"
            >
              {dict.stats.body}
            </p>

            <ul className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6">
              {pillars.map((item) => (
                <li key={item.title} data-reveal className="flex gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold text-matcha-deep">
                    <item.icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block font-serif text-lg font-bold text-ink">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-faint">
                      {item.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <p
              data-reveal
              className="mt-8 text-sm font-medium tracking-[0.14em] text-matcha-mid uppercase"
            >
              {dict.stats.route}
            </p>
          </div>
        </GsapReveal>

        <GsapReveal className="relative min-h-[22rem] w-full sm:min-h-[28rem] lg:min-h-0 lg:self-stretch">
          <StatsVideo videoAria={dict.stats.videoAria} />
        </GsapReveal>
      </div>
    </section>
  );
}
