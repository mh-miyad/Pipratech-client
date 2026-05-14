"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SisterConcern = {
  name: string;
  description: string;
  members: string[];
  image: string;
  imageAlt: string;
  imageSide: "left" | "right";
};

const SISTER_CONCERNS: SisterConcern[] = [
  {
    name: "Shamsher Jute Mills LTD",
    description:
      "Shamsher Jute Mills Ltd. (SJML) is one of the very first private Jute Mills in Bangladesh. It was established by Haji Mohammad Ali in 1978. It has established itself as a brand by maintaining the finest quality of Jute Goods. The highest-grade raw Jute in the world is used to make a comprehensive range of Jute Yarn and Twine that satisfies global standards for both quality and quantity. Products from Shamsher Jute Mills Ltd are utilized in Carpet weaving, Wall coverings, Jute weaving, Fabrics for Shopping Bags, Caps, Handicrafts and Jute cloth for a variety of uses including Canvas, Decorative Fabrics, Laminated Cloth, Heavy Yarn for Cables, Braiding for Handmade Leisure Shoes, Safety Fuse for Explosives, and many more.",
    members: [
      "Bangladesh Jute Mills Association (BJMA)",
      "Dhaka Chamber of Commerce & Industry (DCCI)",
      "Bangladesh Jute Spinners Association (BJSA)",
      "The Federation of Bangladesh Chambers of Commerce and Industry (FBCCI)",
      "Metropolitan Chamber of Commerce and Industry, Dhaka (MCCI)",
    ],
    image: "/hero-img.png",
    imageAlt: "Shamsher Jute Mills LTD",
    imageSide: "left",
  },
  {
    name: "Madina Jute Industries Ltd.",
    description:
      "Madina Jute Industries Ltd. (MJIL) is a well established name in Jute Industry for its diversified Jute products. It was established in 2004. It specializes in superior hessian cloth of various widths as well as other nonconventional hessian cloth and bags (colored and bleached) as per demand and specifications of the clients. They also produce high quality Jute Yarn/Twine, Jute Mesh, Jute Soil Saver, Jute Webbing/Ribbon, Jute Tape etc.",
    members: [
      "Bangladesh Jute Mills Association (BJMA)",
      "Dhaka Chamber of Commerce & Industry (DCCI)",
      "Bangladesh Jute Exporters Association (BJEA)",
    ],
    image: "/hero-img.png",
    imageAlt: "Madina Jute Industries Ltd.",
    imageSide: "right",
  },
  {
    name: "Haramine Spinning Mills Ltd.",
    description:
      "Haramine Spinning Mills Ltd. (HSML) was incorporated as a private limited company in 18 February 2007 under the relevant Companies Act. The company is engaged in cotton spinning business. The shareholder directors of HSML have sound educational, business, social, financial background and banking networks in Bangladesh. HSML's operations are managed by experienced people with diverse, professional and functional experience.",
    members: ["Bangladesh Textile Mills Association (BTMA)"],
    image: "/hero-img.png",
    imageAlt: "Haramine Spinning Mills Ltd.",
    imageSide: "left",
  },
  {
    name: "Shohrab Securities & Trade Ltd.",
    description:
      "Shohrab Securities & Trade Ltd. (SST) is a member of the Dhaka Stock Exchange Ltd. (DSE) and a Full-Service Depository Participant of the Central Depository Bangladesh Limited (CDBL). It was established in 2005. Shohrab Securities & Trade Ltd. is holding both Stock Broker & Stock Dealer license from Bangladesh Securities and Exchange Commission (BSEC). Shohrab Securities & Trade Ltd. is committed to establish a concrete business relationship with clients and working together concentrating better customer satisfaction by providing professional services.",
    members: ["DSE Brokers Association of Bangladesh (DBA)"],
    image: "/hero-img.png",
    imageAlt: "Shohrab Securities & Trade Ltd.",
    imageSide: "right",
  },
];

export default function SisterConcernsSections() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".sister-image",
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.72, stagger: 0.12 },
      )
        .fromTo(
          ".sister-ch",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.48, stagger: 0.04 },
          "-=0.48",
        )
        .fromTo(
          ".sister-cv",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.48, stagger: 0.04 },
          "<",
        )
        .fromTo(
          ".sister-copy",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.62, stagger: 0.1 },
          "-=0.34",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-14">
        <div className="space-y-20 md:space-y-24">
          {SISTER_CONCERNS.map((concern) => {
            const imageFirst = concern.imageSide === "left";

            return (
              <article
                key={concern.name}
                className={
                  imageFirst
                    ? "grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_2.7fr] lg:gap-16 xl:gap-20"
                    : "grid grid-cols-1 items-start gap-12 lg:grid-cols-[2.7fr_1fr] lg:gap-16 xl:gap-20"
                }
              >
                <div
                  className={
                    imageFirst
                      ? "sister-image relative order-1 mx-auto w-full max-w-82 lg:max-w-none"
                      : "sister-image relative order-2 mx-auto w-full max-w-82 lg:max-w-none"
                  }
                >
                  <div className="relative p-4">
                    <div className="absolute right-0 top-0 pointer-events-none">
                      <div className="sister-ch absolute right-0 top-0 h-px w-20 origin-right bg-btn-cream" />
                      <div className="sister-cv absolute right-0 top-0 h-20 w-px origin-top bg-btn-cream" />
                    </div>
                    <div className="absolute bottom-0 left-0 pointer-events-none">
                      <div className="sister-ch absolute bottom-0 left-0 h-px w-20 origin-left bg-btn-cream" />
                      <div className="sister-cv absolute bottom-0 left-0 h-20 w-px origin-bottom bg-btn-cream" />
                    </div>
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={concern.image}
                        alt={concern.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 328px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={
                    imageFirst
                      ? "sister-copy order-2 flex flex-col pt-2"
                      : "sister-copy order-1 flex flex-col pt-2"
                  }
                >
                  <h2 className="text-4xl font-normal leading-[1.08] text-btn-cream sm:text-5xl lg:text-[3.7rem]">
                    {concern.name}
                  </h2>
                  <p className="mt-9 max-w-[920px] text-sm font-normal leading-[1.75] text-brand-primary sm:text-[17px]">
                    {concern.description}
                  </p>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-brand-primary">
                      Member of:
                    </h3>
                    <ul className="mt-5 space-y-3 pl-5 text-sm leading-relaxed text-black sm:text-[16px]">
                      {concern.members.map((member) => (
                        <li key={member} className="list-disc">
                          {member}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
