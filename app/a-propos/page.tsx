import type { Metadata } from "next"
import Link from "next/link"

import { SitePage } from "@/components/layout/site-page"
import { ContentBlock } from "@/components/pages/content-block"
import { PageHero } from "@/components/pages/page-hero"
import { KEY_STATS, WHY_PROPIFY } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "À propos | PROPIFY",
  description:
    "PROPIFY est une prop firm européenne : challenges clairs, comptes démo, payouts traçables et accompagnement francophone.",
}

export default function AProposPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow="À propos"
        title="Une prop firm construite pour les traders exigeants"
        description="PROPIFY propose des challenges de trading sur comptes démo avec fonds fictifs. L'objectif : valider une gestion du risque solide, puis récompenser la consistance — sans promesse de gains faciles."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {KEY_STATS.map((stat) => (
          <div
            key={stat.label}
            className="space-y-3 rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] p-6"
          >
            <div className="font-heading text-2xl font-bold text-[var(--text-white)]">
              {stat.value}
            </div>
            <div className="font-label text-xs text-[var(--text-muted)] uppercase">
              {stat.label}
            </div>
            <p className="text-sm text-[var(--text-muted)]">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {WHY_PROPIFY.map((item) => (
          <ContentBlock key={item.title} title={item.title}>
            <p>{item.description}</p>
          </ContentBlock>
        ))}
      </div>

      <ContentBlock title="Cadre et transparence">
        <p>
          Les challenges se déroulent dans un environnement simulé. Les règles —
          objectif de profit, perte journalière, perte globale, jours minimum —
          sont affichées avant l&apos;achat. PROPIFY n&apos;agit ni comme courtier
          ni comme établissement financier.
        </p>
        <p>
          Pour le détail juridique, consultez l&apos;
          <Link
            href="/legal/risk-warning"
            className="text-[var(--primary-blue)] underline-offset-2 hover:underline"
          >
            avertissement sur les risques
          </Link>
          , les{" "}
          <Link
            href="/legal/terms"
            className="text-[var(--primary-blue)] underline-offset-2 hover:underline"
          >
            conditions d&apos;utilisation
          </Link>{" "}
          et la{" "}
          <Link
            href="/legal/privacy"
            className="text-[var(--primary-blue)] underline-offset-2 hover:underline"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </ContentBlock>
    </SitePage>
  )
}
