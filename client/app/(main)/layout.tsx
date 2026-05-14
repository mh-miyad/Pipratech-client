import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import LenisProvider from "@/provider/LenisProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | SNL International",
    default: "SNL International — Premium Jute Products from Bangladesh",
  },
  description:
    "SNL International exports premium quality jute products to 15+ countries worldwide. Eco-friendly, sustainable, and trusted by global importers.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LenisProvider>
      <Header />
      <main className="flex flex-col">{children}</main>
      <Footer />
    </LenisProvider>
  );
}
