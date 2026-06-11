"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageOpen } from "lucide-react";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
  allTabs: string[];
};

export default function ProductsTabbed({ products, allTabs }: Props) {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = activeTab === "All"
    ? products
    : products.filter((p) => (p.category || "").toLowerCase() === activeTab.toLowerCase());

  return (
    <>
      {allTabs.length > 1 && (
        <div className="mb-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {allTabs.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative pb-2 text-sm font-normal transition-colors ${active ? "text-[#dc2626]" : "text-[#1a3a52] hover:text-[#dc2626]"}`}
              >
                {tab}
                {active && <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-[#dc2626]" />}
              </button>
            );
          })}
        </div>
      )}

      <div className="space-y-8">
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <PackageOpen className="size-12 text-[#dc2626]/40" />
            <p className="mt-4 text-lg text-gray-500">No products found in this category.</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#dc2626] px-6 py-3 text-sm font-normal text-white hover:bg-[#b91c1c]">
              Contact Us
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}
        {filteredProducts.map((product, index) => (
          <article key={product.id} className="grid overflow-hidden rounded-[8px] border border-[#e2e8f0] bg-white lg:grid-cols-2">
            <div className={`relative min-h-[360px] bg-[#f1f5f9] ${index % 2 ? "lg:order-2" : ""}`}>
              <Image src={product.images[0] || "/logo.png"} alt={product.name} fill className="object-cover" unoptimized />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-sm font-normal text-[#dc2626]">{product.category}</p>
              <h2 className="mt-3 text-3xl font-normal text-[#1a3a52]">{product.name}</h2>
              <p className="mt-4 text-sm leading-7 text-gray-600">{product.shortDescription || product.description}</p>
              {product.technicalSpecs.length > 0 && (
                <div className="mt-7 overflow-hidden rounded-[8px] border border-[#e2e8f0]">
                  {product.technicalSpecs.map((spec) => (
                    <div key={spec.label} className="grid grid-cols-3 gap-3 border-b border-[#e2e8f0] px-4 py-3 text-sm last:border-b-0">
                      <span className="font-normal text-[#1a3a52]">{spec.label}</span>
                      <span className="col-span-2 text-right text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}
              {product.coreAttributes.length > 0 && (
                <div className="mt-5 space-y-2">
                  {product.coreAttributes.map((attr) => (
                    <div key={attr} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="size-1.5 rounded-full bg-[#dc2626]" />{attr}
                    </div>
                  ))}
                </div>
              )}
              <Link href="/contact" className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#dc2626] px-6 py-3 text-sm font-normal text-white hover:bg-[#b91c1c]">
                Ask About Product
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
