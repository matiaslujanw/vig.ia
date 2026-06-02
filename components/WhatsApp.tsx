"use client";

import { motion } from "framer-motion";

export function WhatsApp() {
  return (
    <motion.a
      href="https://wa.me/5493810000000"
      target="_blank"
      rel="noopener"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-[0_10px_40px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.5 14.4c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.5-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12 2C6.48 2 2 6.48 2 12c0 1.93.55 3.74 1.5 5.27L2 22l4.85-1.47A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      </span>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full glass text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Escribinos por WhatsApp
      </span>
    </motion.a>
  );
}
