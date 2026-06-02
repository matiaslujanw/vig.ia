"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export function CTA() {
  return (
    <section
      id="contacto"
      className="relative py-32 bg-ink-950 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-faint [background-size:80px_80px] opacity-20" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-radial-gold opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative mx-auto max-w-5xl px-6"
      >
        <div className="relative glass rounded-3xl p-10 md:p-16 text-center overflow-hidden ring-gold">
          {/* corner brackets */}
          <span className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-gold-500/60" />
          <span className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-gold-500/60" />
          <span className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-gold-500/60" />
          <span className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-gold-500/60" />

          <div className="inline-block px-3 py-1 rounded-full glass-gold text-[10px] uppercase tracking-[0.3em] text-gold-300 mb-6">
            Próximo paso
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-gradient-steel leading-tight">
            ¿Listo para operar
            <br />
            <span className="text-gradient-gold">con inteligencia?</span>
          </h2>
          <p className="mt-6 text-steel-300/80 max-w-xl mx-auto leading-relaxed">
            Coordinemos una evaluación de seguridad sin costo. Nuestro equipo
            arma una propuesta táctica integral en menos de 48 horas.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/5493810000000"
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-ink-950 font-medium tracking-wide shadow-glow hover:shadow-[0_0_60px_rgba(212,161,58,0.5)] transition-shadow"
            >
              Solicitar evaluación
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+5493810000000"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass text-steel-200 hover:bg-white/5 transition-colors"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              +54 9 381 000 0000
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
