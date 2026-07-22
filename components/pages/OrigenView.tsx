"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyUs } from "@/components/sections/WhyUs";
import { Gallery } from "@/components/sections/Gallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { useLocale } from "@/hooks/use-locale";

export function OrigenView() {
  const { dict } = useLocale();
  const page = dict.pages.origen;

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />

      <section className="border-y border-line bg-cream-soft py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-3">
          {page.pillars.map((item) => (
            <div key={item.title}>
              <h2 className="font-serif text-xl font-bold text-matcha-deep sm:text-2xl">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <HowItWorks />
      <WhyUs />
      <Gallery />

      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-8">
          <p className="text-sm text-ink-soft">
            {page.ready}{" "}
            <Link
              href="/coleccion"
              className="font-semibold text-matcha-deep underline decoration-matcha-200 underline-offset-4 hover:decoration-matcha-deep"
            >
              {page.viewCollection}
            </Link>{" "}
            {page.or}{" "}
            <Link
              href="/como-pedir"
              className="font-semibold text-matcha-deep underline decoration-matcha-200 underline-offset-4 hover:decoration-matcha-deep"
            >
              {page.howToOrder}
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBanner title={page.ctaTitle} description={page.ctaBody} />
    </>
  );
}
