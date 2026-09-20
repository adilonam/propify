import type { ReactNode } from "react"
import Link from "next/link"
import { MessageCircle } from "lucide-react"

import { Reveal } from "@/components/effects/reveal"

const MARKETS = [
  { name: "Tesla", ticker: "TSLA", src: "/images/markets/tesla.svg", dim: false },
  { name: "Bitcoin", ticker: "BTC", src: "/images/markets/btc.svg", dim: false },
  { name: "Apple", ticker: "AAPL", src: "/images/markets/apple.svg", dim: true },
  { name: "Ethereum", ticker: "ETH", src: "/images/markets/eth.svg", dim: false },
  { name: "Samsung", ticker: "SMSN", src: "/images/markets/samsung.svg", dim: true },
  { name: "Google", ticker: "GOOG", src: "/images/markets/google.svg", dim: false },
  { name: "Solana", ticker: "SOL", src: "/images/markets/sol.svg", dim: false },
  { name: "SpaceX", ticker: "SPACE", src: "/images/markets/spacex.svg", dim: true },
  { name: "Cardano", ticker: "ADA", src: "/images/markets/ada.svg", dim: true },
  { name: "Amazon", ticker: "AMZN", src: "/images/markets/amazon.svg", dim: false },
  { name: "Dogecoin", ticker: "DOGE", src: "/images/markets/doge.svg", dim: true },
  { name: "Microsoft", ticker: "MSFT", src: "/images/markets/microsoft.svg", dim: false },
  { name: "Coinbase", ticker: "COIN", src: "/images/markets/coinbase.svg", dim: true },
  { name: "Nasdaq 100", ticker: "US100", src: "/images/markets/nasdaq.svg", dim: false },
  { name: "Netflix", ticker: "NFLX", src: "/images/markets/netflix.svg", dim: true },
  { name: "NVIDIA", ticker: "NVDA", src: "/images/markets/nvidia.svg", dim: false },
] as const

const PLATFORM_TILES = [
  {
    name: "cTrader",
    src: "/images/platforms/cTrader.webp",
    className: "left-[8%] top-[8%] rotate-[-8deg]",
  },
  {
    name: "TradeLocker",
    src: "/images/platforms/tradelocker.svg",
    className: "left-[18%] top-[38%] rotate-[6deg]",
  },
  {
    name: "Propify",
    src: "/images/logo.png",
    className: "right-[14%] top-[36%] rotate-[-4deg]",
  },
  {
    name: "MetaTrader 5",
    src: "/images/platforms/meta-trader-5.svg",
    className: "left-[28%] bottom-[6%] rotate-[3deg]",
  },
] as const

function buildMarketRow(start: number, count: number) {
  return Array.from({ length: count }, (_, i) => MARKETS[(start + i) % MARKETS.length])
}

const MARKET_ROWS = [
  buildMarketRow(4, 6),
  buildMarketRow(8, 6),
  buildMarketRow(12, 6),
  buildMarketRow(2, 6),
  buildMarketRow(0, 6),
] as const

function MarketPill({
  name,
  ticker,
  src,
  dim,
}: {
  name: string
  ticker: string
  src: string
  dim: boolean
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] ${
        dim
          ? "border-white/[0.06] bg-white/[0.04] opacity-45"
          : "border-white/[0.12] bg-white/[0.08] opacity-100"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- local market marks */}
      <img src={src} alt="" className="size-5 shrink-0 rounded-full object-contain" />
      <span className="font-heading text-sm font-medium text-white">{name}</span>
      <span className="font-label text-[0.65rem] tracking-wider text-white/45">
        {ticker}
      </span>
    </span>
  )
}

function MarketsRowSegment({
  markets,
  keyPrefix,
  duplicate = false,
}: {
  markets: readonly (typeof MARKETS)[number][]
  keyPrefix: string
  duplicate?: boolean
}) {
  return (
    <div
      aria-hidden={duplicate || undefined}
      className={`flex shrink-0 items-center gap-2.5 pr-2.5 sm:gap-3 sm:pr-3 ${
        duplicate ? "bento-marquee-duplicate" : ""
      }`}
    >
      {markets.map((market, index) => (
        <MarketPill key={`${keyPrefix}-${market.ticker}-${index}`} {...market} />
      ))}
    </div>
  )
}

function MarketsRow({
  markets,
  direction,
  durationSec,
  rowIndex,
}: {
  markets: readonly (typeof MARKETS)[number][]
  direction: "ltr" | "rtl"
  durationSec: number
  rowIndex: number
}) {
  const trackClass =
    direction === "rtl"
      ? "animate-bento-marquee-rtl"
      : "animate-bento-marquee-ltr"

  return (
    <div className="bento-marquee-row overflow-hidden">
      <div
        className={`flex w-max ${trackClass}`}
        style={{ animationDuration: `${durationSec}s` }}
      >
        <MarketsRowSegment markets={markets} keyPrefix={`r${rowIndex}-a`} />
        <MarketsRowSegment
          markets={markets}
          keyPrefix={`r${rowIndex}-b`}
          duplicate
        />
      </div>
    </div>
  )
}

function MarketsCloud() {
  return (
    <div
      aria-hidden
      className="relative flex min-h-[11rem] flex-col justify-center gap-2.5 overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:min-h-[13rem] sm:gap-3 md:min-h-[15rem]"
    >
      {MARKET_ROWS.map((row, index) => (
        <MarketsRow
          key={index}
          markets={row}
          rowIndex={index}
          direction={index % 2 === 0 ? "rtl" : "ltr"}
          durationSec={28 + (index % 3) * 6}
        />
      ))}
    </div>
  )
}

