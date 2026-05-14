"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: "1",
    name: "Jute Sheets",
    description:
      "Light weight Jute Fabrics cut into squares like 40x40 cm, 60x60 cm, 80x80 cm & 100x100 cm. Jute sheets are used for multipurpose use like nursery, construction area and for packing purpose.",
    image: "/hero-img.png",
    featured: true,
  },
  {
    id: "2",
    name: "Jute Fabric Roll",
    description:
      "Light weight Jute Fabrics cut into squares like 40x40 cm, 60x60 cm, 80x80 cm & 100x100 cm.",
    image: "/hero-img.png",
  },
  {
    id: "3",
    name: "Jute Yarn",
    description:
      "Light weight Jute Fabrics cut into squares like 40x40 cm, 60x60 cm, 80x80 cm & 100x100 cm.",
    image: "/hero-img.png",
  },
  {
    id: "4",
    name: "Jute Rope & Twine",
    description:
      "Light weight Jute Fabrics cut into squares like 40x40 cm, 60x60 cm, 80x80 cm & 100x100 cm.",
    image: "/hero-img.png",
  },
  {
    id: "5",
    name: "Hessian Cloth",
    description:
      "Light weight Jute Fabrics cut into squares like 40x40 cm, 60x60 cm, 80x80 cm & 100x100 cm.",
    image: "/hero-img.png",
  },
];

function PhoneIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function FeaturedCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  return (
    <div className="pc-card group h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-btn-cream/50 hover:shadow-xl transition-all duration-400">
      <div className="relative flex-1 min-h-64 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="font-medium text-btn-cream text-lg leading-snug">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-gray-500 font-normal leading-relaxed">
          {product.description.slice(0, 130)}
          {product.description.length > 130 && (
            <>
              {"... "}
              <Link href="/products" className="text-btn-cream hover:underline">
                See More
              </Link>
            </>
          )}
        </p>
        <Link
          href="/contact"
          className="mt-5 w-full inline-flex items-center justify-between gap-2 px-5 py-3 bg-btn-cream/5 hover:bg-btn-cream hover:opacity-90 text-black hover:text-white font-normal rounded-full transition-all duration-200 ease-linear text-sm"
        >
          Contact Us&nbsp; to learn more
          <PhoneIcon />
        </Link>
      </div>
    </div>
  );
}

function RegularCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  return (
    <div className="pc-card group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-btn-cream/50 hover:shadow-xl transition-all duration-400">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-normal text-btn-cream text-base leading-snug">
          {product.name}
        </h3>
        <p className="mt-1.5 text-xs text-gray-500 font-normal leading-relaxed flex-1">
          {product.description.slice(0, 90)}
          {"... "}
          <Link href="/products" className="text-btn-cream hover:underline">
            See More
          </Link>
        </p>
        <Link
          href="/contact"
          className="mt-4 w-full inline-flex items-center justify-between gap-2 px-5 py-2.5 hover:bg-btn-cream bg-btn-cream/10 transition-all duration-200 ease-linear hover:opacity-90 text-balck hover:text-white font-normal rounded-full  text-sm"
        >
          Contact Us&nbsp; to learn more
          <PhoneIcon />
        </Link>
      </div>
    </div>
  );
}

export default function ProductCatalogue() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Heading + subtitle
      gsap.fromTo(
        ".pc-heading",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pc-heading",
            start: "top 88%",
          },
        },
      );

      // Cards staggered reveal
      gsap.fromTo(
        ".pc-card",
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pc-grid",
            start: "top 82%",
          },
        },
      );

      // View All button
      gsap.fromTo(
        ".pc-cta",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pc-cta",
            start: "top 92%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="products"
      className="bg-brand-cream py-20 md:py-28"
    >
      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-14">
        {/* ── Heading ── */}
        <div className="pc-heading text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-normal text-brand-dark leading-tight">
            Product{" "}
            <span className="text-brand-gold font-normal">Catalogue</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 font-normal">
            A complete jute product range, ready to ship.
          </p>
        </div>

        {/* ── Bento Grid ── */}
        <div className="pc-grid grid grid-cols-1 md:grid-cols-3 gap-5 md:min-h-155">
          {/* Featured — spans 2 rows */}
          <div className="md:row-span-2 flex flex-col">
            <FeaturedCard product={PRODUCTS[0]} />
          </div>

          {/* 4 regular cards fill the remaining 2×2 area */}
          {PRODUCTS.slice(1).map((product) => (
            <RegularCard key={product.id} product={product} />
          ))}
        </div>

        {/* ── View All ── */}
        <div className="pc-cta mt-10 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-btn-cream hover:opacity-90 text-white font-normal rounded-full transition-opacity duration-200 text-sm"
          >
            View All Products
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
