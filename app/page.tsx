"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  brand,
  companyHighlights,
  galleryImages,
  heroSlides,
  products,
  sisterConcerns,
  stats,
  trustItems,
} from "@/lib/company-data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".section-reveal", {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
    },
    { scope: ref },
  );

  return ref;
}

function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const [slides, setSlides] = useState(heroSlides);

  useEffect(() => {
    const BASE_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "https://industry-portfolio.techelementbd.com").replace(/\/$/, "");
    const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || "7e96ad0e-30eb-4eac-9d27-06e0cf57b80d";
    fetch(`${BASE_URL}/api/v1/public/hero-banner`, {
      headers: { "Content-Type": "application/json", "tenant-id": TENANT_ID, "x-tenant-id": TENANT_ID },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setSlides(
            json.data.map((b: any) => ({
              image: b.imageUrl,
              eyebrow: b.tagTitle || "Premium Electrical Supplier",
              title: b.title,
              description: b.description || "",
            })),
          );
        }
      })
      .catch(() => {});
  }, []);

  const animateSlide = useCallback((slide?: Element) => {
    if (!slide) return;
    const items = slide.querySelectorAll(".hero-animate");
    gsap.killTweensOf(items);
    gsap.fromTo(
      items,
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out" },
    );
  }, []);

  return (
    <section className="relative h-[720px] min-h-[620px] overflow-hidden bg-[#1a3a52] md:h-screen">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5200, disableOnInteraction: false, pauseOnMouseEnter: true }}
        speed={900}
        loop
        className="h-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          window.setTimeout(() => animateSlide(swiper.slides?.[swiper.activeIndex]), 160);
        }}
        onSlideChange={(swiper) => {
          setActive(swiper.realIndex);
          animateSlide(swiper.slides?.[swiper.activeIndex]);
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title} className="relative h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#1a3a52]/95 via-[#1a3a52]/76 to-[#1a3a52]/35" />
            <div className="absolute inset-0 bg-linear-to-t from-[#1a3a52]/80 via-transparent to-transparent" />

            <div className="absolute inset-0 z-10 flex items-center">
              <div className="mx-auto w-full max-w-[1440px] px-5 pt-20 sm:px-8 lg:px-12">
                <div className="max-w-4xl">
                  <div className="hero-animate mb-6 flex items-center gap-4">
                    <span className="h-16 w-1 rounded-full bg-[#dc2626]" />
                    <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-normal uppercase tracking-[0.18em] text-white/78 backdrop-blur-md">
                      {slide.eyebrow}
                    </span>
                  </div>
                  <h1 className="hero-animate max-w-4xl text-4xl font-normal leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    {slide.title}
                  </h1>
                  <p className="hero-animate mt-6 max-w-2xl text-base font-normal leading-8 text-white/70 md:text-lg">
                    {slide.description}
                  </p>
                  <div className="hero-animate mt-8 flex flex-wrap gap-3">
                    <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-[#dc2626] px-7 py-3.5 text-sm font-normal text-white transition-colors hover:bg-[#b91c1c]">
                      View Products
                      <ArrowRight className="size-4" />
                    </Link>
                    <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/10 px-7 py-3.5 text-sm font-normal text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                      Request Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-4 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-white/15 md:flex"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-4 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-white/15 md:flex"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={active === index ? "h-2.5 w-8 rounded-full bg-[#dc2626]" : "size-2.5 rounded-full bg-white/45"}
          />
        ))}
      </div>
    </section>
  );
}

