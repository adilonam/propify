import type { Metadata } from "next"

import { SitePage } from "@/components/layout/site-page"
import { ContentBlock } from "@/components/pages/content-block"
import { PageHero } from "@/components/pages/page-hero"

export const metadata: Metadata = {
  title: "Politique de confidentialité | PROPIFY",
  description:
    "Comment PROPIFY collecte, utilise et protège vos données personnelles.",
}

export default function PrivacyPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow="Légal"
        title="Politique de confidentialité"
        description="Chez PROPIFY, la transparence commence avant l'inscription. Cette politique décrit comment vos données sont traitées."
      />

      <ContentBlock title="Données collectées">
        <p>
          Lors de votre inscription, nous collectons les informations nécessaires
          à la création de votre compte : nom, adresse email, et données de
          vérification d&apos;identité (KYC) requises pour le traitement des
          payouts.
        </p>
        <p>
          Nous enregistrons également les données techniques liées à votre
          utilisation de la plateforme : logs de connexion, activité sur le
          dashboard et historique des commandes de challenges.
        </p>
      </ContentBlock>

      <ContentBlock title="Utilisation des données">
        <ul className="list-inside list-disc space-y-2">
          <li>Gestion de votre compte trader et de vos challenges</li>
          <li>Traitement des paiements et des récompenses</li>
          <li>Support client par live chat, email et WhatsApp</li>
          <li>Amélioration de la plateforme et prévention de la fraude</li>
          <li>Respect des obligations légales et réglementaires</li>
        </ul>
      </ContentBlock>

      <ContentBlock title="Partage et conservation">
        <p>
          Vos données ne sont vendues à aucun tiers. Elles peuvent être partagées
          avec nos prestataires de paiement et de vérification d&apos;identité,
          uniquement dans le cadre strict de la prestation de service.
        </p>
        <p>
          Les données sont conservées pendant la durée de votre relation
          contractuelle, puis archivées conformément aux obligations légales
          applicables.
        </p>
      </ContentBlock>

      <ContentBlock title="Vos droits">
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
          rectification, de suppression et de portabilité de vos données. Pour
          exercer ces droits, contactez-nous à privacy@propify.com.
        </p>
      </ContentBlock>
    </SitePage>
  )
}
