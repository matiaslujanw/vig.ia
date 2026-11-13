"use client";

import { FormEvent, useState } from "react";
import { FileUp, Loader2 } from "lucide-react";
import { EmailText, Eyebrow, Gold, Reveal, Section } from "./ui";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const areas = [
  "Personal operativo",
  "Administración",
  "Monitoreo 24/7",
  "Perfiles técnicos",
];

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="label mb-2 block text-steel-400">{label}</span>
      {children}
    </label>
  );
}

export function Careers() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [fileName, setFileName] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    const form = event.currentTarget;
    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        body: new FormData(form),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setFeedback(data.error || "No pudimos enviar el CV. Intentá nuevamente.");
        return;
      }

      form.reset();
      setFileName("");
      setStatus("sent");
      setFeedback("Recibimos tu CV. Gracias por querer sumarte a Vig.IA.");
    } catch {
      setStatus("error");
      setFeedback("No pudimos enviar el CV. Revisá tu conexión e intentá nuevamente.");
    }
  }

  return (
    <Section id="equipo">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <Eyebrow index="09">Postulaciones</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.6rem)]">
            Sumate a <Gold>nuestro equipo.</Gold>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-steel-300">
            Buscamos personas comprometidas, responsables y con vocación de
            servicio para integrar operaciones, monitoreo y áreas técnicas.
            Cargá tu CV y lo revisamos para futuras incorporaciones.
          </p>

          <ul className="mt-9 border-t border-line">
            {areas.map((a, i) => (
              <li
                key={a}
                className="flex items-baseline gap-4 border-b border-line py-3.5 text-[15px] text-steel-200"
              >
                <span className="label text-steel-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {a}
              </li>
            ))}
          </ul>

          <p className="mt-7 text-sm leading-relaxed text-steel-400">
            También podés enviarnos tu CV directamente a{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-gold-400 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-gold-200"
            >
              <EmailText email={site.email} />
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-line bg-ink-900 p-6 md:p-9"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Nombre completo">
                <input required name="name" type="text" autoComplete="name" className="field" />
              </Field>
              <Field label="Email">
                <input required name="email" type="email" autoComplete="email" className="field" />
              </Field>
              <Field label="Teléfono">
                <input name="phone" type="tel" autoComplete="tel" className="field" />
              </Field>
              <Field label="Área de interés">
                <select name="role" defaultValue="" className="field appearance-none">
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  <option>Operaciones</option>
                  <option>Monitoreo</option>
                  <option>Tecnología</option>
                  <option>Administración</option>
                  <option>Otra área</option>
                </select>
              </Field>
              <Field label="Mensaje" className="md:col-span-2">
                <textarea name="message" rows={4} className="field resize-none" />
              </Field>
            </div>

            <label className="group relative mt-5 flex cursor-pointer items-center gap-4 rounded-md border border-dashed border-white/20 px-5 py-4 transition-colors focus-within:border-gold-500 hover:border-gold-500/70">
              <FileUp className="h-5 w-5 flex-shrink-0 text-gold-400" strokeWidth={1.5} aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-steel-100">
                  {fileName || "Adjuntar CV"}
                </span>
                <span className="block text-xs text-steel-500">
                  PDF, DOC o DOCX. Máximo 8 MB.
                </span>
              </span>
              <span className="label hidden text-gold-400 sm:block">
                {fileName ? "Cambiar" : "Elegir archivo"}
              </span>
              <input
                required
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2.5 rounded-md bg-gold-500 px-6 py-3.5 text-sm font-medium text-ink-950 transition-colors hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
                {status === "sending" ? "Enviando…" : "Enviar CV"}
              </button>
              <p
                role="status"
                className={cn(
                  "text-sm",
                  status === "error" ? "text-[#ef8a8a]" : "text-emerald-300"
                )}
              >
                {feedback}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
