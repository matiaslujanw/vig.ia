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

// URL pública del sitio: definir NEXT_PUBLIC_SITE_URL en producción.
// En Vercel, si no está, se usa el dominio de producción del proyecto.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Vig.IA — Seguridad con Inteligencia";
const description =
  "Empresa de seguridad privada y tecnología. Vigilancia inteligente, drones, CCTV, rastreo satelital GPS de flotas, ciberseguridad y protección ejecutiva.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  // La imagen de portada sale de app/opengraph-image.jpg
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Vig.IA",
    url: "/",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
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
