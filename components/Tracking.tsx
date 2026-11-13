"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  BellRing,
  Check,
  Database,
  FileSpreadsheet,
  MapPin,
  MapPinned,
  Navigation,
  PlayCircle,
  PowerOff,
  Route,
  Share2,
  Smartphone,
  Wrench,
} from "lucide-react";
import { Button, Gold, LiveDot, Reveal, Section, SectionHeader } from "./ui";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: MapPin,
    title: "Ubicación en tiempo real",
    items: [
      "Posición actualizada al instante",
      "Dirección donde se encuentra",
      "Velocidad y sentido de circulación",
      "Estado del vehículo",
    ],
  },
  {
    icon: Route,
    title: "Recorridos históricos",
    items: [
      "Recorrido completo sobre el mapa",
      "Horarios de salida y llegada",
      "Distancia recorrida y velocidad por tramo",
      "Tiempo detenido",
    ],
  },
  {
    icon: PlayCircle,
    title: "Reproducción de viajes",
    items: [
      "Cómo se desplazó el vehículo",
      "Velocidad en cada momento",
      "Paradas realizadas",
      "Eventos ocurridos durante el trayecto",
    ],
  },
  {
    icon: BellRing,
    title: "Alertas automáticas",
    items: [
      "Encendido, apagado y exceso de velocidad",
      "Movimiento no autorizado y botón de pánico",
      "Desconexión de batería",
      "Notificaciones push al instante",
    ],
  },
  {
    icon: MapPinned,
    title: "Geocercas",
    items: [
      "Zonas para empresa, clientes y depósitos",
      "Obras, campos y puntos de interés",
      "Aviso al ingresar o salir de la zona",
      "Alerta por permanencia excedida",
    ],
  },
  {
    icon: Navigation,
    title: "Tiempo estimado de llegada",
    items: [
      "Distancia real por calles",
      "Tiempo estimado de arribo",
      "Ruta sugerida",
      "Vehículo más cercano a cada destino",
    ],
  },
  {
    icon: FileSpreadsheet,
    title: "Reportes de flota",
    items: [
      "Kilómetros, horas de uso y de movimiento",
      "Horas en ralentí para detectar consumo innecesario",
      "Viajes, eventos, paradas y permanencias",
      "Exportación a Excel y envío automático por correo",
    ],
  },
  {
    icon: Wrench,
    title: "Recordatorios de mantenimiento",
    items: [
      "Service y cambio de aceite",
      "VTV y seguro",
      "Patente y otros vencimientos",
      "Aviso anticipado de cada renovación",
    ],
  },
  {
    icon: PowerOff,
    title: "Corte remoto del motor",
    items: [
      "Disponible en equipos compatibles",
      "Bajo procedimiento de seguridad validado",
      "Coordinado con el centro de comando",
      "Respuesta ante robo o uso no autorizado",
    ],
  },
];

const extras = [
  {
    icon: Smartphone,
    title: "Acceso desde cualquier dispositivo",
    desc: "Plataforma 100% online: computadoras, celulares Android, iPhone y tablets.",
  },
  {
    icon: Share2,
    title: "Compartir la ubicación",
    desc: "Enlaces temporales para compartir la posición de un vehículo con terceros.",
  },
  {
    icon: Database,
    title: "Historial y resguardo",
    desc: "90 días de historial en la plataforma y copias de seguridad conservadas 5 años.",
  },
];

const benefits = [
  "Control total las 24 horas",
  "Mayor seguridad de flota y carga",
  "Información en tiempo real",
  "Reducción de costos operativos",
  "Mejor planificación de recorridos",
  "Historial completo de movimientos",
  "Alertas configurables por evento",
  "Acceso desde cualquier lugar con Internet",
];

const ROUTE =
  "M40 232 L150 232 Q170 232 170 212 L170 150 Q170 130 190 130 L330 130 Q350 130 350 110 L350 78 Q350 58 370 58 L600 58";

