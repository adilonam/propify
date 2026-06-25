import type { Metadata } from "next"

import { SitePage } from "@/components/layout/site-page"
import { ContentBlock } from "@/components/pages/content-block"
import { PageHero } from "@/components/pages/page-hero"
import { ChallengesSection } from "@/components/sections/challenges"
import { CHALLENGE_TIERS } from "@/lib/site-content"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Challenges | PROPIFY",
  description:
    "Choisissez votre challenge PROPIFY — capital de 10K à 200K, formats 1-Step et 2-Step, règles visibles avant l'achat.",
}

export default function ChallengesPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow="Les challenges Propify"
        title="Quel capital correspond à votre niveau, aujourd'hui ?"
        description="C'est la vraie question à se poser, avant même de choisir un challenge de trading financé. PROPIFY propose cinq niveaux de capital, de 10K à 200K, avec deux formats selon l'approche."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ContentBlock title="2-Step Challenge">
          <p>
            Conçu pour les traders qui veulent démontrer leur consistance dans
            le temps. Deux phases, des règles identiques à chaque étape. Un
            objectif de profit de 10% en phase 1, 5% en phase 2.
          </p>
          <p>
            La perte journalière maximale fixée à 5%, la perte totale maximale à
            10%. Rien ne change entre le moment de l&apos;inscription et celui
            du payout.
          </p>
        </ContentBlock>

        <ContentBlock title="1-Step Challenge">
          <p>
            Supprime la deuxième phase. Un objectif, une validation, un accès
            plus direct au statut de trader financé.
          </p>
          <p>
            Dans les deux cas : quatre jours de trading minimum, période
            illimitée. Aucun délai artificiel qui pousse à prendre des risques
            non planifiés.
          </p>
        </ContentBlock>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {CHALLENGE_TIERS.map((tier) => (
          <div
            key={tier.size}
            className={cn(
              "card space-y-3 p-6",
              "popular" in tier && tier.popular && "border-2 border-primary glow-blue"
            )}
          >
            {"popular" in tier && tier.popular ? (
              <span className="font-label text-[10px] tracking-widest text-primary uppercase">
                Populaire
              </span>
            ) : (
              <span className="block h-4" />
            )}
            <div className="font-heading text-3xl font-bold text-primary">
              {tier.size}
            </div>
            <div className="font-heading text-xl font-bold text-on-surface">
              {tier.price}
            </div>
            <p className="text-sm text-on-surface-variant">{tier.note}</p>
          </div>
        ))}
      </div>

      <ChallengesSection />
    </SitePage>
  )
}
