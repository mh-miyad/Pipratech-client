import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SNL International for quotes, product inquiries, and export information.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        highlight="Us"
        breadcrumb="Contact Us"
        image="/hero-img.png"
      />

      <ContactSection />
    </>
  );
}