/** Mapa ilustrativo: una unidad recorriendo su ruta, con geocerca. */
function FleetMap() {
  return (
    <div className="relative overflow-hidden bg-ink-950">
      <svg viewBox="0 -36 640 316" className="block h-auto w-full [&_text]:hidden sm:[&_text]:inline" role="img" aria-label="Ilustración de una unidad recorriendo su ruta en el mapa">
        <defs>
          <pattern id="fleetGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect y="-36" width="640" height="316" fill="url(#fleetGrid)" />

        {/* manzanas / calles secundarias */}
        <g stroke="rgba(255,255,255,0.09)" strokeWidth="1" fill="none">
          <path d="M0 180H640M0 96H640M96 -36V280M260 -36V280M448 -36V280M544 -36V280" />
        </g>

        {/* geocerca */}
        <g>
          <circle cx="520" cy="72" r="58" fill="rgba(226,182,85,0.06)" stroke="rgba(226,182,85,0.55)" strokeDasharray="4 5" />
          <text x="520" y="150" textAnchor="middle" fontSize="9" letterSpacing="1.2" fill="#9297a0" fontFamily="var(--font-mono), monospace">
            GEOCERCA · DEPÓSITO
          </text>
        </g>

        {/* ruta */}
        <path d={ROUTE} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="5" strokeLinecap="round" />
        <path
          d={ROUTE}
          fill="none"
          stroke="#e2b655"
          strokeWidth="2"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
        >
          {/* misma línea de tiempo que la unidad, para que el trazo la acompañe */}
          <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.86;1" dur="14s" repeatCount="indefinite" />
        </path>

        {/* origen */}
        <circle cx="40" cy="232" r="4" fill="#07080a" stroke="#b4b8bf" strokeWidth="1.5" />
        <text x="40" y="254" fontSize="9" letterSpacing="1.2" fill="#9297a0" fontFamily="var(--font-mono), monospace">
          SALIDA 08:14
        </text>

        {/* unidad */}
        <g>
          <animateMotion dur="14s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.86;1" calcMode="linear" path={ROUTE} />
          <circle r="13" fill="rgba(226,182,85,0.16)">
            <animate attributeName="r" values="9;16;9" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle r="5" fill="#e2b655" stroke="#07080a" strokeWidth="1.5" />
          <text x="14" y="-10" fontSize="9" letterSpacing="1.2" fill="#efeeea" fontFamily="var(--font-mono), monospace">
            UNIDAD 03
          </text>
        </g>
      </svg>

      <div className="label absolute left-4 top-3.5 flex items-center gap-2.5 text-steel-300">
        <LiveDot /> Flota · vista ilustrativa
      </div>
    </div>
  );
}

export function Tracking() {
  const [active, setActive] = useState(0);
  const feature = features[active];

  return (
    <Section id="rastreo">
      <SectionHeader
        index="06"
        label="Rastreo satelital GPS"
        title={
          <>
            Controlá tus vehículos <Gold>desde cualquier lugar.</Gold>
          </>
        }
        intro="Tené el control de tu flota las 24 horas desde una computadora, celular o tablet. Una plataforma online que brinda seguridad, información y herramientas de gestión en tiempo real."
      />

      {/* Explorador de funciones */}
      <Reveal>
        <div className="overflow-hidden rounded-lg border border-line bg-ink-900 lg:grid lg:grid-cols-12">
          <div
            role="tablist"
            aria-label="Funciones de la plataforma"
            className="no-scrollbar flex gap-2 overflow-x-auto border-b border-line p-3 lg:col-span-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:border-r lg:p-0"
          >
            {features.map((f, i) => {
              const on = i === active;
              return (
                <button
                  key={f.title}
                  role="tab"
                  aria-selected={on}
                  aria-controls="rastreo-panel"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative flex flex-shrink-0 items-center gap-3 whitespace-nowrap rounded-md border px-3.5 py-2.5 text-left text-sm transition-colors",
                    "lg:flex-1 lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-6 lg:py-0 lg:last:border-b-0",
                    on
                      ? "border-gold-500/50 bg-gold-500/[0.08] text-steel-100 lg:bg-ink-950"
                      : "border-line text-steel-400 hover:text-steel-100 lg:hover:bg-ink-850"
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="rastreo-marker"
                      className="absolute inset-y-0 left-0 hidden w-0.5 bg-gold-400 lg:block"
                    />
                  )}
                  <span className={cn("label hidden lg:block", on ? "text-gold-400" : "text-steel-500")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="lg:py-3.5">{f.title}</span>
                </button>
              );
            })}
          </div>

          <div id="rastreo-panel" role="tabpanel" className="lg:col-span-8">
            <FleetMap />
            <div className="border-t border-line p-6 lg:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="flex items-center gap-3.5">
                    <feature.icon className="h-6 w-6 text-gold-400" strokeWidth={1.5} aria-hidden />
                    <h3 className="font-display text-2xl text-steel-100">
                      {feature.title}
                    </h3>
                  </div>
                  <ul className="mt-6 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                    {feature.items.map((it) => (
                      <li
                        key={it}
                        className="flex items-baseline gap-3 border-t border-line py-3.5 text-[15px] text-steel-300"
                      >
                        <span className="h-1 w-1 flex-shrink-0 -translate-y-1 rounded-full bg-gold-400" aria-hidden />
                        {it}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Beneficios */}
      <Reveal className="mt-16 grid grid-cols-1 gap-x-12 gap-y-6 lg:mt-20 lg:grid-cols-12">
        <div className="label text-steel-400 lg:col-span-3 lg:pt-4">
          Beneficios del servicio
        </div>
        <ul className="grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:col-span-9">
          {benefits.map((b) => (
            <li
              key={b}
              className="flex items-center gap-3.5 border-b border-line py-4 text-[15px] text-steel-200"
            >
              <Check className="h-4 w-4 flex-shrink-0 text-gold-400" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Acceso y resguardo */}
      <Reveal className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 lg:mt-16">
        {extras.map((e) => (
          <div key={e.title}>
            <e.icon className="h-5 w-5 text-gold-400" strokeWidth={1.5} aria-hidden />
            <h3 className="mt-4 text-[15px] font-medium text-steel-100">
              {e.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-steel-400">
              {e.desc}
            </p>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-12">
        <Button href="#contacto" className="px-6 py-3.5">
          Solicitar el servicio de rastreo
        </Button>
      </Reveal>
    </Section>
  );
}