function ProductsPreview() {
  const revealRef = useRef<HTMLDivElement>(null);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [previewLoading, setPreviewLoading] = useState(true);

  useEffect(() => {
    const BASE_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "https://industry-portfolio.techelementbd.com").replace(/\/$/, "");
    const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || "7e96ad0e-30eb-4eac-9d27-06e0cf57b80d";
    fetch(`${BASE_URL}/api/v1/public/section/key/products`, {
      headers: { "Content-Type": "application/json", "tenant-id": TENANT_ID, "x-tenant-id": TENANT_ID },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.items) {
          const items = json.data.items.map((item: any, i: number) => {
            const extra = item.extra || {};
            return {
              id: item.id || `api-${i}`,
              name: item.title || `Product ${i + 1}`,
              category: item.category || item.subtitle || "",
              description: extra.shortDescription || item.description || "",
              image: item.imageUrl || (extra.images && extra.images[0]) || "/logo.png",
              featured: extra.featured || false,
              attributes: extra.coreAttributes || [],
              specs: extra.technicalSpecifications || extra.technicalSpecs || [],
            };
          });
          const featured = items.filter((p: any) => p.featured);
          setFeaturedProducts(featured.length > 0 ? featured.slice(0, 6) : items.slice(0, 6));
        } else {
          setFeaturedProducts(
            products.slice(0, 6).map((p) => ({
              id: p.id, name: p.name, category: p.category, description: p.description, image: p.image, featured: false, attributes: [], specs: p.variants || [],
            }))
          );
        }
        setPreviewLoading(false);
      })
      .catch(() => {
        setFeaturedProducts(
          products.slice(0, 6).map((p) => ({
            id: p.id, name: p.name, category: p.category, description: p.description, image: p.image, featured: false, attributes: [], specs: p.variants || [],
          }))
        );
        setPreviewLoading(false);
      });
  }, []);

  useGSAP(
    () => {
      if (previewLoading) return;
      ScrollTrigger.refresh();
      gsap.fromTo(
        ".products-section-reveal",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: revealRef.current, start: "top 78%" },
        },
      );
    },
    { scope: revealRef, dependencies: [previewLoading, featuredProducts] },
  );

  return (
    <section ref={revealRef} className="bg-white px-5 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="products-section-reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-normal text-[#dc2626]">Product catalogue</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-normal leading-tight text-[#1a3a52] md:text-5xl">
              Product display with variants and price notes
            </h2>
          </div>
          <Link href="/products" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#dc2626] px-6 py-3 text-sm font-normal text-white hover:bg-[#b91c1c]">
            All Products
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {previewLoading ? (
          <div className="mt-12 flex items-center justify-center py-12">
            <div className="size-8 animate-spin rounded-full border-2 border-[#dc2626] border-t-transparent" />
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-[8px] border-2 border-dashed border-[#e2e8f0] py-16">
            <p className="text-gray-400">No products available yet.</p>
            <Link href="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#dc2626] px-6 py-3 text-sm font-normal text-white hover:bg-[#b91c1c]">Contact for Products</Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <article key={product.id} className="products-section-reveal group flex flex-col overflow-hidden rounded-[8px] border border-[#e2e8f0] bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f5f9]">
                  <Image
                    src={product.image || "/logo.png"}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-normal uppercase tracking-wider text-[#dc2626]">{product.category}</p>
                  <h3 className="mt-2 text-lg font-semibold leading-tight text-[#1a3a52]">{product.name}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">{product.description}</p>
                  {product.specs && product.specs.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      {product.specs.slice(0, 3).map((spec: any, i: number) => (
                        <div key={i} className="flex items-center justify-between rounded-full border border-[#e2e8f0] bg-[#f8f9fb] px-3 py-1.5 text-xs">
                          <span className="text-gray-500">{spec.name || spec.label || spec.rating}</span>
                          <span className="font-medium text-[#dc2626]">{spec.price || spec.value || ""}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {product.attributes && product.attributes.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {product.attributes.slice(0, 3).map((attr: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="size-1 rounded-full bg-[#dc2626]" />{attr}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto pt-4">
                    <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#dc2626] hover:text-[#b91c1c] transition-colors">
                      View Details
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AboutPreview() {
  const revealRef = useReveal();

  return (
    <section ref={revealRef} className="bg-[#f8f9fb] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="section-reveal relative min-h-[420px] overflow-hidden rounded-[8px]">
          <Image src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1400&q=80" alt="Electrical project planning" fill className="object-cover" />
        </div>
        <div className="section-reveal">
          <p className="text-sm font-normal text-[#dc2626]">About us</p>
          <h2 className="mt-2 text-3xl font-normal leading-tight text-[#1a3a52] md:text-5xl">
            Company profile for buyers who need dependable supply
          </h2>
          <p className="mt-6 text-base leading-8 text-gray-600">
            {brand.name} is an importer and supplier of premium electrical products in Bangladesh. The website is designed as a clean company introduction, product catalogue, gallery, and inquiry channel.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {companyHighlights.map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-[8px] bg-white p-4">
                <span className="flex size-10 items-center justify-center rounded-full bg-[#dc2626] text-white">
                  <item.icon className="size-4" />
                </span>
                <span className="text-sm font-normal text-[#1a3a52]">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-normal text-[#dc2626]">{stat.value}</p>
                <p className="mt-1 text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const revealRef = useReveal();

  return (
    <section ref={revealRef} className="bg-white px-5 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="section-reveal max-w-3xl">
          <p className="text-sm font-normal text-[#dc2626]">Why choose us</p>
          <h2 className="mt-2 text-3xl font-normal leading-tight text-[#1a3a52] md:text-5xl">
            Slim, clean UI for real company information
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.title} className="section-reveal rounded-[8px] border border-[#e2e8f0] bg-[#f8f9fb] p-6">
              <span className="flex size-12 items-center justify-center rounded-full bg-[#dc2626] text-white">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-normal text-[#1a3a52]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySisterContact() {
  const revealRef = useReveal();

  return (
    <section ref={revealRef} className="bg-[#f8f9fb] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <div className="section-reveal flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-normal text-[#dc2626]">Gallery</p>
                <h2 className="mt-2 text-3xl font-normal text-[#1a3a52] md:text-5xl">Work and product visuals</h2>
              </div>
              <Link href="/gallery" className="hidden rounded-full bg-[#dc2626] px-5 py-3 text-sm font-normal text-white md:inline-flex">Open Gallery</Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {galleryImages.slice(0, 6).map((image, index) => (
                <div key={image} className="section-reveal relative aspect-[4/3] overflow-hidden rounded-[8px] bg-white">
                  <Image src={image} alt={`PIPRA gallery image ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="section-reveal rounded-[8px] bg-[#1a3a52] p-6 text-white md:p-8">
            <p className="text-sm font-normal text-[#dc2626]">Our sister concern</p>
            <h2 className="mt-2 text-3xl font-normal leading-tight">Connected company blocks</h2>
            <div className="mt-7 space-y-4">
              {sisterConcerns.map((concern) => (
                <div key={concern.name} className="rounded-[8px] bg-white/8 p-4">
                  <p className="font-normal">{concern.name}</p>
                  <p className="mt-1 text-xs text-white/55">{concern.role}</p>
                </div>
              ))}
            </div>
            <Link href="/sister-concerns" className="mt-7 inline-flex rounded-full bg-[#dc2626] px-5 py-3 text-sm font-normal text-white">
              View Sister Concern
            </Link>
          </div>
        </div>

        <div className="section-reveal mt-12 grid gap-6 rounded-[8px] bg-white p-6 md:grid-cols-[1fr_1fr] md:p-8">
          <div>
            <p className="text-sm font-normal text-[#dc2626]">Google map</p>
            <h2 className="mt-2 text-3xl font-normal text-[#1a3a52]">Visit or contact PIPRA Trading</h2>
            <div className="mt-6 space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-3"><Phone className="size-4 text-[#dc2626]" /> {brand.phone}</p>
              <p className="flex items-center gap-3"><Mail className="size-4 text-[#dc2626]" /> {brand.email}</p>
              <p className="flex items-center gap-3"><MapPin className="size-4 text-[#dc2626]" /> {brand.address}</p>
            </div>
          </div>
          <div className="min-h-[300px] overflow-hidden rounded-[8px] border border-[#e2e8f0]">
            <iframe
              title="PIPRA Trading location map"
              src="https://www.google.com/maps?q=Kamrannirchar%2C%20Dhaka-1211&output=embed"
              className="h-full min-h-[300px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSlider />
      <AboutPreview />
      <ProductsPreview />
      <TrustSection />
      <GallerySisterContact />
      <Footer />
    </main>
  );
}
