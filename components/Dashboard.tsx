import Image from "next/image";
import { AlertTriangle, Camera, Plane, Signal } from "lucide-react";
import { Eyebrow, Gold, LiveDot, Reveal, Section } from "./ui";
import { DetectionOverlay, type Detection } from "./fx";

// Recuadros ilustrativos sobre la foto del centro de monitoreo
const detections: Detection[] = [
  { label: "Video wall", x: 31, y: 9, w: 40.5, h: 29 },
  { label: "Operador 01", x: 6, y: 34, w: 33, h: 60 },
  { label: "Operador 02", x: 49, y: 38, w: 19, h: 38 },
  { label: "Dron en base", x: 80, y: 61, w: 19, h: 15 },
];

const capabilities = [
  { icon: Signal, title: "Telemetría", value: "En tiempo real" },
  { icon: Camera, title: "Cámaras + IA", value: "CCTV integrado" },
  { icon: Plane, title: "Drones", value: "Patrullaje aéreo" },
  { icon: AlertTriangle, title: "Alertas", value: "Respuesta inmediata" },
];

export function Dashboard() {
  return (
    <Section id="tecnologia">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
        <Reveal className="lg:col-span-5">
          <Eyebrow index="05">Centro de comando</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.6rem)]">
            Monitoreo inteligente <Gold>en tiempo real.</Gold>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-steel-300">
            Nuestro centro de monitoreo integra cámaras, drones y equipos en
            terreno bajo protocolos de respuesta definidos. Detección temprana,
            seguimiento operativo y visibilidad total de cada servicio para
            anticipar riesgos y actuar al instante.
          </p>

          <dl className="mt-9 grid grid-cols-2 border-t border-line">
            {capabilities.map((c, i) => (
              <div
                key={c.title}
                className={`border-b border-line py-5 ${
                  i % 2 ? "border-l pl-6" : "pr-6"
                }`}
              >
                <c.icon className="h-5 w-5 text-gold-400" strokeWidth={1.5} aria-hidden />
                <dt className="label mt-4 text-steel-500">{c.title}</dt>
                <dd className="mt-1 text-[15px] font-medium text-steel-100">
                  {c.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <figure className="relative overflow-hidden rounded-lg border border-line">
            <Image
              src="/computo.jpeg"
              alt="Centro de monitoreo de Vig.IA: operadores, video wall y drones"
              width={1170}
              height={962}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-[6/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/30" />
            <DetectionOverlay items={detections} />
            <div className="label absolute left-5 top-4 flex items-center gap-2.5 text-steel-100">
              <LiveDot /> Centro de monitoreo
            </div>
            <figcaption className="label absolute bottom-4 left-5 right-5 flex items-center justify-between text-steel-300">
              <span>Prevenimos · Controlamos · Protegemos</span>
              <span className="hidden text-steel-400 sm:block">24/7</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
