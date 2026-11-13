import Image from "next/image";
import { cn } from "@/lib/utils";

/** Logotipo tipográfico (recorte del isologo original) para navbar y footer. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Image
      src="/vigia-wordmark.png"
      alt="Vig.IA"
      width={940}
      height={226}
      priority
      className={cn("h-6 w-auto", className)}
    />
  );
}

/** Isologo completo: dron + logotipo + bajada. */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/VIGIA_logo_transparente.png"
      alt="Vig.IA — Seguridad con Inteligencia"
      width={1254}
      height={1254}
      className={cn("h-28 w-auto object-contain", className)}
    />
  );
}
