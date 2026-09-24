import { Reveal } from "@/components/effects/reveal"

const ACTIVITIES = [
  {
    text: "Lucas vient de démarrer un challenge 100K",
    ago: "il y a 2 min",
  },
  {
    text: "Camille a validé sa Phase 1 sur un compte 50K",
    ago: "il y a 6 min",
  },
  {
    text: "Karim a reçu un payout de +2 840€",
    ago: "il y a 11 min",
  },
  {
    text: "Sophie vient de démarrer un challenge 25K",
    ago: "il y a 18 min",
  },
  {
    text: "Julien a débloqué son compte financé 200K",
    ago: "il y a 24 min",
  },
] as const

export function LiveActivity() {
  return (
    <section
      aria-labelledby="live-activity-heading"
      className="border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <div className="rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] px-5 py-6 sm:px-7 sm:py-8">
            <h2
              id="live-activity-heading"
              className="font-label text-[11px] font-semibold tracking-[0.16em] text-[var(--text-white)] uppercase sm:text-xs"
            >
              Ça bouge en ce moment
            </h2>
            <ul className="mt-5 divide-y divide-[var(--landing-border-subtle)]">
              {ACTIVITIES.map((row) => (
                <li
                  key={row.text}
                  className="flex items-start justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <p className="flex items-start gap-2.5 text-sm text-[var(--text-main)]">
                    <span
                      className="mt-1.5 size-2 shrink-0 rounded-full bg-[var(--success-green,#22c55e)]"
                      aria-hidden
                    />
                    <span>{row.text}</span>
                  </p>
                  <span className="shrink-0 font-label text-xs text-[var(--text-muted)]">
                    {row.ago}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] px-5 py-6 sm:px-7 sm:py-8">
            <div className="flex items-center justify-between gap-3">
              <p className="font-label text-[11px] font-semibold tracking-[0.16em] text-[var(--text-white)] uppercase sm:text-xs">
                Certificat de payout
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--success-green,#22c55e)_18%,transparent)] px-2.5 py-1 font-label text-[11px] font-semibold text-[var(--success-green,#22c55e)]">
                ✓ Vérifié
              </span>
            </div>
            <p className="mt-6 text-center font-heading text-3xl font-bold tracking-tight text-[var(--text-white)] sm:text-4xl">
              +2 840,00 €
            </p>
            <div className="mt-6 flex items-center justify-between gap-3 font-label text-sm text-[var(--text-main)]">
              <span>Thomas L.</span>
              <span>Compte 100K</span>
            </div>
            <p className="mt-2 text-center font-label text-xs text-[var(--text-muted)]">
              traité le 18/03/2026 — sous 12h
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
