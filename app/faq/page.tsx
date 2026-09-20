import type { Metadata } from "next"
import Link from "next/link"

import { SitePage } from "@/components/layout/site-page"
import { PageHero } from "@/components/pages/page-hero"
import { FAQ_ITEMS } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "FAQ | PROPIFY",
  description:
    "Réponses claires sur les comptes démo, les payouts, les délais et les risques du trading.",
}

export default function FaqPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow="FAQ"
        title="Questions fréquentes"
        description="Le visiteur doit comprendre avant d'acheter. C'est ce qui crée la confiance."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {FAQ_ITEMS.map((item) => (
          <div
            key={item.question}
            className="space-y-3 rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] p-8"
          >
            <h2 className="font-heading text-lg font-semibold text-[var(--text-white)]">
              {item.question}
            </h2>
            <p className="text-[var(--text-muted)]">{item.answer}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2 rounded-2xl border border-[var(--primary-blue)]/40 bg-[var(--landing-surface)] p-8">
        <h2 className="font-heading text-lg font-semibold text-[var(--text-white)]">
          Note légale visible
        </h2>
        <p className="text-[var(--text-muted)]">
          Tous les comptes fournis sont des comptes démo avec fonds fictifs. Les
          résultats passés ne garantissent pas les performances futures. Consultez
          l&apos;{" "}
          <Link
            href="/legal/risk-warning"
            className="text-[var(--primary-blue)] underline-offset-2 hover:underline"
          >
            avertissement sur les risques
          </Link>{" "}
          pour plus de détails.
        </p>
      </div>
    </SitePage>
  )
}
