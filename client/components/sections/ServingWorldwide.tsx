"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ComponentType, MutableRefObject } from "react";
import type { GlobeMethods, GlobeProps } from "react-globe.gl";

gsap.registerPlugin(ScrollTrigger);

type GlobeComponentProps = GlobeProps & {
  ref?: MutableRefObject<GlobeMethods | undefined>;
};

const Globe = dynamic<GlobeComponentProps>(
  () =>
    import("react-globe.gl") as Promise<{
      default: ComponentType<GlobeComponentProps>;
    }>,
  { ssr: false },
);

const BANGLADESH = {
  name: "Bangladesh",
  lat: 23.685,
  lng: 90.3563,
};

type ExportCountry = {
  name: string;
  flagCode: string;
  lat: number;
  lng: number;
};

type ExportArc = ExportCountry & {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
};

const COUNTRIES: ExportCountry[] = [
  { name: "Canada", flagCode: "ca", lat: 56.1304, lng: -106.3468 },
  {
    name: "United States of America (US)",
    flagCode: "us",
    lat: 37.0902,
    lng: -95.7129,
  },
  { name: "Brazil", flagCode: "br", lat: -14.235, lng: -51.9253 },
  { name: "Spain", flagCode: "es", lat: 40.4637, lng: -3.7492 },
  { name: "Poland", flagCode: "pl", lat: 51.9194, lng: 19.1451 },
  { name: "Ukraine", flagCode: "ua", lat: 48.3794, lng: 31.1656 },
  { name: "Moldova", flagCode: "md", lat: 47.4116, lng: 28.3699 },
  { name: "Australia", flagCode: "au", lat: -25.2744, lng: 133.7751 },
  { name: "Bulgaria", flagCode: "bg", lat: 42.7339, lng: 25.4858 },
  { name: "Colombia", flagCode: "co", lat: 4.5709, lng: -74.2973 },
  { name: "Chile", flagCode: "cl", lat: -35.6751, lng: -71.543 },
  { name: "Greece", flagCode: "gr", lat: 39.0742, lng: 21.8243 },
  { name: "Dubai", flagCode: "ae", lat: 25.2048, lng: 55.2708 },
  { name: "Egypt", flagCode: "eg", lat: 26.8206, lng: 30.8025 },
  { name: "Lebanon", flagCode: "lb", lat: 33.8547, lng: 35.8623 },
  { name: "Nigeria", flagCode: "ng", lat: 9.082, lng: 8.6753 },
  { name: "Uzbekistan", flagCode: "uz", lat: 41.3775, lng: 64.5853 },
  { name: "Taiwan", flagCode: "tw", lat: 23.6978, lng: 120.9605 },
  { name: "Libya", flagCode: "ly", lat: 26.3351, lng: 17.2283 },
  { name: "China", flagCode: "cn", lat: 35.8617, lng: 104.1954 },
  { name: "Russia", flagCode: "ru", lat: 61.524, lng: 105.3188 },
  { name: "Azerbaijan", flagCode: "az", lat: 40.1431, lng: 47.5769 },
  { name: "Belarus", flagCode: "by", lat: 53.7098, lng: 27.9534 },
  { name: "Kazakhstan", flagCode: "kz", lat: 48.0196, lng: 66.9237 },
  { name: "Kyrgyzstan", flagCode: "kg", lat: 41.2044, lng: 74.7661 },
  { name: "Tajikistan", flagCode: "tj", lat: 38.861, lng: 71.2761 },
  { name: "Turkmenistan", flagCode: "tm", lat: 38.9697, lng: 59.5563 },
];

const EARTH_TEXTURE =
  "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const EARTH_BUMP =
  "https://unpkg.com/three-globe/example/img/earth-topology.png";

const getFlagUrl = (flagCode: string) =>
  `https://flagcdn.com/w40/${flagCode}.png`;

