"use client";

import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

// Inner component — must be a child of ReactLenis so useLenis() can reach the context
const GSAPSync = () => {
  const lenis = useLenis(() => {
    // fires on every lenis scroll tick → keeps ScrollTrigger in sync
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;

    // capture in local const so TS knows it's defined inside onTick closure
    const l = lenis;

    // GSAP ticker drives Lenis instead of browser RAF
    // time from gsap ticker is in seconds, lenis.raf() expects ms
    function onTick(time: number) {
      l.raf(time * 1000);
    }

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0); // prevents jitter on tab focus

    return () => {
      gsap.ticker.remove(onTick);
    };
  }, [lenis]);

  return null;
};

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,   // GSAP ticker handles RAF instead
        lerp: 0.1,        // smoothness (0.1 = smooth, 1 = instant)
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      <GSAPSync />
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
