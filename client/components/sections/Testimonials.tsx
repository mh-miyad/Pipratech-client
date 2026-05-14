"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    id: "1",
    quote:
      "Reliable supplier with excellent product quality. Highly recommended for bulk orders.",
    name: "John Walker",
    role: "Buyer from UK.",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    id: "2",
    quote:
      "Reliable supplier with excellent product quality. Highly recommended for bulk orders.",
    name: "John Walker",
    role: "Buyer from UK.",
    avatar: "https://i.pravatar.cc/120?img=13",
  },
  {
    id: "3",
    quote:
      "Reliable supplier with excellent product quality. Highly recommended for bulk orders.",
    name: "John Walker",
    role: "Buyer from UK.",
    avatar: "https://i.pravatar.cc/120?img=14",
  },
  {
    id: "4",
    quote:
      "Reliable supplier with excellent product quality. Highly recommended for bulk orders.",
    name: "John Walker",
    role: "Buyer from UK.",
    avatar: "https://i.pravatar.cc/120?img=15",
  },
  {
    id: "5",
    quote:
      "Reliable supplier with excellent product quality. Highly recommended for bulk orders.",
    name: "John Walker",
    role: "Buyer from UK.",
    avatar: "https://i.pravatar.cc/120?img=16",
  },
];

const ArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {direction === "left" ? (
      <>
        <path d="M19 12H5" />
        <path d="m12 5-7 7 7 7" />
      </>
    ) : (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    )}
  </svg>
);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".ts-head",
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
        ".ts-carousel",
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ts-carousel",
            start: "top 86%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const handleHover = (target: HTMLDivElement, active: boolean) => {
    const avatar = target.querySelector(".ts-avatar");

    gsap.to(target, {
      y: active ? -8 : 0,
      boxShadow: active
        ? "0 26px 56px rgba(13, 13, 13, 0.12)"
        : "0 18px 44px rgba(13, 13, 13, 0.08)",
      duration: 0.38,
      ease: "power3.out",
    });

    gsap.to(avatar, {
      scale: active ? 1.08 : 1,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
        <div className="ts-head text-center">
          <h2 className="text-[2.2rem] font-normal leading-tight tracking-tight text-primary-text sm:text-[3rem] lg:text-[3.7rem]">
            What Our Clients <span className="text-brand-neutral">Say</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-brand-primary sm:text-base">
            See why businesses worldwide trust our premium, eco-friendly jute
            for their sustainable packaging and industrial needs.
          </p>
        </div>

        <div className="ts-carousel relative mx-auto mt-12 ">
          <button
            className="testimonial-prev absolute left-0 top-1/2 z-10 hidden size-11 -translate-x-[130%] -translate-y-1/2 items-center justify-center rounded-full bg-[#E1E1E1] text-brand-primary transition-colors duration-200 hover:bg-brand-neutral hover:text-white lg:flex"
            aria-label="Previous testimonial"
            type="button"
          >
            <ArrowIcon direction="left" />
          </button>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            loop
            speed={700}
            autoplay={{
              delay: 4200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".testimonial-prev",
              nextEl: ".testimonial-next",
            }}
            pagination={{
              el: ".testimonial-pagination",
              clickable: true,
              bulletClass: "testimonial-bullet",
              bulletActiveClass: "testimonial-bullet-active",
            }}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 14 },
              1100: { slidesPerView: 3, spaceBetween: 14 },
            }}
            className="!overflow-hidden"
          >
            {TESTIMONIALS.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="!h-auto py-10 px-5">
                <div
                  onMouseEnter={(event) =>
                    handleHover(event.currentTarget, true)
                  }
                  onMouseLeave={(event) =>
                    handleHover(event.currentTarget, false)
                  }
                  className="flex h-full min-h-[178px] flex-col justify-between rounded-[20px] bg-white px-7 py-7 shadow-[0_18px_44px_rgba(13,13,13,0.08)] sm:px-8"
                >
                  <blockquote className="text-[15px] font-normal leading-relaxed text-brand-neutral">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="mt-6 flex items-center gap-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="ts-avatar size-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold leading-tight text-primary-text">
                        {testimonial.name}
                      </p>
                      <p className="mt-1 text-xs leading-tight text-[#8C8C8C]">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className="testimonial-next absolute right-0 top-1/2 z-10 hidden size-11 translate-x-[130%] -translate-y-1/2 items-center justify-center rounded-full bg-brand-neutral text-white transition-colors duration-200 hover:bg-brand-primary lg:flex"
            aria-label="Next testimonial"
            type="button"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>

        <div className="testimonial-pagination mt-14 flex items-center justify-center gap-2" />
      </div>
    </section>
  );
};

export default Testimonials;
