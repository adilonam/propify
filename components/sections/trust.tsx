const TRUST_CARDS = [
  {
    title: "Excellent",
    lines: ["4.8/5 sur Trustpilot", "Basé sur plus de 1,200 avis vérifiés"],
  },
  {
    title: "+10M$",
    lines: ["Récompenses payées", "Preuve sociale mise en avant"],
  },
  {
    title: "200K$",
    lines: ["Capital simulé disponible", "Selon le challenge choisi"],
  },
] as const

const STEPS = [
  "Choisir un challenge",
  "Trader en simulation",
  "Valider les objectifs",
  "Recevoir les récompenses",
] as const

export function TrustSection() {
  return (
    <section id="confiance" className="scroll-mt-24 space-y-8">
      <div className="space-y-2 text-center md:text-left">
        <h2 className="font-heading text-4xl font-bold text-on-surface md:text-5xl">
          Confiance & transparence
        </h2>
        <p className="text-lg text-on-surface-variant">
          La page qui rassure avant le paiement.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TRUST_CARDS.map((card) => (
          <div key={card.title} className="glass-card space-y-3 rounded-2xl p-8">
            <h3 className="font-heading text-3xl font-bold text-on-surface">
              {card.title}
            </h3>
            {card.lines.map((line) => (
              <p key={line} className="text-on-surface-variant">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="glass-card space-y-8 rounded-2xl p-8 md:p-10">
        <h3 className="font-heading text-2xl font-bold text-on-surface">
          Process simple en 4 étapes
        </h3>

        <div className="relative">
          <div className="absolute top-5 right-0 left-0 hidden h-0.5 bg-white/10 md:block" />
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {STEPS.map((step, index) => (
              <li key={step} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex size-10 items-center justify-center rounded-full border-2 border-white/30 bg-primary font-heading text-sm font-bold text-on-primary-container">
                  {index + 1}
                </div>
                <p className="mt-4 font-label text-sm text-on-surface">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
