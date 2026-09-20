import type { ReactNode } from "react"

import { Reveal } from "@/components/effects/reveal"

function Stars({ size = "md" }: { size?: "sm" | "md" }) {
  const cls = size === "sm" ? "size-3" : "size-5"
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className={`${cls} fill-[var(--landing-gold)]`}
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  )
}

function CardShell({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--landing-border)] bg-[var(--landing-card)] p-6 md:p-8"
    >
      {children}
    </Reveal>
  )
}

function LongShortButtons({ muted = false }: { muted?: boolean }) {
  return (
    <div className="mt-auto flex gap-1.5 pt-2">
      <span
        className={`flex-1 rounded-md py-1 text-center font-label text-[10px] font-semibold tracking-wide ${
          muted
            ? "border border-emerald-500/25 text-emerald-500/50"
            : "bg-emerald-500/20 text-emerald-400"
        }`}
      >
        Long
      </span>
      <span
        className={`flex-1 rounded-md py-1 text-center font-label text-[10px] font-semibold tracking-wide ${
          muted
            ? "border border-rose-500/25 text-rose-500/50"
            : "bg-rose-500/20 text-rose-400"
        }`}
      >
        Short
      </span>
    </div>
  )
}

function AssetMiniCard({
  name,
  subtitle,
  price,
  change,
  icon,
  showButtons,
  mutedButtons,
}: {
  name: string
  subtitle?: string
  price: string
  change?: string
  icon: ReactNode
  showButtons?: boolean
  mutedButtons?: boolean
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/[0.06] bg-[var(--landing-surface)] p-3">
      <div className="flex items-start gap-2">
        <div className="shrink-0">{icon}</div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-xs font-semibold text-white sm:text-sm">
            {name}
          </p>
          {subtitle ? (
            <p className="truncate font-label text-[10px] text-[var(--text-muted)]">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-1">
        <span className="font-heading text-sm font-semibold text-white">{price}</span>
        {change ? (
          <span className="font-label text-[10px] font-medium text-emerald-400">
            ↑ {change}
          </span>
        ) : null}
      </div>
      {showButtons ? <LongShortButtons muted={mutedButtons} /> : (
        <div className="mt-3 space-y-1.5" aria-hidden>
          <div className="h-1 w-full rounded-full bg-white/[0.06]" />
          <div className="h-1 w-2/3 rounded-full bg-white/[0.04]" />
        </div>
      )}
    </div>
  )
}

function MarketIcon({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- local market marks
    <img src={src} alt={alt} className="size-7 rounded-full object-contain sm:size-8" />
  )
}

function FlagPair() {
  return (
    <span className="relative inline-flex size-7 sm:size-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/flags/eu.svg"
        alt=""
        className="absolute top-0 left-0 size-4 rounded-sm object-cover ring-1 ring-black/40 sm:size-5"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/flags/us.svg"
        alt=""
        className="absolute right-0 bottom-0 size-4 rounded-sm object-cover ring-1 ring-black/40 sm:size-5"
      />
    </span>
  )
}

function CfdsVisual() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
      <AssetMiniCard
        name="Bitcoin"
        subtitle="BTC/USD"
        price="$118,345"
        change="+1.18%"
        icon={<MarketIcon src="/images/markets/btc.svg" alt="" />}
        showButtons
      />
      <AssetMiniCard
        name="NVIDIA"
        price="$172.40"
        icon={<MarketIcon src="/images/markets/nvidia.svg" alt="" />}
      />
      <AssetMiniCard
        name="EUR/USD"
        subtitle="Forex"
        price="1.0877"
        change="+0.20%"
        icon={<FlagPair />}
        showButtons
        mutedButtons
      />
      <AssetMiniCard
        name="Nasdaq 100"
        price="$21,830"
        icon={<MarketIcon src="/images/markets/nasdaq.svg" alt="" />}
      />
    </div>
  )
}

function FuturesChart() {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--landing-surface)] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/markets/nasdaq.svg"
            alt=""
            className="size-8 rounded-full object-contain"
          />
          <div>
            <p className="font-heading text-sm font-semibold text-white">NQ</p>
            <p className="font-heading text-base font-bold text-white">22,585.60</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-label text-xs font-medium text-emerald-400">+0.60%</span>
          <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        </div>
      </div>

      <svg
        viewBox="0 0 320 120"
        className="h-28 w-full"
        role="img"
        aria-label="Graphique NQ"
      >
        <defs>
          <linearGradient id="nq-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(52,211,153)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(52,211,153)" stopOpacity="0" />
          </linearGradient>
          <filter id="nq-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[24, 48, 72, 96].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="320"
            y2={y}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        ))}
        <path
          d="M0 78 C28 74, 42 88, 64 70 C86 52, 100 58, 120 48 C140 38, 158 62, 180 44 C202 26, 220 34, 244 28 C268 22, 286 40, 320 18"
          fill="none"
          stroke="rgb(52,211,153)"
          strokeWidth="2.25"
          filter="url(#nq-glow)"
        />
        <path
          d="M0 78 C28 74, 42 88, 64 70 C86 52, 100 58, 120 48 C140 38, 158 62, 180 44 C202 26, 220 34, 244 28 C268 22, 286 40, 320 18 V120 H0 Z"
          fill="url(#nq-fill)"
        />
        <circle cx="320" cy="18" r="4" fill="rgb(52,211,153)" />
      </svg>

      <div className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 font-label text-[10px] tracking-wide text-[var(--text-muted)] uppercase sm:text-[11px]">
        <span>24H HIGH: 22,723</span>
        <span>24H LOW: 22,239</span>
        <span>VOL: 1.1M</span>
      </div>
    </div>
  )
}

