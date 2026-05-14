import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import GalleryGrid from "@/components/sections/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore SNL International's photo gallery — our factory, jute products, and export operations.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="A Complete Range of Premium Jute Products"
        highlight="Jute Products"
        breadcrumb="Gallery"
        image="/hero-img.png"
      />

      <GalleryGrid />
    </>
  );
}
