"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { OrderProcess } from "@/components/sections/OrderProcess";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { useLocale } from "@/hooks/use-locale";

export function ComoPedirView() {
  const { dict } = useLocale();
  const page = dict.pages.comoPedir;

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />

      <OrderProcess showCta={false} />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-[1.75rem] font-bold tracking-tight text-ink sm:text-4xl">
              {page.knowTitle}
            </h2>
            <p className="mt-4 text-ink-soft">{page.knowBody}</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {page.details.map((item) => (
              <div key={item.title} className="border-t border-line pt-6">
                <h3 className="font-serif text-xl font-bold text-matcha-deep">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-sm text-ink-soft">
            {page.ready}{" "}
            <Link
              href="/pedido"
              className="font-semibold text-matcha-deep underline decoration-matcha-200 underline-offset-4 hover:decoration-matcha-deep"
            >
              {page.goForm}
            </Link>
          </p>
        </div>
      </section>

      <CtaBanner title={page.ctaTitle} description={page.ctaBody} />
    </>
  );
}
