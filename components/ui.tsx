"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Aparición suave al entrar en pantalla. Una sola vez, sin rebotes. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  children,
  className,
  bare = false,
  backdrop,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Decoración de fondo, a todo el ancho de la sección. */
  backdrop?: ReactNode;
  /** Sin filete superior (para secciones que ya traen el suyo). */
  bare?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 lg:py-32",
        !bare && "border-t border-line",
        className
      )}
    >
      {backdrop}
      <div className="relative mx-auto max-w-site px-6 lg:px-10">{children}</div>
    </section>
  );
}

/** Etiqueta de sección: índice + nombre, en monoespaciada. */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("label flex items-center gap-3 text-steel-400", className)}>
      {index && <span className="text-gold-400">{index}</span>}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease }}
        className="h-px w-8 origin-left bg-gold-500/70"
        aria-hidden
      />
      <span>{children}</span>
    </div>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  intro,
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-14 grid grid-cols-1 gap-x-12 gap-y-6 lg:mb-20 lg:grid-cols-12 lg:items-end",
        className
      )}
    >
      <div className="lg:col-span-7">
        <Eyebrow index={index}>{label}</Eyebrow>
        <motion.h2
          initial={{ filter: "blur(12px)", opacity: 0.3 }}
          whileInView={{ filter: "blur(0px)", opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease }}
          className="display mt-6 text-[clamp(2rem,4.4vw,3.6rem)]"
        >
          {title}
        </motion.h2>
      </div>
      {intro && (
        <p className="max-w-xl text-base leading-relaxed text-steel-300 lg:col-span-5 lg:pb-1.5">
          {intro}
        </p>
      )}
    </Reveal>
  );
}

/** Palabra o frase destacada en dorado, con brillo, dentro de un titular. */
export function Gold({ children }: { children: ReactNode }) {
  return <span className="gold-shimmer">{children}</span>;
}

type ButtonProps = ComponentProps<"a"> & {
  variant?: "primary" | "secondary" | "ghost";
  arrow?: "right" | "up" | false;
};

export function Button({
  variant = "primary",
  arrow = "right",
  className,
  children,
  ...props
}: ButtonProps) {
  const Arrow = arrow === "up" ? ArrowUpRight : ArrowRight;
  return (
    <a
      {...props}
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-md px-5 py-3 text-sm font-medium transition-colors",
        variant === "primary" &&
          "shine bg-gold-500 text-ink-950 shadow-[0_0_0_0_rgba(226,182,85,0)] transition-[background-color,box-shadow] duration-300 hover:bg-gold-300 hover:shadow-[0_0_36px_-6px_rgba(226,182,85,0.75)]",
        variant === "secondary" &&
          "border border-white/15 text-steel-100 hover:border-white/35 hover:bg-white/[0.04]",
        variant === "ghost" && "px-0 text-gold-400 hover:text-gold-200",
        className
      )}
    >
      <span className="relative">{children}</span>
      {arrow && (
        <Arrow
          className={cn(
            "relative h-4 w-4 transition-transform duration-300",
            arrow === "up"
              ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              : "group-hover:translate-x-1"
          )}
        />
      )}
    </a>
  );
}

/** Punto de estado "en vivo". */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex h-1.5 w-1.5", className)} aria-hidden>
      <span className="absolute inset-0 animate-blink rounded-full bg-emerald-400" />
    </span>
  );
}

/** Email que, si no entra en una línea, corta solo después de la arroba. */
export function EmailText({ email }: { email: string }) {
  const [user, domain] = email.split("@");
  return (
    <>
      {user}@<wbr />
      {domain}
    </>
  );
}
