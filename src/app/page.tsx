"use client";

import { useState } from "react";
import LoadPage from "./load/LoadPage";
import HeroSection from "@/app/hero/HeroSection";
import AboutUs from "@/app/about/AboutUs";  
import SuperfoodIntro from "./superfood/superfood_intro";
import Superfoods from "./superfood/Superfoods";
import TextilesIntro from "./textil/TextilesIntro";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadPage onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          <HeroSection />
          <AboutUs /> 
          <SuperfoodIntro /> 
          <Superfoods />
          <TextilesIntro />
        </>
      )}
    </>
  );
}

