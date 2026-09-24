import { Reveal } from "@/components/effects/reveal"

const EQUITY_PATH =
  "M0,118 L48,105 L96,112 L144,78 L192,88 L240,58 L288,68 L336,38 L384,48 L432,22 L480,32 L528,12"

const METRICS = [
  { label: "Solde", value: "104 820€", tone: "white" as const },
  { label: "Profit", value: "+4,82%", tone: "green" as const },
  { label: "Drawdown", value: "1,90%", tone: "white" as const },
  { label: "Objectif restant", value: "3,18%", tone: "white" as const },
] as const

export function DashboardPreview() {
  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-preview-heading"
      className="scroll-mt-28 border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]"
    >
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
        <Reveal className="text-center">
          <h2
            id="dashboard-preview-heading"
            className="font-heading text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold tracking-tight text-[var(--text-white)]"
          >
            Votre dashboard, pensé pour progresser
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-[var(--text-muted)] sm:text-base">
            Suivez vos objectifs, votre drawdown et vos payouts en un coup
            d&apos;œil.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 font-label text-sm text-[var(--text-white)]">
                <span
                  className="size-2 rounded-full bg-[var(--success-green,#22c55e)]"
                  aria-hidden
                />
                <span className="font-semibold">Compte 100K · Actif</span>
              </p>
              <p className="font-label text-xs text-[var(--text-muted)] sm:text-sm">
                Phase 1 - Jour 6
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {METRICS.map((metric) => (
                <div key={metric.label} className="text-center sm:text-left">
                  <p
                    className={`font-heading text-xl font-bold tracking-tight sm:text-2xl ${
                      metric.tone === "green"
                        ? "text-[var(--success-green,#22c55e)]"
                        : "text-[var(--text-white)]"
                    }`}
                  >
                    {metric.value}
                  </p>
                  <p className="mt-1 font-label text-xs text-[var(--text-muted)]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 h-36 w-full sm:h-44" aria-hidden>
              <svg
                viewBox="0 0 528 130"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="home-test-chart-fill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--electric-blue)"
                      stopOpacity="0.28"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--electric-blue)"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                <path
                  d={`${EQUITY_PATH} L528,130 L0,130 Z`}
                  fill="url(#home-test-chart-fill)"
                />
                <path
                  d={EQUITY_PATH}
                  fill="none"
                  stroke="var(--electric-blue)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
