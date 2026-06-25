import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { WHY_PROPIFY } from "@/lib/site-content"

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
        <p className="max-w-3xl text-lg text-on-surface-variant">
          Les prop firms se ressemblent toutes sur le papier. Ce qui différencie
          réellement PROPIFY, ce n&apos;est pas le chiffre affiché. C&apos;est ce
          qui se passe après l&apos;inscription.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
          {WHY_PROPIFY.map((feature) => (
            <div
              key={feature.title}
              className={`card space-y-4 p-8 ${
                "highlighted" in feature && feature.highlighted
                  ? "border-primary glow-blue"
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

        <div className="card flex flex-col space-y-6 bg-surface-container p-8">
          <h3 className="font-heading text-2xl font-semibold text-on-surface">
            Confiance & transparence
          </h3>
          <ul className="flex-1 space-y-4">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-secondary-fixed" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-outline-variant pt-6 text-center">
            <div className="font-bold text-on-surface">Excellent ★★★★★</div>
            <div className="font-label text-sm text-on-surface-variant">
              4.8/5 sur Trustpilot — 1 200+ avis
            </div>
          </div>
        </div>
      </div>

      <div className="card flex flex-col items-center justify-between gap-8 border-2 border-primary bg-surface-container p-8 glow-blue md:flex-row md:p-12">
        <div className="space-y-2">
          <h2 className="font-heading text-2xl font-semibold text-white">
            Prêt à scaler votre trading ?
          </h2>
          <p className="max-w-xl text-on-surface-variant">
            Choisissez le challenge qui correspond à votre niveau et accédez à
            du capital financé de 10K à 200K.
          </p>
        </div>
        <Link href="/challenges">
          <Button className="shrink-0 px-12 py-4">Commencer</Button>
        </Link>
      </div>
    </section>
  )
}
