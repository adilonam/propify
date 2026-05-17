const EQUITY_PATH =
  "M0,120 L40,100 L80,110 L120,70 L160,80 L200,50 L240,60 L280,30 L320,40 L360,20 L400,35 L440,10"

const OBJECTIVES = [
  { label: "Profit target", value: "62%", status: "neutral" as const },
  { label: "Daily loss", value: "OK", status: "success" as const },
  { label: "Max loss", value: "OK", status: "success" as const },
  { label: "Min days", value: "4/4", status: "neutral" as const },
  { label: "KYC", value: "Validé", status: "success" as const },
]

const STATS = [
  { label: "Balance", value: "$104,820.40" },
  { label: "Profit Target", value: "62%" },
  { label: "Max Drawdown", value: "3.2%" },
  { label: "Next Payout", value: "€7,240" },
] as const

export function DashboardPreviewSection() {
  return (
    <section id="dashboard" className="scroll-mt-24 space-y-8">
      <div className="space-y-2 text-center md:text-left">
        <h2 className="font-heading text-4xl font-bold text-on-surface md:text-5xl">
          Dashboard trader ultra lisible
        </h2>
        <p className="text-lg text-on-surface-variant">
          Les chiffres importants ressortent directement, sans être perdus dans
          les effets.
        </p>
      </div>

      <div className="glass-card overflow-hidden rounded-2xl p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-heading text-xl font-bold text-on-surface">
            PROPIFY Dashboard
          </h3>
          <span className="font-label text-sm text-primary">Account 100K</span>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-surface-container-high p-4"
            >
              <p className="font-label text-xs text-on-surface-variant">
                {stat.label}
              </p>
              <p className="font-heading mt-1 text-xl font-bold text-on-surface md:text-2xl">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl bg-surface-container-high p-4 lg:col-span-2">
            <p className="mb-4 font-label text-sm text-on-surface-variant">
              Equity Curve
            </p>
            <svg
              viewBox="0 0 440 140"
              className="h-40 w-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4a8eff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#4a8eff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`${EQUITY_PATH} L440,140 L0,140 Z`}
                fill="url(#chartFill)"
              />
              <path
                d={EQUITY_PATH}
                fill="none"
                stroke="#4a8eff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="rounded-xl bg-surface-container-high p-4">
            <p className="mb-4 font-label text-sm text-on-surface-variant">
              Objectifs
            </p>
            <ul className="space-y-3">
              {OBJECTIVES.map((obj) => (
                <li
                  key={obj.label}
                  className="flex items-center justify-between font-label text-sm"
                >
                  <span className="text-on-surface-variant">{obj.label}</span>
                  <span
                    className={
                      obj.status === "success"
                        ? "font-semibold text-secondary-fixed"
                        : "text-on-surface"
                    }
                  >
                    {obj.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
