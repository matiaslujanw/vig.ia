"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Tecnología", href: "#tecnologia" },
  { label: "GPS", href: "#rastreo" },
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      style={{ borderColor: border }}
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b transition-colors ${
        open ? "bg-ink-950/95" : ""
      }`}
    >
      <motion.div
        aria-hidden
        style={{ backgroundColor: bg }}
        className="absolute inset-0 -z-10"
      />

      <div className="relative mx-auto max-w-7xl px-6 h-20 flex items-center justify-between gap-4">
        <div className="flex-shrink-0">
          <Logo />
        </div>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs xl:text-sm uppercase tracking-[0.18em] text-steel-300 hover:text-gold-400 transition-colors relative group whitespace-nowrap"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden lg:inline-flex flex-shrink-0 items-center gap-2 px-5 py-2.5 rounded-full glass-gold text-gold-300 text-xs xl:text-sm uppercase tracking-[0.15em] hover:bg-gold-500/20 transition-all whitespace-nowrap"
        >
          Solicitar Cotización
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          className="lg:hidden flex-shrink-0 w-11 h-11 rounded-full glass-gold flex items-center justify-center text-gold-300 hover:bg-gold-500/20 transition-all"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div
          id="menu-movil"
          className="lg:hidden relative animate-menuIn border-t border-gold-500/15 bg-ink-950/95 backdrop-blur-xl"
        >
          <nav className="mx-auto max-w-7xl px-6 py-5 flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 border-b border-white/5 text-sm uppercase tracking-[0.18em] text-steel-300 hover:text-gold-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex items-center justify-center px-5 py-3.5 rounded-full glass-gold text-gold-300 text-sm uppercase tracking-[0.15em] hover:bg-gold-500/20 transition-all"
            >
              Solicitar Cotización
            </a>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
