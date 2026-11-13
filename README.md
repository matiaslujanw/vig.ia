# Vig.IA — Seguridad con Inteligencia

Landing de Vig.IA, construida con Next.js 14, TailwindCSS y Framer Motion. Sistema visual sobrio: negro en capas, superficies planas con filetes finos, dorado de marca como único acento y tipografía técnica.

## Setup

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 14** (App Router) + TypeScript
- **TailwindCSS** con paleta de marca (`ink`, `steel`, `gold`)
- **Framer Motion** para apariciones al hacer scroll y las vistas interactivas
- **lucide-react** para iconografía
- Fuentes Google: **Archivo** (titulares, levemente expandida), **Inter** (cuerpo), **JetBrains Mono** (etiquetas)

## Estructura

- `app/` — layout, página, estilos globales (`globals.css` define `.display`, `.label`, `.surface`, `.hairline-grid`, `.field`)
- `components/ui.tsx` — piezas compartidas: `Section`, `SectionHeader`, `Eyebrow`, `Reveal`, `Button`, `Gold`, `LiveDot`
- `components/fx.tsx` — efectos: `SpotGrid` (foco que sigue al cursor), `Counter`, `Scramble`, `Marquee`, `Radar`, `DetectionOverlay`, `PulseRings`, `ScrollProgress`
- `components/` — una sección por archivo
- `lib/site.ts` — teléfono, WhatsApp, email, URL de la demo y links del menú

## Secciones

1. **Hero** — video aéreo, titular, CTAs e indicadores
2. **About** (`#nosotros`) — quiénes somos, áreas de expertise, visión y misión
3. **Values** (`#valores`) — los 7 valores
4. **Services** (`#soluciones`) — qué ofrecemos y soluciones por segmento
5. **Ecosystem** (`#ecosistema`) — ecosistema digital para consorcios, con vista interactiva y acceso a la demo
6. **Dashboard** (`#tecnologia`) — centro de comando
7. **Tracking** (`#rastreo`) — rastreo satelital GPS, explorador de funciones
8. **RiskMap** (`#riesgos`) — mapa de riesgos interactivo (datos ilustrativos)
9. **Process** (`#operacion`) — metodología en 4 pasos
10. **Careers** (`#equipo`) — postulaciones con envío de CV (`/api/careers`, requiere `RESEND_API_KEY`)
11. **CTA** (`#contacto`) + **Footer** + **WhatsApp flotante**

## Personalización rápida

- URL pública (para la vista previa al compartir el link): variable `NEXT_PUBLIC_SITE_URL`, por ejemplo `https://tudominio.com.ar`. En Vercel, si falta, se usa el dominio de producción del proyecto
- Imagen al compartir: `app/opengraph-image.jpg` y `app/twitter-image.jpg` (1200×630)
- Video del hero: `public/drone-security-footage.mp4` y su portada `public/hero-poster.jpg`. Si se cambia por uno sin franjas ni marca de agua, quitar la escala en `components/Hero.tsx`

- Teléfono, WhatsApp, email y URL de la demo: `lib/site.ts`
- Colores y tipografías: `tailwind.config.ts` y `app/layout.tsx`
- Logos: `public/vigia-wordmark.png` (navbar) y `public/VIGIA_logo_transparente.png` (footer)
