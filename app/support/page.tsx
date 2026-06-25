import type { Metadata } from "next"
import Link from "next/link"
import { Mail, MessageCircle, Phone } from "lucide-react"

import { SitePage } from "@/components/layout/site-page"
import { ContentBlock } from "@/components/pages/content-block"
import { PageHero } from "@/components/pages/page-hero"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact Support | PROPIFY",
  description:
    "Support 24/7 par live chat, email et WhatsApp. Un humain derrière l'écran, peu importe l'heure.",
}

const SUPPORT_CHANNELS = [
  {
    icon: MessageCircle,
    title: "Live chat",
    description:
      "Réponse en direct depuis votre dashboard ou la page d'accueil. Idéal pour les questions urgentes pendant une session de trading.",
    action: "Ouvrir le chat",
    href: "/#contact",
  },
  {
    icon: Mail,
    title: "Email",
    description:
      "support@propify.com — pour les demandes détaillées, les vérifications de compte ou le suivi de payout.",
    action: "Envoyer un email",
    href: "mailto:support@propify.com",
  },
  {
    icon: Phone,
    title: "WhatsApp",
    description:
      "Accompagnement francophone disponible 24/7. Un canal direct pour les traders en Europe.",
    action: "Contacter sur WhatsApp",
    href: "https://wa.me/33000000000",
  },
] as const

export default function SupportPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow="Support"
        title="Support 24/7"
        description="Un humain derrière l'écran. Disponible par live chat, email et WhatsApp, peu importe l'heure, peu importe le marché ouvert."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {SUPPORT_CHANNELS.map((channel) => (
          <div key={channel.title} className="card flex flex-col space-y-4 p-8">
            <channel.icon className="size-8 text-primary" />
            <h2 className="font-heading text-xl font-semibold text-on-surface">
              {channel.title}
            </h2>
            <p className="flex-1 text-on-surface-variant">{channel.description}</p>
            <Link href={channel.href}>
              <Button variant="outline" className="w-full">
                {channel.action}
              </Button>
            </Link>
          </div>
        ))}
      </div>

      <ContentBlock title="Avant de nous contacter">
        <p>
          Consultez la{" "}
          <Link href="/faq" className="text-primary hover:underline">
            FAQ
          </Link>{" "}
          pour les questions sur les comptes démo, les délais de payout et les
          règles des challenges. Chaque challenge affiche son objectif de profit,
          sa perte maximale journalière et globale directement sur la page.
        </p>
        <p>
          Rejoindre une prop firm sérieuse, ça commence par une question simple
          : les règles sont-elles lisibles avant de sortir la carte bancaire ?
          Chez PROPIFY, la réponse est oui.
        </p>
      </ContentBlock>
    </SitePage>
  )
}
