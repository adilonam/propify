import { Header } from "@/components/propify/header"
import { ChallengesSection } from "@/components/sections/challenges"
import { DashboardPreviewSection } from "@/components/sections/dashboard-preview"
import { FaqSection } from "@/components/sections/faq"
import { Footer } from "@/components/sections/footer"
import { HeroSection } from "@/components/sections/hero"
import { KeyInfoSection } from "@/components/sections/key-info"
import { StatsBarSection } from "@/components/sections/stats-bar"
import { TrustSection } from "@/components/sections/trust"
import { WhyPropifySection } from "@/components/sections/why-propify"

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl space-y-20 px-4 py-16 md:space-y-28 md:px-12">
        <HeroSection />
        <StatsBarSection />
        <KeyInfoSection />
        <ChallengesSection />
        <WhyPropifySection />
        <DashboardPreviewSection />
        <TrustSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
