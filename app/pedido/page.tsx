import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { OrderForm } from "@/components/sections/OrderForm";
import { OrderProcess } from "@/components/sections/OrderProcess";

export const metadata: Metadata = {
  title: "Haz tu pedido",
  description:
    "Elige tu matcha, completa tus datos y envía el pedido por WhatsApp o email directo desde la web. Sin registro ni pago online.",
  alternates: { canonical: "/pedido" },
};

export default function PedidoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pedido"
        title="Pide tu matcha en minutos"
        description="Elige productos, completa unos datos y envíanos el pedido por WhatsApp o email. Se abre con el mensaje listo — tú solo confirmas."
      />
      <OrderForm showHeading={false} />
      <OrderProcess showCta={false} />
    </>
  );
}
