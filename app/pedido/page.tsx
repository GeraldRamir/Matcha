import type { Metadata } from "next";
import { PedidoView } from "@/components/pages/PedidoView";

export const metadata: Metadata = {
  title: "Haz tu pedido",
  description:
    "Elige tu matcha, completa tus datos y envía el pedido por WhatsApp o email directo desde la web. Sin registro ni pago online.",
  alternates: { canonical: "/pedido" },
};

export default function PedidoPage() {
  return <PedidoView />;
}
