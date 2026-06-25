import type { Metadata } from "next"

import { SitePage } from "@/components/layout/site-page"
import { ContentBlock } from "@/components/pages/content-block"
import { PageHero } from "@/components/pages/page-hero"
import { DashboardPreviewSection } from "@/components/sections/dashboard-preview"

export const metadata: Metadata = {
  title: "Dashboard | PROPIFY",
  description:
    "Suivez votre drawdown, vos statistiques et votre progression vers la validation en temps réel.",
}

export default function DashboardPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow="Dashboard trader"
        title="Dashboard de suivi en temps réel"
        description="Le drawdown, les statistiques, la progression vers la validation. Un trader qui pilote sans données prend de mauvaises décisions, et PROPIFY élimine cette variable dès le premier jour."
      />

      <DashboardPreviewSection />

      <ContentBlock title="Ce que vous suivez au quotidien">
        <ul className="list-inside list-disc space-y-2">
          <li>Balance et equity curve en temps réel</li>
          <li>Progression vers l&apos;objectif de profit</li>
          <li>Perte journalière et perte maximale globale</li>
          <li>Jours de trading minimum et statut KYC</li>
          <li>Estimation du prochain payout</li>
        </ul>
        <p>
          Les chiffres importants ressortent directement, sans être perdus dans
          les effets. C&apos;est le même environnement que celui utilisé pendant
          la phase de challenge, avec des conditions identiques au live.
        </p>
      </ContentBlock>
    </SitePage>
  )
}
