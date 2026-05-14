"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type DynamicAccordionItem = {
  title: string;
  content: string;
};

type DynamicAccordionSectionProps = {
  id?: string;
  title: string;
  highlightedTitle: string;
  eyebrow?: string;
  subtitle: string;
  items: DynamicAccordionItem[];
  defaultOpenIndex?: number;
  className?: string;
};

export function DynamicAccordionSection({
  id,
  title,
  highlightedTitle,
  eyebrow,
  subtitle,
  items,
  defaultOpenIndex = 0,
  className,
}: DynamicAccordionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".da-head",
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
      ).fromTo(
        ".da-row",
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 },
        "-=0.35",
      );
    },
    { scope: sectionRef },
  );

  const handleRowHover = (target: HTMLButtonElement, active: boolean) => {
    gsap.to(target.querySelector(".da-question"), {
      x: active ? 8 : 0,
      color: active ? "#0D0D0D" : undefined,
      duration: 0.28,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("bg-rustic-background py-20 md:py-28", className)}
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
        <div className="da-head">
          {eyebrow && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-neutral">
              {eyebrow}
            </p>
          )}
          <h2 className="text-[2rem] font-normal leading-tight tracking-tight text-primary-text sm:text-[2.65rem] lg:text-[3rem]">
            {title}{" "}
            <span className="text-brand-neutral">{highlightedTitle}</span>
          </h2>
          <p className="mt-8 max-w-[390px] text-xs leading-relaxed text-brand-primary sm:text-sm">
            {subtitle}
          </p>
        </div>

        <div className="mt-20">
          {items.map((item, index) => {
            const open = openIndex === index;
            const number = String(index + 1).padStart(2, "0");

            return (
              <div
                key={item.title}
                className={cn(
                  "da-row border-b transition-colors duration-300",
                  open ? "border-primary-text" : "border-[#BFBFBF]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  onMouseEnter={(event) =>
                    handleRowHover(event.currentTarget, true)
                  }
                  onMouseLeave={(event) =>
                    handleRowHover(event.currentTarget, false)
                  }
                  className="grid w-full grid-cols-[46px_1fr] gap-6 py-8 text-left sm:grid-cols-[58px_1fr] sm:gap-8"
                  aria-expanded={open}
                >
                  <span
                    className={cn(
                      "pt-1 text-xl font-semibold leading-none transition-colors duration-300 sm:text-2xl",
                      open ? "text-primary-text" : "text-[#B5B5B5]",
                    )}
                  >
                    {number}
                  </span>

                  <span className="min-w-0">
                    <span
                      className={cn(
                        "da-question block text-2xl font-semibold leading-tight tracking-tight transition-colors duration-300 sm:text-[2rem]",
                        open ? "text-primary-text" : "text-[#B5B5B5]",
                      )}
                    >
                      {item.title}
                    </span>

                    <span
                      className={cn(
                        "grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-500 ease-out",
                        open
                          ? "mt-8 grid-rows-[1fr] opacity-100"
                          : "mt-0 grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className="min-h-0">
                        <span className="block max-w-[700px] pb-3 text-xs leading-relaxed text-brand-primary sm:text-sm">
                          {item.content}
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
