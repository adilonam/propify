# Propify agent guide

Keep changes small and match existing patterns. Rules:

1. **NextAuth (Auth.js)** — Use the shared config in `auth.ts` (`handlers`, `auth`, `signIn`, `signOut`). Wire routes through `app/api/auth/[...nextauth]/route.ts`. Call `auth()` on the server for sessions; do not invent a parallel auth stack or duplicate providers/callbacks.

2. **Prisma** — Schema lives in `prisma/schema.prisma`; client is generated to `generated/prisma`. Always import the singleton from `@/lib/prisma` — never construct a new `PrismaClient` in app code. Change the schema with migrations; do not hand-edit generated client output.

3. **Small files, one concern** — Prefer focused modules and components over large monoliths. One primary concern per file (page shell, client form, API route, data helper). Split when a file starts mixing UI, data access, and business logic.

4. **Server / client boundaries** — Default to Server Components. Add `"use client"` only for interactivity. Keep Prisma, secrets, and `auth()` on the server (Route Handlers / Server Components); client code talks to existing `app/api/*` routes — do not invent new API shapes outside those patterns.

5. **Color palette (site-wide default)** — Landing and product UI share one dark navy / blue system. Tokens live in `app/globals.css` `:root`:

| Role | Token | Hex / value |
|------|--------|-------------|
| Primary background | `--bg-main` / `--landing-bg` / `--skyline-bg` | `#010207` |
| Secondary background | `--bg-gradient-dark` | `#050811` |
| Dark navy / surface | `--dark-navy` / `--landing-surface` | `#020A17` |
| Card | `--card-bg` / `--landing-card` | `#141823` |
| Card border | `--card-border` / `--landing-border` | `#29384D` |
| Primary blue | `--primary-blue` | `#0086FA` |
| Bright blue | `--electric-blue` | `#12B9FB` |
| Blue glow | `--blue-glow` / `--landing-glow` | `#1F8FE8` |
| Deep blue | `--deep-blue` / `--landing-glow-deep` | `#001125` |
| Primary text | `--text-white` | `#FFFFFF` |
| Secondary / body text | `--text-main` | `#C3D7E3` |
| Muted text | `--text-muted` | `#8A98A8` |
| Gold (stars, ratings) | `--landing-gold` | `#f5c542` |
| Ink on light CTAs | `--landing-ink` | `#010207` |

Prefer these CSS variables (or matching hexes) for new UI. Do not introduce purple-on-white or cream/terracotta themes.

6. **Cursor glow (site-wide)** — The site uses a global soft blue cursor glow (`CursorGlow` in `app/layout.tsx` / `components/effects/cursor-glow.tsx`). It follows the pointer with `--landing-glow` / `--landing-glow-deep`, respects `prefers-reduced-motion`, and stays off for coarse/touch pointers. New pages and sections must not remove it or cover it with opaque full-viewport overlays that kill the effect unless intentional. Prefer `pointer-events` / stacking (`z-index`) that keeps the glow visible above backgrounds without blocking clicks. Do not replace it with unrelated neon/rainbow effects.

- dont create type of models of db always import them from prisma client