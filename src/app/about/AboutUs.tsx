"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const floats = gsap.utils.toArray<HTMLElement>(".about-float");

      // Estados iniciales
      gsap.set(floats, { opacity: 0, y: 40, scale: 0.85 });
      gsap.set(".about-line", { opacity: 0, y: 16 });
      gsap.set(".yellow-bg", { opacity: 0 });

      // --- Chakana: arranca diminuta, anclada a esquina inferior derecha
      const BASE_SIZE = 64; // w-16 h-16 = 64px
      let finalScale = 28;  // fallback
      const computeFinalScale = () => {
        // cubre de sobra la diagonal del viewport
        const diag = Math.hypot(window.innerWidth, window.innerHeight);
        finalScale = (diag * 1.7) / BASE_SIZE;
      };
      computeFinalScale();
      ScrollTrigger.addEventListener("refreshInit", computeFinalScale);

      gsap.set(".chakana", {
        scale: 0.05,
        transformOrigin: "100% 100%", // expande desde abajo-derecha
        willChange: "transform, opacity",
      });

      // Timeline principal (pin + scrub)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2400",
          scrub: 1,
          pin: true,
          // markers: true,
        },
        defaults: { ease: "power2.out" },
      });

      // 1) Intro: fotos + primera línea
      tl.to(floats, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.08 }, 0)
        .to("#line-1", { opacity: 1, y: 0, duration: 0.8 }, 0)

        // 2) Línea 2 + empuje de fotos
        .to("#line-1", { opacity: 0, duration: 0.5 }, "+=0.5")
        .to("#line-2", { opacity: 1, y: 0, duration: 0.8 }, "<")
        .to(
          floats,
          {
            x: (i) => [-120, 90, -80, 110, -100][i % 5],
            y: (i) => [60, -40, 100, -80, 90][i % 5],
            scale: (i) => [1.15, 1.1, 1.2, 1.12, 1.1][i % 5],
            duration: 1,
          },
          "<"
        )

        // 3) Línea 3
        .to("#line-2", { opacity: 0, duration: 0.5 }, "+=0.6")
        .to("#line-3", { opacity: 1, y: 0, duration: 0.8 }, "<")

        // 4) Salida de fotos y texto
        .to(floats, { opacity: 0, y: 100, duration: 0.8 }, "+=0.6")
        .to("#line-3", { opacity: 0, duration: 0.6 }, "<")

        // 5) ⚡️ EXPANSIÓN CHAKANA: cubre toda la pantalla
        .to(".chakana", { scale: () => finalScale, duration: 1.4, ease: "power2.inOut" }, "+=0.2")

        // 6) Fondo amarillo sólido queda de base
        .to(".yellow-bg", { opacity: 1, duration: 0.6, ease: "power1.out" }, "<+0.3");

      // Limpieza
      return () => {
        ScrollTrigger.removeEventListener("refreshInit", computeFinalScale);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 -z-20 bg-[url('/img/bg-machu.png')] bg-cover bg-center" />
      <div className="absolute inset-0 -z-10 bg-black/55" />

      {/* Texto centrado a mitad */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="relative h-full w-full">
          <h2
            id="line-1"
            className="about-line absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       text-center font-body font-bold text-white uppercase
                       text-[clamp(24px,5.2vw,50px)] leading-[130%] px-6"
          >
            STEP INTO THE HEART<br />OF THE ANDES
          </h2>

          <h2
            id="line-2"
            className="about-line absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       text-center font-body font-bold text-white uppercase
                       text-[clamp(24px,5.2vw,50px)] leading-[130%] px-6"
          >
            UNCOVER SACRED FOODS,<br />
            ANCIENT THREADS,<br />
            AND SOUL-FILLED JOURNEYS
          </h2>

          <h2
            id="line-3"
            className="about-line absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       text-center font-body font-bold text-white uppercase
                       text-[clamp(24px,5.2vw,50px)] leading-[130%] px-6"
          >
            AND JOIN THOSE WHO LIVE WITH<br />
            THEIR SOUL IN THE EARTH
          </h2>
        </div>
      </div>

      {/* Fotos flotantes detrás del texto */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="/img/heroSec_img1.png"
          alt=""
          className="about-float absolute -left-4 top-24 md:left-20 md:top-24
                     h-28 w-28 md:h-40 md:w-40 object-cover rounded-2xl shadow-xl ring-4 ring-white/10"
        />
        <img
          src="/img/heroSec_img2.png"
          alt=""
          className="about-float absolute left-[12%] -top-2 md:left-[26%] md:top-6
                     h-24 w-40 md:h-28 md:w-56 object-cover rounded-2xl shadow-xl ring-4 ring-white/10"
        />
        <img
          src="/img/heroSec_img6.jpg"
          alt=""
          className="about-float absolute right-[8%] top-24 md:right-[16%] md:top-20
                     h-28 w-40 md:h-32 md:w-56 object-cover rounded-2xl shadow-xl ring-4 ring-white/10"
        />
        <img
          src="/img/heroSec_img5.png"
          alt=""
          className="about-float absolute left-[6%] bottom-[14%]
                     h-32 w-40 md:h-40 md:w-52 object-cover rounded-2xl shadow-xl ring-4 ring-white/10"
        />
        <img
          src="/img/heroSec_img4.jpg"
          alt=""
          className="about-float absolute right-[14%] bottom-[12%]
                     h-28 w-32 md:h-36 md:w-40 object-cover rounded-2xl shadow-xl ring-4 ring-white/10"
        />
      </div>

      {/* 🔶 Chakana amarilla (esquina inferior derecha) */}
      <div className="absolute bottom-6 right-6 z-40 pointer-events-none">
        <div className="chakana w-16 h-16 bg-[#FDD535] clip-path-chakana rounded-2xl" />
      </div>

      {/* Fondo amarillo final */}
      <div className="yellow-bg absolute inset-0 bg-[#FDD535] opacity-0 z-50" />
    </section>
  );
}
