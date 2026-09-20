import type { Metadata } from "next"

import { SitePage } from "@/components/layout/site-page"
import { ChallengesSection } from "@/components/sections/challenges"

export const metadata: Metadata = {
  title: "Challenges | PROPIFY",
  description:
    "Choisissez votre challenge PROPIFY — capital de 10K à 200K, formats 1-Step et 2-Step, règles visibles avant l'achat.",
}

export default function ChallengesPage() {
  return (
    <SitePage>
      <ChallengesSection showBrowseLink={false} />
    </SitePage>
  )
}
