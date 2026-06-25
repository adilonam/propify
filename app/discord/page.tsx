import type { Metadata } from "next"
import Link from "next/link"

import { SitePage } from "@/components/layout/site-page"
import { ContentBlock } from "@/components/pages/content-block"
import { PageHero } from "@/components/pages/page-hero"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Discord | PROPIFY",
  description:
    "Rejoignez la communauté PROPIFY sur Discord — traders francophones, analyses et accompagnement.",
}

export default function DiscordPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow="Communauté"
        title="Rejoignez PROPIFY sur Discord"
        description="Ce n'est pas simplement un accès à un compte démo. C'est un écosystème de trading avec des analyses régulières, un accompagnement francophone, et une communauté de traders qui évoluent dans les mêmes conditions."
      />

      <div className="card flex flex-col items-center gap-8 border-2 border-primary p-10 text-center glow-blue md:p-16">
        <div className="space-y-4">
          <h2 className="font-heading text-3xl font-bold text-on-surface">
            +2 500 traders actifs
          </h2>
          <p className="max-w-xl text-on-surface-variant">
            De France, de Belgique, de Suisse, d&apos;Espagne, d&apos;Italie.
            Échangez stratégies, posez vos questions au support et suivez les
            annonces de la plateforme.
          </p>
        </div>
        <a
          href="https://discord.gg/propify"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="px-12 py-4">Rejoindre Discord</Button>
        </a>
      </div>

      <ContentBlock title="Ce que vous y trouverez">
        <ul className="list-inside list-disc space-y-2">
          <li>Salons dédiés au support et aux annonces officielles</li>
          <li>Discussions entre traders sur les marchés et la gestion du risque</li>
          <li>Analyses régulières et retours d&apos;expérience de la communauté</li>
          <li>Accès prioritaire aux nouveautés de la plateforme</li>
        </ul>
        <p>
          Besoin d&apos;aide avant de rejoindre ?{" "}
          <Link href="/support" className="text-primary hover:underline">
            Contactez le support
          </Link>
          .
        </p>
      </ContentBlock>
    </SitePage>
  )
}
