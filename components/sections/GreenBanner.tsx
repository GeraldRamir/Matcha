"use client";

import Image from "next/image";
import Link from "next/link";
import { GsapReveal } from "@/components/ui/GsapReveal";
import { useLocale } from "@/hooks/use-locale";

export function GreenBanner() {
  const { dict } = useLocale();

  return (
    <section
      aria-label={dict.greenBanner.aria}
      className="relative overflow-hidden bg-matcha-deep"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgb(255_238_162/0.14),transparent_58%)]"
      />
      <p
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 font-serif text-[min(28vw,18rem)] font-bold leading-none tracking-tight text-gold/[0.07] select-none sm:text-[22vw]"
      >
        SOLAE
      </p>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:gap-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_minmax(14rem,22rem)_1fr] lg:gap-8 lg:py-10 xl:gap-12">
        <GsapReveal className="text-center lg:text-left">
          <h2 className="font-serif text-[1.75rem] font-bold text-gold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {dict.greenBanner.title}
            <br />
            {dict.greenBanner.titleLine2}
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-cream/75 lg:mx-0">
            {dict.greenBanner.body}
          </p>
          <Link
            href="/pedido"
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-md bg-gold px-8 text-sm font-semibold text-matcha-deep transition-colors hover:bg-gold-soft sm:w-auto"
          >
            {dict.greenBanner.cta}
          </Link>
        </GsapReveal>

        <GsapReveal className="relative mx-auto w-full max-w-[17rem] sm:max-w-[19rem] lg:max-w-[22rem] lg:translate-x-10 xl:translate-x-14">
          <div
            aria-hidden
            className="absolute inset-[12%] rounded-full bg-gold/18 blur-3xl"
          />
          <div className="relative aspect-square w-full -rotate-[14deg]">
            <Image
              src="/images/cutouts/latte-hero.png"
              alt={dict.greenBanner.imageAlt}
              width={640}
              height={640}
              className="h-full w-full object-contain drop-shadow-[0_28px_50px_rgba(0,0,0,0.35)]"
              priority={false}
            />
          </div>
        </GsapReveal>

        <GsapReveal className="text-center lg:text-right">
          <p className="font-serif text-2xl font-bold text-gold sm:text-3xl lg:text-[2.15rem]">
            Casa Solae
          </p>
          <p className="mt-2 text-sm tracking-wide text-cream/55">
            {dict.greenBanner.route}
          </p>
        </GsapReveal>
      </div>
    </section>
  );
}
