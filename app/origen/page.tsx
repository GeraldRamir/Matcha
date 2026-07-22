import type { Metadata } from "next";
import { OrigenView } from "@/components/pages/OrigenView";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Origen",
  description: site.story,
  alternates: { canonical: "/origen" },
};

export default function OrigenPage() {
  return <OrigenView />;
}
