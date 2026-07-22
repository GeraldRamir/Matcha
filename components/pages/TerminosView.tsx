"use client";

import Link from "next/link";
import { LegalDoc } from "@/components/ui/LegalDoc";
import { useLocale } from "@/hooks/use-locale";

export function TerminosView() {
  const { dict } = useLocale();
  const page = dict.pages.terminos;

  return (
    <LegalDoc
      eyebrow={page.eyebrow}
      title={page.title}
      description={page.description}
      updatedAt={page.updated}
      sections={page.sections}
      footerNote={
        <p>
          {page.seeAlso}{" "}
          <Link href="/condiciones" className="text-matcha-deep underline underline-offset-4">
            {page.conditionsLink}
          </Link>
        </p>
      }
    />
  );
}
