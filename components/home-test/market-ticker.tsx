const TICKER = [
  { symbol: "XAUUSD", price: "2 648.10", change: "+0.42%", up: true },
  { symbol: "BTCUSD", price: "51 204", change: "+1.15%", up: true },
  { symbol: "NAS100", price: "19 842", change: "-0.28%", up: false },
  { symbol: "EURUSD", price: "1.0842", change: "+0.06%", up: true },
  { symbol: "US30", price: "38 920", change: "-0.11%", up: false },
] as const

export function MarketTicker() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-[var(--landing-border)] bg-[var(--landing-surface)]"
      aria-label="Aperçu des marchés (données de démonstration)"
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 py-3 sm:justify-between sm:gap-x-4 md:px-8">
        {TICKER.map((item) => (
          <li
            key={item.symbol}
            className="flex items-baseline gap-2 font-label text-xs sm:text-sm"
          >
            <span className="font-semibold tracking-wide text-[var(--text-white)]">
              {item.symbol}
            </span>
            <span className="tabular-nums text-[var(--text-main)]">
              {item.price}
            </span>
            <span
              className={`tabular-nums ${
                item.up
                  ? "text-[var(--success-green,#22c55e)]"
                  : "text-[var(--danger-red,#ef4444)]"
              }`}
            >
              {item.change}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
