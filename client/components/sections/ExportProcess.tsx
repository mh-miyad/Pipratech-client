"use client";

import { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkBadge02Icon,
  CustomerSupportIcon,
  FileValidationIcon,
  GlobalIcon,
  PackageProcessIcon,
  UserGroup03Icon,
} from "@hugeicons/core-free-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    title: "Inquiry Received",
    desc: "Send us your requirements and we will respond promptly with detailed information",
    icon: CustomerSupportIcon,
  },
  {
    title: "Quote & Sampling",
    desc: "Discuss specifications, quantities, and customize products to your exact needs",
    icon: UserGroup03Icon,
  },
  {
    title: "Sample Approval",
    desc: "Review and approve product samples before bulk production begins",
    icon: FileValidationIcon,
  },
  {
    title: "Bulk Production",
    desc: "Manufacturing starts with strict quality control at every stage",
    icon: PackageProcessIcon,
  },
  {
    title: "Quality Check",
    desc: "Comprehensive testing and inspection to ensure international standards",
    icon: CheckmarkBadge02Icon,
  },
  {
    title: "Worldwide Delivery",
    desc: "Secure packaging and reliable shipping to your destination anywhere in the world",
    icon: GlobalIcon,
  },
];

const ExportProcess = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".ep-head",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        },
      );

      gsap.fromTo(
        ".ep-card",
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.62,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ep-grid",
            start: "top 82%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const handleHover = (target: HTMLDivElement, active: boolean) => {
    const icon = target.querySelector(".ep-icon");
    const title = target.querySelector(".ep-title");
    const desc = target.querySelector(".ep-desc");

    gsap.to(icon, {
      y: active ? -8 : 0,
      scale: active ? 1.12 : 1,
      rotate: active ? -3 : 0,
      duration: 0.42,
      ease: "power3.out",
    });
    gsap.to(title, {
      y: active ? -2 : 0,
      color: active ? "#1C3D2D" : "#C5A572",
      duration: 0.32,
      ease: "power2.out",
    });
    gsap.to(desc, {
      y: active ? 3 : 0,
      opacity: active ? 0.92 : 1,
      duration: 0.32,
      ease: "power2.out",
    });
  };

  return (
    <section ref={sectionRef} id="export-process" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
        <div className="ep-head text-center">
          <h2 className="text-[2rem] font-normal leading-tight tracking-tight text-primary-text sm:text-[2.55rem] lg:text-[3rem]">
            Our Export <span className="text-brand-neutral">Process</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-xs leading-relaxed text-brand-primary sm:text-sm">
            From first inquiry to delivered container - six clear steps, fully managed
          </p>
        </div>

        <div className="ep-grid mx-auto mt-16 grid max-w-[1400px] grid-cols-1 gap-x-24 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-20">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.title}
              onMouseEnter={(event) => handleHover(event.currentTarget, true)}
              onMouseLeave={(event) => handleHover(event.currentTarget, false)}
              className="ep-card group flex min-h-[190px] flex-col items-center text-center"
            >
              <div className="ep-icon flex h-[58px] w-[58px] items-center justify-center text-brand-primary">
                <HugeiconsIcon
                  icon={step.icon}
                  size={54}
                  color="currentColor"
                  strokeWidth={2.2}
                />
              </div>

              <h3 className="ep-title mt-7 text-base font-semibold leading-tight text-brand-neutral">
                {step.title}
              </h3>
              <p className="ep-desc mt-4 max-w-[245px] text-sm leading-[1.55] text-[#7C7C7C]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExportProcess;
