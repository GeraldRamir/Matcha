import type { Metadata } from "next";
import { ProductosView } from "@/components/pages/ProductosView";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Solae Premium Ceremonial 4 oz — matcha ceremonial de Japón, empacado en EE. UU. Pedidos por WhatsApp o email.",
  alternates: { canonical: "/productos" },
};

export default function ProductosPage() {
  return <ProductosView />;
}
