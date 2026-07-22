"use client";

import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useEffect, useRef } from "react";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { useLocale } from "@/hooks/use-locale";

const STATS = [
  { end: 30, suffix: "K+" },
  { end: 80, suffix: "K+" },
  { end: 98, suffix: "%" },
  { end: 100, suffix: "%" },
];

const VIDEO_SRC =
  "/images/Productos/Matcha_powder_explodes_into_tin_202607212137.mp4";

function StatItem({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref}>
      <p className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-5xl">
        {inView ? <CountUp end={end} duration={1.8} suffix={suffix} /> : `0${suffix}`}
      </p>
      <p className="mt-1.5 text-xs font-medium text-ink-faint sm:mt-2 sm:text-sm">{label}</p>
    </div>
  );
}

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
      { threshold: 0.2 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-ink sm:aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[24rem]"
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={videoAria}
      />
    </div>
  );
}

export function Stats() {
  const { dict } = useLocale();
  const items = STATS.map((s, i) => ({ ...s, label: dict.stats.items[i].label }));

  return (
    <section aria-label={dict.stats.aria} className="border-y border-line py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid items-stretch gap-10 lg:grid-cols-[1.2fr_1fr]"
        >
          <motion.div variants={fadeUp}>
            <h2 className="max-w-lg font-serif text-[1.75rem] leading-tight font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {dict.stats.title}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-5 sm:mt-10 sm:grid-cols-4 sm:gap-6">
              {items.map((s) => (
                <StatItem key={s.label} {...s} />
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["V", "D", "C", "S"].map((i) => (
                  <span
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-cream bg-matcha-100 text-xs font-semibold text-matcha-deep"
                  >
                    {i}
                  </span>
                ))}
              </div>
              <p className="text-sm font-medium text-ink-soft">
                {dict.stats.lovedBy}
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="h-full min-h-[18rem]">
            <StatsVideo videoAria={dict.stats.videoAria} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
