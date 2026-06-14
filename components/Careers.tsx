"use client";

import { FormEvent, useState } from "react";
import { Briefcase, FileUp, Loader2, MailCheck, Send, UserCheck } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export function Careers() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    const form = event.currentTarget;
    const response = await fetch("/api/careers", {
      method: "POST",
      body: new FormData(form),
    });

    const data = (await response.json().catch(() => ({}))) as { error?: string };

    if (!response.ok) {
      setStatus("error");
      setFeedback(data.error || "No pudimos enviar el CV. Intentá nuevamente.");
      return;
    }

    form.reset();
    setStatus("sent");
    setFeedback("Recibimos tu CV. Gracias por querer sumarte a Vig.IA.");
  }

  return (
    <section
      id="equipo"
      className="relative py-32 lg:py-40 bg-ink-950/62 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-faint [background-size:70px_70px] opacity-25" />
      <div className="absolute left-0 top-1/3 w-[520px] h-[520px] bg-radial-gold opacity-45" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="inline-block px-3 py-1 rounded-full glass-gold text-[10px] uppercase tracking-[0.3em] text-gold-300 mb-5">
              Postulaciones
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-gradient-steel leading-tight">
              Sumate a
              <br />
              <span className="text-gradient-gold">nuestro equipo.</span>
            </h2>
            <p className="mt-6 text-steel-300/85 leading-relaxed">
              Buscamos personas comprometidas, responsables y con vocación de
              servicio para integrar operaciones, monitoreo y áreas técnicas.
              Cargá tu CV y lo revisamos para futuras incorporaciones.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: UserCheck, label: "Personal operativo" },
                { icon: Briefcase, label: "Administración" },
                { icon: MailCheck, label: "Monitoreo 24/7" },
                { icon: FileUp, label: "Perfiles técnicos" },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl px-4 py-3 flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="text-sm text-steel-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 glass rounded-3xl p-6 md:p-8 ring-gold"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-300">
                  Nombre completo
                </span>
                <input
                  required
                  name="name"
                  type="text"
                  className="w-full rounded-xl border border-white/10 bg-ink-900/75 px-4 py-3 text-sm text-steel-200 outline-none transition focus:border-gold-500/60"
                />
              </label>

              <label className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-300">
                  Email
                </span>
                <input
                  required
                  name="email"
                  type="email"
                  className="w-full rounded-xl border border-white/10 bg-ink-900/75 px-4 py-3 text-sm text-steel-200 outline-none transition focus:border-gold-500/60"
                />
              </label>

              <label className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-300">
                  Teléfono
                </span>
                <input
                  name="phone"
                  type="tel"
                  className="w-full rounded-xl border border-white/10 bg-ink-900/75 px-4 py-3 text-sm text-steel-200 outline-none transition focus:border-gold-500/60"
                />
              </label>

              <label className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-300">
                  Área de interés
                </span>
                <select
                  name="role"
                  className="w-full rounded-xl border border-white/10 bg-ink-900/75 px-4 py-3 text-sm text-steel-200 outline-none transition focus:border-gold-500/60"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  <option>Operaciones</option>
                  <option>Monitoreo</option>
                  <option>Tecnología</option>
                  <option>Administración</option>
                  <option>Otra área</option>
                </select>
              </label>
            </div>

            <label className="mt-4 block space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-300">
                Mensaje
              </span>
              <textarea
                name="message"
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-ink-900/75 px-4 py-3 text-sm text-steel-200 outline-none transition focus:border-gold-500/60"
              />
            </label>

            <label className="mt-4 block rounded-2xl border border-dashed border-gold-500/35 bg-ink-900/60 p-5 cursor-pointer hover:border-gold-400/70 transition">
              <span className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-steel-300">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl glass-gold">
                  <FileUp className="h-5 w-5 text-gold-400" />
                </span>
                <span>
                  <span className="block font-medium text-steel-200">
                    Adjuntar CV
                  </span>
                  <span className="text-xs text-steel-400">
                    PDF, DOC o DOCX. Máximo 8 MB.
                  </span>
                </span>
              </span>
              <input
                required
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="mt-4 block w-full text-sm text-steel-300 file:mr-4 file:rounded-full file:border-0 file:bg-gold-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-ink-950 hover:file:bg-gold-400"
              />
            </label>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-7 py-4 text-sm font-medium tracking-wide text-ink-950 shadow-glow transition hover:shadow-[0_0_60px_rgba(212,161,58,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Enviar CV
              </button>
              {feedback ? (
                <p
                  className={`text-sm ${
                    status === "error" ? "text-red-300" : "text-emerald-300"
                  }`}
                >
                  {feedback}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
