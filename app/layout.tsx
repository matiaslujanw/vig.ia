import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

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
    <html lang="es" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="font-sans bg-ink-950 text-steel-200 antialiased">
        {children}
      </body>
    </html>
  );
}
