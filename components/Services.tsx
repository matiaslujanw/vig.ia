import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  FileSearch,
  HardHat,
  Home,
  Radar,
  Satellite,
  Tractor,
  type LucideIcon,
} from "lucide-react";
import { Gold, Reveal, Section, SectionHeader } from "./ui";
import { site } from "@/lib/site";
import { SpotGrid } from "./fx";

const offerings = [
  "Seguridad presencial profesional",
  "Monitoreo remoto 24/7",
  "Integración de cámaras y alarmas",
  "Control de accesos",
  "Tecnología aplicada a la prevención",
  "Drones y vigilancia perimetral",
  "Rastreo satelital GPS de flotas",
  "Informes y seguimiento operativo",
  "Soluciones personalizadas según el riesgo",
];

const solutions: {
  icon: LucideIcon;
  title: string;
  desc: string;
  href?: string;
}[] = [
  {
    icon: Building2,
    title: "Empresas y comercios",
    desc: "Control de accesos, monitoreo y prevención de pérdidas.",
  },
  {
    icon: Tractor,
    title: "Seguridad rural",
    desc: "Monitoreo de fincas, campos y predios extensos.",
  },
  {
    icon: HardHat,
    title: "Obras e industrias",
    desc: "Vigilancia operativa y control perimetral.",
  },
  {
    icon: Radar,
    title: "Monitoreo inteligente",
    desc: "Seguimiento en tiempo real mediante tecnología y protocolos de respuesta.",
  },
  {
    icon: Satellite,
    title: "Rastreo satelital GPS",
    desc: "Control de vehículos y flotas en tiempo real, con alertas, geocercas y reportes.",
    href: "#rastreo",
  },
  {
    icon: FileSearch,
    title: "Consultoría y análisis de riesgo",
    desc: "Diagnóstico y planificación estratégica de seguridad.",
  },
];

export function Services() {
  return (
    <Section id="soluciones">
      <SectionHeader
        index="03"
        label="Soluciones"
        title={
          <>
            ¿Qué hace diferente <Gold>a Vig.IA?</Gold>
          </>
        }
        intro="Combinamos seguridad física, monitoreo inteligente y tecnología aplicada en un único sistema integral, que brinda prevención, control y capacidad de respuesta adaptada a cada cliente."
      />

      {/* Qué ofrecemos */}
      <Reveal className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
        <div className="label text-steel-400 lg:col-span-3 lg:pt-4">
          Ofrecemos
        </div>
        <ul className="grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:col-span-9 lg:grid-cols-3">
          {offerings.map((o, i) => (
            <li
              key={o}
              className="flex items-baseline gap-4 border-b border-line py-4 text-[15px] text-steel-200"
            >
              <span className="label text-steel-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              {o}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Soluciones por segmento */}
      <Reveal className="mt-16 lg:mt-20">
        <SpotGrid className="grid-cols-1 overflow-hidden rounded-lg md:grid-cols-2 lg:grid-cols-3">
          {/* Destacado: consorcios, con demo */}
          <a
            href={site.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-[15rem] flex-col justify-between overflow-hidden !bg-ink-900 p-7 md:col-span-2 lg:p-9"
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-60"
              aria-hidden
            />
            <div className="relative flex items-center justify-between">
              <Home className="h-6 w-6 text-gold-400" strokeWidth={1.5} aria-hidden />
              <span className="label rounded-full border border-gold-500/40 px-3 py-1 text-gold-300">
                Demo disponible
              </span>
            </div>
            <div className="relative mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="font-display text-2xl text-steel-100 md:text-3xl">
                  Residencial y consorcios
                </h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-steel-300">
                  Protección integral para edificios, barrios y complejos.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gold-400">
                Abrir la demo
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </a>

          {solutions.map((s) => (
            <a
              key={s.title}
              href={s.href ?? "#contacto"}
              className="group flex min-h-[15rem] flex-col p-7 transition-colors hover:!bg-ink-900"
            >
              <div className="flex items-center justify-between">
                <s.icon className="h-6 w-6 text-gold-400 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-125" strokeWidth={1.5} aria-hidden />
                <ArrowRight className="h-4 w-4 -translate-x-1 text-steel-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-gold-400 group-hover:opacity-100" />
              </div>
              <h3 className="mt-auto pt-10 font-display text-xl text-steel-100">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-400">
                {s.desc}
              </p>
            </a>
          ))}

          <a
            href="#contacto"
            className="group flex min-h-[15rem] flex-col justify-between p-7 transition-colors hover:!bg-ink-900 md:col-span-2 lg:col-span-1"
          >
            <span className="label text-steel-500">A medida</span>
            <span>
              <span className="block font-display text-xl leading-snug text-gold-400">
                ¿Otro escenario? Diseñamos la solución según tu riesgo.
              </span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-steel-300">
                Hablemos
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </span>
          </a>
        </SpotGrid>
      </Reveal>
    </Section>
  );
}
