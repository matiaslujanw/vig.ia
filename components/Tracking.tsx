"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Route,
  PlayCircle,
  BellRing,
  MapPinned,
  Navigation,
  FileSpreadsheet,
  Wrench,
  PowerOff,
  Share2,
  Smartphone,
  Database,
  Check,
  ArrowRight,
} from "lucide-react";

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

export function Tracking() {
  return (
    <section
      id="rastreo"
      className="relative py-32 lg:py-40 bg-ink-950/62 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-faint [background-size:60px_60px] opacity-25" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-radial-gold opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full glass-gold text-[10px] uppercase tracking-[0.3em] text-gold-300 mb-5">
            Rastreo satelital GPS
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-gradient-steel leading-tight">
            Controlá tus vehículos
            <br />
            <span className="text-gradient-gold">desde cualquier lugar.</span>
          </h2>
          <p className="mt-6 text-steel-300/80 leading-relaxed">
            Tené el control de tu flota las 24 horas desde una computadora,
            celular o tablet. Una plataforma online que brinda seguridad,
            información y herramientas de gestión en tiempo real.
          </p>
        </motion.div>

        {/* Capacidades de la plataforma */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-2xl p-6 overflow-hidden hover:ring-gold transition-all"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gold-500/0 group-hover:bg-gold-500/10 blur-2xl transition-all duration-500" />

              <div className="relative w-12 h-12 rounded-xl glass-gold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <f.icon className="w-5 h-5 text-gold-400" />
              </div>
              <h3 className="relative font-display text-lg text-steel-200 mb-3 leading-snug">
                {f.title}
              </h3>
              <ul className="relative space-y-2">
                {f.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-2.5 text-sm text-steel-400 leading-relaxed"
                  >
                    <span className="mt-[7px] flex-shrink-0 w-1 h-1 rounded-full bg-gold-500" />
                    {it}
                  </li>
                ))}
              </ul>

              {/* corner accents */}
              <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold-500/40" />
              <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold-500/40" />
            </motion.div>
          ))}
        </div>

        {/* Beneficios + acceso */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-2xl p-7 md:p-8"
          >
            <div className="text-xs uppercase tracking-[0.25em] text-gold-300 mb-5">
              Beneficios del servicio
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
              {benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm text-steel-300"
                >
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-md glass-gold flex items-center justify-center">
                    <Check className="w-3 h-3 text-gold-400" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-5 flex flex-col"
          >
            <div className="grid grid-cols-1 gap-3">
              {extras.map((e) => (
                <div
                  key={e.title}
                  className="glass rounded-xl px-5 py-4 flex items-start gap-4"
                >
                  <e.icon className="w-4 h-4 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-steel-400 mb-1">
                      {e.title}
                    </div>
                    <div className="text-sm text-steel-300 leading-relaxed">
                      {e.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full glass-gold text-gold-300 text-sm uppercase tracking-[0.15em] hover:bg-gold-500/20 transition-all"
            >
              Solicitar el servicio de rastreo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
