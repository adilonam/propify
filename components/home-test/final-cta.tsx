import Link from "next/link"

import { Reveal } from "@/components/effects/reveal"

const BULLETS = [
  "Remboursé à la réussite",
  "Compte jusqu'à 1,5M$",
  "Aucune limite de temps",
] as const

const MINI_STATS = [
  { label: "Traders actifs", value: "12 480" },
  { label: "Payouts effectués", value: "8 920" },
  { label: "Payout ratio", value: "94%" },
] as const

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 40%, color-mix(in srgb, var(--landing-glow) 26%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center md:px-8 md:py-28">
        <Reveal>
          <h2
            id="final-cta-heading"
            className="font-heading text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold tracking-tight text-balance text-[var(--text-white)]"
          >
            Lancez votre challenge Propify dès aujourd&apos;hui
          </h2>

          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-label text-xs text-[var(--text-muted)] sm:text-sm">
            {BULLETS.map((bullet, index) => (
              <span key={bullet} className="inline-flex items-center gap-2">
                {index > 0 ? (
                  <span aria-hidden className="text-[var(--text-muted)]/60">
                    ·
                  </span>
                ) : null}
                {bullet}
              </span>
            ))}
          </p>

          <div className="mt-9">
            <Link
              href="/challenges"
              className="inline-flex items-center justify-center rounded-full bg-[var(--primary-blue)] px-10 py-4 font-heading text-base font-bold text-white shadow-[0_0_36px_color-mix(in_srgb,var(--primary-blue)_40%,transparent)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Démarrer mon challenge
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-label text-xs text-[var(--text-muted)] sm:gap-x-12 sm:text-sm">
            {MINI_STATS.map((stat) => (
              <li key={stat.label}>
                {stat.label}{" "}
                <span className="font-semibold text-[var(--text-main)]">
                  {stat.value}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
