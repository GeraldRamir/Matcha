import type { Metadata } from "next";
import { TerminosView } from "@/components/pages/TerminosView";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: `Términos de uso del sitio web de ${site.name}.`,
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return <TerminosView />;
}
