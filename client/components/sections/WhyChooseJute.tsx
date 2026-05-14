"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = ["Eco-friendly", "Biodegradable", "Reusable"];

const DESC =
  "We export jute products to multiple countries including the USA, UK, Germany, UAE, and more. Our commitment to quality and timely delivery makes us a trusted partner for global buyers. We export jute products to multiple countries including the USA, UK, Germany, UAE, and more. Our commitment to quality and timely delivery makes us a trusted partner for global buyers. We export jute products to multiple countries including the USA, UK, Germany, UAE, and more. Our commitment to quality and timely delivery makes us a trusted partner for global buyers.";

export default function WhyChooseJute() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(".wcj-image", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85 });
      tl.fromTo(".wcj-ch", { scaleX: 0 }, { scaleX: 1, duration: 0.55, stagger: 0.08 }, "-=0.5");
      tl.fromTo(".wcj-cv", { scaleY: 0 }, { scaleY: 1, duration: 0.55, stagger: 0.08 }, "<");
      tl.fromTo(".wcj-heading", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4");
      tl.fromTo(".wcj-desc",    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.35");
      tl.fromTo(".wcj-feature", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="why-jute" className="bg-white py-20 md:py-28">
      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-12 lg:gap-20 xl:gap-24 items-start">

          {/* ── Left: image with corner brackets ── */}
          <div className="wcj-image relative mx-auto w-full max-w-72 lg:max-w-none">
            <div className="relative p-4">
              {/* Top-right bracket */}
              <div className="absolute top-0 right-0 pointer-events-none">
                <div className="wcj-ch absolute top-0 right-0 h-px w-14 bg-btn-cream origin-right" />
                <div className="wcj-cv absolute top-0 right-0 w-px h-14 bg-btn-cream origin-top" />
              </div>
              {/* Bottom-left bracket */}
              <div className="absolute bottom-0 left-0 pointer-events-none">
                <div className="wcj-ch absolute bottom-0 left-0 h-px w-14 bg-btn-cream origin-left" />
                <div className="wcj-cv absolute bottom-0 left-0 w-px h-14 bg-btn-cream origin-bottom" />
              </div>
              <div className="relative w-full aspect-3/4 overflow-hidden">
                <Image src="/hero-img.png" alt="Natural jute products" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* ── Right: content ── */}
          <div className="flex flex-col">
            <h2 className="wcj-heading text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-normal text-brand-dark leading-[1.1] mb-7">
              Why Choose{" "}
              <span className="text-btn-cream font-normal">Jute?</span>
            </h2>

            <p className="wcj-desc text-sm sm:text-[15px] text-gray-500 font-normal leading-[1.9] mb-10">
              {DESC}
            </p>

            <div className="flex items-center justify-between border-t border-gray-100 pt-8">
              {FEATURES.map((feat, i) => (
                <div key={feat} className="wcj-feature flex items-center gap-8">
                  <span className="text-xl sm:text-2xl font-normal text-brand-dark">{feat}</span>
                  {i < FEATURES.length - 1 && (
                    <div className="hidden sm:block h-5 w-px bg-gray-300" />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
