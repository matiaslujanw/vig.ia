import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Vig.IA — Seguridad con Inteligencia",
  description:
    "Empresa de seguridad privada y tecnología. Vigilancia inteligente, drones, CCTV, rastreo satelital GPS de flotas, ciberseguridad y protección ejecutiva.",
};

export const viewport: Viewport = {
  themeColor: "#07080a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${archivo.variable} ${mono.variable}`}
    >
      <body className="font-sans bg-ink-950 text-steel-200 antialiased">
        {children}
      </body>
    </html>
  );
}
