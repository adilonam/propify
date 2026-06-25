import Link from "next/link"

import { TRUST_STEPS } from "@/lib/site-content"

const TRUST_CARDS = [
  {
    title: "Excellent",
    lines: ["4.8/5 sur Trustpilot", "Basé sur plus de 1 200 avis vérifiés"],
  },
  {
    title: "+10M$",
    lines: ["Récompenses payées", "Ce chiffre grimpe chaque semaine"],
  },
  {
    title: "200K$",
    lines: ["Capital simulé disponible", "Selon le challenge choisi"],
  },
] as const

export function TrustSection() {
  return (
    <section id="confiance" className="scroll-mt-24 space-y-8">
      <div className="space-y-4 md:text-left">
        <h2 className="font-heading text-4xl font-bold text-on-surface md:text-5xl">
          Confiance & transparence
        </h2>
        <div className="max-w-3xl space-y-4 text-lg text-on-surface-variant">
          <p>
            Rejoindre une prop firm sérieuse, ça commence par une question
            simple : les règles sont-elles lisibles avant de sortir la carte
            bancaire ?
          </p>
          <p>
            Chez PROPIFY, la réponse est oui. Les conditions de chaque challenge
            sont affichées sur la page de présentation. La note légale est
            accessible depuis le footer. Les avis sont vérifiés sur Trustpilot,
            où PROPIFY affiche 4.8/5 basé sur plus de 1 200 évaluations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TRUST_CARDS.map((card) => (
          <div key={card.title} className="card space-y-3 p-8">
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

      <div className="card space-y-8 p-8 md:p-10">
        <h3 className="font-heading text-2xl font-bold text-on-surface">
          Processus en 4 étapes
        </h3>

        <div className="relative">
          <div className="absolute top-5 right-0 left-0 hidden h-0.5 bg-primary md:block" />
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {TRUST_STEPS.map((step, index) => (
              <li key={step} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex size-10 items-center justify-center rounded-full border-2 border-outline-variant bg-primary font-heading text-sm font-bold text-on-primary-container glow-blue">
                  {index + 1}
                </div>
                <p className="mt-4 font-label text-sm text-on-surface">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="text-center text-on-surface-variant md:text-left">
          Aucune étape cachée. Aucun frais supplémentaire découvert après coup.{" "}
          <Link href="/legal/risk-warning" className="text-primary hover:underline">
            Lire l&apos;avertissement sur les risques
          </Link>
        </p>
      </div>
    </section>
  )
}
