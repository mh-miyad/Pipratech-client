import PageHero from "@/components/common/PageHero";
import ProductsShowcase from "@/components/sections/ProductsShowcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Browse SNL International's complete range of premium jute products — bags, fabric, yarn, geo textiles, crafts, and ropes.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="A Complete Range of Premium Jute Products"
        highlight="Jute Products"
        breadcrumb="Our Products"
        image="/hero-img.png"
      />

      <ProductsShowcase />
    </>
  );
}
