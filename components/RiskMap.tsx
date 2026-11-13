"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button, Gold, LiveDot, Reveal, Section, SectionHeader } from "./ui";
import { cn } from "@/lib/utils";
import { Counter } from "./fx";

type Risk = "critical" | "high" | "medium" | "low";

type Zone = {
  id: string;
  name: string;
  cx: number;
  cy: number;
  r: number;
  risk: Risk;
  incidents: number;
  trend: string;
  notes: string;
};

const zones: Zone[] = [
  { id: "Z-01", name: "Yerba Buena · Cevil Redondo", cx: 110, cy: 200, r: 70, risk: "medium", incidents: 14, trend: "+6%", notes: "Robos a viviendas en countries y barrios cerrados sobre Av. Aconquija" },
  { id: "Z-02", name: "Centro · Microcentro SMT", cx: 310, cy: 200, r: 70, risk: "high", incidents: 32, trend: "+18%", notes: "Arrebatos y entraderas en zona bancaria de calle San Martín y 24 de Septiembre" },
  { id: "Z-03", name: "Barrio Norte · Plaza Urquiza", cx: 320, cy: 130, r: 55, risk: "medium", incidents: 12, trend: "+4%", notes: "Hurtos a comercios gastronómicos y vehículos sobre Av. Mitre" },
  { id: "Z-04", name: "Pque Industrial · Lules", cx: 100, cy: 320, r: 75, risk: "critical", incidents: 38, trend: "+24%", notes: "Intrusiones perimetrales nocturnas y robo de cargas en Ruta 38" },
  { id: "Z-05", name: "Banda del Río Salí · Alderetes", cx: 430, cy: 240, r: 70, risk: "high", incidents: 21, trend: "+11%", notes: "Asaltos en zona de acceso este y robo de cables sobre Ruta 9" },
  { id: "Z-06", name: "Tafí Viejo", cx: 250, cy: 70, r: 50, risk: "low", incidents: 5, trend: "-15%", notes: "Operación estable, vigilancia comunitaria activa" },
];

const riskStyle: Record<Risk, { color: string; fill: string; label: string }> = {
  critical: { color: "#ef5f5f", fill: "rgba(239,95,95,0.2)", label: "Crítico" },
  high: { color: "#e2b655", fill: "rgba(226,182,85,0.2)", label: "Alto" },
  medium: { color: "#c9c2a4", fill: "rgba(201,194,164,0.12)", label: "Medio" },
  low: { color: "#4fc79a", fill: "rgba(79,199,154,0.14)", label: "Bajo" },
};

const MONO = "var(--font-mono), monospace";

function RiskTag({ risk }: { risk: Risk }) {
  const s = riskStyle[risk];
  return (
    <span className="label inline-flex items-center gap-2" style={{ color: s.color }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} aria-hidden />
      {s.label}
    </span>
  );
}

