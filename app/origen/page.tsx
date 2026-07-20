import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyUs } from "@/components/sections/WhyUs";
import { Gallery } from "@/components/sections/Gallery";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Origen",
  description:
    "De los campos nublados de Uji, Japón, a tu taza: cultivo a la sombra, molienda en piedra de granito y una cadena de frescura obsesiva. Conoce nuestro proceso.",
  alternates: { canonical: "/origen" },
};

export default function OrigenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Origen"
        title="De Uji, Japón, a tu taza"
        description="400 años de tradición detrás de cada lata: cultivo a la sombra, molienda lenta en piedra y pequeños lotes importados cada temporada."
      />
      <HowItWorks />
      <WhyUs />
      <Gallery />
      <CtaBanner
        title="Pruébalo y entiende la diferencia"
        description="El origen se nota en el color, en el sabor y en cómo te sientes una hora después."
      />
    </>
  );
}