function PlatformsStack() {
  return (
    <div aria-hidden className="relative mt-auto h-44 w-full sm:h-52">
      {PLATFORM_TILES.map((tile) => (
        <div
          key={tile.name}
          className={`absolute flex h-16 w-[42%] items-center justify-center rounded-2xl border border-white/15 bg-white/[0.07] px-4 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-md sm:h-[4.5rem] ${tile.className}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- local platform marks */}
          <img
            src={tile.src}
            alt=""
            className="max-h-8 w-auto max-w-full object-contain opacity-95"
          />
        </div>
      ))}
    </div>
  )
}

function PayoutsVisual() {
  return (
    <div
      aria-hidden
      className="relative h-36 overflow-hidden sm:h-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(31,143,232,0.35),transparent_55%),radial-gradient(ellipse_at_70%_60%,rgba(18,185,251,0.25),transparent_50%)]" />
      <div className="animate-bento-streak absolute inset-x-[-20%] top-[28%] h-px bg-gradient-to-r from-transparent via-[var(--electric-blue)]/80 to-transparent" />
      <div className="animate-bento-streak absolute inset-x-[-10%] top-[42%] h-[2px] bg-gradient-to-r from-transparent via-[var(--blue-glow)]/70 to-transparent [animation-delay:0.6s]" />
      <div className="animate-bento-streak absolute inset-x-[-30%] top-[56%] h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/75 to-transparent [animation-delay:1.2s]" />
      <div className="animate-bento-streak absolute inset-x-[-15%] top-[68%] h-[2px] bg-gradient-to-r from-transparent via-[var(--electric-blue)]/60 to-transparent [animation-delay:1.8s]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--landing-surface)]" />
    </div>
  )
}

function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <Reveal
      delay={delay}
      className={`relative flex flex-col overflow-hidden rounded-3xl border border-[var(--landing-border)] bg-[var(--landing-surface)] ${className}`}
    >
      {children}
    </Reveal>
  )
}

function CardCopy({
  title,
  description,
  className = "",
}: {
  title: string
  description: ReactNode
  className?: string
}) {
  return (
    <div className={`mt-auto space-y-2 p-6 md:p-7 ${className}`}>
      <h3 className="font-heading text-xl font-bold tracking-tight text-white md:text-2xl">
        {title}
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-white/60 md:text-[0.95rem]">
        {description}
      </p>
    </div>
  )
}

export function FeatureBentoSection() {
  return (
    <section
      aria-labelledby="feature-bento-heading"
      className="relative overflow-hidden border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]"
    >
      <h2 id="feature-bento-heading" className="sr-only">
        Ce que Propify met à votre disposition
      </h2>

      <div className="relative mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <BentoCard className="lg:col-span-3" delay={0}>
            <MarketsCloud />
            <CardCopy
              title="Un compte unique, tous les actifs."
              description={
                <>
                  Accédez à{" "}
                  <span className="font-semibold text-white/85">1&nbsp;300+ marchés</span>
                  {" : de la "}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/markets/btc.svg"
                    alt=""
                    className="mx-0.5 inline size-4 align-[-0.15em] rounded-full"
                  />
                  {" crypto jusqu&apos;aux "}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/markets/nvidia.svg"
                    alt=""
                    className="mx-0.5 inline size-4 align-[-0.15em] rounded-full"
                  />
                  {" actions — et au-delà."}
                </>
              }
            />
          </BentoCard>

          <BentoCard className="lg:col-span-2" delay={80}>
            <CardCopy
              className="mt-0"
              title="Sur les plateformes que vous maîtrisez"
              description="MetaTrader 5 et cTrader — restez sur l'outil avec lequel vous êtes déjà à l'aise."
            />
            <div className="px-4 pb-6 sm:px-6">
              <PlatformsStack />
            </div>
          </BentoCard>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <BentoCard delay={0}>
            <PayoutsVisual />
            <CardCopy
              title="Versements traités sans traîner"
              description={
                <>
                  Plus de 10,5&nbsp;M$ déjà versés et attestés aux traders, crédités
                  directement sur votre compte bancaire ou wallet crypto.
                </>
              }
            />
          </BentoCard>

          <BentoCard delay={80}>
            <div className="relative h-36 overflow-hidden sm:h-40">
              {/* eslint-disable-next-line @next/next/no-img-element -- local bento asset */}
              <img
                src="/images/bento/server.png"
                alt=""
                className="absolute inset-0 size-full object-cover object-[70%_center]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--landing-surface)]" />
            </div>
            <CardCopy
              title="Infrastructure maison"
              description="Plateforme, dashboard et moteur de risque conçus et opérés en interne. Une infra solide, calibrée pour les traders exigeants."
            />
          </BentoCard>

          <BentoCard className="min-h-[16rem]" delay={160}>
            {/* eslint-disable-next-line @next/next/no-img-element -- local bento asset */}
            <img
              src="/images/bento/user-pro.png"
              alt=""
              className="absolute inset-0 size-full object-cover object-[center_25%]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
            <div className="relative mt-auto flex items-end justify-between gap-4 p-6 md:p-7">
              <div className="space-y-1">
                <p className="text-sm text-white/65">Besoin d&apos;un coup de main&nbsp;?</p>
                <h3 className="font-heading text-xl font-bold tracking-tight text-white md:text-2xl">
                  Fin est dispo, à toute heure
                </h3>
              </div>
              <Link
                href="/support"
                aria-label="Écrire à Fin"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 hover:bg-white/90"
              >
                <MessageCircle className="size-5" strokeWidth={2.25} />
              </Link>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}
