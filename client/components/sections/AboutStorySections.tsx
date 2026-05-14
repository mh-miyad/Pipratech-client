"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type AboutStorySection = {
  eyebrow: string;
  title: string;
  highlightedTitle: string;
  body: string[];
  image: string;
  imageAlt: string;
  imageSide: "left" | "right";
  stats?: {
    value: string;
    label: string;
  }[];
  quote?: string;
};

const ABOUT_SECTIONS: AboutStorySection[] = [
  {
    eyebrow: "Our Story",
    title: "We Are",
    highlightedTitle: "SNL International",
    body: [
      "We can proudly say that Bangladesh is the home of jute and it is an honor for us to work to elevate the reputation of this natural golden fiber. Bangladesh jute is known as the Golden Fiber because of its high quality and long global history.",
      "Because of the superior fiber quality of Bangladesh jute, it has dominated global demand for years. We believe in sustainability, long-term commercial relationships, and responsible export service for future generations.",
    ],
    image: "/hero-img.png",
    imageAlt: "Premium jute fiber from Bangladesh",
    imageSide: "left",
    stats: [
      { value: "15+", label: "Countries Served" },
      { value: "30", label: "Years of Operating" },
    ],
  },
  {
    eyebrow: "Leadership",
    title: "Words from",
    highlightedTitle: "CEO",
    body: [
      "I, Md. Shahrab Hossain, come from a Bengali entrepreneur family connected with the jute industry for generations. I was one of the few Bengali entrepreneurs to establish Textile and Jute Mills before the 1971 Liberation War of Bangladesh.",
      "From childhood I learned business discipline, responsibility, and the value of long-term trust. Today SNL International carries that legacy forward through quality, ethics, and dependable export service.",
    ],
    image: "/hero-img.png",
    imageAlt: "SNL International leadership and jute export legacy",
    imageSide: "right",
    quote: "Your necessity is our responsibility.",
  },
];

export default function AboutStorySections() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".about-story-image",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.14 },
      )
        .fromTo(
          ".about-story-ch",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, stagger: 0.05 },
          "-=0.5",
        )
        .fromTo(
          ".about-story-cv",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.5, stagger: 0.05 },
          "<",
        )
        .fromTo(
          ".about-story-copy",
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.12 },
          "-=0.35",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white pt-20 pb-10 md:pt-28 md:pb-14">
      <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-14">
        <div className="space-y-20 md:space-y-24">
          {ABOUT_SECTIONS.map((section) => {
            const imageFirst = section.imageSide === "left";

            return (
              <div
                key={section.eyebrow}
                className={
                  imageFirst
                    ? "grid grid-cols-1 items-stretch gap-12 lg:grid-cols-[1fr_3fr] lg:gap-20 xl:gap-24"
                    : "grid grid-cols-1 items-stretch gap-12 lg:grid-cols-[3fr_1fr] lg:gap-20 xl:gap-24"
                }
              >
                <div
                  className={
                    imageFirst
                      ? "about-story-image relative order-1 mx-auto w-full max-w-72 lg:max-w-none"
                      : "about-story-image relative order-2 mx-auto w-full max-w-72 lg:max-w-none"
                  }
                >
                  <div className="relative h-full p-4">
                    <div className="absolute right-0 top-0 pointer-events-none">
                      <div className="about-story-ch absolute right-0 top-0 h-px w-14 origin-right bg-btn-cream" />
                      <div className="about-story-cv absolute right-0 top-0 h-14 w-px origin-top bg-btn-cream" />
                    </div>
                    <div className="absolute bottom-0 left-0 pointer-events-none">
                      <div className="about-story-ch absolute bottom-0 left-0 h-px w-14 origin-left bg-btn-cream" />
                      <div className="about-story-cv absolute bottom-0 left-0 h-14 w-px origin-bottom bg-btn-cream" />
                    </div>
                    <div className="relative aspect-3/4 w-full overflow-hidden lg:h-full lg:min-h-[390px] lg:aspect-auto">
                      <Image
                        src={section.image}
                        alt={section.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 288px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={
                    imageFirst
                      ? "about-story-copy order-2 flex flex-col"
                      : "about-story-copy order-1 flex flex-col"
                  }
                >
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-neutral">
                    {section.eyebrow}
                  </p>
                  <h2 className="text-4xl font-normal leading-[1.1] text-brand-dark sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
                    {section.title}{" "}
                    <span className="font-normal text-btn-cream">
                      {section.highlightedTitle}
                    </span>
                  </h2>

                  <div className="mt-7 space-y-5 text-sm font-normal leading-[1.9] text-brand-primary sm:text-[15px]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.stats && (
                    <div className="mt-10 flex flex-col justify-between gap-6 border-t border-gray-100 pt-8 sm:flex-row sm:items-center">
                      {section.stats.map((stat) => (
                        <div key={stat.label}>
                          <span className="block text-2xl font-semibold leading-none text-brand-dark">
                            {stat.value}
                          </span>
                          <span className="mt-2 block text-xl font-normal text-brand-dark">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.quote && (
                    <p className="mt-14 text-2xl font-semibold leading-tight text-brand-dark">
                      &quot;{section.quote}&quot;
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
