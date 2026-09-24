import type { Metadata } from "next"

import { auth } from "@/auth"
import { CapitalSection } from "@/components/home-test/capital-section"
import { CommunityTestimonials } from "@/components/home-test/community-testimonials"
import { DashboardPreview } from "@/components/home-test/dashboard-preview"
import { FinalCta } from "@/components/home-test/final-cta"
import { HomeTestHero } from "@/components/home-test/hero"
import { LiveActivity } from "@/components/home-test/live-activity"
import { RatingsJourney } from "@/components/home-test/ratings-journey"
import { WhyPropify } from "@/components/home-test/why-propify"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "Propify — Home Test",
  description:
    "Prop trading nouvelle génération. Trade Smarter. Scale Faster. Challenges remboursés à la réussite.",
}

export default async function HomeTestPage() {
  const session = await auth()

  return (
    <div className="bg-[var(--landing-bg)]">
      <HomeTestHero />
      <CapitalSection />
      <WhyPropify />
      <RatingsJourney />
      <DashboardPreview />
      <CommunityTestimonials />
      <LiveActivity />
      <FinalCta />
      <Footer isAuthenticated={Boolean(session?.user)} />
    </div>
  )
}
