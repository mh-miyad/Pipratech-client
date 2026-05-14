import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { products } from "@/lib/company-data";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Product - PIPRA Trading",
  description: "Browse PIPRA Trading electrical products with variants and price notes.",
};

export default function Products() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="relative overflow-hidden bg-[#1a3a52] px-5 pb-20 pt-36 text-white sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-linear-to-br from-[#1a3a52] via-[#1a3a52] to-[#dc2626]/40" />
        <div className="relative mx-auto max-w-[1440px]">
          <p className="text-sm font-normal text-[#dc2626]">Product catalogue</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-normal leading-tight md:text-6xl">
            Electrical products with model variants and price ranges
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
            This is a company catalogue, not an e-commerce cart. Each product can show multiple variants, ratings, and project based price notes.
          </p>
        </div>
      </section>

      <section className="bg-[#f8f9fb] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[1440px] space-y-8">
          {products.map((product, index) => (
            <article
              key={product.id}
              className="grid overflow-hidden rounded-[8px] border border-[#e2e8f0] bg-white lg:grid-cols-2"
            >
              <div className={`relative min-h-[360px] bg-[#f1f5f9] ${index % 2 ? "lg:order-2" : ""}`}>
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <p className="text-sm font-normal text-[#dc2626]">{product.category}</p>
                <h2 className="mt-3 text-3xl font-normal text-[#1a3a52]">{product.name}</h2>
                <p className="mt-4 text-sm leading-7 text-gray-600">{product.description}</p>
                <div className="mt-7 overflow-hidden rounded-[8px] border border-[#e2e8f0]">
                  {product.variants.map((variant) => (
                    <div key={`${product.id}-${variant.name}`} className="grid grid-cols-3 gap-3 border-b border-[#e2e8f0] px-4 py-3 text-sm last:border-b-0">
                      <span className="font-normal text-[#1a3a52]">{variant.name}</span>
                      <span className="text-gray-600">{variant.rating}</span>
                      <span className="text-right text-[#dc2626]">{variant.price}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#dc2626] px-6 py-3 text-sm font-normal text-white hover:bg-[#b91c1c]">
                  Ask About Product
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
