import {
  ArrowRight,
  Award,
  BadgeCheck,
  Handshake,
  Lightbulb,
  Scale,
  ShieldAlert,
  Target,
} from "lucide-react";
import { Gold, Reveal, Section, SectionHeader } from "./ui";
import { SpotGrid } from "./fx";

const values = [
  {
    icon: BadgeCheck,
    title: "Profesionalismo",
    desc: "Actuamos con responsabilidad, disciplina y compromiso operativo.",
  },
  {
    icon: Lightbulb,
    title: "Innovación",
    desc: "Incorporamos tecnología y herramientas modernas para mejorar la prevención y el control.",
  },
  {
    icon: Handshake,
    title: "Confianza",
    desc: "Construimos relaciones basadas en transparencia, cumplimiento y seriedad.",
  },
  {
    icon: ShieldAlert,
    title: "Prevención",
    desc: "Creemos que la seguridad eficiente comienza antes del incidente.",
  },
  {
    icon: Target,
    title: "Compromiso",
    desc: "Trabajamos para brindar respuestas rápidas y soluciones reales a cada cliente.",
  },
  {
    icon: Award,
    title: "Excelencia",
    desc: "Buscamos mejorar continuamente nuestros procesos, personal y tecnología.",
  },
  {
    icon: Scale,
    title: "Integridad",
    desc: "Actuamos con ética, respeto y confidencialidad en cada servicio.",
  },
];

export function Values() {
  return (
    <Section id="valores">
      <SectionHeader
        index="02"
        label="Nuestra esencia"
        title={
          <>
            Creados para evolucionar <Gold>la seguridad privada.</Gold>
          </>
        }
        intro="Integramos inteligencia, tecnología y presencia operativa bajo un modelo moderno, preventivo y profesional. Estos son los valores que guían cada servicio."
      />

      <Reveal>
        <SpotGrid as="ul" className="grid-cols-1 overflow-hidden rounded-lg sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <li
              key={v.title}
              className="group flex min-h-[13.5rem] flex-col p-6 transition-colors hover:!bg-ink-900 lg:p-7"
            >
              <div className="flex items-center justify-between">
                <v.icon
                  className="h-5 w-5 text-gold-400 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-125"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="label text-steel-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-auto pt-8 font-display text-xl text-steel-100">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-400">
                {v.desc}
              </p>
            </li>
          ))}
          <li className="flex min-h-[13.5rem]">
            <a
              href="#soluciones"
              className="group flex flex-1 flex-col justify-between p-6 transition-colors hover:bg-ink-900 lg:p-7"
            >
              <ArrowRight
                className="h-5 w-5 self-end text-gold-400 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
              <span className="font-display text-xl leading-snug text-gold-400">
                Cómo se traduce en soluciones
              </span>
            </a>
          </li>
        </SpotGrid>
      </Reveal>
    </Section>
  );
}
