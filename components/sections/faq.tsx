const FAQ_ITEMS = [
  {
    question: "Les comptes sont-ils réels ?",
    answer:
      "Les challenges s'effectuent dans un environnement simulé avec fonds fictifs.",
  },
  {
    question: "Quel support est disponible ?",
    answer:
      "Support par live chat, email et WhatsApp selon l'offre choisie.",
  },
  {
    question: "Quand sont versées les récompenses ?",
    answer:
      "Après validation des conditions et du compte, selon le calendrier défini.",
  },
  {
    question: "Les règles sont-elles visibles avant achat ?",
    answer:
      "Oui, chaque challenge affiche objectif, perte max, jours minimum et frais.",
  },
  {
    question: "Y a-t-il une limite de temps ?",
    answer:
      "La période de trading peut être illimitée selon le type de challenge.",
  },
  {
    question: "Les résultats sont-ils garantis ?",
    answer:
      "Non. Les performances passées ne garantissent jamais les performances futures.",
  },
] as const

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 space-y-8">
      <div className="space-y-2">
        <h2 className="font-heading text-4xl font-bold text-on-surface md:text-5xl">
          FAQ & règles claires
        </h2>
        <p className="text-lg text-on-surface-variant">
          Le visiteur doit comprendre avant d&apos;acheter. C&apos;est ce qui
          crée la confiance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {FAQ_ITEMS.map((item) => (
          <div key={item.question} className="glass-card space-y-2 rounded-2xl p-8">
            <h3 className="font-heading text-lg font-semibold text-on-surface">
              {item.question}
            </h3>
            <p className="text-on-surface-variant">{item.answer}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2 rounded-2xl border border-primary bg-primary/5 p-8">
        <h3 className="font-heading text-lg font-semibold text-on-surface">
          Note légale visible
        </h3>
        <p className="text-on-surface-variant">
          Tous les comptes fournis sont des comptes démo avec fonds fictifs. Les
          résultats passés ne garantissent pas les performances futures.
        </p>
      </div>
    </section>
  )
}
