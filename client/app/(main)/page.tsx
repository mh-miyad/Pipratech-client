import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ServingWorldwide from "@/components/sections/ServingWorldwide";
import ProductCatalogue from "@/components/sections/ProductCatalogue";
import WhyChooseJute from "@/components/sections/WhyChooseJute";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ExportProcess from "@/components/sections/ExportProcess";
import CertificationsTrust from "@/components/sections/CertificationsTrust";
import Testimonials from "@/components/sections/Testimonials";
import FaqSection from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "SNL International — Premium Jute Products from Bangladesh",
  description:
    "SNL International exports premium quality jute bags, fabric, yarn, and eco-friendly products to 15+ countries worldwide. Get a free quote today.",
  openGraph: {
    title: "SNL International — Premium Jute Products from Bangladesh",
    description:
      "Trusted jute product manufacturer and exporter from Bangladesh. Supplying eco-friendly jute goods to the USA, UK, Germany, UAE, and 15+ countries.",
    type: "website",
  },
};

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ServingWorldwide />
      <ProductCatalogue />
      <WhyChooseJute />
      <WhyChooseUs />
      <ExportProcess />
      <CertificationsTrust />
      <Testimonials />
      <FaqSection />
    </>
  );
};

export default HomePage;
