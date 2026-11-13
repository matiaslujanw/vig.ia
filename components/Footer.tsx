import { Instagram, Linkedin } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks, site } from "@/lib/site";
import { EmailText } from "./ui";

const solutions = [
  { label: "Residencial y consorcios", href: "#ecosistema" },
  { label: "Empresas y comercios", href: "#soluciones" },
  { label: "Seguridad rural", href: "#soluciones" },
  { label: "Obras e industrias", href: "#soluciones" },
  { label: "Monitoreo inteligente", href: "#tecnologia" },
  { label: "Rastreo satelital GPS", href: "#rastreo" },
];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="label text-steel-500">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm text-steel-300">{children}</ul>
    </div>
  );
}

const link = "transition-colors hover:text-gold-300";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="mx-auto max-w-site px-6 pb-10 pt-16 lg:px-10 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="-mb-3 -ml-5 -mt-8 h-44" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-steel-400">
              Empresa tucumana de seguridad privada que integra seguridad
              física, monitoreo inteligente y tecnología aplicada en un único
              sistema integral. Prevención, control y respuesta a la medida de
              cada cliente.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-steel-300 transition-colors hover:border-gold-500/50 hover:text-gold-300"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-[1fr_1.15fr_1.6fr]">
            <Column title="Navegación">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </Column>
            <Column title="Soluciones">
              {solutions.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className={link}>
                    {s.label}
                  </a>
                </li>
              ))}
            </Column>
            <div className="col-span-2 md:col-span-1">
              <Column title="Contacto">
                <li>
                  <a href={site.phoneHref} className={link}>
                    {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className={link}>
                    <EmailText email={site.email} />
                  </a>
                </li>
                <li className="text-steel-400">{site.location}</li>
              </Column>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-line pt-7 text-xs text-steel-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Vig.IA — Seguridad con Inteligencia.
            Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className={link}>Privacidad</a>
            <a href="#" className={link}>Términos</a>
            <a href="#" className={link}>Habilitaciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
