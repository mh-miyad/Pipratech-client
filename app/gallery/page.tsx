import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { galleryImages } from "@/lib/company-data";
import Image from "next/image";

export const metadata = {
  title: "Gallery - PIPRA Trading",
  description: "PIPRA Trading product and company gallery.",
};

export default function Gallery() {
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
            Temporary Unsplash visuals are used until final company photos are uploaded.
          </p>
        </div>
      </section>
      <section className="bg-[#f8f9fb] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <figure key={image} className="overflow-hidden rounded-[8px] bg-white shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image src={image} alt={`PIPRA Trading gallery ${index + 1}`} fill className="object-cover" />
              </div>
              <figcaption className="p-4 text-sm font-normal text-[#1a3a52]">
                Gallery Image {index + 1}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
