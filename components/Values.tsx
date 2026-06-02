"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Lightbulb,
  Handshake,
  ShieldAlert,
  Target,
  Award,
  Scale,
} from "lucide-react";

const values = [
  {
    icon: BadgeCheck,
    title: "Profesionalismo",
    desc: "Actuamos con responsabilidad, disciplina y compromiso operativo.",
  },
  {
    icon: Lightbulb,
    title: "Innovación",
    desc: "Incorporamos tecnología y herramientas modernas para mejorar la prevención y el control.",
  },
  {
    icon: Handshake,
    title: "Confianza",
    desc: "Construimos relaciones basadas en transparencia, cumplimiento y seriedad.",
  },
  {
    icon: ShieldAlert,
    title: "Prevención",
    desc: "Creemos que la seguridad eficiente comienza antes del incidente.",
  },
  {
    icon: Target,
    title: "Compromiso",
    desc: "Trabajamos para brindar respuestas rápidas y soluciones reales a cada cliente.",
  },
  {
    icon: Award,
    title: "Excelencia",
    desc: "Buscamos mejorar continuamente nuestros procesos, personal y tecnología.",
  },
  {
    icon: Scale,
    title: "Integridad",
    desc: "Actuamos con ética, respeto y confidencialidad en cada servicio.",
  },
];

export function Values() {
  return (
    <section
      id="valores"
      className="relative py-32 lg:py-40 bg-ink-950 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-faint [background-size:60px_60px] opacity-25" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-radial-gold opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full glass-gold text-[10px] uppercase tracking-[0.3em] text-gold-300 mb-5">
            Nuestra esencia
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-gradient-steel leading-tight">
            Creados para evolucionar
            <br />
            <span className="text-gradient-gold">la seguridad privada.</span>
          </h2>
          <p className="mt-6 text-steel-300/80 leading-relaxed">
            Integramos inteligencia, tecnología y presencia operativa bajo un
            modelo moderno, preventivo y profesional. Estos son los valores que
            guían cada servicio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-2xl p-6 overflow-hidden hover:ring-gold transition-all"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gold-500/0 group-hover:bg-gold-500/10 blur-2xl transition-all duration-500" />
              <div className="relative w-12 h-12 rounded-xl glass-gold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <v.icon className="w-5 h-5 text-gold-400" />
              </div>
              <h3 className="relative font-display text-lg text-steel-200 mb-2">
                {v.title}
              </h3>
              <p className="relative text-sm text-steel-400 leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
