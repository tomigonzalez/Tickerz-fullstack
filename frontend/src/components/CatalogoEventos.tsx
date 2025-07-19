// components/CatalogoEventos.tsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CatalogoEventos = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const el = sectionRef.current;

    gsap.fromTo(
      el,
      {
        scale: 0.9,
        y: 10,
      },
      {
        scale: 1,
        y: -100,

        scrollTrigger: {
          trigger: el,
          start: "top 100%", // cuando el top del componente esté al 80% del viewport
          end: "top 60%", // termina más abajo = más lento
          scrub: 5, // más delay = animación más dura, lenta
        },
        duration: 2,
        ease: "power2.out", // easing más suave
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full  min-h-[50vh] rounded-[4rem] bg-secondary shadow-2xl relative"
    >
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>

      <h1>asd</h1>
      <h1>asd</h1>

      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>

      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
    </div>
  );
};

export default CatalogoEventos;
