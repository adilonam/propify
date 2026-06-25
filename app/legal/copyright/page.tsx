import type { Metadata } from "next"
import Link from "next/link"

import { SitePage } from "@/components/layout/site-page"
import { ContentBlock } from "@/components/pages/content-block"
import { PageHero } from "@/components/pages/page-hero"

export const metadata: Metadata = {
  title: "Copyright | PROPIFY",
  description: "Informations sur les droits d'auteur et la propriété intellectuelle PROPIFY.",
}

export default function CopyrightPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow="Légal"
        title="Copyright"
        description="© 2026 Propify. Tous droits réservés."
      />

      <ContentBlock title="Propriété intellectuelle">
        <p>
          L&apos;ensemble du contenu présent sur le site PROPIFY — textes,
          graphismes, logo, interface, vidéos et code — est protégé par le droit
          d&apos;auteur et appartient à Propify ou à ses concédants de licence.
        </p>
        <p>
          Toute reproduction, distribution, modification ou utilisation
          commerciale sans autorisation écrite préalable est strictement
          interdite.
        </p>
      </ContentBlock>

      <ContentBlock title="Marque PROPIFY">
        <p>
          Le nom PROPIFY, le logo et l&apos;identité visuelle associée sont des
          marques de Propify. Leur utilisation sans accord explicite est
          prohibée.
        </p>
      </ContentBlock>

      <ContentBlock title="Utilisation autorisée">
        <p>
          Vous pouvez partager des liens vers les pages publiques de PROPIFY à
          des fins informatives. Toute reprise de contenu, capture d&apos;écran
          à des fins commerciales ou création de produits dérivés nécessite une
          autorisation préalable.
        </p>
      </ContentBlock>

      <ContentBlock title="Contact">
        <p>
          Pour toute demande relative aux droits d&apos;auteur ou à
          l&apos;utilisation de la marque, contactez{" "}
          <a href="mailto:legal@propify.com" className="text-primary hover:underline">
            legal@propify.com
          </a>
          .
        </p>
        <p>
          Consultez également nos{" "}
          <Link href="/legal/terms" className="text-primary hover:underline">
            conditions d&apos;utilisation
          </Link>{" "}
          et notre{" "}
          <Link href="/legal/privacy" className="text-primary hover:underline">
            politique de confidentialité
          </Link>
          .
        </p>
      </ContentBlock>
    </SitePage>
  )
}
