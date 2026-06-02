"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Crosshair, Radio, ShieldCheck } from "lucide-react";

export function Operatives() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const droneX = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const droneY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="nosotros"
      ref={ref}
      className="relative py-32 lg:py-48 overflow-hidden bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950"
    >
      {/* atmosphere */}
      <div className="absolute inset-0 bg-grid-faint [background-size:80px_80px] opacity-30" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-radial-gold opacity-60" />

      {/* drone flying through */}
      <motion.div
        style={{ x: droneX, y: droneY }}
        className="absolute top-24 left-1/2 -translate-x-1/2 w-40 opacity-90 pointer-events-none"
      >
        <svg viewBox="0 0 200 100">
          <g stroke="#26262d" strokeWidth="3" strokeLinecap="round">
            <line x1="100" y1="50" x2="40" y2="25" />
            <line x1="100" y1="50" x2="160" y2="25" />
            <line x1="100" y1="50" x2="40" y2="75" />
            <line x1="100" y1="50" x2="160" y2="75" />
          </g>
          {[
            [40, 25],
            [160, 25],
            [40, 75],
            [160, 75],
          ].map(([x, y], i) => (
            <motion.ellipse
              key={i}
              cx={x}
              cy={y}
              rx="22"
              ry="1.5"
              fill="#d4a13a"
              opacity="0.7"
              animate={{ rx: [22, 26, 22] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
          ))}
          <rect x="80" y="40" width="40" height="20" rx="4" fill="#1a1a1f" stroke="#3a3d44" />
          <circle cx="100" cy="62" r="5" fill="#d4a13a" />
        </svg>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-block px-3 py-1 rounded-full glass-gold text-[10px] uppercase tracking-[0.3em] text-gold-300 mb-6">
            Quiénes somos
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-gradient-steel leading-tight">
            Una empresa tucumana
            <br />
            <span className="text-gradient-gold">de seguridad tecnológica.</span>
          </h2>
          <p className="mt-6 text-steel-300/80 leading-relaxed">
            Vig.IA nace con una visión moderna, profesional y tecnológica de la
            protección integral. Nuestro equipo directivo y operativo reúne
            experiencia en seguridad privada, seguridad pública, ciberseguridad,
            investigación, monitoreo y desarrollo de sistemas, para transformar
            el modelo tradicional de vigilancia con inteligencia aplicada,
            análisis de riesgos y tecnología orientada a la prevención.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Equipo / uniforme real */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-6 lg:col-span-7"
          >
            <div className="max-w-[440px] mx-auto">
              <div className="relative rounded-2xl overflow-hidden ring-gold glass">
                <Image
                  src="/equipo-tactico.jpeg"
                  alt="Equipo operativo de Vig.IA con uniforme táctico"
                  width={853}
                  height={1280}
                  className="w-full h-auto"
                />
                {/* corner brackets */}
                <span className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-gold-500/70" />
                <span className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-gold-500/70" />
                <span className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-gold-500/70" />
                <span className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-gold-500/70" />
              </div>
              <div className="mt-4 flex justify-center">
                <span className="px-4 py-1.5 rounded-full glass-gold text-[10px] uppercase tracking-[0.25em] text-gold-300">
                  Uniforme operativo Vig.IA
                </span>
              </div>
            </div>
          </motion.div>

          {/* Expertise panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-6 lg:col-span-5 space-y-5"
          >
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Crosshair className="w-4 h-4 text-gold-400" />
                <span className="text-xs uppercase tracking-[0.25em] text-gold-300">
                  Áreas de expertise
                </span>
              </div>
              <div className="space-y-5">
                {[
                  ["Seguridad privada", "Operativa", 95],
                  ["Seguridad pública", "Profesional", 88],
                  ["Ciberseguridad", "Especializada", 90],
                  ["Monitoreo & tecnología", "Desarrollo propio", 92],
                ].map(([label, value, pct]) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-steel-400 uppercase tracking-widest">
                        {label}
                      </span>
                      <span className="text-gold-300 font-medium">{value}</span>
                    </div>
                    <div className="h-1 rounded-full bg-ink-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-gold-500 to-gold-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-widest mb-2">
                  <Radio className="w-3.5 h-3.5" /> Conectados
                </div>
                <div className="text-xs text-steel-300">
                  Cada operativo enlazado al centro de comando 24/7.
                </div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-widest mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Capacitados
                </div>
                <div className="text-xs text-steel-300">
                  Personal formado en prevención y protocolos de actuación.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visión & Misión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
          {[
            {
              tag: "Visión",
              text: "Convertirnos en la empresa de seguridad privada tecnológica líder del norte argentino, integrando innovación, prevención y capacidad operativa para brindar soluciones modernas y eficientes adaptadas a los desafíos actuales de la seguridad.",
            },
            {
              tag: "Misión",
              text: "Proteger personas, bienes e infraestructura a través de soluciones de seguridad modernas, combinando experiencia operativa, innovación tecnológica y protocolos de actuación que permitan anticipar riesgos y generar tranquilidad en nuestros clientes.",
            },
          ].map((b, i) => (
            <motion.div
              key={b.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative glass rounded-2xl p-8 ring-gold overflow-hidden"
            >
              <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold-500/40" />
              <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold-500/40" />
              <div className="inline-block px-3 py-1 rounded-full glass-gold text-[10px] uppercase tracking-[0.3em] text-gold-300 mb-5">
                {b.tag}
              </div>
              <p className="text-steel-300/90 leading-relaxed">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
