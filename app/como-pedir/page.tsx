import type { Metadata } from "next";
import { ComoPedirView } from "@/components/pages/ComoPedirView";

export const metadata: Metadata = {
  title: "Cómo pedir",
  description:
    "Aprende cómo pedir Solae Matcha en minutos: elige productos, completa tus datos y envía por WhatsApp o email.",
  alternates: { canonical: "/como-pedir" },
};

export default function ComoPedirPage() {
  return <ComoPedirView />;
}
