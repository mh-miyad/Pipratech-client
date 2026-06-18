"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, PackageOpen } from "lucide-react";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
  allTabs: string[];
};

function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const description = product.shortDescription || product.description;

  return (
    <article
      className={`group flex overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white transition-all duration-300 hover:border-[#dc2626]/40 hover:shadow-[0_12px_40px_rgba(26,58,82,0.1)] ${
        featured ? "flex-col lg:flex-row" : "h-full flex-col"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[#f1f5f9] ${
          featured ? "min-h-72 lg:min-h-110 lg:w-120 lg:shrink-0" : "aspect-4/3"
        }`}
      >
        <Image
          src={product.images[0] || "/logo.png"}
          alt={product.name}
          fill
          sizes={featured ? "(min-width: 1024px) 480px, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        {product.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#dc2626] backdrop-blur">
            {product.category}
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${featured ? "justify-center p-7 sm:p-10 lg:p-12" : "p-5"}`}>
        <h3 className={`font-medium leading-snug text-[#1a3a52] ${featured ? "text-2xl md:text-3xl" : "text-base line-clamp-2"}`}>
          {product.name}
        </h3>
        <p className={`mt-3 leading-7 text-gray-600 ${featured ? "max-w-160 text-sm md:text-base" : "text-sm line-clamp-2"}`}>
          {description}
        </p>

        {product.technicalSpecs.length > 0 && (
          <div className="mt-4 overflow-hidden rounded-xl border border-[#e2e8f0]">
            {product.technicalSpecs.slice(0, featured ? 5 : 3).map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between gap-3 border-b border-[#e2e8f0] px-3 py-2 text-xs last:border-b-0"
              >
                <span className="font-medium text-[#1a3a52]">{spec.label}</span>
                <span className="truncate text-right text-gray-600">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {product.coreAttributes.length > 0 && (
          <ul className="mt-4 space-y-2">
            {product.coreAttributes.slice(0, featured ? 6 : 4).map((attr) => (
              <li key={attr} className="flex items-start gap-2.5 rounded-lg bg-[#dc2626]/[0.04] px-3 py-2 text-sm text-gray-700">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#dc2626]/60" />
                <span className="leading-snug">{attr}</span>
              </li>
            ))}
          </ul>
        )}

        <Link
          href="/contact"
          className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#dc2626] px-6 py-2.5 text-sm font-normal text-white transition-colors hover:bg-[#b91c1c] ${
            featured ? "w-fit" : "w-full"
          }`}
        >
          Ask About Product
          {featured ? <Phone className="size-4" /> : <ArrowRight className="size-4" />}
        </Link>
      </div>
    </article>
  );
}

export default function ProductsTabbed({ products, allTabs }: Props) {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = useMemo(
    () =>
      activeTab === "All"
        ? products
        : products.filter((p) => (p.category || "").toLowerCase() === activeTab.toLowerCase()),
    [products, activeTab],
  );

  return (
    <>
      {allTabs.length > 1 && (
        <div className="mb-12 flex flex-wrap items-center justify-center gap-8 sm:gap-11">
          {allTabs.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 text-sm font-normal transition-colors ${
                  active ? "text-[#dc2626]" : "text-[#1a3a52] hover:text-[#dc2626]"
                }`}
              >
                {tab}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-[#dc2626] transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <PackageOpen className="size-12 text-[#dc2626]/40" />
          <p className="mt-4 text-lg text-gray-500">No products found in this category.</p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#dc2626] px-6 py-3 text-sm font-normal text-white hover:bg-[#b91c1c]"
          >
            Contact Us
            <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
