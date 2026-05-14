import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import SisterConcernsSections from "@/components/sections/SisterConcernsSections";

export const metadata: Metadata = {
  title: "Our Sister Concerns",
  description:
    "Explore SNL International's sister concerns — a group of trusted jute mills and manufacturing companies in Bangladesh.",
};

export default function SisterConcernsPage() {
  return (
    <>
      <PageHero
        title="Our Sister Concerns"
        highlight="Sister Concerns"
        breadcrumb="Our Sister Concerns"
        image="/hero-img.png"
      />

      <SisterConcernsSections />
    </>
  );
}
