"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Logo({
  className = "h-12 md:h-14 w-auto",
}: {
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex items-center"
    >
      <Image
        src="/VIGIA_logo_transparente.png"
        alt="Vig.IA — Seguridad con Inteligencia"
        width={1254}
        height={1254}
        priority
        className={`${className} object-contain drop-shadow-[0_0_18px_rgba(212,161,58,0.25)]`}
      />
    </motion.div>
  );
}
