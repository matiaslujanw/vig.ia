// Datos de contacto y enlaces: un único lugar para cambiarlos.
export const site = {
  name: "Vig.IA",
  tagline: "Seguridad con Inteligencia",
  phoneDisplay: "+54 9 3814 15-6775",
  phoneHref: "tel:+5493814156775",
  email: "administracion@vigiaseguridad.com.ar",
  whatsapp:
    "https://wa.me/5493814156775?text=Hola%2C%20estoy%20interesado%20en%20sus%20servicios...",
  location: "San Miguel de Tucumán · Yerba Buena, Tucumán, Argentina",
  demoUrl: "https://carta-presentacion-iota.vercel.app/",
} as const;

export const navLinks = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Ecosistema", href: "#ecosistema" },
  { label: "Tecnología", href: "#tecnologia" },
  { label: "Rastreo GPS", href: "#rastreo" },
  { label: "Riesgos", href: "#riesgos" },
  { label: "Equipo", href: "#equipo" },
] as const;
