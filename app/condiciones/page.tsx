import type { Metadata } from "next";
import { CondicionesView } from "@/components/pages/CondicionesView";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Condiciones de compra",
  description: `Condiciones de compra, entrega y privacidad de datos de ${site.name}.`,
  alternates: { canonical: "/condiciones" },
};

export default function CondicionesPage() {
  return <CondicionesView />;
}
