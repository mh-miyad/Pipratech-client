"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type GalleryCategory = "Factory" | "Sourcing" | "Product" | "Export";

type GalleryItem = {
  id: string;
  category: GalleryCategory;
  image: string;
  alt: string;
};

const TABS = ["All", "Factory", "Sourcing", "Product", "Export"] as const;

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "factory-1",
    category: "Factory",
    image: "/hero-img.png",
    alt: "Jute factory view",
  },
  {
    id: "sourcing-1",
    category: "Sourcing",
    image: "/hero-img.png",
    alt: "Jute sourcing material",
  },
  {
    id: "product-1",
    category: "Product",
    image: "/hero-img.png",
    alt: "Jute product yarn",
  },
  {
    id: "product-2",
    category: "Product",
    image: "/hero-img.png",
    alt: "Natural jute yarn basket",
  },
  {
    id: "sourcing-2",
    category: "Sourcing",
    image: "/hero-img.png",
    alt: "Raw jute rolls",
  },
  {
    id: "export-1",
    category: "Export",
    image: "/hero-img.png",
    alt: "Export ready jute products",
  },
];

export default function GalleryGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("All");

  const filteredItems = useMemo(() => {
    if (activeTab === "All") {
      return GALLERY_ITEMS;
    }

    return GALLERY_ITEMS.filter((item) => item.category === activeTab);
  }, [activeTab]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".gallery-item",
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.68,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-14">
        <div className="gallery-item flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-9 sm:gap-14">
            {TABS.map((tab) => {
              const active = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative pb-3 text-base font-normal text-black transition-colors duration-200",
                    active ? "text-brand-dark" : "hover:text-btn-cream",
                  )}
                >
                  {tab}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-brand-dark transition-all duration-300",
                      active ? "w-20" : "w-0",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="gallery-item mx-auto mt-24 grid max-w-[1050px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <figure
              key={item.id}
              className="group relative aspect-[451/600] overflow-hidden rounded-lg bg-brand-cream"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 330px, (min-width: 640px) 45vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
