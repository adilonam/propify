import { Reveal } from "@/components/effects/reveal"

function Stars({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className="size-3.5 fill-[var(--landing-gold)] sm:size-4"
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  )
}

const RATINGS = [
  {
    name: "Google",
    src: "/images/ratings/google-g-2025.webp",
    score: "4.7/5",
    height: 28,
    showName: true,
  },
  {
    name: "Trustpilot",
    src: "/images/ratings/trustpilot.png",
    score: "4.9/5",
    height: 36,
  },
  {
    name: "Myfxbook",
    src: "/images/ratings/myfxbook.svg",
    score: "4.8/5",
    height: 24,
  },
  {
    name: "TTP - Most Trusted",
    src: "/images/ratings/ttp.webp",
    score: "4.6/5",
    height: 52,
  },
] as const

const JOURNEY = [
  {
    label: "Processus d'évaluation",
    title: "Prouvez vos compétences",
    body: "Objectif Phase 1 : 8% · Phase 2 : 5% · Drawdown max 10% (static) · Durée illimitée",
  },
  {
    label: "Vérification",
    title: "On valide, vous avancez",
    body: "Délai moyen constaté : 2 jours · confirmation automatique par email",
  },
  {
    label: "Compte Propify",
    title: "Gagnez de vraies récompenses",
    body: "Jusqu'à 90% des gains reversés · payouts examinés sous 12h",
  },
] as const

export function RatingsJourney() {
  return (
    <section
      aria-labelledby="journey-heading"
      className="border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-16 md:gap-16 md:px-8 md:py-24">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {RATINGS.map((rating, index) => (
            <Reveal
              key={rating.name}
              as="li"
              delay={index * 60}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] px-5 py-6"
            >
              <div className="flex min-h-14 items-center justify-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element -- local rating marks */}
                <img
                  src={rating.src}
                  alt={"showName" in rating && rating.showName ? "" : rating.name}
                  className="block w-auto max-w-[9rem] object-contain"
                  style={{ height: rating.height }}
                  loading="lazy"
                />
                {"showName" in rating && rating.showName ? (
                  <span className="font-heading text-lg font-semibold tracking-tight text-white">
                    {rating.name}
                  </span>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <Stars className="flex items-center gap-0.5" />
                <span className="font-label text-sm text-white/90">
                  {rating.score}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <h2
            id="journey-heading"
            className="text-center font-heading text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold tracking-tight text-[var(--text-white)]"
          >
            Le parcours, règles à l&apos;appui
          </h2>
        </Reveal>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {JOURNEY.map((step, index) => (
            <Reveal
              key={step.label}
              as="li"
              delay={index * 80}
              className="rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] px-6 py-7"
            >
              <p className="font-label text-[11px] font-semibold tracking-[0.14em] text-[var(--electric-blue)] uppercase">
                {step.label}
              </p>
              <h3 className="font-heading mt-3 text-xl font-bold tracking-tight text-[var(--text-white)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
