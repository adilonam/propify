import Link from "next/link"

import { FAQ_ITEMS } from "@/lib/site-content"

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 space-y-8">
      <div className="space-y-2">
        <h2 className="font-heading text-4xl font-bold text-on-surface md:text-5xl">
          FAQ
        </h2>
        <p className="text-lg text-on-surface-variant">
          Le visiteur doit comprendre avant d&apos;acheter. C&apos;est ce qui
          crée la confiance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {FAQ_ITEMS.map((item) => (
          <div key={item.question} className="glass-card space-y-2 rounded-2xl p-8">
            <h3 className="font-heading text-lg font-semibold text-on-surface">
              {item.question}
            </h3>
            <p className="text-on-surface-variant">{item.answer}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-primary bg-primary/5 p-8 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <h3 className="font-heading text-lg font-semibold text-on-surface">
            Note légale visible
          </h3>
          <p className="text-on-surface-variant">
            Tous les comptes fournis sont des comptes démo avec fonds fictifs. Les
            résultats passés ne garantissent pas les performances futures.
          </p>
        </div>
        <Link
          href="/faq"
          className="font-label text-sm text-primary hover:underline"
        >
          Voir toute la FAQ →
        </Link>
      </div>
    </section>
  )
}
