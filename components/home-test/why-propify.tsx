import { Reveal } from "@/components/effects/reveal"

const FEATURES = [
  {
    title: "Rewards",
    body: "Retraits rapides et sans friction, examinés sous 12h.",
  },
  {
    title: "Support avancé",
    body: "Une équipe dédiée par chat, email et WhatsApp, 24/7.",
  },
  {
    title: "Outils & Services",
    body: "Dashboard, suivi de performance et règles pensés pour progresser.",
  },
  {
    title: "Remboursement",
    body: "Frais de challenge remboursé dès la réussite de l'évaluation.",
  },
] as const

export function WhyPropify() {
  return (
    <section
      aria-labelledby="why-propify-heading"
      className="border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="why-propify-heading"
            className="font-heading text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold tracking-tight text-[var(--text-white)]"
          >
            Pourquoi les traders choisissent Propify
          </h2>
          <p className="mt-3 font-label text-sm text-[var(--text-muted)] sm:text-base">
            Plus de puissance. Moins de risque.
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {FEATURES.map((feature, index) => (
            <Reveal
              key={feature.title}
              as="li"
              delay={index * 70}
              className="rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] px-5 py-6"
            >
              <h3 className="font-heading text-lg font-semibold tracking-tight text-[var(--text-white)]">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                {feature.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
