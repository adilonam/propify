---
description: "Use when working in this Next.js App Router, Prisma, and Tailwind project. Covers TypeScript, server components, shadcn/ui, pnpm, and minimal non-breaking changes."
---

# Propify Project Guidelines

- Use Next.js App Router with TypeScript for all new code.
- Prefer server components by default; add `use client` only when interactivity requires it.
- Prefer shadcn/ui and Tailwind for UI work; keep the existing design language consistent.
- Keep changes minimal, readable, and non-breaking.
- Keep strict typing; avoid `any` unless there is no reasonable alternative.
- Use `pnpm` for package management and project scripts.
- For database changes, use Prisma migrations and `prisma generate` instead of editing generated client files.
- Preserve the existing import alias style with `@/`.
- when import a model type import it from prisma client, not from the generated types file. This ensures we get the correct types that reflect the current database schema.
- for crud operaitons of models always read schema of prisma