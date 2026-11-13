"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  Check,
  Fingerprint,
  MonitorSmartphone,
  ScanFace,
  ScanLine,
  Smartphone,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Button, Eyebrow, Gold, LiveDot, Reveal, Section } from "./ui";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type ModuleId = "totem" | "bio" | "lpr" | "app" | "soc";

const modules: {
  id: ModuleId;
  icon: LucideIcon;
  title: string;
  desc: string;
  status: string;
  log: string[];
}[] = [
  {
    id: "totem",
    icon: MonitorSmartphone,
    title: "Tótem con IA",
    desc: "Atención y verificación de visitas en el acceso, conectada al centro de monitoreo.",
    status: "Visita verificada",
    log: ["Visita anunciada en el acceso", "Identidad verificada", "Aviso enviado a la unidad"],
  },
  {
    id: "bio",
    icon: Fingerprint,
    title: "Accesos biométricos",
    desc: "Ingreso de residentes y personal autorizado mediante identificación biométrica.",
    status: "Acceso concedido",
    log: ["Lectura biométrica", "Residente reconocido", "Puerta principal habilitada"],
  },
  {
    id: "lpr",
    icon: ScanLine,
    title: "Cámaras LPR",
    desc: "Lectura automática de patentes para controlar el ingreso y egreso de vehículos.",
    status: "Patente autorizada",
    log: ["Vehículo detectado en el portón", "Patente leída", "Barrera habilitada"],
  },
  {
    id: "app",
    icon: Smartphone,
    title: "App propia",
    desc: "Avisos, autorizaciones de visitas y novedades del edificio, desde el celular.",
    status: "Notificación entregada",
    log: ["Visita en espera", "Autorización del residente", "Registro guardado"],
  },
  {
    id: "soc",
    icon: Video,
    title: "Monitoreo 24/7",
    desc: "Operadores que supervisan cada evento y activan los protocolos de respuesta.",
    status: "Operador en línea",
    log: ["Cámaras del edificio en línea", "Evento revisado por operador", "Sin novedades"],
  },
];

const CYCLE_MS = 5200;

/* ───────────── Visuales por módulo (ilustrativos) ───────────── */

function ScanBar() {
  return (
    <span
      className="absolute inset-x-0 top-0 h-px animate-scan bg-gold-400 shadow-[0_0_12px_2px_rgba(226,182,85,0.55)]"
      aria-hidden
    />
  );
}

function Corners() {
  const c = "absolute h-4 w-4 border-gold-400";
  return (
    <>
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

function TotemVisual() {
  return (
    <div className="flex items-end gap-8">
      <div className="flex flex-col items-center">
        <div className="relative flex h-44 w-28 flex-col items-center rounded-md border border-white/15 bg-ink-850 p-3">
          <span className="h-1 w-1 rounded-full bg-steel-500" />
          <div
            className="relative mt-3 flex h-24 w-full items-center justify-center overflow-hidden rounded-sm bg-ink-950 [--scan-distance:6rem]"
          >
            <ScanFace className="h-10 w-10 text-steel-300" strokeWidth={1.2} />
            <ScanBar />
          </div>
          <div className="mt-3 h-1 w-10 rounded-full bg-white/10" />
          <div className="mt-1.5 h-1 w-14 rounded-full bg-white/10" />
        </div>
        <div className="h-8 w-10 border-x border-white/15 bg-ink-850" />
        <div className="h-1.5 w-24 rounded-sm bg-white/15" />
      </div>
      <div className="label mb-10 hidden space-y-2 text-steel-400 sm:block">
        <div>Acceso peatonal</div>
        <div className="text-steel-200">Visita · Unidad 4B</div>
      </div>
    </div>
  );
}

function BioVisual() {
  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      <svg viewBox="0 0 160 160" className="absolute inset-0 -rotate-90">
        <circle cx="80" cy="80" r="74" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <motion.circle
          cx="80"
          cy="80"
          r="74"
          fill="none"
          stroke="#e2b655"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </svg>
      <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-ink-850 [--scan-distance:6rem]">
        <Fingerprint className="h-12 w-12 text-steel-200" strokeWidth={1.1} />
        <ScanBar />
      </div>
    </div>
  );
}

function LprVisual() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative px-5 py-4 [--scan-distance:5.5rem]">
        <Corners />
        <div className="relative overflow-hidden rounded-[5px] border-2 border-steel-200 bg-steel-100 text-ink-950">
          <div className="bg-[#1d4f9c] py-0.5 text-center font-sans text-[8px] font-semibold tracking-[0.2em] text-white">
            REPÚBLICA ARGENTINA
          </div>
          <div className="px-4 py-1 font-mono text-3xl font-medium tracking-[0.12em] sm:text-4xl">
            AE 482 KL
          </div>
        </div>
        <ScanBar />
      </div>
      <div className="label flex gap-5 text-steel-400">
        <span>Portón vehicular</span>
        <span className="text-steel-200">Cochera 12</span>
      </div>
    </div>
  );
}

