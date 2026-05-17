import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

const FEATURES = [
  {
    title: "Payouts rapides",
    description:
      "Retraits de récompenses simples, clairs et rapides.",
    highlighted: true,
  },
  {
    title: "Support avancé",
    description:
      "Live chat, email et WhatsApp pour accompagner vos traders.",
  },
  {
    title: "Règles transparentes",
    description:
      "Objectifs, pertes max et conditions affichés clairement.",
  },
  {
    title: "Dashboard premium",
    description:
      "Suivi de performance, objectifs et analytics en temps réel.",
  },
] as const

const TRUST_ITEMS = [
  "Règles visibles avant achat",
  "Conditions écrites simplement",
  "Support disponible 24/7",
  "FAQ légale accessible",
] as const

export function WhyPropifySection() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h2 className="font-heading text-4xl font-bold text-on-surface md:text-5xl">
          Pourquoi les traders choisissent PROPIFY
        </h2>
        <p className="text-lg text-on-surface-variant">
          Des bénéfices lisibles, des preuves visibles, aucune information
          noyée.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className={`glass-card space-y-4 rounded-2xl p-8 ${
                "highlighted" in feature && feature.highlighted
                  ? "border-l-4 border-l-primary"
                  : ""
              }`}
            >
              <h3 className="font-heading text-2xl font-semibold text-on-surface">
                {feature.title}
              </h3>
              <p className="text-on-surface-variant">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="glass-card flex flex-col space-y-6 rounded-2xl bg-surface-container p-8">
          <h3 className="font-heading text-2xl font-semibold text-on-surface">
            Bloc de confiance
          </h3>
          <ul className="flex-1 space-y-4">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-secondary-fixed" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 pt-6 text-center">
            <div className="font-bold text-on-surface">Excellent ★★★★★</div>
            <div className="font-label text-sm text-on-surface-variant">
              Basé sur 2,500+ avis
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border-2 border-primary bg-primary/5 p-8 md:flex-row md:p-12">
        <div className="space-y-2">
          <h2 className="font-heading text-2xl font-semibold text-white">
            Le luxe = clarté + espace + confiance
          </h2>
          <p className="max-w-xl text-on-surface-variant">
            Cette version garde le côté premium, mais rend les titres, les
            chiffres et les règles beaucoup plus visibles.
          </p>
        </div>
        <Button className="shrink-0 px-12 py-4 shadow-xl shadow-primary/20">
          Commencer
        </Button>
      </div>
    </section>
  )
}
