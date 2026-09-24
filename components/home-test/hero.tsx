import Link from "next/link"

import { LandingNav } from "@/components/layout/landing-nav"

export function HomeTestHero() {
  return (
    <>
      <LandingNav />

      <section
        id="accueil"
        className="relative overflow-hidden bg-[var(--landing-bg)] text-white"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 42%, color-mix(in srgb, var(--landing-glow) 28%, transparent) 0%, color-mix(in srgb, var(--landing-glow-deep) 55%, transparent) 42%, transparent 72%)",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pb-20 pt-16 text-center md:px-8 md:pb-28 md:pt-20">
          <p className="font-label text-[11px] font-medium tracking-[0.2em] text-[var(--text-muted)] uppercase sm:text-xs">
            Prop trading nouvelle génération
          </p>

          <div className="mt-5 inline-flex items-center rounded-full border border-[var(--primary-blue)]/60 bg-[color-mix(in_srgb,var(--primary-blue)_10%,transparent)] px-4 py-1.5">
            <span className="font-label text-xs tracking-wide text-[var(--electric-blue)] sm:text-sm">
              Frais de challenge remboursé à la réussite
            </span>
          </div>

          <h1 className="font-heading mt-8 max-w-3xl text-[clamp(2.75rem,8vw,4.75rem)] leading-[1.05] font-bold tracking-tight text-balance">
            <span className="block text-[var(--text-white)]">Trade Smarter.</span>
            <span className="mt-1 block text-[var(--primary-blue)]">
              Scale Faster.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-main)] sm:text-lg">
            Progressez sur notre plateforme simulée et transformez vos résultats
            en récompenses réelles. Jusqu&apos;à 90% reversés, sans plafond caché.
          </p>

          <div className="mt-9 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/challenges"
              className="inline-flex items-center justify-center rounded-full bg-[var(--primary-blue)] px-8 py-3.5 font-heading text-sm font-bold tracking-tight text-white shadow-[0_0_32px_color-mix(in_srgb,var(--primary-blue)_35%,transparent)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:px-10 sm:text-base"
            >
              Démarrer mon challenge
            </Link>
            <Link
              href="#capital"
              className="inline-flex items-center justify-center rounded-full border border-[var(--primary-blue)]/70 bg-transparent px-8 py-3.5 font-heading text-sm font-bold tracking-tight text-[var(--text-white)] transition-colors hover:bg-[color-mix(in_srgb,var(--primary-blue)_12%,transparent)] sm:px-10 sm:text-base"
            >
              Voir les tarifs
            </Link>
          </div>

          <p className="mt-8 font-label text-xs tracking-wide text-[var(--text-muted)] sm:text-sm">
            Compte jusqu&apos;à 1,5M$ · Support 24/7 · 3 plateformes de trading
          </p>
        </div>
      </section>
    </>
  )
}
