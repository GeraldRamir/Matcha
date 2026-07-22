import type { Metadata } from "next";
import { FaqView } from "@/components/pages/FaqView";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Resolvemos tus dudas sobre el matcha ceremonial: diferencias de grado, cafeína, conservación, preparación, entregas y métodos de pago.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return <FaqView />;
}
