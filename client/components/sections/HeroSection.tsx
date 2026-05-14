"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const SLIDES = [
  {
    id: 1,
    image: "/hero-img.png",
    line1: "Premium Quality Jute Products",
    line2: "Exporter from",
    accent: "Bangladesh",
    sub: "We supply eco-friendly, high-quality jute products worldwide for wholesale buyers, importers, and retailers",
  },
  {
    id: 2,
    image: "/hero-img.png",
    line1: "100% Natural Jute Bags,",
    line2: "Fabric & Yarn for the",
    accent: "World",
    sub: "Trusted by importers in 15+ countries — delivering consistent quality, on-time shipments, and full traceability.",
  },
  {
    id: 3,
    image: "/hero-img.png",
    line1: "Your Reliable Jute Supplier",
    line2: "& Exporter from",
    accent: "Bangladesh",
    sub: "From sample approval to final delivery — we handle the full export process with transparency and care.",
  },
];

export default function HeroSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const animateSlide = useCallback((slideEl?: Element) => {
    if (!slideEl) {
      return;
    }

    const bar = slideEl.querySelector(".sl-bar");
    const inners = slideEl.querySelectorAll(".sl-inner");
    const sub = slideEl.querySelector(".sl-sub");
    const btns = slideEl.querySelectorAll(".sl-btn");
    const badge = slideEl.querySelector(".sl-badge");
    const targets = [
      bar,
      ...Array.from(inners),
      sub,
      ...Array.from(btns),
      badge,
    ].filter(Boolean);

    gsap.killTweensOf(targets);

    if (bar) gsap.set(bar, { scaleY: 0, transformOrigin: "top center" });
    if (inners.length) gsap.set(inners, { y: "110%" });
    if (sub) gsap.set(sub, { y: 24, opacity: 0 });
    if (btns.length) gsap.set(btns, { y: 20, opacity: 0 });
    if (badge) gsap.set(badge, { x: 40, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (bar) tl.to(bar, { scaleY: 0.95, duration: 0.55 });
    if (inners.length) {
      tl.to(inners, { y: "0%", duration: 0.75, stagger: 0.13 }, "-=0.25");
    }
    if (sub) tl.to(sub, { y: 0, opacity: 1, duration: 0.5 }, "-=0.35");
    if (btns.length) {
      tl.to(btns, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, "-=0.35");
    }
    if (badge) {
      tl.to(
        badge,
        { x: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
        "-=0.5",
      );
    }
  }, []);

  const handleSwiper = useCallback(
    (sw: SwiperType) => {
      swiperRef.current = sw;
      sw.slides.forEach((slideEl) => {
        const bar = slideEl.querySelector(".sl-bar");
        const inners = slideEl.querySelectorAll(".sl-inner");
        const sub = slideEl.querySelector(".sl-sub");
        const btns = slideEl.querySelectorAll(".sl-btn");
        const badge = slideEl.querySelector(".sl-badge");

        if (bar) {
          gsap.set(bar, {
            scaleY: 0,
            transformOrigin: "top center",
          });
        }
        if (inners.length) gsap.set(inners, { y: "110%" });
        if (sub) gsap.set(sub, { y: 24, opacity: 0 });
        if (btns.length) gsap.set(btns, { y: 20, opacity: 0 });
        if (badge) gsap.set(badge, { x: 40, opacity: 0 });
      });
      window.setTimeout(() => animateSlide(sw.slides[sw.activeIndex]), 200);
    },
    [animateSlide],
  );

  const handleSlideChange = useCallback(
    (sw: SwiperType) => {
      setActiveIndex(sw.realIndex);
      animateSlide(sw.slides[sw.activeIndex]);
    },
    [animateSlide],
  );

  return (
    <section className="relative h-[720px] max-h-[86svh] min-h-[620px] overflow-hidden bg-brand-dark md:h-[760px] md:max-h-[84svh] lg:h-screen lg:max-h-none">
      {/* ── Swiper ── */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={900}
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={slide.id} className="relative h-full">
            {/* Background */}
            <Image
              src={slide.image}
              alt={slide.line1}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/92 via-black/72 to-black/40" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

            {/* ── Slide content ── */}
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-14 pt-14 md:pt-20 w-full">
                {/* Outer row: text-block (left) + badge (right) */}
                <div className="flex items-end justify-between gap-6 lg:gap-10">
                  {/* Left: gold-bar + label + heading | sub | buttons */}
                  <div className="flex-1 min-w-0">
                    {/* ── gold bar spans label + h1 dynamically ── */}
                    <div className="flex items-stretch gap-5 lg:gap-6">
                      {/* Bar — height auto-matches sibling via items-stretch */}
                      <div className="sl-bar w-1 bg-btn-cream rounded-full shrink-0" />

                      {/* Label + Heading */}
                      <div className="min-w-0">
                        {/* <span className="sl-label block text-brand-gold text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase mb-3 lg:mb-4">
                          {slide.label}
                        </span> */}

                        <h1 className="font-normal text-white leading-[1.08] tracking-tight text-[1.42rem] sm:text-[2.5rem] md:text-[2.75rem] lg:text-[3.55rem] xl:text-[4.2rem] pb-3 md:pb-5">
                          <div className="overflow-hidden">
                            <span className="sl-inner inline-block">
                              {slide.line1}
                            </span>
                          </div>
                          <div className="overflow-hidden mt-0.5">
                            <span className="sl-inner inline-block">
                              {slide.line2}&nbsp;
                              <span className="text-brand-gold">
                                {slide.accent}
                              </span>
                            </span>
                          </div>
                        </h1>
                      </div>
                    </div>

                    {/* Sub + buttons — indented to align with heading (bar 3px + gap ~20px) */}
                    <div className="pl-6 lg:pl-7 mt-3 md:mt-5 max-w-[770px]">
                      <p className="sl-sub text-sm md:text-[15px] xl:text-[20px] text-white/65 font-normal leading-relaxed ">
                        {slide.sub}
                      </p>

                      <div className="flex flex-wrap gap-4 mt-5 md:mt-7">
                        <Link
                          href="/contact"
                          className="sl-btn inline-flex items-center gap-2 px-7 py-3.5 max-sm:px-6 max-sm:py-3 bg-btn-cream hover:bg-brand-cream-dark text-brand-dark  rounded-full transition-colors duration-200 text-sm"
                        >
                          Request a Quote
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Link>

                        <a
                          href="https://wa.me/8801000000000"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sl-btn inline-flex items-center gap-2 px-7 py-3.5 max-sm:px-6 max-sm:py-3 bg-white/10 border border-white/50 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-200 text-sm"
                        >
                          Connect Via WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* ── 15+ badge — in flow, right side, aligned to bottom ── */}
                  <div className="sl-badge shrink-0 hidden md:block self-end mb-1">
                    <div className="bg-white/5 backdrop-blur-sm rounded-[20px] border border-white/30 px-10 py-5 shadow-2xl">
                      <p className="text-[2.5rem] sm:text-[3rem] font-normal text-white leading-none">
                        15+
                      </p>
                      <p className="text-sm text-white/70 mt-2 leading-snug font-medium">
                        Countries Served
                        <br />
                        Worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Left Arrow ── */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-5 top-[58%] md:top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/30 hover:border-white/60 bg-black/25 hover:bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 group"
      >
        <svg
          className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-150"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* ── Right Arrow ── */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
        className="absolute right-3 sm:right-5 top-[58%] md:top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/30 hover:border-white/60 bg-black/25 hover:bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 group"
      >
        <svg
          className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-150"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ── Dot Pagination ── */}
      <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              swiperRef.current?.slideTo(i);
              setActiveIndex(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              activeIndex === i
                ? "w-7 h-2.5 bg-brand-gold"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
