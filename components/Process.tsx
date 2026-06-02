"use client";

import { motion } from "framer-motion";
import { Compass, Layers, Radar, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Compass,
    n: "01",
    t: "Análisis de riesgo",
    d: "Diagnosticamos riesgos, vulnerabilidades y perímetro para anticipar amenazas.",
  },
  {
    icon: Layers,
    n: "02",
    t: "Diseño a medida",
    d: "Definimos la solución integral: personal, tecnología y protocolos de actuación.",
  },
  {
    icon: Radar,
    n: "03",
    t: "Despliegue",
    d: "Implementamos, capacitamos y conectamos todo al monitoreo 24/7.",
  },
  {
    icon: ShieldCheck,
    n: "04",
    t: "Seguimiento continuo",
    d: "Monitoreo, informes operativos y respuesta inmediata ante cada evento.",
  },
];

export function Process() {
  return (
    <section
      id="operacion"
      className="relative py-32 bg-ink-950 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-faint [background-size:60px_60px] opacity-25" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-block px-3 py-1 rounded-full glass-gold text-[10px] uppercase tracking-[0.3em] text-gold-300 mb-5">
            Metodología
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-gradient-steel leading-tight">
            Un proceso pensado para
            <span className="text-gradient-gold"> no fallar.</span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* connecting line */}
          <div className="hidden md:block absolute top-12 left-12 right-12 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative"
            >
              <div className="relative z-10 w-24 h-24 mx-auto rounded-full glass ring-gold flex items-center justify-center group hover:scale-105 transition-transform">
                <s.icon className="w-8 h-8 text-gold-400" />
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-ink-900 border border-gold-500/40 flex items-center justify-center text-[10px] font-mono text-gold-300">
                  {s.n}
                </span>
              </div>
              <h3 className="text-center font-display text-xl text-steel-200 mt-6 mb-2">
                {s.t}
              </h3>
              <p className="text-center text-sm text-steel-400 leading-relaxed max-w-xs mx-auto">
                {s.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
