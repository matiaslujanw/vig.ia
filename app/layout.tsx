import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Vig.IA — Seguridad con Inteligencia",
  description:
    "Empresa de seguridad privada y tecnología. Vigilancia inteligente, drones, CCTV, ciberseguridad y protección ejecutiva.",
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans bg-ink-950 text-steel-200 antialiased">
        {children}
      </body>
    </html>
  );
}
