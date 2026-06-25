import type { Metadata } from "next"

import { SitePage } from "@/components/layout/site-page"
import { ContentBlock } from "@/components/pages/content-block"
import { PageHero } from "@/components/pages/page-hero"
import { KEY_STATS, LEADERBOARD } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Classement | PROPIFY",
  description:
    "Découvrez les traders PROPIFY qui performent le mieux cette semaine.",
}

export default function ClassementPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow="Classement"
        title="Les traders qui scalent avec PROPIFY"
        description="Plus de 2 500 traders à travers l'Europe ont déjà franchi ce pas. Pas parce qu'ils cherchaient un raccourci, mais parce qu'ils avaient la stratégie et manquaient du capital pour l'exploiter vraiment."
      />

      <div className="card overflow-hidden">
        <div className="border-b border-outline-variant px-6 py-4">
          <h2 className="font-heading text-xl font-bold text-on-surface">
            Top performers — cette semaine
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-outline-variant font-label text-xs text-on-surface-variant uppercase">
                <th className="px-6 py-4">Rang</th>
                <th className="px-6 py-4">Trader</th>
                <th className="px-6 py-4">Pays</th>
                <th className="px-6 py-4">Performance</th>
                <th className="px-6 py-4">Payout</th>
              </tr>
            </thead>
            <tbody>
              {LEADERBOARD.map((entry) => (
                <tr
                  key={entry.rank}
                  className="border-b border-outline-variant/60 last:border-0"
                >
                  <td className="px-6 py-4 font-heading text-lg font-bold text-primary">
                    #{entry.rank}
                  </td>
                  <td className="px-6 py-4 text-on-surface">{entry.trader}</td>
                  <td className="px-6 py-4 font-label text-sm text-on-surface-variant">
                    {entry.country}
                  </td>
                  <td className="px-6 py-4 font-label text-secondary-fixed">
                    {entry.profit}
                  </td>
                  <td className="px-6 py-4 font-heading font-semibold text-on-surface">
                    {entry.payout}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {KEY_STATS.map((stat) => (
          <div key={stat.label} className="card space-y-3 p-6">
            <div className="font-heading text-2xl font-bold text-on-surface">
              {stat.value}
            </div>
            <div className="font-label text-xs text-on-surface-variant uppercase">
              {stat.label}
            </div>
            <p className="text-sm text-on-surface-variant">{stat.description}</p>
          </div>
        ))}
      </div>

      <ContentBlock title="Chiffres clés">
        <p>
          Le classement met en avant la consistance, pas le coup de chance
          isolé. Chaque trader affiché a validé les règles de son challenge dans
          un environnement simulé avec fonds fictifs.
        </p>
      </ContentBlock>
    </SitePage>
  )
}
