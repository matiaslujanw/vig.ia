"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Camera, Signal, AlertTriangle } from "lucide-react";

export function Dashboard() {
  return (
    <section
      id="tecnologia"
      className="relative py-32 lg:py-40 bg-gradient-to-b from-ink-950/65 via-ink-900/55 to-ink-950/65 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-faint [background-size:80px_80px] opacity-25" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-radial-gold opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-5"
          >
            <div className="inline-block px-3 py-1 rounded-full glass-gold text-[10px] uppercase tracking-[0.3em] text-gold-300 mb-5">
              Centro de Comando
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-gradient-steel leading-tight mb-6">
              Monitoreo inteligente
              <br />
              <span className="text-gradient-gold">en tiempo real.</span>
            </h2>
            <p className="text-steel-300/85 leading-relaxed mb-8">
              Nuestro centro de monitoreo integra cámaras, drones y equipos en
              terreno bajo protocolos de respuesta definidos. Detección
              temprana, seguimiento operativo y visibilidad total de cada
              servicio para anticipar riesgos y actuar al instante.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { i: Signal, t: "Telemetría", v: "En tiempo real" },
                { i: Camera, t: "Cámaras + IA", v: "CCTV integrado" },
                { i: MapPin, t: "Drones", v: "Patrullaje aéreo" },
                { i: AlertTriangle, t: "Alertas", v: "Respuesta inmediata" },
              ].map((b) => (
                <div
                  key={b.t}
                  className="glass rounded-xl px-4 py-3 flex items-center gap-3"
                >
                  <b.i className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-steel-400">
                      {b.t}
                    </div>
                    <div className="text-sm text-steel-200 font-medium">
                      {b.v}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="relative glass rounded-3xl p-3 ring-gold">
              {/* terminal bar */}
              <div className="flex items-center justify-between px-3 pt-1 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500/70" />
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-mono text-steel-400 ml-3">
                    vigia.command/live
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulseSoft" />
                  LIVE
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/5">
                <Image
                  src="/computo.jpeg"
                  alt="Centro de monitoreo de Vig.IA — operadores, video wall y drones"
                  width={1170}
                  height={962}
                  className="w-full h-auto"
                />
                {/* scanline sweep */}
                <motion.div
                  className="absolute inset-x-0 h-16 bg-gradient-to-b from-gold-400/15 to-transparent pointer-events-none"
                  animate={{ top: ["-10%", "100%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                {/* corner brackets */}
                <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold-500/60" />
                <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold-500/60" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
