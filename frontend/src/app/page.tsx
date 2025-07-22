"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; // 👈 Asegúrate de tenerlo
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import CatalogoEventos from "@/components/CatalogoEventos";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  const main = useRef(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Scroll animación
      gsap.to(tickerRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: tickerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 20,
        },
      });
    },
    { scope: main }
  );

  return (
    <div ref={main}>
      <section className="relative w-full h-[120vh] bg-primary overflow-hidden">
        <div className="w-full flex flex-col h-[55%] items-center justify-center">
          <h1 className="w-3/4 text-6xl font-extrabold text-center">
            TU EVENTO, TU TICKET.
          </h1>

          <span className="text-2xl w-[50%]">
            Gestiona y participa en tus eventos de manera eficiente e
            inteligente con tickets QR.
          </span>
          <button className="bg-secondary p-4 rounded-4xl font-bold cursor-pointer ">
            VER EVENTOS
          </button>
        </div>

        <div className="absolute min-w-1/2 h-[45%] z-2 flex items-end justify-self-center bottom-20">
          <div className="relative w-full h-full">
            <Image
              src="/img/personajeAmarillo.png"
              alt="personaje Amarillo"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-full h-full">
            <Image
              src="/img/personajeRojo.png"
              alt="personaje Rojo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="absolute w-[100vw] h-[100vw] -bottom-[80vw] left-1/2 -translate-x-1/2 rounded-full bg-white" />
      </section>

      {/* Catálogo */}
      <div className="pt-6 pl-6 pr-6 w-full relative ">
        <CatalogoEventos />
      </div>

      {/* SCROLL TICKERZ */}
      <div className="content-center overflow-hidden bg-tertiary w-full h-16 -translate-y-12 relative">
        <div
          ref={tickerRef}
          className="flex flex-row gap-10 whitespace-nowrap w-max"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <h3 key={i} className="tickerz px-6 font-extrabold text-5xl">
              TICKERZ
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
}
