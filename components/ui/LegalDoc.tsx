"use client";

import type { ReactNode } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLocale } from "@/hooks/use-locale";

type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalDocProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
  footerNote?: ReactNode;
};

export function LegalDoc({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
  footerNote,
}: LegalDocProps) {
  const { locale } = useLocale();
  const updatedLabel =
    locale === "en" ? "Last updated:" : "Última actualización:";

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <article className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <p className="text-sm text-ink-faint">
            {updatedLabel} {updatedAt}
          </p>
          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-serif text-xl font-bold text-matcha-deep sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink-soft">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          {footerNote && (
            <div className="mt-12 border-t border-line pt-8 text-sm text-ink-faint">
              {footerNote}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
