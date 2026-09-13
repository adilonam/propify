# Propify agent guide

Keep changes small and match existing patterns. Rules:

1. **NextAuth (Auth.js)** — Use the shared config in `auth.ts` (`handlers`, `auth`, `signIn`, `signOut`). Wire routes through `app/api/auth/[...nextauth]/route.ts`. Call `auth()` on the server for sessions; do not invent a parallel auth stack or duplicate providers/callbacks.

2. **Prisma** — Schema lives in `prisma/schema.prisma`; client is generated to `generated/prisma`. Always import the singleton from `@/lib/prisma` — never construct a new `PrismaClient` in app code. Change the schema with migrations; do not hand-edit generated client output.

3. **Small files, one concern** — Prefer focused modules and components over large monoliths. One primary concern per file (page shell, client form, API route, data helper). Split when a file starts mixing UI, data access, and business logic.

4. **Server / client boundaries** — Default to Server Components. Add `"use client"` only for interactivity. Keep Prisma, secrets, and `auth()` on the server (Route Handlers / Server Components); client code talks to existing `app/api/*` routes — do not invent new API shapes outside those patterns.

5. **Color palette (landing)** — New marketing/landing sections use the dark purple-black look (platforms-trust / skyline), not purple-on-white or cream/terracotta themes. Tokens live in `app/globals.css` `:root`:

| Role | Token | Hex / value |
|------|--------|-------------|
| Page / hero bg | `--skyline-bg` | `#05020c` |
| Section bg | `--landing-bg` | `#05030a` |
| Surface / deep card | `--landing-surface` | `#0a0a0f` |
| Card | `--landing-card` | `#121216` |
| Primary text | `--text-white` | `#ffffff` |
| Body / soft text | `--text-main` / `--text-muted` | `#f3f6ff` / `#9ca8ba` |
| Gold (stars, ratings) | `--landing-gold` | `#f5c542` |
| Purple glow | `--landing-purple` / `--landing-purple-deep` | `#6d28d9` / `#581c87` |
| Borders | `--landing-border` / `--landing-border-subtle` | `rgba(255,255,255,0.08)` / `0.04` |
| Ink on light CTAs | `--landing-ink` | `#0a0612` |

Prefer these CSS variables (or matching hexes) for new landing UI. Keep the existing blue product tokens (`--primary-blue`, `--card-bg`, etc.) for non-landing surfaces that already use them.

6. **Cursor glow (site-wide)** — The site uses a global soft purple cursor glow (`CursorGlow` in `app/layout.tsx` / `components/effects/cursor-glow.tsx`). It follows the pointer with `--landing-purple` / `--landing-purple-deep`, respects `prefers-reduced-motion`, and stays off for coarse/touch pointers. New pages and sections must not remove it or cover it with opaque full-viewport overlays that kill the effect unless intentional. Prefer `pointer-events` / stacking (`z-index`) that keeps the glow visible above backgrounds without blocking clicks. Do not replace it with unrelated neon/rainbow effects.

- dont create type of models of db always import them from prisma client