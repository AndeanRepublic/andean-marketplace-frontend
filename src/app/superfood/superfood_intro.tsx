"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const TEXTS = [
  "BORN FROM SACRED ANDEAN SOIL",
  "EACH SEED CARRIES ANCIENT WISDOM AND LIVING TRADITION",
  "BRING ANCESTRAL POWER INTO YOUR DAILY RITUAL",
];

const RING_SRC = "/img/supplies/insumo.png";
const BAG_SRC  = "/img/supplies/producto.png";

export default function SuperfoodIntro() {
  const ring = useRef<HTMLDivElement>(null);
  const bag = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLDivElement>(null);
  const [textIdx, setTextIdx] = useState(0);
  const imagesReady = useRef({ ring: false, bag: false });

  // Arranca las animaciones cuando ambas imágenes cargan
  const tryStart = () => {
    if (!imagesReady.current.ring || !imagesReady.current.bag) return;

    const ctx = gsap.context(() => {
      // --------- Layout & base ---------
      const setSizes = () => {
        const size = Math.min(window.innerWidth, window.innerHeight) * 0.78;
        gsap.set(ring.current, { width: size, height: size });
      };
      setSizes();
      const onResize = () => setSizes();
      window.addEventListener("resize", onResize);

      gsap.set(bag.current, { autoAlpha: 0, scale: 0.6, y: 8 });
      gsap.set(headline.current, { autoAlpha: 0, y: 16 });
      gsap.set(ring.current, { rotate: 0, scale: 1, autoAlpha: 1, x: 0, y: 0 });

      // --------- Spin del anillo ---------
      const spin = gsap.to(ring.current, {
        rotate: 360,
        repeat: -1,
        ease: "linear",
        duration: 20,
        transformOrigin: "50% 50%",
      });

      // --------- Helper: mover anillo a bolsa ---------
      const moveRingToBag = (): void => {
        const r = ring.current!, b = bag.current!;
        const rb = r.getBoundingClientRect();
        const bb = b.getBoundingClientRect();
        const dx = (bb.left + bb.width / 2) - (rb.left + rb.width / 2);
        const dy = (bb.top + bb.height / 2) - (rb.top + rb.height / 2);
        spin.pause(); // pausa antes de mover
        gsap.to(r, {
          x: `+=${dx}`,
          y: `+=${dy}`,
          scale: 0.1,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.in",
        });
      };

      // --------- Textos ---------
      const textTl = gsap.timeline();
      TEXTS.forEach((_, i) => {
        textTl
          .to(headline.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            onStart: () => setTextIdx(i),
          })
          .to(headline.current, { autoAlpha: 0, y: -14, duration: 0.45 }, "+=1.9");
      });

      // --------- Maestro ---------
      const master = gsap.timeline({ defaults: { ease: "power2.out" } })
        .add(textTl)
        .to(bag.current, { autoAlpha: 1, scale: 1, y: 0, duration: 0.7 })
        // ⬇⬇⬇ envolver en arrow para garantizar `void`
        .add(() => moveRingToBag())
        .to(ring.current, { autoAlpha: 0, duration: 0.2 }, ">-0.05");

      // --------- Cleanup ---------
      return () => {
        window.removeEventListener("resize", onResize);
        spin.kill();
        master.kill();
      };
    });

    // revert al desmontar el contexto
    return () => ctx.revert();
  };

  useLayoutEffect(() => {
    tryStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="relative flex items-center justify-center min-h-screen w-full overflow-hidden"
      style={{ background: "var(--Yellow-400, #FDD535)" }}
      aria-label="Superfoods Intro"
    >
      {/* ANILLO */}
      <div
        ref={ring}
        className="absolute"
        style={{ width: "78vmin", height: "78vmin" }}
      >
        <img
          src={RING_SRC}
          alt="superfoods ring"
          className="w-full h-full object-contain block pointer-events-none select-none"
          onLoad={() => { imagesReady.current.ring = true; tryStart(); }}
        />
      </div>

      {/* BOLSA */}
      <div
        ref={bag}
        className="absolute z-20 w-[150px] h-[190px] sm:w-[210px] sm:h-[250px] drop-shadow-xl"
      >
        <img
          src={BAG_SRC}
          alt="Andean product"
          className="w-full h-full object-contain block"
          onLoad={() => { imagesReady.current.bag = true; tryStart(); }}
        />
      </div>

      {/* TEXTOS */}
      <div className="z-10 text-center px-6">
        <div
          ref={headline}
          className="font-bold leading-tight text-black tracking-tight text-[26px] sm:text-[36px] md:text-[46px] max-w-[20ch]"
        >
          {TEXTS[textIdx]}
        </div>
      </div>
    </section>
  );
}
