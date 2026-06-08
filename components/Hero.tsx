"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, PlayCircle } from "lucide-react";
import { useRef } from "react";
import { Particles } from "./Particles";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-screen w-full overflow-hidden bg-ink-950 noise"
    >
      <motion.video
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{ scale }}
        className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
      >
        <source src="/drone-security-footage.mp4" type="video/mp4" />
      </motion.video>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/75 via-ink-950/45 to-ink-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-ink-950/65" />
      <div className="absolute inset-0 bg-grid-faint [background-size:60px_60px] opacity-35" />
      <div className="absolute inset-0 hero-vignette" />
      <Particles density={80} />

      <motion.div
        style={{ scale }}
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-radial-gold opacity-45 pointer-events-none"
      />

      {/* Scanlines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="scanline absolute inset-x-0 h-40 animate-scan opacity-20" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-6 pt-44 pb-24 flex min-h-screen flex-col items-center justify-center text-center"
      >
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95]"
        >
          <span className="text-gradient-steel">Seguridad con</span>
          <br />
          <span className="text-gradient-gold">Inteligencia.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-8 max-w-2xl text-base md:text-lg text-steel-300/90 leading-relaxed"
        >
          Combinamos seguridad física, monitoreo inteligente y tecnología
          aplicada en un único sistema integral. Protegemos personas, bienes e
          infraestructura con prevención, control y capacidad de respuesta a la
          medida de cada cliente.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#contacto"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-ink-950 font-medium tracking-wide overflow-hidden shadow-glow hover:shadow-[0_0_60px_rgba(212,161,58,0.5)] transition-shadow"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Proteger mi operación
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <a
            href="#tecnologia"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass text-steel-200 hover:bg-white/5 transition-colors"
          >
            <PlayCircle className="w-5 h-5 text-gold-400" />
            Ver tecnología
          </a>
        </motion.div>

        {/* Stats inline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-3 gap-px max-w-3xl w-full bg-white/5 rounded-2xl overflow-hidden glass"
        >
          {[
            ["24/7", "Monitoreo y respuesta"],
            ["NOA", "Cobertura regional"],
            ["100%", "Soluciones a medida"],
          ].map(([n, l]) => (
            <div key={l} className="bg-ink-900/60 px-4 py-5 text-center">
              <div className="font-display text-2xl md:text-3xl text-gradient-gold">
                {n}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-steel-400 mt-1">
                {l}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-steel-400"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold-400/60 to-transparent" />
      </motion.div>
    </section>
  );
}
