"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const COLORS = {
  blue: "#2563EB",
  orange: "#F59E0B",
  cream: "#F6EBDD",
};

const ASSETS = {
  llamaBlue: "/img/textiles/llama-blue.png",
  llamaOrange: "/img/textiles/alpaca-orange.png",
  vicunaCream: "/img/textiles/vicuna-cream.png",
};

export default function TextilesIntro() {
  const bg = useRef<HTMLDivElement>(null);
  const s1Img = useRef<HTMLDivElement>(null);
  const s1Text = useRef<HTMLDivElement>(null);
  const s2Img = useRef<HTMLDivElement>(null);
  const s2Text = useRef<HTMLDivElement>(null);
  const s3Img = useRef<HTMLDivElement>(null);
  const s3Text = useRef<HTMLDivElement>(null);
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (bg.current) bg.current.style.background = COLORS.cream;
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    gsap.set(bg.current, { backgroundColor: COLORS.blue });
    gsap.set(
      [s1Img.current, s1Text.current, s2Img.current, s2Text.current, s3Img.current, s3Text.current],
      { autoAlpha: 0 }
    );

    // Escena 1 (azul)
    tl.to([s1Img.current, s1Text.current], { autoAlpha: 1, duration: 0.2 })
      .from(s1Img.current, { xPercent: -18, duration: 0.9 }, "<")
      .from(s1Text.current, { xPercent: 8, duration: 0.9 }, "<0.05")
      .to([s1Img.current, s1Text.current], { autoAlpha: 0, duration: 0.4 }, "+=1.2")
      // Transición a naranja
      .to(bg.current, { backgroundColor: COLORS.orange, duration: 0.6 }, "<")
      // Escena 2 (naranja)
      .to([s2Img.current, s2Text.current], { autoAlpha: 1, duration: 0.2 }, ">-0.1")
      .from(s2Img.current, { xPercent: 18, duration: 0.9 }, "<")
      .from(s2Text.current, { xPercent: -8, duration: 0.9 }, "<0.05")
      .to([s2Img.current, s2Text.current], { autoAlpha: 0, duration: 0.4 }, "+=1.2")
      // Transición a crema
      .to(bg.current, { backgroundColor: COLORS.cream, duration: 0.6 }, "<")
      // Escena 3 (crema)
      .to([s3Img.current, s3Text.current], { autoAlpha: 1, duration: 0.2 }, ">-0.1")
      .from(s3Img.current, { xPercent: -16, duration: 0.9 }, "<")
      .from(s3Text.current, { xPercent: 8, duration: 0.9 }, "<0.05")
      .to([s3Img.current, s3Text.current], { autoAlpha: 0, duration: 0.4 }, "+=1.2");

    // ✅ cleanup que devuelve void
    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden" aria-label="Textiles Intro">
      <div ref={bg} className="absolute inset-0" />

      <div className="absolute inset-0 grid grid-cols-12 items-center px-6 sm:px-10">
        <div ref={s1Img} className="col-span-6 sm:col-span-5 lg:col-span-4">
          <img src={ASSETS.llamaBlue} alt="Llama silhouette" className="w-full h-auto object-contain opacity-90" />
        </div>
        <div ref={s1Text} className="col-span-6 sm:col-span-7 lg:col-span-8 text-right">
          <h2 className="font-extrabold tracking-tight text-white text-2xl sm:text-4xl md:text-5xl leading-tight drop-shadow">
            WOVEN BY<br />ANCESTRAL HANDS
          </h2>
        </div>
      </div>

      <div className="absolute inset-0 grid grid-cols-12 items-center px-6 sm:px-10">
        <div ref={s2Text} className="col-span-7 lg:col-span-7 z-10">
          <h2 className="font-extrabold tracking-tight text-white text-2xl sm:text-4xl md:text-5xl leading-tight drop-shadow">
            EACH THREAD<br />TELLS A STORY OF<br />LAND, SPIRIT, AND TIME
          </h2>
        </div>
        <div ref={s2Img} className="col-span-5 lg:col-span-5 justify-self-end">
          <img src={ASSETS.llamaOrange} alt="Llama silhouette" className="w-full h-auto object-contain opacity-90" />
        </div>
      </div>

      <div className="absolute inset-0 grid grid-cols-12 items-center px-6 sm:px-10">
        <div ref={s3Img} className="col-span-6 sm:col-span-5 lg:col-span-4">
          <img src={ASSETS.vicunaCream} alt="Vicuña silhouette" className="w-full h-auto object-contain opacity-90" />
        </div>
        <div ref={s3Text} className="col-span-6 sm:col-span-7 lg:col-span-8 text-right">
          <h2 className="font-extrabold tracking-tight text-[#8A6E3A] text-2xl sm:text-4xl md:text-5xl leading-tight">
            WEAR A PIECE OF<br />HERITAGE
          </h2>
        </div>
      </div>
    </section>
  );
}
