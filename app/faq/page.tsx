import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Resolvemos tus dudas sobre el matcha ceremonial: diferencias de grado, cafeína, conservación, preparación, entregas y métodos de pago.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Preguntas frecuentes"
        title="Todo lo que querías saber"
        description="Y si tu pregunta no está aquí, escríbenos por WhatsApp: respondemos en minutos."
      />
      <Faq showHeading={false} />
      <CtaBanner />
    </>
  );
}
