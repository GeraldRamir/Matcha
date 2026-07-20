import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Products } from "@/components/sections/Products";
import { Comparison } from "@/components/sections/Comparison";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Matcha ceremonial de Uji, blends para el día a día y para lattes, y el kit completo para tu ritual. Primera cosecha, molienda en piedra y envío en 24–48 h.",
  alternates: { canonical: "/productos" },
};

export default function ProductosPage() {
  return (
    <>
      <PageHeader
        eyebrow="La tienda"
        title="Cuatro formas de empezar"
        description="Cada lote viaja directo desde Uji y se envasa en atmósfera protegida para conservar su color de jade y su dulzor umami. Agrega al pedido y completa en 2 minutos."
      />
      <Products showHeading={false} />
      <Comparison />
      <CtaBanner
        title="¿Ya elegiste el tuyo?"
        description="Completa tu pedido y envíalo por WhatsApp o email. Te confirmamos disponibilidad y entrega en minutos."
      />
    </>
  );
}
