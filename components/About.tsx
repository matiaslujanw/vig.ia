import Image from "next/image";
import { Radio, ShieldCheck } from "lucide-react";
import { Gold, LiveDot, Reveal, Section, SectionHeader } from "./ui";
import { Corners } from "./fx";

const expertise: [string, string][] = [
  ["Seguridad privada", "Operativa"],
  ["Seguridad pública", "Profesional"],
  ["Ciberseguridad", "Especializada"],
  ["Monitoreo y tecnología", "Desarrollo propio"],
];

const statements = [
  {
    tag: "Visión",
    text: "Convertirnos en la empresa de seguridad privada tecnológica líder del norte argentino, integrando innovación, prevención y capacidad operativa para brindar soluciones modernas y eficientes adaptadas a los desafíos actuales de la seguridad.",
  },
  {
    tag: "Misión",
    text: "Proteger personas, bienes e infraestructura a través de soluciones de seguridad modernas, combinando experiencia operativa, innovación tecnológica y protocolos de actuación que permitan anticipar riesgos y generar tranquilidad en nuestros clientes.",
  },
];

export function About() {
  return (
    <Section id="nosotros" bare>
      <SectionHeader
        index="01"
        label="Quiénes somos"
        title={
          <>
            Una empresa tucumana de <Gold>seguridad tecnológica.</Gold>
          </>
        }
        intro="Vig.IA nace con una visión moderna, profesional y tecnológica de la protección integral. Nuestro equipo directivo y operativo reúne experiencia en seguridad privada, seguridad pública, ciberseguridad, investigación, monitoreo y desarrollo de sistemas, para transformar el modelo tradicional de vigilancia con inteligencia aplicada, análisis de riesgos y tecnología orientada a la prevención."
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          <figure className="group relative overflow-hidden rounded-lg border border-line">
            <Image
              src="/vehiculo.jpeg"
              alt="Unidad operativa y personal de Vig.IA frente a la base"
              width={1280}
              height={1024}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-[5/4] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-4" aria-hidden>
              <Corners className="border-white/50" />
            </div>
            <div className="label absolute left-8 top-7 flex items-center gap-2.5 text-steel-100">
              <LiveDot /> En servicio
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/85 to-transparent" />
            <figcaption className="label absolute bottom-7 left-8 right-8 flex items-center justify-between text-steel-200">
              <span>Unidad operativa Vig.IA</span>
              <span className="text-steel-400">Tucumán · AR</span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col lg:col-span-5">
          <div className="label text-steel-400">Áreas de expertise</div>
          <dl className="mt-5 border-t border-line">
            {expertise.map(([area, kind]) => (
              <div
                key={area}
                className="flex items-baseline justify-between gap-6 border-b border-line py-4"
              >
                <dt className="font-display text-lg text-steel-100">{area}</dt>
                <dd className="label text-gold-400">{kind}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-auto lg:pt-8">
            {[
              {
                icon: Radio,
                title: "Conectados",
                text: "Cada operativo enlazado al centro de comando 24/7.",
              },
              {
                icon: ShieldCheck,
                title: "Capacitados",
                text: "Personal formado en prevención y protocolos de actuación.",
              },
            ].map((n) => (
              <div key={n.title}>
                <n.icon className="h-5 w-5 text-gold-400" strokeWidth={1.5} />
                <div className="mt-3 text-sm font-medium text-steel-100">
                  {n.title}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-steel-400">
                  {n.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-x-14 gap-y-12 border-t border-line pt-12 md:grid-cols-2 lg:mt-24">
        {statements.map((s, i) => (
          <Reveal key={s.tag} delay={i * 0.1}>
            <div className="label text-gold-400">{s.tag}</div>
            <p className="mt-5 font-display text-xl leading-snug text-steel-200 md:text-[1.4rem]">
              {s.text}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
