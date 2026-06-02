"use client";

import { products } from "@/lib/company-data";
import { Plus, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type EditableProduct = typeof products[number];

export default function AdminProducts() {
  const initialProducts = useMemo<EditableProduct[]>(() => products, []);
  const [items, setItems] = useState<EditableProduct[]>(initialProducts);
  const [saved, setSaved] = useState("");

  function updateProduct(id: string, field: keyof EditableProduct, value: string) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  }

  function updateVariant(productId: string, index: number, field: "name" | "rating" | "price", value: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === productId
          ? {
              ...item,
              variants: item.variants.map((variant, variantIndex) =>
                variantIndex === index ? { ...variant, [field]: value } : variant,
              ),
            }
          : item,
      ),
    );
  }

  function addVariant(productId: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === productId
          ? { ...item, variants: [...item.variants, { name: "New variant", rating: "Rating", price: "Price varies" }] }
          : item,
      ),
    );
  }

  function removeVariant(productId: string, index: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === productId
          ? { ...item, variants: item.variants.filter((_, variantIndex) => variantIndex !== index) }
          : item,
      ),
    );
  }

  function saveDraft() {
    window.localStorage.setItem("pipra-admin-products", JSON.stringify(items));
    setSaved(new Date().toLocaleTimeString());
  }

  return (
    <main className="min-h-screen bg-[#f8f9fb] px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-4 rounded-[8px] bg-[#1a3a52] p-6 text-white md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-normal text-[#dc2626]">Admin panel</p>
            <h1 className="mt-2 text-3xl font-normal">Product manager</h1>
            <p className="mt-2 text-sm text-white/60">Blog removed. Add and edit product variants, ratings, and price notes.</p>
          </div>
          <button type="button" onClick={saveDraft} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dc2626] px-6 py-3 text-sm font-normal text-white">
            <Save className="size-4" />
            Save Draft
          </button>
        </div>

        {saved && <p className="mt-4 text-sm text-[#1a3a52]">Draft saved at {saved}</p>}

        <div className="mt-8 space-y-6">
          {items.map((product) => (
            <section key={product.id} className="grid overflow-hidden rounded-[8px] border border-[#e2e8f0] bg-white lg:grid-cols-[360px_1fr]">
              <div className="relative min-h-[300px] bg-[#f1f5f9]">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="space-y-5 p-5 md:p-7">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-[#1a3a52]">
                    Product Name
                    <input value={product.name} onChange={(event) => updateProduct(product.id, "name", event.target.value)} className="w-full rounded-[8px] border border-[#e2e8f0] px-4 py-3 text-sm outline-none focus:border-[#dc2626]" />
                  </label>
                  <label className="space-y-2 text-sm text-[#1a3a52]">
                    Category
                    <input value={product.category} onChange={(event) => updateProduct(product.id, "category", event.target.value)} className="w-full rounded-[8px] border border-[#e2e8f0] px-4 py-3 text-sm outline-none focus:border-[#dc2626]" />
                  </label>
                </div>
                <label className="block space-y-2 text-sm text-[#1a3a52]">
                  Description
                  <textarea value={product.description} onChange={(event) => updateProduct(product.id, "description", event.target.value)} rows={3} className="w-full resize-none rounded-[8px] border border-[#e2e8f0] px-4 py-3 text-sm outline-none focus:border-[#dc2626]" />
                </label>

                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-normal text-[#1a3a52]">Variants and Prices</h2>
                  <button type="button" onClick={() => addVariant(product.id)} className="inline-flex items-center gap-2 rounded-full bg-[#dc2626] px-4 py-2 text-xs font-normal text-white">
                    <Plus className="size-3" />
                    Add Variant
                  </button>
                </div>

                <div className="space-y-3">
                  {product.variants.map((variant, index) => (
                    <div key={`${product.id}-${index}`} className="grid gap-3 rounded-[8px] bg-[#f8f9fb] p-3 md:grid-cols-[1fr_1fr_1.4fr_auto]">
                      <input value={variant.name} onChange={(event) => updateVariant(product.id, index, "name", event.target.value)} className="rounded-[8px] border border-[#e2e8f0] px-3 py-2 text-sm outline-none focus:border-[#dc2626]" />
                      <input value={variant.rating} onChange={(event) => updateVariant(product.id, index, "rating", event.target.value)} className="rounded-[8px] border border-[#e2e8f0] px-3 py-2 text-sm outline-none focus:border-[#dc2626]" />
                      <input value={variant.price} onChange={(event) => updateVariant(product.id, index, "price", event.target.value)} className="rounded-[8px] border border-[#e2e8f0] px-3 py-2 text-sm outline-none focus:border-[#dc2626]" />
                      <button type="button" onClick={() => removeVariant(product.id, index)} className="flex size-10 items-center justify-center rounded-full bg-[#dc2626] text-white" aria-label="Remove variant">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
