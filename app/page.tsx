import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { WhyMatcha } from "@/components/sections/WhyMatcha";
import { Products } from "@/components/sections/Products";
import { GreenBanner } from "@/components/sections/GreenBanner";
import { Benefits } from "@/components/sections/Benefits";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <WhyMatcha />
      <Products featured />
      <GreenBanner />
      <Benefits />
    </>
  );
}
