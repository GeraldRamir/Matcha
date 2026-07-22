"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FlaskConical, Leaf, Sparkles, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE, fadeLeft, fadeRight, staggerContainer } from "@/lib/motion";
import { useLocale } from "@/hooks/use-locale";

const CHIP_ICONS = [Leaf, Zap, FlaskConical];

/** Phone-only cup tilt; sm+ keeps the original −18° desktop rotation. */
function useIsPhone() {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setPhone(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return phone;
}

export function Hero() {
  const { t, dict } = useLocale();
  const phone = useIsPhone();
  const chips = dict.hero.chips.map((chip, i) => ({
    ...chip,
    icon: CHIP_ICONS[i],
  }));

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-x-clip pt-20 pb-8 sm:pt-32 sm:pb-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center text-[10px] font-medium tracking-[0.18em] text-ink-faint sm:text-xs sm:tracking-[0.22em]"
        >
          {t("common.brandLine")}
        </motion.p>

        {/*
          Mobile (<640): tighter composition so MATCHA + cup fit one viewport.
          sm+ / lg+: original desktop sizes and positions unchanged.
        */}
        <div className="relative mx-auto mt-1 w-full max-w-[min(100%,22rem)] pb-[70%] sm:max-w-[92vw] sm:pb-[28%] lg:pb-[24%]">
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.85, ease: EASE }}
            className="font-hero relative z-0 text-center text-[clamp(3.5rem,21vw,5.5rem)] leading-[0.84] text-ink select-none sm:text-[clamp(4.75rem,18vw,12.75rem)] sm:leading-[0.8]"
          >
            <span className="relative inline-block">
              MATCHA
              <Sparkles
                className="absolute top-[6%] -left-[3.5%] h-3.5 w-3.5 text-gold-deep sm:h-5 sm:w-5 lg:h-6 lg:w-6"
                fill="currentColor"
                aria-hidden
              />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.48, duration: 0.55, ease: EASE }}
            className="absolute top-[1%] right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-matcha-deep/30 bg-gold text-center sm:top-0 sm:right-[2%] sm:h-[4.25rem] sm:w-[4.25rem] lg:right-[4%]"
          >
            <span className="font-serif text-[6.5px] leading-tight font-bold tracking-wide text-matcha-deep uppercase sm:text-[10px]">
              Casa
              <br />
              Solae
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36, rotate: 8, scale: 0.88 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: phone ? -10 : -18,
              scale: 1,
            }}
            transition={{ delay: 0.18, duration: 1.05, ease: EASE }}
            className="pointer-events-none absolute top-[22%] left-1/2 z-10 w-[90%] max-w-[18rem] -translate-x-1/2 sm:top-[32%] sm:w-[52%] sm:max-w-[30rem] sm:-translate-y-[8%] lg:max-w-[32rem]"
          >
            <div
              aria-hidden
              className="glow-matcha absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
            />
            <div className="relative aspect-square w-full">
              <Image
                src="/images/cutouts/latte-hero.png"
                alt={t("hero.latteAlt")}
                width={900}
                height={935}
                priority
                className="h-full w-full object-contain object-center drop-shadow-[0_20px_40px_rgba(12,64,53,0.26)] sm:drop-shadow-[0_36px_70px_rgba(12,64,53,0.28)]"
              />
            </div>
          </motion.div>
        </div>

        {/* sm+ = original desktop grid; max-sm = centered stack */}
        <motion.div
          variants={staggerContainer(0.1, 0.28)}
          initial="hidden"
          animate="visible"
          className="relative z-20 -mt-2 grid items-end gap-8 max-sm:mt-0 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-7 sm:-mt-10 lg:-mt-14 lg:grid-cols-[1fr_minmax(0,12rem)_1fr]"
        >
          <motion.div
            variants={fadeLeft}
            className="mx-auto max-w-sm text-center max-sm:w-full max-sm:max-w-[20rem] sm:mx-0 sm:max-w-[18rem] sm:text-left"
          >
            <p className="text-[15px] leading-relaxed text-ink-soft">
              {t("hero.body")}
            </p>
            <Link
              href="/pedido"
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-md bg-matcha-deep px-7 text-sm font-medium text-gold transition-colors hover:bg-matcha hover:text-cream sm:h-11 sm:w-auto"
            >
              {t("hero.cta")}
            </Link>
          </motion.div>

          <div className="hidden lg:block" aria-hidden />

          <motion.ul
            variants={fadeRight}
            className="mx-auto flex w-full max-w-sm flex-col gap-3 max-sm:max-w-[20rem] sm:ml-auto sm:mr-0 sm:max-w-[15rem]"
          >
            {chips.map((chip) => (
              <li
                key={chip.title}
                className="group flex items-center gap-3 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold text-matcha-deep sm:h-11 sm:w-11">
                  <chip.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    {chip.title}
                  </span>
                  <span className="text-xs text-ink-faint">{chip.detail}</span>
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
