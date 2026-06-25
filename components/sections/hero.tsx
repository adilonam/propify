import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section
      id="accueil"
      className="grid scroll-mt-24 grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
    >
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
          <span className="size-2 animate-pulse rounded-full bg-primary" />
          <span className="font-label text-xs text-primary">
            PROP FIRM EUROPÉENNE
          </span>
        </div>

        <h1 className="font-heading text-5xl leading-tight font-extrabold tracking-tight md:text-6xl lg:text-7xl">
          Trade Smarter.
          <br />
          <span className="text-primary">Scale Faster.</span>
        </h1>

        <div className="max-w-xl space-y-4 text-lg leading-relaxed text-on-surface-variant">
          <p>
            Pas besoin d&apos;un compte à six chiffres pour trader à un niveau
            professionnel. Ce dont vous avez besoin, c&apos;est de prouver que
            vous savez gérer le risque. PROPIFY s&apos;occupe du reste.
          </p>
          <p>
            Un challenge de trading, des objectifs clairs, et l&apos;accès à du
            capital financé allant de 10 000$ à 200 000$, sans bloquer votre
            épargne sur un compte de courtage. Vous validez les conditions, vous
            touchez jusqu&apos;à 90% des profits générés.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/challenges">
            <Button className="px-8 py-4">Commencer un challenge</Button>
          </Link>
          <Link href="/legal/risk-warning">
            <Button variant="outline" className="px-8 py-4">
              Voir les règles
            </Button>
          </Link>
        </div>

        <p className="font-label text-sm font-bold text-on-surface">
          Plus de 2 500 traders à travers l&apos;Europe nous font déjà confiance
        </p>
      </div>

      <div className="group relative">
        <div className="absolute -inset-4 rounded-full bg-primary/20 opacity-50 blur-3xl transition-opacity group-hover:opacity-70" />
        <div className="card relative flex aspect-square items-center justify-center overflow-hidden p-8 md:p-10">
          <div className="relative flex size-56 items-center justify-center rounded-2xl bg-linear-to-br from-primary/15 to-surface-container-high md:size-80">
            <Image
              src="/images/logo.png"
              alt="Propify"
              width={220}
              height={220}
              className="size-40 object-contain md:size-56"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  )
}
