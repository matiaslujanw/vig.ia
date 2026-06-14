"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Flame,
  Activity,
  Filter,
  Layers as LayersIcon,
} from "lucide-react";

type Risk = "critical" | "high" | "medium" | "low";

const zones: {
  id: string;
  name: string;
  cx: number;
  cy: number;
  r: number;
  risk: Risk;
  incidents: number;
  trend: string;
  notes: string;
}[] = [
  { id: "Z-01", name: "Yerba Buena · Cevil Redondo", cx: 110, cy: 200, r: 70, risk: "medium", incidents: 14, trend: "+6%", notes: "Robos a viviendas en countries y barrios cerrados sobre Av. Aconquija" },
  { id: "Z-02", name: "Centro · Microcentro SMT", cx: 310, cy: 200, r: 70, risk: "high", incidents: 32, trend: "+18%", notes: "Arrebatos y entraderas en zona bancaria de calle San Martín y 24 de Septiembre" },
  { id: "Z-03", name: "Barrio Norte · Plaza Urquiza", cx: 320, cy: 130, r: 55, risk: "medium", incidents: 12, trend: "+4%", notes: "Hurtos a comercios gastronómicos y vehículos sobre Av. Mitre" },
  { id: "Z-04", name: "Pque Industrial · Lules", cx: 100, cy: 320, r: 75, risk: "critical", incidents: 38, trend: "+24%", notes: "Intrusiones perimetrales nocturnas y robo de cargas en Ruta 38" },
  { id: "Z-05", name: "Banda del Río Salí · Alderetes", cx: 430, cy: 240, r: 70, risk: "high", incidents: 21, trend: "+11%", notes: "Asaltos en zona de acceso este y robo de cables sobre Ruta 9" },
  { id: "Z-06", name: "Tafí Viejo", cx: 250, cy: 70, r: 50, risk: "low", incidents: 5, trend: "-15%", notes: "Operación estable, vigilancia comunitaria activa" },
];

const riskColor: Record<Risk, { fill: string; stroke: string; tag: string; label: string }> = {
  critical: {
    fill: "rgba(239,68,68,0.22)",
    stroke: "rgba(239,68,68,0.85)",
    tag: "text-red-300 bg-red-500/10 border-red-500/30",
    label: "Crítico",
  },
  high: {
    fill: "rgba(212,161,58,0.22)",
    stroke: "rgba(212,161,58,0.9)",
    tag: "text-gold-300 bg-gold-500/10 border-gold-500/30",
    label: "Alto",
  },
  medium: {
    fill: "rgba(234,179,8,0.16)",
    stroke: "rgba(234,179,8,0.7)",
    tag: "text-yellow-200 bg-yellow-500/10 border-yellow-500/30",
    label: "Medio",
  },
  low: {
    fill: "rgba(16,185,129,0.16)",
    stroke: "rgba(16,185,129,0.7)",
    tag: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    label: "Bajo",
  },
};