export function RiskMap() {
  const [active, setActive] = useState<Zone>(zones[1]);

  const summary = [
    { label: "Zonas críticas", value: zones.filter((z) => z.risk === "critical").length },
    { label: "Alertas activas", value: zones.filter((z) => z.risk === "high" || z.risk === "critical").length },
    { label: "Bajo control", value: zones.filter((z) => z.risk === "low").length },
  ];

  return (
    <Section id="riesgos" className="bg-ink-900">
      <SectionHeader
        index="07"
        label="Inteligencia territorial"
        title={
          <>
            Mapa de riesgos <Gold>en tiempo real.</Gold>
          </>
        }
        intro="Geolocalizamos amenazas, cruzamos datos OSINT, históricos y señales de campo para anticipar incidentes antes de que ocurran."
      />

      <Reveal>
        <div className="overflow-hidden rounded-lg border border-white/10 bg-ink-950 lg:grid lg:grid-cols-12">
          {/* Mapa */}
          <div className="lg:col-span-8 lg:border-r lg:border-line">
            <div className="label flex items-center justify-between border-b border-line px-5 py-3.5 text-steel-400">
              <span className="flex items-center gap-2.5">
                <LiveDot /> Gran San Miguel de Tucumán
              </span>
              <span className="text-steel-500">{zones.length} zonas</span>
            </div>

            <div className="relative">
              <svg viewBox="0 0 540 380" className="block h-auto w-full" role="group" aria-label="Mapa de zonas de riesgo">
                <defs>
                  <pattern id="riskGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                  </pattern>
                  <filter id="riskBlur">
                    <feGaussianBlur stdDeviation="9" />
                  </filter>
                </defs>

                <rect width="540" height="380" fill="url(#riskGrid)" />

                {/* Sierras de San Javier (oeste) */}
                <path
                  d="M0 0 L0 380 L60 360 Q80 260 50 180 Q90 120 70 40 L90 0 Z"
                  fill="rgba(255,255,255,0.035)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.75"
                />
                <path
                  d="M0 200 Q40 180 60 200 M0 260 Q35 245 55 265 M0 140 Q45 125 65 140"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.6"
                  fill="none"
                />
                <text x="10" y="100" fontSize="7.5" letterSpacing="1" fontFamily={MONO} fill="#7b818a">
                  SIERRAS DE
                </text>
                <text x="10" y="111" fontSize="7.5" letterSpacing="1" fontFamily={MONO} fill="#7b818a">
                  SAN JAVIER
                </text>

                {/* Río Salí (este) */}
                <path
                  d="M400 0 Q380 90 410 180 Q440 260 420 380"
                  stroke="rgba(125,170,205,0.4)"
                  strokeWidth="2"
                  fill="none"
                />
                <text x="446" y="56" fontSize="7.5" letterSpacing="1" fontFamily={MONO} fill="rgba(125,170,205,0.75)">
                  RÍO SALÍ
                </text>

                {/* Trazado urbano: avenidas y rutas principales */}
                <g stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none">
                  <path d="M80 200 L320 200" />
                  <path d="M310 0 L320 380" />
                  <path d="M70 230 Q140 225 200 220" />
                  <path d="M150 0 Q200 100 280 200" />
                  <path d="M250 70 Q280 150 310 200" />
                  <path d="M100 320 Q180 280 310 220" />
                  <path d="M320 200 Q380 220 430 240" />
                </g>

                {/* Barrido de radar */}
                <g pointerEvents="none">
                  <path d="M270 190 L270 -260 A450 450 0 0 1 559 -155 Z" fill="rgba(226,182,85,0.05)" />
                  <path d="M270 190 L476 -210 A450 450 0 0 1 559 -155 Z" fill="rgba(226,182,85,0.08)" />
                  <path d="M270 190 L559 -155" stroke="rgba(226,182,85,0.55)" strokeWidth="1" />
                  <animateTransform attributeName="transform" type="rotate" from="0 270 190" to="360 270 190" dur="10s" repeatCount="indefinite" />
                </g>

                {/* Manchas de calor */}
                <g filter="url(#riskBlur)">
                  {zones.map((z) => (
                    <circle key={z.id} cx={z.cx} cy={z.cy} r={z.r * 0.8} fill={riskStyle[z.risk].fill} />
                  ))}
                </g>

                {/* Zonas */}
                {zones.map((z, i) => {
                  const s = riskStyle[z.risk];
                  const on = active.id === z.id;
                  return (
                    <g
                      key={z.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${z.id} ${z.name}, riesgo ${s.label}`}
                      aria-pressed={on}
                      onClick={() => setActive(z)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActive(z);
                        }
                      }}
                      className="cursor-pointer outline-none [&:focus-visible>circle:first-child]:stroke-[2.5]"
                    >
                      <motion.circle
                        cx={z.cx}
                        cy={z.cy}
                        fill={on ? s.fill : "transparent"}
                        stroke={s.color}
                        strokeOpacity={on ? 1 : 0.55}
                        strokeWidth={on ? 1.5 : 0.9}
                        strokeDasharray={on ? undefined : "3 4"}
                        initial={{ r: z.r }}
                        animate={{ r: [z.r, z.r + 5, z.r] }}
                        transition={{ duration: 4.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <circle cx={z.cx} cy={z.cy} r="3.5" fill={s.color} />
                      <circle cx={z.cx} cy={z.cy} r="7.5" fill="none" stroke={s.color} strokeOpacity="0.45" />
                      <text
                        x={z.cx + 13}
                        y={z.cy + 3}
                        fontSize="9"
                        letterSpacing="0.8"
                        fontFamily={MONO}
                        fill={on ? "#efeeea" : "#9297a0"}
                      >
                        {z.id}
                      </text>
                    </g>
                  );
                })}

                {/* Dron en patrulla */}
                <g pointerEvents="none">
                  <animateMotion dur="34s" repeatCount="indefinite" path="M60 40 C200 10 420 60 470 150 S300 340 160 300 S20 120 60 40" />
                  <circle r="9" fill="none" stroke="rgba(239,238,234,0.35)" strokeWidth="0.6">
                    <animate attributeName="r" values="5;11;5" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                  <path d="M0 -3.5 L3.5 0 L0 3.5 L-3.5 0 Z" fill="#efeeea" />
                  <text x="9" y="-6" fontSize="7.5" letterSpacing="1" fontFamily={MONO} fill="#efeeea">
                    DRN-07
                  </text>
                </g>
              </svg>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-5 py-3.5">
                {(Object.keys(riskStyle) as Risk[]).map((k) => (
                  <RiskTag key={k} risk={k} />
                ))}
                <span className="label ml-auto text-steel-500">
                  Vista demostrativa · datos ilustrativos
                </span>
              </div>
            </div>
          </div>

          {/* Panel de zona */}
          <div className="flex flex-col border-t border-line lg:col-span-4 lg:border-t-0">
            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="p-6 lg:p-7"
              aria-live="polite"
            >
              <div className="flex items-center justify-between">
                <span className="label text-steel-500">{active.id}</span>
                <RiskTag risk={active.risk} />
              </div>
              <h3 className="mt-4 font-display text-2xl leading-tight text-steel-100">
                {active.name}
              </h3>

              <dl className="mt-6 grid grid-cols-2 border-y border-line">
                <div className="py-4 pr-4">
                  <dt className="label text-steel-500">Incidentes 30d</dt>
                  <dd className="display mt-1.5 text-3xl tabular-nums">
                    <Counter key={active.id} to={active.incidents} duration={0.7} />
                  </dd>
                </div>
                <div className="border-l border-line py-4 pl-5">
                  <dt className="label text-steel-500">Tendencia</dt>
                  <dd
                    className={cn(
                      "display mt-1.5 text-3xl tabular-nums",
                      active.trend.startsWith("+") ? "!text-[#ef5f5f]" : "!text-[#4fc79a]"
                    )}
                  >
                    {active.trend}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-sm leading-relaxed text-steel-300">
                {active.notes}
              </p>
            </motion.div>

            {/* Lista de zonas */}
            <ul className="border-t border-line">
              {zones.map((z) => {
                const on = z.id === active.id;
                return (
                  <li key={z.id} className="border-b border-line last:border-b-0">
                    <button
                      onClick={() => setActive(z)}
                      aria-pressed={on}
                      className={cn(
                        "flex w-full items-center gap-3 px-6 py-2.5 text-left text-[13px] transition-colors lg:px-7",
                        on ? "bg-ink-900 text-steel-100" : "text-steel-400 hover:bg-ink-900/60 hover:text-steel-200"
                      )}
                    >
                      <span
                        className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: riskStyle[z.risk].color }}
                        aria-hidden
                      />
                      <span className="label w-9 flex-shrink-0 text-steel-500">{z.id}</span>
                      <span className="truncate">{z.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <dl className="mt-auto grid grid-cols-3 border-t border-line">
              {summary.map((s, i) => (
                <div key={s.label} className={cn("flex flex-col-reverse justify-end gap-1 px-4 py-4 lg:px-5", i > 0 && "border-l border-line")}>
                  <dt className="text-[11px] leading-tight text-steel-500">{s.label}</dt>
                  <dd className="display text-2xl tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <Button href="#contacto" variant="secondary" className="px-6 py-3.5">
          Solicitar informe completo
        </Button>
      </Reveal>
    </Section>
  );
}
