import { auth } from "@/auth"
import { SkylineHero } from "@/components/skyline/skyline-hero"
import { ChallengesSection } from "@/components/sections/challenges"
import { Footer } from "@/components/sections/footer"
import { FeatureBentoSection } from "@/components/sections/feature-bento"
import { GlobalTeamSection } from "@/components/sections/global-team"
import { HowItWorksSection } from "@/components/sections/how-it-works"
import { PlatformsTrustSection } from "@/components/sections/platforms-trust"
import { TradeYourWaySection } from "@/components/sections/trade-your-way"
import { VerifiedPayoutsSection } from "@/components/sections/verified-payouts"

export default async function Page() {
  const session = await auth()

  return (
    <div className="bg-[var(--landing-bg)]">
      <SkylineHero />
      <PlatformsTrustSection />
      <FeatureBentoSection />
      <main className="border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]">
        <div className="mx-auto max-w-7xl space-y-24 px-4 py-20 md:space-y-32 md:px-12 md:py-28">
          <ChallengesSection />
        </div>
        <VerifiedPayoutsSection />
        <HowItWorksSection />
      </main>
      <TradeYourWaySection />
      <GlobalTeamSection />
      <Footer isAuthenticated={Boolean(session?.user)} />
    </div>
  )
}
