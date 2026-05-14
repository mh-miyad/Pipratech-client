import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import AboutStorySections from "@/components/sections/AboutStorySections";
import FaqSection from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SNL International — three generations of premium jute manufacturing and export from Bangladesh to the world.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Three Generations Growing the World's Golden Fiber"
        highlight="Golden Fiber"
        breadcrumb="About Us"
        image="/hero-img.png"
      />

      <AboutStorySections />
      <FaqSection />
    </>
  );
}
