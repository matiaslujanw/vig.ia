"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "./Logo";

const links = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Tecnología", href: "#tecnologia" },
  { label: "Riesgos", href: "#riesgos" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(5,5,5,0)", "rgba(5,5,5,0.85)"]);
  const border = useTransform(
    scrollY,
    [0, 120],
    ["rgba(255,255,255,0)", "rgba(212,161,58,0.18)"]
  );

  return (
    <motion.header
      style={{ backgroundColor: bg, borderColor: border }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b transition-colors"
    >
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm uppercase tracking-[0.18em] text-steel-300 hover:text-gold-400 transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>
        <a
          href="#contacto"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-gold text-gold-300 text-sm uppercase tracking-[0.15em] hover:bg-gold-500/20 transition-all"
        >
          Solicitar Cotización
        </a>
      </div>
    </motion.header>
  );
}
