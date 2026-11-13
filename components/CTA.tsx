import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { EmailText, Eyebrow, Gold, Reveal, Section } from "./ui";
import { site } from "@/lib/site";
import { PulseRings } from "./fx";

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Solicitar evaluación",
    href: site.whatsapp,
    external: true,
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: site.phoneDisplay,
    href: site.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
];

export function CTA() {
  return (
    <Section
      id="contacto"
      className="overflow-hidden bg-ink-900"
      backdrop={
        <>
          <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b" aria-hidden />
          <PulseRings className="-right-40 top-1/2 w-[46rem] -translate-y-1/2 max-lg:hidden" />
          <div
            className="pointer-events-none absolute -bottom-56 left-1/2 h-[30rem] w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-gold-500/[0.09] blur-3xl"
            aria-hidden
          />
        </>
      }
    >

      <div className="relative grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <Eyebrow index="10">Próximo paso</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2.4rem,6.4vw,5.5rem)] leading-[0.96]">
            ¿Listo para operar <Gold>con inteligencia?</Gold>
          </h2>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-steel-300 md:text-lg">
            Coordinemos una evaluación de seguridad sin costo. Nuestro equipo
            arma una propuesta táctica integral en menos de 48 horas.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <ul className="border-t border-white/15">
            {channels.map((c, i) => (
              <li key={c.label} className="border-b border-white/15">
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-5 py-5 transition-colors"
                >
                  <c.icon
                    className="h-5 w-5 flex-shrink-0 text-gold-400"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="label block text-steel-500">{c.label}</span>
                    <span
                      className={`mt-1 block font-display text-steel-100 transition-colors group-hover:text-gold-300 ${
                        i === 2 ? "text-base sm:text-lg" : "text-xl"
                      }`}
                    >
                      {i === 2 ? <EmailText email={c.value} /> : c.value}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-steel-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-400" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
