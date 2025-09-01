"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "@/components/navigation/Navbar";
import HeroChakanaGrid from "./HeroChakanaGrid";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(textRef.current, { opacity: 0, y: 16 });
      gsap.set(gridRef.current, { yPercent: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1) entrada de chakanas
      tl.from(".chakana-item", {
        opacity: 0,
        scale: 0.85,
        y: 20,
        duration: 0.55,
        stagger: 0.08,
      });

      // 2) leve grow de la central (opcional)
      tl.to(".chakana-center", { scale: 1.06, duration: 0.35 }, "-=0.25");

      // 3) baja el grupo (menos que antes)
      tl.to(
        gridRef.current,
        { yPercent: 40, duration: 0.95, ease: "power2.inOut" },
        "+=0.1"
      );

      // 4) aparece el texto, más arriba (top-24)
      tl.to(
        textRef.current,
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.6"
      );
    }, sectionRef);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className="relative min-h-[100svh] bg-[url('/img/HeroSection_bg.png')] bg-cover bg-center overflow-visible pb-32 md:pb-48"
    >
      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Grid */}
      <div className="relative z-20">
        <HeroChakanaGrid ref={gridRef} />
      </div>

      {/* Texto (pegado más al navbar) */}
      <div
        ref={textRef}
        className="pointer-events-none absolute top-24 left-0 right-0 z-30 flex flex-col items-center text-center"
      >
        <h1 className="pointer-events-auto font-display text-[clamp(36px,7vw,100px)] leading-[100%] text-gray-900 max-w-[22ch] px-4">
          LIVE THE ANDEAN EXPERIENCE
        </h1>
        <p className="pointer-events-auto mt-4 font-body text-[clamp(16px,2vw,24px)] leading-[145%] text-gray-900 max-w-[70ch] px-6">
          Discover ancient wisdom, soulful flavors, and experiences that connect you to something deeper.
        </p>
      </div>
      
    </section>
  );
}