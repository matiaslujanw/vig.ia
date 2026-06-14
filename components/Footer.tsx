"use client";

import { Logo } from "./Logo";
import { Mail, MapPin, Phone, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-ink-900/75 border-t border-white/5 pt-20 pb-10">
      <div className="absolute inset-x-0 top-0 h-px divider-gold" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Logo className="h-16 md:h-20 w-auto" />
            <p className="mt-6 text-sm text-steel-400 max-w-md leading-relaxed">
              Empresa tucumana de seguridad privada que integra seguridad
              física, monitoreo inteligente y tecnología aplicada en un único
              sistema integral. Prevención, control y respuesta a la medida de
              cada cliente.
            </p>
            <div className="mt-6 flex gap-3">
              {[Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold-500/10 hover:border-gold-500/40 transition-all"
                >
                  <Icon className="w-4 h-4 text-gold-400" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.25em] text-gold-300 mb-5">
              Soluciones
            </h4>
            <ul className="space-y-3 text-sm text-steel-400">
              {[
                "Empresas y comercios",
                "Residencial y consorcios",
                "Seguridad rural",
                "Obras e industrias",
                "Monitoreo inteligente",
              ].map((l) => (
                <li key={l}>
                  <a href="#soluciones" className="hover:text-gold-300 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.25em] text-gold-300 mb-5">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-steel-400">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gold-400 mt-0.5" />
                +54 9 3814 15-6775
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gold-400 mt-0.5" />
                comando@vigia.security
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5" />
                San Miguel de Tucumán · Yerba Buena, Tucumán, Argentina
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-steel-500">
          <p>© {new Date().getFullYear()} Vig.IA — Seguridad con Inteligencia. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-400 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Términos</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Habilitaciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
