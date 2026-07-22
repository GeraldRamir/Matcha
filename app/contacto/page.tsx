import type { Metadata } from "next";
import { ContactoView } from "@/components/pages/ContactoView";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contacta a ${site.name} en Casa Solae, Santo Domingo. WhatsApp, Instagram ${site.instagramHandle} y ubicación en mapa.`,
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return <ContactoView />;
}