function AppVisual() {
  const rows = [
    { icon: Bell, t: "Visita en el acceso", s: "Autorizar ingreso" },
    { icon: Check, t: "Encomienda", s: "Retirar en guardia" },
    { icon: Video, t: "Portón vehicular", s: "Ingreso registrado" },
  ];
  return (
    <div className="w-44 rounded-[1.4rem] border border-white/15 bg-ink-850 p-2">
      <div className="rounded-[1rem] bg-ink-950 px-3 pb-4 pt-3">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/15" />
        <div className="label mb-2 text-[9px] text-steel-500">Mi edificio</div>
        <div className="space-y-1.5">
          {rows.map((r, i) => (
            <motion.div
              key={r.t}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.35, duration: 0.4 }}
              className="flex items-center gap-2 rounded-md border border-white/[0.07] bg-ink-900 px-2 py-1.5"
            >
              <r.icon className="h-3 w-3 flex-shrink-0 text-gold-400" />
              <div className="min-w-0">
                <div className="truncate text-[10px] font-medium text-steel-100">
                  {r.t}
                </div>
                <div className="truncate text-[9px] text-steel-500">{r.s}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SocVisual() {
  const cams = ["Acceso", "Cochera", "Palier", "Perímetro"];
  return (
    <div className="grid w-full max-w-[19rem] grid-cols-2 gap-2">
      {cams.map((c, i) => (
        <div
          key={c}
          className="relative aspect-video overflow-hidden rounded-sm border border-white/10 bg-ink-850"
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_4px)]" />
          <motion.div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
            animate={{ x: ["-100%", "400%"] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.6, ease: "linear" }}
          />
          <div className="label absolute left-1.5 top-1 flex items-center gap-1.5 text-[8px] text-steel-300">
            <LiveDot className="h-1 w-1" /> CAM {String(i + 1).padStart(2, "0")}
          </div>
          <div className="label absolute bottom-1 left-1.5 text-[8px] text-steel-500">
            {c}
          </div>
        </div>
      ))}
    </div>
  );
}

const visuals: Record<ModuleId, () => JSX.Element> = {
  totem: TotemVisual,
  bio: BioVisual,
  lpr: LprVisual,
  app: AppVisual,
  soc: SocVisual,
};

/* ───────────── Sección ───────────── */

export function Ecosystem() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setTimeout(
      () => setActive((a) => (a + 1) % modules.length),
      CYCLE_MS
    );
    return () => clearTimeout(id);
  }, [active, auto]);

  const mod = modules[active];
  const Visual = visuals[mod.id];

  return (
    <Section
      id="ecosistema"
      className="overflow-hidden bg-ink-900"
      backdrop={
        <>
          <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b" aria-hidden />
          <div
            className="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-gold-500/[0.07] blur-3xl"
            aria-hidden
          />
        </>
      }
    >

      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Texto + módulos */}
        <Reveal className="lg:col-span-5">
          <Eyebrow index="04">Ecosistema digital · Demo</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.6rem)]">
            Un edificio, <Gold>un solo sistema.</Gold>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-steel-300">
            Ecosistema digital para consorcios: tótem con IA, accesos
            biométricos, cámaras LPR (lectoras de patentes), app propia y
            monitoreo 24/7, integrados en una única plataforma.
          </p>

          <div
            role="tablist"
            aria-label="Módulos del ecosistema"
            className="mt-9 border-t border-line"
          >
            {modules.map((m, i) => {
              const on = i === active;
              return (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={on}
                  aria-controls="ecosistema-panel"
                  onClick={() => {
                    setActive(i);
                    setAuto(false);
                  }}
                  className="group relative block w-full border-b border-line py-4 text-left"
                >
                  <span className="flex items-center gap-4">
                    <m.icon
                      className={cn(
                        "h-5 w-5 flex-shrink-0 transition-colors",
                        on ? "text-gold-400" : "text-steel-500 group-hover:text-steel-300"
                      )}
                      strokeWidth={1.5}
                    />
                    <span
                      className={cn(
                        "font-display text-lg transition-colors",
                        on ? "text-steel-100" : "text-steel-400 group-hover:text-steel-200"
                      )}
                    >
                      {m.title}
                    </span>
                    <span className="label ml-auto text-steel-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="block overflow-hidden"
                      >
                        <span className="block pl-9 pr-8 pt-2 text-sm leading-relaxed text-steel-300">
                          {m.desc}
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {on && (
                    <span
                      key={`${active}-${auto}`}
                      className={cn(
                        "absolute -bottom-px left-0 h-px w-full origin-left bg-gold-400",
                        auto && "animate-progress"
                      )}
                      style={auto ? { animationDuration: `${CYCLE_MS}ms` } : undefined}
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={site.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              arrow="up"
              className="px-6 py-3.5"
            >
              Abrir la demo interactiva
            </Button>
            <Button href="#contacto" variant="secondary" arrow={false} className="px-6 py-3.5">
              Pedir una presentación
            </Button>
          </div>
        </Reveal>

        {/* Consola */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <div
            id="ecosistema-panel"
            role="tabpanel"
            aria-label={mod.title}
            onMouseEnter={() => setAuto(false)}
            className="flex h-full min-h-[30rem] flex-col overflow-hidden rounded-lg border border-white/10 bg-ink-950 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
          >
            <div className="label flex items-center justify-between border-b border-line px-5 py-3.5 text-steel-400">
              <span className="flex items-center gap-2.5">
                <LiveDot /> Consorcio · vista ilustrativa
              </span>
              <span className="hidden text-steel-500 sm:block">
                Módulo {String(active + 1).padStart(2, "0")} / {String(modules.length).padStart(2, "0")}
              </span>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-6 py-10">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />
              <AnimatePresence mode="wait">
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="relative flex w-full flex-col items-center gap-8"
                >
                  <div className="flex min-h-[13.5rem] w-full items-center justify-center lg:min-h-[17rem]">
                    <div className="flex w-full justify-center lg:scale-[1.3]">
                      <Visual />
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.4 }}
                    className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300"
                  >
                    <Check className="h-3.5 w-3.5" /> {mod.status}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <ol className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
              {mod.log.map((line, i) => (
                <motion.li
                  key={`${mod.id}-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.5, duration: 0.4 }}
                  className="flex items-baseline gap-3 border-b border-line px-5 py-3.5 text-[13px] text-steel-300 last:border-b-0 sm:border-b-0 sm:border-l sm:first:border-l-0"
                >
                  <span className="label text-gold-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {line}
                </motion.li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>

      {/* Llamado a la demo */}
      <Reveal className="relative mt-12 lg:mt-16">
        <a
          href={site.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col gap-8 overflow-hidden rounded-lg border border-gold-500/50 bg-ink-950 p-7 shadow-[0_0_60px_-20px_rgba(226,182,85,0.55)] transition-colors hover:border-gold-300 md:flex-row md:items-center md:justify-between lg:p-10"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gold-500/[0.16] via-gold-500/[0.04] to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-[1200ms] ease-out group-hover:translate-x-[420%]"
            aria-hidden
          />
          <div className="relative">
            <div className="label flex items-center gap-2.5 text-gold-300">
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inset-0 animate-ping rounded-full bg-gold-300 opacity-75" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-gold-300" />
              </span>
              Demo interactiva · disponible ahora
            </div>
            <p className="display mt-4 text-[clamp(1.7rem,3.4vw,2.75rem)]">
              Probalo vos mismo: <Gold>abrí la demo.</Gold>
            </p>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-steel-300">
              Recorré el ecosistema digital para consorcios en funcionamiento.
              Se abre en una pestaña nueva.
            </p>
          </div>
          <span className="relative flex flex-shrink-0 items-center gap-4 self-start md:self-center">
            <span className="text-sm font-medium text-gold-300 md:hidden lg:inline">
              Abrir la demo
            </span>
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-ink-950 transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-300 group-hover:shadow-[0_0_40px_-4px_rgba(226,182,85,0.8)] lg:h-20 lg:w-20">
              <ArrowUpRight className="h-7 w-7 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 lg:h-8 lg:w-8" />
            </span>
          </span>
        </a>
      </Reveal>
    </Section>
  );
}
