"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { useLocale } from "@/hooks/use-locale";

export function FaqView() {
  const { dict } = useLocale();
  const page = dict.pages.faq;

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />
      <Faq showHeading={false} />
      <CtaBanner />
    </>
  );
}
