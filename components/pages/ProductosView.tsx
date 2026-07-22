"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Products } from "@/components/sections/Products";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { useLocale } from "@/hooks/use-locale";

export function ProductosView() {
  const { dict } = useLocale();
  const page = dict.pages.productos;

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        imageSrc="/images/cutouts/matcha-splash.png"
        imageAlt={page.imageAlt}
        badges={page.badges}
      />
      <Products showHeading={false} />
      <CtaBanner title={page.ctaTitle} description={page.ctaBody} />
    </>
  );
}
