"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Wordmark } from "./Logo";
import { Button } from "./ui";
import { ScrollProgress } from "./fx";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState("");

  // Resalta en el menú la sección que se está leyendo
  useEffect(() => {
    // Se observan todas las secciones: en las que no están en el menú, nada queda resaltado
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrent(`#${e.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        solid
          ? "border-line bg-ink-950/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-6 px-6 lg:px-10">
        <a href="#inicio" aria-label="Vig.IA — inicio" className="flex-shrink-0">
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Principal">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={current === l.href ? "true" : undefined}
              className={cn(
                "relative whitespace-nowrap py-2 text-[13px] transition-colors hover:text-steel-100",
                current === l.href ? "text-steel-100" : "text-steel-300"
              )}
            >
              {l.label}
              <span
                className={cn(
                  "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold-400 transition-transform duration-300",
                  current === l.href ? "scale-x-100" : "scale-x-0"
                )}
                aria-hidden
              />
            </a>
          ))}
        </nav>

        <div className="hidden flex-shrink-0 items-center gap-2.5 lg:flex">
          <a
            href={site.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-md border border-gold-500/50 px-3.5 py-2 text-[13px] font-medium text-gold-300 transition-colors hover:border-gold-300 hover:bg-gold-500/10"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-gold-300 opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-gold-300" />
            </span>
            Ver demo
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <Button href="#contacto" arrow={false} className="px-4 py-2 text-[13px]">
            Solicitar cotización
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          className="-mr-2 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md text-steel-100 hover:bg-white/5 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <ScrollProgress className="absolute inset-x-0 -bottom-px" />

      {open && (
        <div
          id="menu-movil"
          className="animate-menuIn border-t border-line bg-ink-950 lg:hidden"
        >
          <nav className="mx-auto flex max-w-site flex-col px-6 pb-6 pt-2" aria-label="Móvil">
            <a
              href={site.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mb-1 mt-3 flex items-center justify-between rounded-md border border-gold-500/50 bg-gold-500/10 px-4 py-3.5 text-gold-200"
            >
              <span className="flex items-center gap-3">
                <span className="label rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-medium text-ink-950">
                  Demo
                </span>
                Probá el ecosistema
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line py-4 text-lg text-steel-100"
              >
                <span className="label text-gold-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {l.label}
              </a>
            ))}
            <Button
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-6 w-full py-3.5"
            >
              Solicitar cotización
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
