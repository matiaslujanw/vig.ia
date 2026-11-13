"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button, LiveDot } from "./ui";
import { site } from "@/lib/site";
import { Corners, Counter, Radar, Scramble } from "./fx";

const stats: { n?: number; suffix?: string; text?: string; label: string }[] = [
  { n: 24, suffix: "/7", label: "Monitoreo y respuesta" },
  { n: 7, label: "Soluciones integrales" },
  { text: "NOA", label: "Cobertura regional" },
  { n: 100, suffix: "%", label: "Soluciones a medida" },
];

/** Hora local de Tucumán (ART), solo en cliente para evitar desajustes de hidratación. */
function useTucumanClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-AR", {
      timeZone: "America/Argentina/Tucuman",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/** Entrada por CSS: el contenido del hero no depende de que cargue el JS. */
function rise(delay: number) {
  return { style: { animationDelay: `${delay}s` } };
}

export function Hero() {
  const time = useTucumanClock();
  const ref = useRef<HTMLElement>(null);

  // Parallax: el video se aleja y se oscurece al hacer scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  // El archivo trae franjas negras a los costados y una marca de agua abajo a
  // la derecha. Con esta escala y este origen (38% desde la izquierda) las tres
  // cosas quedan fuera de cuadro en cualquier pantalla. No bajar de 1.26.
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.26, 1.4]);

  // Linterna: un halo dorado sigue al cursor sobre el video
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--hx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--hy", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="inicio"
      ref={ref}
      onMouseMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Video aéreo: solo en el hero, con velos para asegurar la lectura */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
          style={{ y: videoY, scale: videoScale, transformOrigin: "38% 0%" }}
          className="h-full w-full object-cover"
        >
          <source src="/drone-security-footage.mp4" type="video/mp4" />
        </motion.video>
        <div className="absolute inset-0 bg-ink-950/45" />
        <div className="absolute inset-0 [background:radial-gradient(520px_circle_at_var(--hx,70%)_var(--hy,40%),rgba(226,182,85,0.16),transparent_62%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.025)_0_1px,transparent_1px_3px)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60" />
      </div>

      {/* Telemetría: marco de visor sobre el video */}
      <div
        className="pointer-events-none absolute inset-x-6 bottom-40 top-24 hidden lg:inset-x-10 lg:block"
        aria-hidden
      >
        <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-white/40" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-white/40" />
        <div
          style={{ animationDelay: "0.9s" }}
          className="label absolute right-8 top-6 animate-fade space-y-1.5 text-right text-steel-300"
        >
          <div className="flex items-center justify-end gap-2 text-steel-100">
            <LiveDot /> Patrullaje aéreo
          </div>
          <div>26.8083° S · 65.2176° O</div>
          <div className="tabular-nums">ART {time ?? "--:--:--"}</div>
        </div>

        <div
          style={{ animationDelay: "1.2s" }}
          className="absolute right-8 top-28 animate-fade"
        >
          <Radar className="w-24" />
        </div>

        {/* Retícula de análisis recorriendo la escena */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            left: ["46%", "62%", "52%", "66%", "46%"],
            top: ["8%", "3%", "13%", "9%", "8%"],
          }}
          transition={{
            opacity: { duration: 1, delay: 1.4 },
            left: { duration: 26, repeat: Infinity, ease: "easeInOut" },
            top: { duration: 26, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute h-28 w-40"
        >
          <Corners size="h-3.5 w-3.5" />
          <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-gold-400/80" />
          <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-gold-400/80" />
          <span className="label absolute -bottom-6 left-0 flex items-center gap-2 whitespace-nowrap text-[10px] text-gold-300">
            <span className="h-1 w-1 animate-blink rounded-full bg-gold-300" />
            Análisis de escena · IA
          </span>
        </motion.div>
      </div>

      <div className="mx-auto flex w-full max-w-site flex-1 flex-col justify-end px-6 pb-14 pt-32 lg:px-10 lg:pb-20">
        <a
          href={site.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          {...rise(0.05)}
          className="group mb-8 inline-flex w-fit max-w-full animate-rise items-center gap-3 rounded-full border border-gold-500/50 bg-ink-950/70 py-1.5 pl-1.5 pr-4 text-sm text-steel-100 shadow-[0_0_30px_-8px_rgba(226,182,85,0.6)] backdrop-blur-md transition-colors hover:border-gold-300 hover:bg-ink-950/90"
        >
          <span className="label flex items-center gap-2 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-medium text-ink-950">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-ink-950" />
            Demo
          </span>
          <span className="sm:hidden">Probá la demo interactiva</span>
          <span className="hidden truncate sm:inline">
            Probá el ecosistema para consorcios
          </span>
          <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-gold-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>

        <div
          {...rise(0.1)}
          className="label flex animate-rise items-center gap-3 text-steel-300"
        >
          <span className="h-px w-8 bg-gold-500" aria-hidden />
          Seguridad privada · Tucumán, Argentina
        </div>

        <h1
          {...rise(0.2)}
          className="display animate-rise mt-7 text-[clamp(2.9rem,9.4vw,8rem)] leading-[0.94]"
        >
          Seguridad con
          <br />
          <Scramble text="inteligencia." className="gold-shimmer" />
        </h1>

        <div className="mt-9 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <p
            {...rise(0.35)}
            className="max-w-xl animate-rise text-base leading-relaxed text-steel-200 md:text-lg lg:col-span-6"
          >
            Combinamos seguridad física, monitoreo inteligente y tecnología
            aplicada en un único sistema integral. Nuestro ecosistema digital
            integra tótems con IA, accesos biométricos y cámaras LPR para
            lectura de patentes, conectados a una app propia y monitoreo 24/7.
          </p>

          <div
            {...rise(0.45)}
            className="flex animate-rise flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end"
          >
            <Button href="#contacto" className="px-6 py-3.5">
              Proteger mi operación
            </Button>
            <Button
              href="#ecosistema"
              variant="secondary"
              arrow={false}
              className="px-6 py-3.5"
            >
              Ver el ecosistema
            </Button>
          </div>
        </div>
      </div>

      {/* Indicadores */}
      <dl
        style={{ animationDelay: "0.6s" }}
        className="animate-fade border-t border-white/10 bg-ink-950/60 backdrop-blur-sm"
      >
        <div className="mx-auto grid max-w-site grid-cols-2 px-6 md:grid-cols-4 lg:px-10">
          {stats.map(({ n, suffix, text, label: l }, i) => (
            <div
              key={l}
              className={`flex flex-col-reverse gap-1 py-5 md:py-6 ${
                i % 2 ? "pl-5 border-l border-white/10" : ""
              } ${i > 1 ? "border-t border-white/10 md:border-t-0" : ""} ${
                i === 2 ? "md:border-l md:pl-5" : ""
              }`}
            >
              <dt className="label text-steel-400">{l}</dt>
              <dd className="display text-2xl md:text-3xl">
                {n !== undefined ? <Counter to={n} suffix={suffix} /> : text}
              </dd>
            </div>
          ))}
        </div>
      </dl>
    </section>
  );
}
