"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ChakanaSpinner from "@/components/ChakanaSpinner";

export default function LoadPage({ onFinish }: { onFinish: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      gsap.to(wrapRef.current, {
        y: "-100%",
        duration: 1,
        ease: "power2.inOut",
        onComplete: onFinish,
      });
    }, 5000);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div
      ref={wrapRef}
      // 👇 Estilos inline: ocupa SIEMPRE toda la pantalla
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "#0469B2",
        display: "grid",
        placeItems: "center",
        zIndex: 9999,
      }}
    >
      <ChakanaSpinner size={200} color="#FFFFFF" duration={5} />
    </div>
  );
}
