import type { Metadata } from "next"
import Link from "next/link"

import { SitePage } from "@/components/layout/site-page"
import { ContentBlock } from "@/components/pages/content-block"
import { PageHero } from "@/components/pages/page-hero"
import { TRUST_STEPS } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Avertissement sur les risques | PROPIFY",
  description:
    "Le trading comporte des risques. Informations importantes avant de commencer un challenge PROPIFY.",
}

export default function RiskWarningPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow="Légal"
        title="Avertissement sur les risques"
        description="Aucune prop firm sérieuse ne devrait prétendre garantir des performances futures. Lisez ceci avant de vous engager."
      />

      <ContentBlock title="Nature des comptes">
        <p>
          Tous les comptes fournis par PROPIFY sont des comptes démo avec fonds
          fictifs. Les challenges s&apos;effectuent dans un environnement simulé.
          La récompense perçue lors du payout, en revanche, est bien réelle,
          calculée sur les profits générés pendant la phase de trading simulé.
        </p>
      </ContentBlock>

      <ContentBlock title="Risque inhérent au trading">
        <p>
          Le trading sur les marchés financiers implique un risque de perte
          significatif. Les performances passées, qu&apos;elles proviennent de
          traders financés ou de statistiques affichées sur la plateforme, ne
          garantissent en aucun cas les performances futures.
        </p>
        <p>
          PROPIFY fournit un cadre, un capital simulé et un accompagnement. La
          performance, elle, vient du trader.
        </p>
      </ContentBlock>

      <ContentBlock title="Pas de conseil financier">
        <p>
          PROPIFY ne fournit pas de conseils en investissement. Les contenus de
          la plateforme, de la communauté Discord ou du support ont une vocation
          éducative et informative. Vous restez seul responsable de vos décisions
          de trading.
        </p>
      </ContentBlock>

      <div className="card space-y-8 p-8 md:p-10">
        <h2 className="font-heading text-2xl font-bold text-on-surface">
          Processus en quatre étapes
        </h2>
        <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TRUST_STEPS.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-on-primary-container">
                {index + 1}
              </span>
              <p className="text-on-surface-variant">{step}</p>
            </li>
          ))}
        </ol>
        <p className="text-on-surface-variant">
          Aucune étape cachée. Aucun frais supplémentaire découvert après coup.
          Les avis sont vérifiés sur Trustpilot, où PROPIFY affiche 4.8/5 basé
          sur plus de 1 200 évaluations.
        </p>
      </div>

      <div className="rounded-2xl border border-primary bg-primary/5 p-8">
        <p className="text-on-surface-variant">
          En continuant, vous confirmez avoir lu et compris cet avertissement.
          Pour toute question, consultez la{" "}
          <Link href="/faq" className="text-primary hover:underline">
            FAQ
          </Link>{" "}
          ou{" "}
          <Link href="/support" className="text-primary hover:underline">
            contactez le support
          </Link>
          .
        </p>
      </div>
    </SitePage>
  )
}
