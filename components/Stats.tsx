"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setV(latest),
    });
    return () => controls.stop();
  }, [inView, to, mv]);

  const display = to >= 100 ? Math.round(v) : v.toFixed(to % 1 ? 2 : 0);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const stats: { n?: number; s?: string; str?: string; l: string }[] = [
  { str: "24/7", l: "Monitoreo y respuesta" },
  { n: 6, s: "", l: "Soluciones integrales" },
  { str: "NOA", l: "Cobertura regional" },
  { str: "100%", l: "Soluciones a medida" },
];

export function Stats() {
  return (
    <section className="relative py-24 bg-ink-950 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-faint [background-size:50px_50px] opacity-20" />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[2px] divider-gold" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-ink-900 px-6 py-10 text-center relative group"
            >
              <div className="font-display text-4xl md:text-5xl text-gradient-gold">
                {s.str ? s.str : <Counter to={s.n!} suffix={s.s} />}
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-steel-400">
                {s.l}
              </div>
              <div className="absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
