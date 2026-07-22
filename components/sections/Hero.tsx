"use client";

import Image from "next/image";
import Link from "next/link";
import { FlaskConical, Leaf, Sparkles, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, GSAP_EASE } from "@/lib/gsap";
import { useLocale } from "@/hooks/use-locale";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

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
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLElement>(null);
  const chips = dict.hero.chips.map((chip, i) => ({
    ...chip,
    icon: CHIP_ICONS[i],
  }));

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const brand = scope.querySelector("[data-hero=brand]");
      const title = scope.querySelector("[data-hero=title]");
      const seal = scope.querySelector("[data-hero=seal]");
      const product = scope.querySelector("[data-hero=product]");
      const body = scope.querySelector("[data-hero=body]");
      const chipList = scope.querySelectorAll("[data-hero=chip]");

      if (reduced) {
        gsap.set([brand, title, seal, product, body, ...chipList], {
          clearProps: "all",
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: phone ? -10 : -18,
        });
        if (product) gsap.set(product, { rotate: phone ? -10 : -18 });
        return;
      }

      gsap.set([brand, title, seal, product, body, ...chipList], {
        opacity: 0,
      });
      gsap.set(brand, { y: 10 });
      gsap.set(title, { y: 24 });
      gsap.set(seal, { scale: 0.85 });
      gsap.set(product, { y: 36, rotate: 8, scale: 0.88 });
      gsap.set(body, { x: phone ? 0 : -28, y: phone ? 20 : 0 });
      gsap.set(chipList, { x: phone ? 0 : 28, y: phone ? 16 : 0 });

      const tl = gsap.timeline({ defaults: { ease: GSAP_EASE } });

      tl.to(brand, { opacity: 1, y: 0, duration: 0.55 }, 0)
        .to(title, { opacity: 1, y: 0, duration: 0.85 }, 0.06)
        .to(
          product,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: phone ? -10 : -18,
            duration: 1.05,
          },
          0.18
        )
        .to(seal, { opacity: 1, scale: 1, duration: 0.55 }, 0.48)
        .to(body, { opacity: 1, x: 0, y: 0, duration: 0.75 }, 0.55)
        .to(
          chipList,
          { opacity: 1, x: 0, y: 0, duration: 0.65, stagger: 0.08 },
          0.62
        );

      if (product) {
        tl.to(
          product,
          {
            y: "+=8",
            duration: 2.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          },
          "+=0.2"
        );
      }
    },
    { scope: root, dependencies: [phone, reduced] }
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative overflow-x-clip pt-20 pb-8 sm:pt-32 sm:pb-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <p
          data-hero="brand"
          className="text-center text-[10px] font-medium tracking-[0.18em] text-ink-faint sm:text-xs sm:tracking-[0.22em]"
        >
          {t("common.brandLine")}
        </p>

        {/*
          Mobile (<640): tighter composition so MATCHA + cup fit one viewport.
          sm+ / lg+: original desktop sizes and positions unchanged.
        */}
        <div className="relative mx-auto mt-1 w-full max-w-[min(100%,22rem)] pb-[70%] sm:max-w-[92vw] sm:pb-[28%] lg:pb-[24%]">
          <h1
            id="hero-title"
            data-hero="title"
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
          </h1>

          <div
            data-hero="seal"
            className="absolute top-[1%] right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-matcha-deep/30 bg-gold text-center sm:top-0 sm:right-[2%] sm:h-[4.25rem] sm:w-[4.25rem] lg:right-[4%]"
          >
            <span className="font-serif text-[6.5px] leading-tight font-bold tracking-wide text-matcha-deep uppercase sm:text-[10px]">
              Casa
              <br />
              Solae
            </span>
          </div>

          <div className="pointer-events-none absolute top-[22%] left-1/2 z-10 w-[90%] max-w-[18rem] -translate-x-1/2 sm:top-[32%] sm:w-[52%] sm:max-w-[30rem] sm:-translate-y-[8%] lg:max-w-[32rem]">
            <div data-hero="product" className="relative will-change-transform">
              <div
                aria-hidden
                className="glow-matcha absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
              />
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/cutouts/solae-ceremonial/view-01.png"
                  alt={t("hero.productAlt")}
                  width={1200}
                  height={1200}
                  priority
                  className="h-full w-full object-contain object-center drop-shadow-[0_20px_40px_rgba(12,64,53,0.26)] sm:drop-shadow-[0_36px_70px_rgba(12,64,53,0.28)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* sm+ = original desktop grid; max-sm = centered stack */}
        <div className="relative z-20 -mt-2 grid items-end gap-8 max-sm:mt-0 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-7 sm:-mt-10 lg:-mt-14 lg:grid-cols-[1fr_minmax(0,12rem)_1fr]">
          <div
            data-hero="body"
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
          </div>

          <div className="hidden lg:block" aria-hidden />

          <ul className="mx-auto flex w-full max-w-sm flex-col gap-3 max-sm:max-w-[20rem] sm:ml-auto sm:mr-0 sm:max-w-[15rem]">
            {chips.map((chip) => (
              <li
                key={chip.title}
                data-hero="chip"
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
          </ul>
        </div>
      </div>
    </section>
  );
}