export default function ServingWorldwide() {
  const sectionRef = useRef<HTMLElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const globeShellRef = useRef<HTMLDivElement>(null);
  const [globeSize, setGlobeSize] = useState(640);
  const [selectedCountry, setSelectedCountry] = useState<ExportCountry | null>(
    null,
  );

  const arcs = useMemo<ExportArc[]>(
    () =>
      COUNTRIES.map((country) => ({
        ...country,
        startLat: BANGLADESH.lat,
        startLng: BANGLADESH.lng,
        endLat: country.lat,
        endLng: country.lng,
      })),
    [],
  );

  useEffect(() => {
    const el = globeShellRef.current;
    if (!el) return;

    const updateSize = () => {
      const width = el.offsetWidth || 640;
      setGlobeSize(Math.min(740, Math.max(360, width)));
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    globe.pointOfView({ lat: 20, lng: 75, altitude: 1.72 }, 900);

    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.48;
    controls.enableDamping = true;
    controls.enableZoom = false;
  }, [globeSize]);

  const handleCountrySelect = (country: ExportCountry) => {
    setSelectedCountry(country);
    globeRef.current?.pointOfView(
      { lat: country.lat, lng: country.lng, altitude: 1.55 },
      900,
    );
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".sw-title",
        { y: 42, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75 },
      )
        .fromTo(
          ".sw-copy",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          "-=0.35",
        )
        .fromTo(
          ".sw-country",
          { x: -18, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.42, stagger: 0.025 },
          "-=0.25",
        )
        .fromTo(
          ".sw-globe-wrap",
          { scale: 0.86, rotate: -5, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, duration: 0.9 },
          "-=0.55",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14">
        <h2 className="sw-title text-[2.35rem] sm:text-[3.2rem] lg:text-[4rem] leading-none font-normal tracking-tight text-primary-text">
          Serving Clients <span className="text-brand-neutral">Worldwide</span>
        </h2>

        <p className="sw-copy mt-9 max-w-4xl text-sm sm:text-base leading-relaxed text-brand-primary font-normal">
          We export jute products to multiple countries including the USA, UK,
          Germany, UAE, and more.
          <br />
          Our commitment to quality and timely delivery makes us a trusted
          partner for global buyers.
        </p>

        <div className="mt-9 h-px w-full max-w-[1190px] bg-brand-gold" />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[0.74fr_1fr] gap-10 lg:gap-12 items-center">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:gap-x-12">
            {COUNTRIES.map((country) => (
              <button
                key={country.name}
                type="button"
                onClick={() => handleCountrySelect(country)}
                className="sw-country flex min-w-0 w-full items-center gap-2 rounded-md py-0.5 text-left text-[12px] font-semibold text-brand-primary transition-colors duration-200 hover:text-brand-neutral sm:gap-3 sm:text-sm"
              >
                <Image
                  src={getFlagUrl(country.flagCode)}
                  alt={`${country.name} flag`}
                  width={20}
                  height={15}
                  className="h-[15px] w-5 shrink-0 rounded-[2px] object-cover"
                />
                <span className="min-w-0 leading-snug">{country.name}</span>
              </button>
            ))}
          </div>

          <div className="relative">
            {selectedCountry && (
              <div className="absolute left-1/2 top-3 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-brand-neutral/20 bg-white/90 px-4 py-2 text-sm font-semibold text-brand-primary shadow-lg shadow-black/10 backdrop-blur-md">
                <Image
                  src={getFlagUrl(selectedCountry.flagCode)}
                  alt={`${selectedCountry.name} flag`}
                  width={20}
                  height={15}
                  className="h-[15px] w-5 rounded-[2px] object-cover"
                />
                <span>{selectedCountry.name}</span>
              </div>
            )}

            <div
              ref={globeShellRef}
              className="sw-globe-wrap relative mx-auto flex aspect-square w-full max-w-[690px] items-center justify-center overflow-visible"
            >
              <div className="pointer-events-none absolute inset-6 rounded-full bg-brand-gold/10 blur-3xl" />
              <Globe
                ref={globeRef}
                width={globeSize}
                height={globeSize}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl={EARTH_TEXTURE}
                bumpImageUrl={EARTH_BUMP}
                showAtmosphere
                atmosphereColor="#C5A572"
                atmosphereAltitude={0.1}
                pointsData={COUNTRIES}
                pointLat="lat"
                pointLng="lng"
                pointAltitude={0.018}
                pointRadius={0.42}
                pointResolution={18}
                pointColor={() => "#D9A441"}
                pointLabel={(d) => {
                  const point = d as ExportCountry;
                  return point.name;
                }}
                onPointClick={(point) =>
                  handleCountrySelect(point as ExportCountry)
                }
                ringsData={selectedCountry ? [selectedCountry] : COUNTRIES}
                ringLat="lat"
                ringLng="lng"
                ringColor={() => "rgba(217, 164, 65, 0.5)"}
                ringMaxRadius={3.2}
                ringPropagationSpeed={1.2}
                ringRepeatPeriod={1800}
                arcsData={arcs}
                arcStartLat="startLat"
                arcStartLng="startLng"
                arcEndLat="endLat"
                arcEndLng="endLng"
                arcColor={() => ["rgba(217,164,65,0.15)", "#D9A441"]}
                arcAltitudeAutoScale={0.34}
                arcStroke={0.55}
                arcDashLength={0.55}
                arcDashGap={1.8}
                arcDashAnimateTime={2600}
                arcLabel={(d) => {
                  const arc = d as ExportArc;
                  return `Bangladesh to ${arc.name}`;
                }}
                labelsData={[BANGLADESH]}
                labelLat="lat"
                labelLng="lng"
                labelText="name"
                labelColor={() => "#FAF8F4"}
                labelAltitude={0.035}
                labelSize={1.35}
                labelDotRadius={0.45}
                labelIncludeDot
                enablePointerInteraction
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
