import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { fetchSection } from "@/lib/fetchers";
import Image from "next/image";

export const metadata = {
  title: "Gallery - PIPRA Trading",
  description: "PIPRA Trading product and company gallery.",
};

export default async function Gallery() {
  const gallerySection = await fetchSection("gallery-grid");

  const images = gallerySection?.items?.filter((item) => item.image) ?? [];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-[#1a3a52] px-5 pb-20 pt-36 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-sm font-normal text-[#dc2626]">Gallery</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-normal leading-tight md:text-6xl">
            Product, office, and project visuals
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
            Browse the PIPRA Trading gallery.
          </p>
        </div>
      </section>
      <section className="bg-[#f8f9fb] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.length > 0 ? (
            images.map((item, index) => (
              <figure key={item.id} className="overflow-hidden rounded-[8px] bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image!}
                    alt={item.title || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <figcaption className="p-4 text-sm font-normal text-[#1a3a52]">
                  {item.title || `Gallery Image ${index + 1}`}
                </figcaption>
              </figure>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-gray-400">
              No gallery images uploaded yet.
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
