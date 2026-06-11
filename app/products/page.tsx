import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { fetchSection } from "@/lib/fetchers";
import { getProducts } from "@/lib/services/products";
import ProductsTabbed from "@/components/sections/ProductsTabbed";

export const metadata = {
  title: "Product - PIPRA Trading",
  description: "Browse PIPRA Trading electrical products with variants and price notes.",
};

export default async function Products() {
  const products = await getProducts();
  const section = await fetchSection("products");
  const categories = section?.categories ?? [];

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
        <div className="mx-auto max-w-[1440px]">
          <ProductsTabbed products={products} allTabs={["All", ...categories.map((c: any) => c.name).filter(Boolean)]} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
