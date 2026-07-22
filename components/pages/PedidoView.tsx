"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { OrderForm } from "@/components/sections/OrderForm";
import { useLocale } from "@/hooks/use-locale";

export function PedidoView() {
  const { dict } = useLocale();
  const page = dict.pages.pedido;

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />
      <OrderForm showHeading={false} />
    </>
  );
}
