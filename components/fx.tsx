"use client";

import {
  animate,
  motion,
  useInView,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* ───────────── Grilla con foco que sigue al cursor ───────────── */

export function SpotGrid({
  as: Tag = "div",
  className,
  children,
}: {
  as?: "div" | "ul";
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - r.left}px`);
    el.style.setProperty("--gy", `${e.clientY - r.top}px`);
    for (const child of Array.from(el.children) as HTMLElement[]) {
      const c = child.getBoundingClientRect();
      child.style.setProperty("--mx", `${e.clientX - c.left}px`);
      child.style.setProperty("--my", `${e.clientY - c.top}px`);
    }
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--gx", "-999px");
    ref.current?.style.setProperty("--gy", "-999px");
  };

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("hairline-grid spot", className)}
    >
      {children}
    </Tag>
  );
}

/* ───────────── Contador que sube al entrar en pantalla ───────────── */

export function Counter({
  to,
  suffix = "",
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  // Arranca en el valor final: sin JS (o con movimiento reducido) se ve bien igual.
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

/* ───────────── Texto que se "descifra" ───────────── */

const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789";

export function Scramble({
  text,
  delay = 500,
  duration = 1300,
  className,
}: {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const shown = Math.floor(p * text.length);
      let s = text.slice(0, shown);
      for (let i = shown; i < text.length; i++) {
        const ch = text[i];
        s += /[a-záéíóúñ]/i.test(ch)
          ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          : ch;
      }
      setOut(s);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, delay, duration]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}

/* ───────────── Barra de progreso de lectura ───────────── */

export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  return (
    <motion.div
      style={{ scaleX }}
      className={cn("h-px origin-left bg-gold-400", className)}
      aria-hidden
    />
  );
}

/* ───────────── Marquesina ───────────── */

export function Marquee({
  items,
  reverse = false,
  className,
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <div className="flex flex-shrink-0 items-center" aria-hidden={hidden}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span
            className={cn(
              "display whitespace-nowrap px-7 text-[clamp(1.75rem,3.6vw,3rem)]",
              i % 2 ? "text-outline" : "!text-steel-100"
            )}
          >
            {item}
          </span>
          <span className="h-2 w-2 rotate-45 bg-gold-400" aria-hidden />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-line bg-ink-950 py-7",
        className
      )}
    >
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {row(false)}
        {row(true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
    </div>
  );
}

/* ───────────── Radar ───────────── */

export function Radar({ className }: { className?: string }) {
  const blips = [
    { top: "28%", left: "62%", delay: "0s" },
    { top: "60%", left: "30%", delay: "1.3s" },
    { top: "70%", left: "68%", delay: "2.4s" },
  ];
  return (
    <div className={cn("relative aspect-square rounded-full", className)} aria-hidden>
      <div className="absolute inset-0 rounded-full border border-white/20" />
      <div className="absolute inset-[18%] rounded-full border border-white/15" />
      <div className="absolute inset-[36%] rounded-full border border-white/15" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
      <div className="absolute inset-0 animate-sweep rounded-full [background:conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(226,182,85,0.55)_360deg)]" />
      {blips.map((b) => (
        <span
          key={b.delay}
          className="absolute h-1.5 w-1.5 animate-blink rounded-full bg-gold-300 shadow-[0_0_8px_2px_rgba(226,182,85,0.7)]"
          style={{ top: b.top, left: b.left, animationDelay: b.delay }}
        />
      ))}
      <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-steel-100" />
    </div>
  );
}

/* ───────────── Esquinas de visor ───────────── */

export function Corners({
  className = "border-gold-400",
  size = "h-4 w-4",
}: {
  className?: string;
  size?: string;
}) {
  const c = cn("absolute", size, className);
  return (
    <>
      <span className={cn(c, "left-0 top-0 border-l border-t")} />
      <span className={cn(c, "right-0 top-0 border-r border-t")} />
      <span className={cn(c, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(c, "bottom-0 right-0 border-b border-r")} />
    </>
  );
}

/* ───────────── Detecciones sobre una imagen ───────────── */

export type Detection = {
  label: string;
  /** Posición y tamaño en porcentaje de la imagen. */
  x: number;
  y: number;
  w: number;
  h: number;
};

export function DetectionOverlay({ items }: { items: Detection[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
      {/* barrido */}
      <div className="absolute inset-0 overflow-hidden [--scan-distance:60vh]">
        <span className="absolute inset-x-0 top-0 h-24 animate-scan bg-gradient-to-b from-transparent via-gold-400/10 to-gold-400/25 [animation-duration:7s]" />
      </div>
      {items.map((d, i) => (
        <motion.div
          key={d.label}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: `${d.w}%`, height: `${d.h}%` }}
        >
          <Corners size="h-3 w-3" />
          <span className="label absolute -top-5 left-0 whitespace-nowrap bg-ink-950/75 px-1.5 text-[9px] text-gold-300 backdrop-blur-sm">
            {d.label}
          </span>
          <span className="absolute inset-0 animate-blink border border-gold-400/25 [animation-duration:3.2s]" />
        </motion.div>
      ))}
    </div>
  );
}

/* ───────────── Anillos que se expanden ───────────── */

export function PulseRings({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute aspect-square", className)} aria-hidden>
      {[0, 1.5, 3].map((d) => (
        <span
          key={d}
          className="absolute inset-0 animate-ring rounded-full border border-gold-400/50"
          style={{ animationDelay: `${d}s` }}
        />
      ))}
    </div>
  );
}
