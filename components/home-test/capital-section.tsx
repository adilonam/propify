import { CapitalPicker } from "@/components/home-test/capital-picker"
import { MarketTicker } from "@/components/home-test/market-ticker"
import { PressLogos } from "@/components/home-test/press-logos"
import { StatsKpis } from "@/components/home-test/stats-kpis"

export function CapitalSection() {
  return (
    <section
      id="capital"
      className="scroll-mt-28 border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-16 md:gap-16 md:px-8 md:py-24">
        <CapitalPicker />
        <StatsKpis />
        <MarketTicker />
        <PressLogos />
      </div>
    </section>
  )
}
