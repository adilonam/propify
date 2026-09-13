function Stars({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className="size-3.5 fill-[var(--landing-gold)] sm:size-4"
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  )
}

const PLATFORMS = [
  {
    name: "MetaTrader 5",
    src: "/images/platforms/meta-trader-5.svg",
    height: 36,
  },
  {
    name: "cTrader",
    src: "/images/platforms/cTrader.webp",
    height: 36,
  },
  {
    name: "TradeLocker",
    src: "/images/platforms/tradelocker.svg",
    height: 28,
  },
  {
    name: "Match-Trader",
    src: "/images/platforms/match-trader.svg",
    height: 40,
  },
] as const

const RATINGS = [
  {
    name: "Google",
    src: "/images/ratings/google-g-2025.webp",
    score: "4.7/5",
    height: 28,
    showName: true,
  },
  {
    name: "Feefo",
    src: "/images/ratings/feefo.svg",
    score: "4.9/5",
    height: 26,
  },
  {
    name: "Myfxbook",
    src: "/images/ratings/myfxbook.svg",
    score: "4.8/5",
    height: 24,
  },
  {
    name: "TTP — Most Trusted Prop Firm of the Year",
    src: "/images/ratings/ttp.webp",
    score: "4.6/5",
    height: 52,
  },
] as const

export function PlatformsTrustSection() {
  return (
    <section
      aria-labelledby="platforms-trust-heading"
      className="relative overflow-hidden border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--landing-purple)_22%,transparent),transparent_70%)]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-16 md:gap-14 md:px-8 md:py-20 lg:gap-16 lg:py-24">
        <h2
          id="platforms-trust-heading"
          className="max-w-3xl text-center font-heading text-[clamp(1.75rem,4.5vw,2.75rem)] leading-tight font-bold tracking-tight text-white"
        >
          Tout ce qu&apos;il faut pour trader financé
        </h2>

        <ul className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-8 sm:gap-x-10 md:gap-x-12 lg:gap-x-14">
          {PLATFORMS.map((platform) => (
            <li key={platform.name} className="flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- local platform marks */}
              <img
                src={platform.src}
                alt={platform.name}
                className="block w-auto max-w-[9.5rem] object-contain opacity-95"
                style={{ height: platform.height }}
                loading="lazy"
              />
            </li>
          ))}
        </ul>

        <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {RATINGS.map((rating) => (
            <li
              key={rating.name}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] px-5 py-6"
            >
              <div className="flex min-h-14 items-center justify-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element -- local rating marks */}
                <img
                  src={rating.src}
                  alt={"showName" in rating && rating.showName ? "" : rating.name}
                  className="block w-auto max-w-[9rem] object-contain"
                  style={{ height: rating.height }}
                  loading="lazy"
                />
                {"showName" in rating && rating.showName ? (
                  <span className="font-heading text-lg font-semibold tracking-tight text-white">
                    {rating.name}
                  </span>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <Stars className="flex items-center gap-0.5" />
                <span className="font-label text-sm text-white/90">
                  {rating.score}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
