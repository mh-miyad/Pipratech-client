"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import {
  Award,
  BadgeCheck,
  Box,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Certification = {
  title: string;
  imageUrl?: string;
  icon?: LucideIcon;
  variant: "iso" | "meta" | "hp" | "aws";
};

const CERTIFICATIONS: Certification[] = [
  { title: "ISO Certified", icon: Award, variant: "iso" },
  { title: "Meta Certified", icon: BadgeCheck, variant: "meta" },
  { title: "HP Life Certified", variant: "hp" },
  { title: "AWS Certified", icon: Box, variant: "aws" },
  { title: "Meta Certified", icon: BadgeCheck, variant: "meta" },
  { title: "HP Life Certified", variant: "hp" },
  { title: "AWS Certified", icon: Box, variant: "aws" },
  { title: "ISO Certified", icon: Award, variant: "iso" },
];

const HPLogo = () => (
  <span className="grid size-14 place-items-center rounded-full bg-[#0A6FB8] text-[26px] font-bold italic leading-none text-white">
    hp
  </span>
);

const CertificationIcon = ({ item }: { item: Certification }) => {
  if (item.imageUrl) {
    return (
      <Image
        src={item.imageUrl}
        alt={item.title}
        width={58}
        height={58}
        className="h-14 w-14 object-contain"
      />
    );
  }

  if (item.variant === "hp") {
    return <HPLogo />;
  }

  if (!item.icon) {
    return null;
  }

  const Icon = item.icon;

  return <Icon size={item.variant === "iso" ? 54 : 56} strokeWidth={2} />;
};

const getIconColor = (variant: Certification["variant"]) => {
  if (variant === "meta") return "text-[#0877F2]";
  if (variant === "aws") return "text-[#F5A000]";
  return "text-[#1C3D2D]";
};

const CertificationsTrust = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".ct-head",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.68,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        },
      );

      gsap.fromTo(
        ".ct-card",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.58,
          stagger: 0.075,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ct-grid",
            start: "top 84%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const handleHover = (target: HTMLDivElement, active: boolean) => {
    const icon = target.querySelector(".ct-icon");
    const title = target.querySelector(".ct-title");

    gsap.to(target, {
      y: active ? -7 : 0,
      boxShadow: active
        ? "0 18px 38px rgba(13, 13, 13, 0.08)"
        : "0 0 0 rgba(13, 13, 13, 0)",
      duration: 0.36,
      ease: "power3.out",
    });

    gsap.to(icon, {
      y: active ? -4 : 0,
      scale: active ? 1.08 : 1,
      duration: 0.36,
      ease: "power3.out",
    });

    gsap.to(title, {
      color: active ? "#1C3D2D" : "#C5A572",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <section ref={sectionRef} className="bg-rustic-background py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
        <div className="ct-head text-center">
          <h2 className="text-[2rem] font-normal leading-tight tracking-tight text-primary-text sm:text-[2.55rem] lg:text-[3rem]">
            Certifications & <span className="text-brand-neutral">Trust</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-xs leading-relaxed text-brand-primary sm:text-sm">
            Three decades of export experience, owned manufacturing, and a
            commitment to ethical, sustainable practices.
          </p>
        </div>

        <div className="ct-grid mx-auto mt-16 grid max-w-[1400px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {CERTIFICATIONS.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              onMouseEnter={(event) => handleHover(event.currentTarget, true)}
              onMouseLeave={(event) => handleHover(event.currentTarget, false)}
              className="ct-card flex h-[156px] flex-col items-center justify-center rounded-xl bg-white px-6 text-center"
            >
              <div
                className={`ct-icon flex h-16 items-center justify-center ${getIconColor(item.variant)}`}
              >
                <CertificationIcon item={item} />
              </div>

              <h3 className="ct-title mt-5 text-base font-semibold leading-tight text-brand-neutral">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsTrust;
