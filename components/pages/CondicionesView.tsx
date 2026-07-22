"use client";

import Link from "next/link";
import { LegalDoc } from "@/components/ui/LegalDoc";
import { useLocale } from "@/hooks/use-locale";

export function CondicionesView() {
  const { dict } = useLocale();
  const page = dict.pages.condiciones;

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
          <Link href="/terminos" className="text-matcha-deep underline underline-offset-4">
            {page.termsLink}
          </Link>
        </p>
      }
    />
  );
}
