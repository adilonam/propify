import { Reveal } from "@/components/effects/reveal"

function Stars({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className="size-3.5 fill-[var(--landing-gold)]"
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  )
}

const COMMUNITY_STATS = [
  {
    value: "48h",
    label: "Délai moyen de payout sur les 90 derniers jours",
  },
  {
    value: "10,5M€+",
    label: "Reversés aux traders à date",
  },
  {
    value: "12h",
    label: "Délai d'examen d'une demande",
  },
] as const

const TESTIMONIALS = [
  {
    quote:
      "Passage Phase 1 en 9 jours, payout traité sans friction. Les règles sont claires.",
    name: "Thomas L.",
    payout: "+2 840€",
  },
  {
    quote:
      "Support réactif sur WhatsApp quand j'avais une question sur le drawdown.",
    name: "Camille D.",
    payout: "+5 120€",
  },
  {
    quote:
      "Dashboard lisible, objectifs visibles. Exactement ce qu'il me fallait pour progresser.",
    name: "Karim B.",
    payout: "+1 950€",
  },
  {
    quote:
      "Frais remboursés à la validation comme annoncé. Transparence appréciable.",
    name: "Sophie M.",
    payout: "+3 670€",
  },
  {
    quote:
      "Compte 100K débloqué sans surprise. Les délais de vérification sont réalistes.",
    name: "Julien R.",
    payout: "+7 210€",
  },
  {
    quote:
      "Première prop firm où le parcours et les payouts correspondent vraiment au pitch.",
    name: "Elena V.",
    payout: "+4 430€",
  },
] as const

export function CommunityTestimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <Reveal className="rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] px-5 py-10 sm:px-8">
          <p className="text-center font-label text-[11px] font-semibold tracking-[0.18em] text-[var(--text-muted)] uppercase sm:text-xs">
            Une communauté qui grandit chaque jour
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            {COMMUNITY_STATS.map((stat) => (
              <li key={stat.label} className="text-center">
                <p className="font-heading text-3xl font-bold tracking-tight text-[var(--text-white)] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mx-auto mt-2 max-w-[16rem] font-label text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16 text-center md:mt-20">
          <h2
            id="testimonials-heading"
            className="font-heading text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold tracking-tight text-[var(--text-white)]"
          >
            Ce que disent les traders
          </h2>
          <div className="mt-4 flex flex-col items-center gap-2">
            <Stars className="flex items-center gap-0.5" />
            <p className="font-label text-sm text-[var(--text-white)]">
              4.8/5 — basé sur 2 340 avis vérifiés
            </p>
          </div>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <Reveal
              key={item.name}
              as="li"
              delay={index * 50}
              className="flex flex-col rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] px-5 py-6"
            >
              <Stars className="flex items-center gap-0.5" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-main)]">
                « {item.quote} »
              </p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="font-label text-sm font-semibold text-[var(--text-white)]">
                  {item.name}
                </span>
                <span className="font-label text-sm font-semibold text-[var(--electric-blue)]">
                  {item.payout}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
