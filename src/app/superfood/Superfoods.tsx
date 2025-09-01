// src/components/sections/Superfoods.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

type Theme = {
  accent: string;   // rojo/verde principal (títulos, botón, precio, bullets)
  heading: string;  // color del título
  body: string;     // párrafo
};
type Product = {
  id: string;
  title: string;
  community: string;
  desc: string;
  price: string;    // "$20"
  img: string;      // bolsa principal
  theme: Theme;
};

const PRODUCTS: Product[] = [
  {
    id: "camu",
    title: "Special Green Coffee",
    community: "By Community Imaq Sumaq",
    desc:
      "Lorem ipsum dolor sit amet consectetur. Lobortis tellus ut bibendum nec sit gravida accumsan rhoncus.",
    price: "$20",
    img: "/img/superfoods/superfood_img2.png",
    theme: {
      accent: "#E8453C",
      heading: "#EB4B41",
      body: "#4B5563",
    },
  },
  {
    id: "green",
    title: "Gelatinized Camu Camu",
    community: "By Community Imaq Sumaq",
    desc:
      "Camu Camu alto en vitamina C. Proceso gelatinizado para mayor biodisponibilidad.",
    price: "$18",
    img: "/img/superfoods/superfood_img1.png",
    theme: { accent: "#1D6B54", heading: "#155E4C", body: "#4B5563" },
  },
  {
    id: "lucuma",
    title: "Lupini Powder",
    community: "By Community Imaq Sumaq",
    desc:
      "Sabor clásico andino ideal para smoothies y postres con un toque natural.",
    price: "$16",
    img: "/img/superfoods/superfood_img3.png",
    theme: { accent: "#D49D00", heading: "#B07E00", body: "#4B5563" },
  },
];

export default function Superfoods() {
  const [idx, setIdx] = useState(0);
  const product = useMemo(() => PRODUCTS[idx], [idx]);
  const root = useRef<HTMLDivElement>(null);

  const prev = () => setIdx((p) => (p - 1 + PRODUCTS.length) % PRODUCTS.length);
  const next = () => setIdx((p) => (p + 1) % PRODUCTS.length);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [".sf-copy .reveal", ".sf-pack"],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.04 }
      );
      gsap.fromTo(
        ".price-oval",
        { scale: 0.9, rotate: -10, opacity: 0 },
        { scale: 1, rotate: -8, opacity: 1, duration: 0.45, ease: "back.out(1.4)" }
      );
    }, root);
    return () => ctx.revert();
  }, [idx]);

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden rounded-[24px] border border-black/5"
      style={
        {
          background: "#EDE2D6", // beige del mock
          ["--sf-accent" as any]: product.theme.accent,
          ["--sf-heading" as any]: product.theme.heading,
          ["--sf-body" as any]: product.theme.body,
        } as React.CSSProperties
      }
    >
      {/* patrón a la derecha */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[46%] min-w-[320px]">
        <Image
          src="/img/superfoods/superfoods_bg.png"
          alt="Andean pattern"
          fill
          className="object-cover"
          priority
        />
        {/* velo rosado para parecerse al mock */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ background: "rgba(255,90,90,0.35)" }}
        />
      </div>

      {/* viñeta/luz a la izquierda */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-2/3 bg-[radial-gradient(120%_80%_at_0%_10%,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0)_55%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 gap-2">
        {/* COPY */}
        <div className="sf-copy p-6 sm:p-10 lg:p-12">
          <p className="reveal text-sm font-semibold tracking-[0.18em] text-gray-900">
            SUPERFOODS
          </p>

          <h2
            className="reveal mt-2 text-4xl font-extrabold leading-[1.05] sm:text-5xl"
            style={{ color: "var(--sf-heading)" }}
          >
            Special
            <br />
            Green Coffee
          </h2>

          <p
            className="reveal mt-4 font-semibold"
            style={{ color: "var(--sf-accent)" }}
          >
            {product.community} <span aria-hidden>→</span>
          </p>

          <p
            className="reveal mt-3 max-w-prose text-[15px] leading-6"
            style={{ color: "var(--sf-body)" }}
          >
            {product.desc}
          </p>

          <div className="reveal mt-6 flex items-center gap-4">
            <button
              className="inline-flex items-center gap-2 rounded-[12px] px-5 py-3 text-sm font-semibold text-white shadow-sm"
              style={{ backgroundColor: "var(--sf-accent)" }}
            >
              Comprar <span className="text-base">→</span>
            </button>
          </div>
        </div>

        {/* PACKS / VISUAL */}
        <div className="relative flex min-h-[420px] items-center justify-center p-6 sm:p-10 lg:p-12">
          {/* óvalo de precio dibujado */}
          <PriceOval text={product.price} color={product.theme.accent} />

          {/* bolsa protagonista */}
          <div className="sf-pack relative z-10 aspect-[3/4] w-[60%] min-w-[240px] max-w-[380px] drop-shadow-xl">
            <Image
              src={product.img}
              alt={product.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* fila de packs al fondo (derecha) */}
          <div className="pointer-events-none absolute inset-y-0 right-6 hidden w-[48%] items-center justify-end gap-8 md:flex">
            <Image
              src={PRODUCTS[(idx + 1) % PRODUCTS.length].img}
              alt=""
              width={180}
              height={220}
              className="translate-y-10 object-contain opacity-90"
            />
            <Image
              src={PRODUCTS[(idx + 2) % PRODUCTS.length].img}
              alt=""
              width={160}
              height={200}
              className="-translate-y-6 object-contain opacity-90"
            />
          </div>

          {/* Controles rojos circulares */}
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3 md:bottom-8 md:left-[46%] md:translate-x-0">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-full text-white shadow-md transition"
              style={{ backgroundColor: "var(--sf-accent)" }}
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="h-10 w-10 rounded-full text-white shadow-md transition"
              style={{ backgroundColor: "var(--sf-accent)" }}
              aria-label="Siguiente"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Óvalo a mano con SVG + texto centrado */
function PriceOval({ text, color }: { text: string; color: string }) {
  return (
    <div className="price-oval pointer-events-none absolute -left-8 top-10 hidden md:block">
      <svg width="210" height="120" viewBox="0 0 210 120" fill="none">
        <path
          d="M27 69c28 23 73 30 106 18 25-9 41-28 28-43-15-18-57-25-94-18C36 31 10 43 9 58c0 11 9 17 18 21"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <text
          x="100"
          y="66"
          textAnchor="middle"
          fontSize="40"
          fontWeight="700"
          fill={color}
          transform="rotate(-12 100 60)"
          style={{ fontFamily: "inherit" }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
