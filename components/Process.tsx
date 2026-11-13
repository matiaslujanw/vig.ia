"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Compass, Layers, Radar, ShieldCheck } from "lucide-react";
import { Gold, Reveal, Section, SectionHeader } from "./ui";

const steps = [
  {
    icon: Compass,
    title: "Análisis de riesgo",
    desc: "Diagnosticamos riesgos, vulnerabilidades y perímetro para anticipar amenazas.",
  },
  {
    icon: Layers,
    title: "Diseño a medida",
    desc: "Definimos la solución integral: personal, tecnología y protocolos de actuación.",
  },
  {
    icon: Radar,
    title: "Despliegue",
    desc: "Implementamos, capacitamos y conectamos todo al monitoreo 24/7.",
  },
  {
    icon: ShieldCheck,
    title: "Seguimiento continuo",
    desc: "Monitoreo, informes operativos y respuesta inmediata ante cada evento.",
  },
];

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  // La línea dorada avanza a medida que la sección cruza la pantalla
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <Section id="operacion">
      <SectionHeader
        index="08"
        label="Metodología"
        title={
          <>
            Un proceso pensado para <Gold>no fallar.</Gold>
          </>
        }
      />

      <ol
        ref={ref}
        className="relative grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.span
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 z-10 hidden h-px origin-left bg-gold-400 shadow-[0_0_14px_1px_rgba(226,182,85,0.7)] lg:block"
          aria-hidden
        />
        {steps.map((s, i) => (
          <li key={s.title} className="group">
            <Reveal delay={i * 0.1} className="relative border-t border-white/15 pt-6">
              <span
                className="absolute -top-[3px] left-0 h-[5px] w-[5px] rounded-full bg-gold-400 shadow-[0_0_10px_2px_rgba(226,182,85,0.6)]"
                aria-hidden
              />
              <div className="flex items-center justify-between">
                <span className="display text-6xl !text-transparent tabular-nums transition-colors duration-500 [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] group-hover:!text-gold-400 group-hover:[-webkit-text-stroke:1px_transparent]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <s.icon
                  className="h-6 w-6 text-gold-400 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-125"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
              <h3 className="mt-8 font-display text-xl text-steel-100">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-400">{s.desc}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
