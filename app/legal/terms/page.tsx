import type { Metadata } from "next"

import { SitePage } from "@/components/layout/site-page"
import { ContentBlock } from "@/components/pages/content-block"
import { PageHero } from "@/components/pages/page-hero"

export const metadata: Metadata = {
  title: "Conditions d'utilisation | PROPIFY",
  description:
    "Conditions générales d'utilisation de la plateforme PROPIFY.",
}

export default function TermsPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow="Légal"
        title="Conditions d'utilisation"
        description="Les règles du jeu, écrites pour être comprises avant l'achat."
      />

      <ContentBlock title="Objet du service">
        <p>
          PROPIFY propose des challenges de trading sur des comptes démo avec
          fonds fictifs. L&apos;objectif est de valider la gestion du risque et
          la consistance du trader selon des règles prédéfinies. En cas de
          réussite, une récompense réelle peut être versée selon le calendrier
          établi.
        </p>
      </ContentBlock>

      <ContentBlock title="Règles des challenges">
        <p>
          Chaque challenge affiche son objectif de profit, sa perte maximale
          journalière, sa perte maximale globale et le nombre de jours minimum de
          trading directement sur la page de présentation.
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>2-Step : objectif de 10% en phase 1, 5% en phase 2</li>
          <li>Perte journalière maximale : 5%</li>
          <li>Perte totale maximale : 10%</li>
          <li>Minimum 4 jours de trading, période illimitée</li>
        </ul>
        <p>
          Le non-respect de ces règles entraîne l&apos;échec du challenge sans
          remboursement des frais d&apos;inscription.
        </p>
      </ContentBlock>

      <ContentBlock title="Paiements et récompenses">
        <p>
          Les frais de challenge sont payés une seule fois à l&apos;inscription.
          Les délais de payout sont communiqués en amont et fixés avant
          l&apos;achat. Aucun frais supplémentaire caché ne sera découvert après
          coup.
        </p>
      </ContentBlock>

      <ContentBlock title="Comportements interdits">
        <ul className="list-inside list-disc space-y-2">
          <li>Trading par copie ou stratégies interdites par les règles du challenge</li>
          <li>Utilisation de plusieurs comptes pour contourner les limites</li>
          <li>Manipulation des données ou fraude au KYC</li>
          <li>Toute activité portant atteinte à l&apos;intégrité de la plateforme</li>
        </ul>
      </ContentBlock>

      <ContentBlock title="Limitation de responsabilité">
        <p>
          PROPIFY fournit un cadre, un capital simulé et un accompagnement. La
          performance dépend du trader. Les résultats passés ne garantissent pas
          les performances futures.
        </p>
      </ContentBlock>
    </SitePage>
  )
}
