import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { brand, companyHighlights, stats, trustItems } from "@/lib/company-data";
import Image from "next/image";

export const metadata = {
  title: "About Us - PIPRA Trading",
  description: "Learn about PIPRA Trading and our electrical equipment supply work.",
};

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="relative overflow-hidden bg-[#1a3a52] px-5 pb-20 pt-36 text-white sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-linear-to-br from-[#1a3a52] via-[#1a3a52] to-[#dc2626]/40" />
        <div className="relative mx-auto max-w-[1440px]">
          <p className="text-sm font-normal text-[#dc2626]">About us</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-normal leading-tight md:text-6xl">
            Trusted electrical equipment supplier since 2021
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
            {brand.name} works with buyers who need dependable MCB, circuit breaker, and electrical protection products.
          </p>
        </div>
      </section>

      <section className="bg-[#f8f9fb] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-normal text-[#dc2626]">Company profile</p>
            <h2 className="mt-3 text-3xl font-normal leading-tight text-[#1a3a52] md:text-5xl">
              Quality products, clear communication, practical support
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-gray-600">
              <p>
                PIPRA Trading is an importer and supplier of premium electrical equipment and components in Bangladesh. The company focuses on MCBs, circuit breakers, and electrical protection solutions for residential, commercial, and industrial applications.
              </p>
              <p>
                We keep the product experience simple: show the product, show its available variants, and make inquiry easy. No cart flow, no checkout distraction.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {companyHighlights.map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-[8px] bg-white p-4">
                  <span className="flex size-10 items-center justify-center rounded-full bg-[#dc2626] text-white">
                    <item.icon className="size-4" />
                  </span>
                  <span className="text-sm font-normal text-[#1a3a52]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-[#e2e8f0] bg-white p-8">
            <div className="relative mx-auto h-56 max-w-md">
              <Image src={brand.logo} alt={brand.name} fill className="object-contain" priority />
            </div>
            <p className="mt-6 text-center text-sm font-normal text-gray-600">Premium Electrical Solutions</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[8px] border border-[#e2e8f0] bg-[#f8f9fb] p-6">
                <p className="text-4xl font-normal text-[#dc2626]">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item.title} className="rounded-[8px] border border-[#e2e8f0] p-6">
                <span className="flex size-12 items-center justify-center rounded-full bg-[#dc2626] text-white">
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-normal text-[#1a3a52]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