export function RiskMap() {
  const [active, setActive] = useState(zones[1]);

  return (
    <section
      id="riesgos"
      className="relative py-32 lg:py-40 bg-ink-950/62 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-faint [background-size:80px_80px] opacity-25" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-radial-gold opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full glass-gold text-[10px] uppercase tracking-[0.3em] text-gold-300 mb-5">
              Inteligencia Territorial
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-gradient-steel leading-tight">
              Mapa de riesgos
              <br />
              <span className="text-gradient-gold">en tiempo real.</span>
            </h2>
          </div>
          <p className="text-steel-300/80 md:max-w-md leading-relaxed">
            Geolocalizamos amenazas, cruzamos datos OSINT, históricos y señales
            de campo para anticipar incidentes antes de que ocurran.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-12 gap-5"
        >
          {/* Map panel */}
          <div className="col-span-12 lg:col-span-8 glass rounded-3xl p-5 ring-gold">
            {/* toolbar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulseSoft" />
                  LIVE FEED · v.IA-net
                </div>
                <span className="text-steel-500">·</span>
                <span className="text-[10px] font-mono text-steel-400">
                  {zones.length} zonas monitoreadas
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[Filter, LayersIcon, Activity].map((I, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-gold-500/10 transition-colors"
                  >
                    <I className="w-3.5 h-3.5 text-gold-300" />
                  </button>
                ))}
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-ink-900">
              <svg
                viewBox="0 0 540 380"
                className="w-full h-auto block"
              >
                <defs>
                  <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(212,161,58,0.07)" strokeWidth="0.5" />
                  </pattern>
                  <radialGradient id="mapVignette" cx="0.5" cy="0.5" r="0.7">
                    <stop offset="60%" stopColor="transparent" />
                    <stop offset="100%" stopColor="rgba(5,5,5,0.85)" />
                  </radialGradient>
                  <filter id="zoneBlur"><feGaussianBlur stdDeviation="6" /></filter>
                </defs>

                <rect width="540" height="380" fill="#0a0a0b" />
                <rect width="540" height="380" fill="url(#mapGrid)" />

                {/* Sierras de San Javier (oeste) */}
                <path
                  d="M0 0 L0 380 L60 360 Q80 260 50 180 Q90 120 70 40 L90 0 Z"
                  fill="rgba(60,50,30,0.35)"
                  stroke="rgba(212,161,58,0.18)"
                />
                <path
                  d="M0 200 Q40 180 60 200 M0 260 Q35 245 55 265 M0 140 Q45 125 65 140"
                  stroke="rgba(212,161,58,0.18)"
                  strokeWidth="0.6"
                  fill="none"
                />
                <text x="10" y="100" fontSize="8" fontFamily="monospace" fill="rgba(212,161,58,0.5)">
                  SIERRAS DE
                </text>
                <text x="10" y="112" fontSize="8" fontFamily="monospace" fill="rgba(212,161,58,0.5)">
                  SAN JAVIER
                </text>

                {/* Río Salí (este) */}
                <path
                  d="M400 0 Q380 90 410 180 Q440 260 420 380"
                  stroke="rgba(120,180,220,0.45)"
                  strokeWidth="2"
                  fill="none"
                />
                <text x="445" y="60" fontSize="8" fontFamily="monospace" fill="rgba(120,180,220,0.55)">
                  RÍO SALÍ
                </text>

                {/* trazado urbano SMT — avenidas principales */}
                <g stroke="rgba(212,161,58,0.22)" strokeWidth="1" fill="none">
                  {/* Av. Mate de Luna (Yerba Buena → Centro) */}
                  <path d="M80 200 L320 200" />
                  {/* Av. Sarmiento / 24 de Septiembre eje N-S Centro */}
                  <path d="M310 0 L320 380" />
                  {/* Av. Aconquija (Yerba Buena) */}
                  <path d="M70 230 Q140 225 200 220" />
                  {/* Av. Mitre / Independencia */}
                  <path d="M150 0 Q200 100 280 200" />
                  {/* Ruta 9 hacia el norte (Tafí Viejo) */}
                  <path d="M250 70 Q280 150 310 200" />
                  {/* Ruta 38 hacia el sur (Lules) */}
                  <path d="M100 320 Q180 280 310 220" />
                  {/* Acceso este a Banda del Río Salí / Alderetes */}
                  <path d="M320 200 Q380 220 430 240" strokeWidth="1.2" />
                </g>

                {/* heatmap blurred fills */}
                <g filter="url(#zoneBlur)" opacity="0.85">
                  {zones.map((z) => (
                    <circle
                      key={`b-${z.id}`}
                      cx={z.cx}
                      cy={z.cy}
                      r={z.r}
                      fill={riskColor[z.risk].fill}
                    />
                  ))}
                </g>

                {/* zone rings */}
                {zones.map((z, i) => {
                  const c = riskColor[z.risk];
                  const isActive = active.id === z.id;
                  return (
                    <g
                      key={z.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => setActive(z)}
                    >
                      <motion.circle
                        cx={z.cx}
                        cy={z.cy}
                        r={z.r}
                        fill="transparent"
                        stroke={c.stroke}
                        strokeWidth={isActive ? 1.6 : 1}
                        strokeDasharray="3 4"
                        animate={{ r: [z.r, z.r + 6, z.r] }}
                        transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.circle
                        cx={z.cx}
                        cy={z.cy}
                        r="6"
                        fill={c.stroke}
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                      <circle
                        cx={z.cx}
                        cy={z.cy}
                        r="2.5"
                        fill="#ffffff"
                      />
                      <text
                        x={z.cx + 10}
                        y={z.cy - 8}
                        fontSize="9"
                        fontFamily="monospace"
                        fill={isActive ? "#f1cf6b" : "#d5d8dc"}
                        opacity={isActive ? 1 : 0.75}
                      >
                        {z.id} · {z.name}
                      </text>
                    </g>
                  );
                })}

                {/* moving drone */}
                <motion.g
                  animate={{ x: [0, 420, 0], y: [0, 60, 0] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="60" cy="40" r="3" fill="#d4a13a" />
                  <circle cx="60" cy="40" r="10" fill="transparent" stroke="rgba(212,161,58,0.4)" strokeWidth="0.6" />
                  <text x="68" y="44" fontSize="8" fontFamily="monospace" fill="#e6b94a">DRN-07</text>
                </motion.g>

                {/* sweep line */}
                <motion.line
                  x1="0"
                  x2="540"
                  y1="0"
                  y2="0"
                  stroke="rgba(212,161,58,0.5)"
                  strokeWidth="1"
                  animate={{ y1: [0, 380, 0], y2: [0, 380, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                <rect width="540" height="380" fill="url(#mapVignette)" pointerEvents="none" />
              </svg>

              {/* legend */}
              <div className="absolute left-4 bottom-4 flex flex-wrap gap-2">
                {(Object.keys(riskColor) as Risk[]).map((k) => (
                  <div
                    key={k}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] uppercase tracking-widest ${riskColor[k].tag}`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: riskColor[k].stroke }}
                    />
                    {riskColor[k].label}
                  </div>
                ))}
              </div>

              {/* corner brackets */}
              <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold-500/60" />
              <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-gold-500/60" />
              <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold-500/60" />
            </div>
          </div>

          {/* Intel panel */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-steel-400">
                  Zona seleccionada
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full border text-[10px] uppercase tracking-widest ${riskColor[active.risk].tag}`}
                >
                  {riskColor[active.risk].label}
                </span>
              </div>
              <div className="font-display text-2xl text-gradient-steel">
                {active.name}
              </div>
              <div className="text-[11px] font-mono text-gold-300 mt-1">
                {active.id} · LAT/LON cifrado
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="rounded-xl bg-ink-900 border border-white/5 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-steel-400 mb-1">
                    Incidentes 30d
                  </div>
                  <div className="font-display text-2xl text-gradient-gold">
                    {active.incidents}
                  </div>
                </div>
                <div className="rounded-xl bg-ink-900 border border-white/5 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-steel-400 mb-1">
                    Tendencia
                  </div>
                  <div
                    className={`font-display text-2xl ${active.trend.startsWith("+") ? "text-red-400" : "text-emerald-400"}`}
                  >
                    {active.trend}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-ink-900 border border-white/5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold-300 mb-1.5">
                  <AlertTriangle className="w-3 h-3" /> Brief
                </div>
                <p className="text-xs text-steel-300 leading-relaxed">
                  {active.notes}
                </p>
              </div>
            </motion.div>

            <div className="glass rounded-2xl p-6">
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold-300 mb-4">
                Resumen operativo
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  { i: Flame, l: "Zonas críticas", v: zones.filter((z) => z.risk === "critical").length },
                  { i: ShieldAlert, l: "Alertas activas", v: zones.reduce((a, z) => a + (z.risk === "high" || z.risk === "critical" ? 1 : 0), 0) },
                  { i: ShieldCheck, l: "Bajo control", v: zones.filter((z) => z.risk === "low").length },
                ].map((r) => (
                  <li key={r.l} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-steel-300">
                      <r.i className="w-3.5 h-3.5 text-gold-400" /> {r.l}
                    </span>
                    <span className="font-display text-lg text-gradient-gold">
                      {r.v}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className="mt-5 block text-center px-4 py-2.5 rounded-full glass-gold text-gold-300 text-xs uppercase tracking-[0.2em] hover:bg-gold-500/20 transition-colors"
              >
                Solicitar informe completo
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