function UxMetric({
  label,
  value,
  hint,
  positive,
}: {
  label: string
  value: string
  hint?: string
  positive?: boolean
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
      <p className="font-label text-[10px] tracking-wide text-[var(--text-muted)] uppercase">
        {label}
      </p>
      <p
        className={`mt-1 font-heading text-sm font-semibold sm:text-base ${
          positive ? "text-emerald-400" : "text-white"
        }`}
      >
        {value}
      </p>
      {hint ? (
        <p className="mt-0.5 font-label text-[10px] text-[var(--text-muted)]">{hint}</p>
      ) : null}
    </div>
  )
}

function UxDashboard() {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--landing-surface)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
          <span className="font-heading text-xs font-semibold text-white sm:text-sm">
            Dashboard
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-md bg-white/[0.06] px-2 py-1 font-label text-[10px] font-medium text-white/70">
            Desktop
          </span>
          <span className="rounded-md border border-white/[0.08] px-2 py-1 font-label text-[10px] font-medium text-[var(--text-muted)]">
            Mobile
          </span>
        </div>
      </div>

      <div className="space-y-3 p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-2">
          <UxMetric label="P&L" value="+$2,480" positive />
          <UxMetric label="Drawdown" value="3.2%" hint="Max 10%" />
          <UxMetric label="Win rate" value="58%" />
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="font-heading text-xs font-semibold text-white">
              Challenge — Phase 1
            </p>
            <span className="font-label text-[10px] font-medium text-emerald-400">
              62%
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full w-[62%] rounded-full bg-emerald-400/80"
              aria-hidden
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Positions", "Historique", "Règles", "Support"].map((tab) => (
              <span
                key={tab}
                className="rounded-md border border-white/[0.06] px-2 py-1 font-label text-[10px] text-[var(--text-muted)]"
              >
                {tab}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TrustVisual() {
  return (
    <div className="mt-6 space-y-5">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            4.8/5
          </span>
          <Stars />
        </div>
        <p className="mt-2 font-label text-xs text-[var(--text-muted)] sm:text-sm">
          Retours authentifiés — Feefo, Google &amp; Myfxbook
        </p>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-[var(--landing-surface)] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/reviews/marco-d.jpg"
              alt=""
              className="size-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-heading text-sm font-semibold text-white">Marco D.</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/flags/it.svg"
                  alt=""
                  className="h-3 w-4 rounded-[2px] object-cover"
                />
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ratings/myfxbook.svg"
            alt="Myfxbook"
            className="h-4 w-auto opacity-90"
          />
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/80">
          Évaluation en deux étapes validée en neuf jours.
        </p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <Stars size="sm" />
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 font-label text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">
            <svg viewBox="0 0 16 16" className="size-3 fill-current" aria-hidden>
              <path d="M6.5 11.2L3.3 8l1.1-1.1 2.1 2.1 5.1-5.1L12.7 5l-6.2 6.2z" />
            </svg>
            Vérifié
          </span>
        </div>
      </div>
    </div>
  )
}

export function TradeYourWaySection() {
  return (
    <section
      aria-labelledby="trade-your-way-heading"
      className="relative overflow-hidden border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20 lg:py-24">
        <Reveal>
          <h2
            id="trade-your-way-heading"
            className="mb-10 text-center font-heading text-[clamp(1.75rem,4.5vw,2.75rem)] leading-tight font-bold tracking-tight text-white md:mb-14"
          >
            Tradez selon vos règles
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <CardShell delay={0}>
            <h3 className="font-heading text-xl font-bold tracking-tight text-white md:text-2xl">
              CFDs
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-muted)] md:text-[0.95rem]">
              Ouvrez des positions long ou short sur 1&nbsp;300+ instruments — forex, crypto,
              indices, matières premières et actions — avec des spreads de niveau
              institutionnel, sur le capital Propify.
            </p>
            <CfdsVisual />
          </CardShell>

          <CardShell delay={80}>
            <h3 className="font-heading text-xl font-bold tracking-tight text-white md:text-2xl">
              Futures
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-muted)] md:text-[0.95rem]">
              Contrats normalisés sur indices, matières premières et crypto. Les cours
              collent à la liquidité des exchanges, pas au carnet d&apos;un market maker.
              Long ou short, overnight comme le week-end.
            </p>
            <FuturesChart />
          </CardShell>

          <CardShell delay={0}>
            <h3 className="font-heading text-xl font-bold tracking-tight text-white md:text-2xl">
              Une interface limpide, faite pour trader
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-muted)] md:text-[0.95rem]">
              Tableau de bord clair, parcours épuré, finitions soignées — desktop et
              mobile. Prise en main rapide, et une équipe support prête quand il le faut.
            </p>
            <UxDashboard />
          </CardShell>

          <CardShell delay={80}>
            <h3 className="font-heading text-xl font-bold tracking-tight text-white md:text-2xl">
              La preuve vient des traders financés
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-muted)] md:text-[0.95rem]">
              Témoignages authentiques de traders financés — publiés sur Feefo, Google et
              Myfxbook, sans sélection à la carte.
            </p>
            <TrustVisual />
          </CardShell>
        </div>
      </div>
    </section>
  )
}
