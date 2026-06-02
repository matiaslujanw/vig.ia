# Vig.IA — Seguridad con Inteligencia

Landing page premium cinematográfica para Vig.IA, construida con Next.js 14, TailwindCSS, Framer Motion y un sistema visual basado en negro mate, gris metalizado y dorado/ámbar.

## Setup

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 14** (App Router) + TypeScript
- **TailwindCSS** con paleta de marca (`ink`, `steel`, `gold`)
- **Framer Motion** para parallax, scroll animations, counters y microinteracciones
- **lucide-react** para iconografía táctica
- Fuentes Google: **Orbitron** (display futurista) + **Inter** (cuerpo)

## Estructura

- `app/` — layout, página, estilos globales
- `components/` — Navbar, Hero, Operatives, Services, Dashboard, Stats, Process, CTA, Footer, WhatsApp
- `lib/` — utilidades (`cn` para clases)

## Branding

| Token | Hex | Uso |
|---|---|---|
| `ink-950` | `#050505` | Fondo principal |
| `steel-200` | `#d5d8dc` | Texto base |
| `gold-500` | `#d4a13a` | Acento de marca |
| `gold-300` | `#f1cf6b` | Highlights |

## Secciones

1. **Hero** — drone animado, partículas, scanlines, CTAs y stats inline
2. **Operatives** — dos agentes tácticos en parallax con HUD y barras de capacidad
3. **Services** — 8 servicios en cards glassmorphism con hover gold
4. **Dashboard** — SOC con mapa táctico, gráficas, CCTV y eventos en vivo
5. **Stats** — counters animados al entrar en viewport
6. **Process** — 4 pasos de metodología
7. **CTA** — bloque de conversión con corner brackets
8. **Footer** — branding, contacto, redes
9. **WhatsApp flotante** — siempre visible

## Personalización rápida

- Teléfono / WhatsApp: buscar `5490000000000` y reemplazar
- Email: `comando@vigia.security` en `components/Footer.tsx`
- Logo SVG: `components/Logo.tsx` (gradientes `gold` y `steel`)
