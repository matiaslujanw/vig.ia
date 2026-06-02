"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Home,
  Tractor,
  HardHat,
  Radar,
  FileSearch,
  Check,
  ArrowUpRight,
} from "lucide-react";

const offerings = [
  "Seguridad presencial profesional",
  "Monitoreo remoto 24/7",
  "Integración de cámaras y alarmas",
  "Control de accesos",
  "Tecnología aplicada a la prevención",
  "Drones y vigilancia perimetral",
  "Informes y seguimiento operativo",
  "Soluciones personalizadas según el riesgo",
];

const solutions = [
  {
    icon: Building2,
    title: "Empresas y comercios",
    desc: "Control de accesos, monitoreo y prevención de pérdidas.",
  },
  {
    icon: Home,
    title: "Residencial y consorcios",
    desc: "Protección integral para edificios, barrios y complejos.",
  },
  {
    icon: Tractor,
    title: "Seguridad rural",
    desc: "Monitoreo de fincas, campos y predios extensos.",
  },
  {
    icon: HardHat,
    title: "Obras e industrias",
    desc: "Vigilancia operativa y control perimetral.",
  },
  {
    icon: Radar,
    title: "Monitoreo inteligente",
    desc: "Seguimiento en tiempo real mediante tecnología y protocolos de respuesta.",
  },
  {
    icon: FileSearch,
    title: "Consultoría y análisis de riesgo",
    desc: "Diagnóstico y planificación estratégica de seguridad.",
  },
];

export function Services() {
  return (
    <section
      id="soluciones"
      className="relative py-32 lg:py-40 bg-ink-950 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-faint [background-size:60px_60px] opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-radial-gold opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Propuesta de valor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <div className="inline-block px-3 py-1 rounded-full glass-gold text-[10px] uppercase tracking-[0.3em] text-gold-300 mb-5">
              Soluciones
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-gradient-steel leading-tight">
              ¿Qué hace diferente
              <br />
              <span className="text-gradient-gold">a Vig.IA?</span>
            </h2>
            <p className="mt-6 text-steel-300/85 leading-relaxed border-l-2 border-gold-500/50 pl-5">
              Combinamos seguridad física, monitoreo inteligente y tecnología
              aplicada en un único sistema integral, que brinda prevención,
              control y capacidad de respuesta adaptada a cada cliente.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass rounded-2xl p-7 md:p-8"
          >
            <div className="text-xs uppercase tracking-[0.25em] text-gold-300 mb-5">
              Ofrecemos
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
              {offerings.map((o) => (
                <li key={o} className="flex items-start gap-3 text-sm text-steel-300">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-md glass-gold flex items-center justify-center">
                    <Check className="w-3 h-3 text-gold-400" />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Soluciones por segmento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((s, i) => (
            <motion.a
              key={s.title}
              href="#contacto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-2xl p-6 overflow-hidden hover:ring-gold transition-all"
            >
              {/* hover gold sheen */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 via-gold-500/0 to-gold-500/0 group-hover:from-gold-500/10 group-hover:to-transparent transition-all duration-500" />
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gold-500/0 group-hover:bg-gold-500/10 blur-2xl transition-all duration-500" />

              <div className="relative flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl glass-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                  <s.icon className="w-5 h-5 text-gold-400" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-steel-400 group-hover:text-gold-400 group-hover:rotate-45 transition-all duration-300" />
              </div>

              <h3 className="relative font-display text-lg text-steel-200 mb-2 leading-snug">
                {s.title}
              </h3>
              <p className="relative text-sm text-steel-400 leading-relaxed">
                {s.desc}
              </p>

              {/* corner accents */}
              <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold-500/40" />
              <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold-500/40" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
