"use client";

import ProductCard, {
  type ProductItem,
} from "@/components/reusable/ProductCard";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS: ProductItem[] = [
  {
    id: "jute-yarn-1",
    name: "Jute Yarn",
    category: "Jute Products",
    description:
      "Jute Rope has variety from 4mm to 50mm both natural and color. It is used for tying up gifts, embellishing cards, baskets, gift tags, vases, plant grafting, embellish flower arrangements, centerpieces and much more. The coarser Jute Ropes are used in sailing, construction, transport, agriculture or insulation of log houses. Because of its appearance, Jute rope is often used as a decorative element in homes, restaurants and gardens.",
    image: "/hero-img.png",
  },
  {
    id: "jute-yarn-2",
    name: "Jute Yarn",
    category: "Jute Products",
    description:
      "Jute Rope has variety from 4mm to 50mm both natural and color. It is used for tying up gifts, embellishing cards, baskets, gift tags, vases, plant grafting and decorative arrangements.",
    image: "/hero-img.png",
  },
  {
    id: "jute-yarn-3",
    name: "Jute Yarn",
    category: "Jute Products",
    description:
      "Natural jute yarn for weaving, tying, craft production, packaging, and export-ready bulk supply. Available in multiple grades and counts.",
    image: "/hero-img.png",
  },
  {
    id: "jute-bag-1",
    name: "Jute Yarn",
    category: "Diversified Jute Products",
    description:
      "Diversified jute goods made for retail, gifting, home use, and sustainable packaging. Custom sizing and branding can be arranged for bulk buyers.",
    image: "/hero-img.png",
  },
  {
    id: "jute-rope-1",
    name: "Jute Yarn",
    category: "Jute Products",
    description:
      "Coarse and fine jute ropes for agriculture, construction, sailing, gardening, decor, and commercial packaging use.",
    image: "/hero-img.png",
  },
  {
    id: "jute-craft-1",
    name: "Jute Yarn",
    category: "Diversified Jute Products",
    description:
      "Eco-conscious diversified jute products for international importers, retailers, and wholesale buyers needing dependable export supply.",
    image: "/hero-img.png",
  },
  {
    id: "jute-fabric-1",
    name: "Jute Yarn",
    category: "Jute Products",
    description:
      "Premium natural jute material suitable for packaging, decor, craft, nursery, construction, and multipurpose commercial use.",
    image: "/hero-img.png",
  },
];

const TABS = ["All", "Jute Products", "Diversified Jute Products"] as const;

export default function ProductsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("All");

  const filteredProducts = useMemo(() => {
    if (activeTab === "All") {
      return PRODUCTS;
    }

    return PRODUCTS.filter((product) => product.category === activeTab);
  }, [activeTab]);

  const [featuredProduct, ...gridProducts] = filteredProducts;

  useGSAP(
    () => {
      gsap.fromTo(
        ".products-showcase-item",
        { y: 46, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white py-14 md:py-20">
      <div className="mx-auto  max-w-[1400px] px-5 sm:px-8 lg:px-14">
        <div className="products-showcase-item flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-11">
            {TABS.map((tab) => {
              const active = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative pb-3 text-xs font-normal text-black transition-colors duration-200",
                    active ? "text-brand-dark" : "hover:text-btn-cream",
                  )}
                >
                  {tab}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-px bg-brand-dark transition-all duration-300",
                      active ? "w-full scale-150" : "w-0",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {featuredProduct && (
          <div className="products-showcase-item mt-16">
            <ProductCard
              product={featuredProduct}
              variant="horizontal"
              className="mx-auto max-w-[1400px]"
            />
          </div>
        )}

        <div className="products-showcase-item mx-auto mt-5 grid max-w-[1400px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {gridProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              activeCta={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
