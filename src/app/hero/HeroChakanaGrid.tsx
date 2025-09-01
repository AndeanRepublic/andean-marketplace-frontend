"use client";

import FigureWithImg from "./FigureWithImg";
import { forwardRef } from "react";

const HeroChakanaGrid = forwardRef<HTMLDivElement>(function HeroChakanaGrid(_, ref) {
  return (
    <div
      ref={ref}
      className="hero-grid relative w-[93%] mx-auto flex flex-wrap items-center justify-around gap-y-4 py-3"
    >
      {/* Columna izquierda */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-end">
          <FigureWithImg className="chakana-item" imageUrl="/img/heroSec_img1.png" borderColor="#3067B0" borderWidth={15} size={220}/>
        </div>
        <div className="flex justify-start mr-10">
          <FigureWithImg className="chakana-item" imageUrl="/img/heroSec_img2.png" borderColor="#3067B0" borderWidth={18} size={320}/>
        </div>
        <div className="flex justify-end">
          <FigureWithImg className="chakana-item" imageUrl="/img/heroSec_img3.png" borderColor="#3067B0" borderWidth={15} size={220}/>
        </div>
      </div>

      {/* Centro — OJO: chakana-center */}
      <div className="flex items-center justify-center">
        <FigureWithImg className="chakana-item chakana-center" imageUrl="/img/mainImg.png" borderColor="#3067B0" borderWidth={22} size={470}/>
      </div>

      {/* Columna derecha */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-start">
          <FigureWithImg className="chakana-item" imageUrl="/img/heroSec_img4.jpg" borderColor="#3067B0" borderWidth={15} size={220}/>
        </div>
        <div className="flex justify-end ml-10">
          <FigureWithImg className="chakana-item" imageUrl="/img/heroSec_img6.jpg" borderColor="#3067B0" borderWidth={18} size={320}/>
        </div>
        <div className="flex justify-start">
          <FigureWithImg className="chakana-item" imageUrl="/img/heroSec_img5.png" borderColor="#3067B0" borderWidth={15} size={220}/>
        </div>
      </div>
    </div>
  );
});

export default HeroChakanaGrid;
