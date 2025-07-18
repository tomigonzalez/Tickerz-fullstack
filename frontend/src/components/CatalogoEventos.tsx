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
        y: 150,
      },
      {
        scale: 1,
        y: 0,

        scrollTrigger: {
          trigger: el,
          start: "top 100%", // cuando el top del componente esté al 80% del viewport
          end: "top 60%", // termina más abajo = más lento
          scrub: 5, // más delay = animación más dura, lenta
        },
        duration: 1,
        ease: "power2.out", // easing más suave
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full h-screen rounded-4xl bg-secondary shadow-2xl"
    >
      {/* Contenido del catálogo */}
    </div>
  );
};

export default CatalogoEventos;
