import type { Metadata } from "next";
import { ColeccionView } from "@/components/pages/ColeccionView";

export const metadata: Metadata = {
  title: "Colección",
  description:
    "Explora la colección Solae Matcha: matcha ceremonial premium 4 oz, de Japón a República Dominicana.",
  alternates: { canonical: "/coleccion" },
};

export default function ColeccionPage() {
  return <ColeccionView />;
}
