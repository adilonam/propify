"use client"

import * as React from "react"
import Link from "next/link"

import { Reveal } from "@/components/effects/reveal"
import {
  type ChallengeApiItem,
  formatAccountSize,
  formatPrice,
  uniqueAccountSizes,
} from "@/lib/challenges-ui"
import { cn } from "@/lib/utils"

const DEMO_TIERS = [
  { accountSize: 10_000, fee: "99", currency: "EUR" },
  { accountSize: 25_000, fee: "249", currency: "EUR" },
  { accountSize: 50_000, fee: "389", currency: "EUR" },
  { accountSize: 100_000, fee: "589", currency: "EUR" },
  { accountSize: 200_000, fee: "1079", currency: "EUR" },
] as const

function formatTierPrice(fee: string, currency: string): string {
  const value = Number(fee)
  if (Number.isNaN(value)) return formatPrice(fee, currency)
  const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : `${currency} `
  return `${value.toLocaleString("fr-FR", {
    maximumFractionDigits: 0,
  })}${symbol}`
}

export function CapitalPicker() {
  const [tiers, setTiers] = React.useState<
    Array<{ accountSize: number; fee: string; currency: string }>
  >([...DEMO_TIERS])
  const [selected, setSelected] = React.useState(10_000)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false

    fetch("/api/challenges")
      .then((res) => res.json())
      .then((data: ChallengeApiItem[]) => {
        if (cancelled) return
        const list = Array.isArray(data) ? data : []
        const twoStep = list.filter((c) => c.stepType === "TWO_STEP")
        const source = twoStep.length > 0 ? twoStep : list
        const sizes = uniqueAccountSizes(source)
        if (sizes.length > 0) {
          setTiers(sizes)
          const preferred =
            sizes.find((s) => s.accountSize === 10_000)?.accountSize ??
            sizes[0]!.accountSize
          setSelected(preferred)
        }
      })
      .catch(() => {
        /* keep demo tiers */
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const active = tiers.find((t) => t.accountSize === selected) ?? tiers[0]
  const sizeLabel = active ? formatAccountSize(active.accountSize) : "10K"

  return (
    <Reveal className="mx-auto w-full max-w-4xl">
      <div className="rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] px-5 py-8 sm:px-8 sm:py-10">
        <h2 className="text-center font-label text-xs font-semibold tracking-[0.18em] text-[var(--text-white)] uppercase sm:text-sm">
          Choisissez votre capital de départ
        </h2>

        <div
          className={cn(
            "mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5",
            loading && "opacity-80"
          )}
          role="group"
          aria-label="Capital de départ"
        >
          {tiers.map((tier) => {
            const isSelected = tier.accountSize === selected
            return (
              <button
                key={tier.accountSize}
                type="button"
                onClick={() => setSelected(tier.accountSize)}
                className={cn(
                  "rounded-xl px-3.5 py-2.5 font-label text-xs font-semibold tracking-wide transition-colors sm:px-4 sm:text-sm",
                  isSelected
                    ? "bg-[var(--primary-blue)] text-white shadow-[0_0_20px_color-mix(in_srgb,var(--primary-blue)_40%,transparent)]"
                    : "bg-[color-mix(in_srgb,var(--landing-bg)_70%,transparent)] text-[var(--text-white)] ring-1 ring-[var(--landing-border)] hover:ring-[var(--primary-blue)]/50"
                )}
              >
                {formatAccountSize(tier.accountSize)} /{" "}
                {formatTierPrice(tier.fee, tier.currency)}
              </button>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
          <Link
            href="/challenges"
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--primary-blue)] px-8 py-3.5 font-heading text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:px-10 sm:text-base"
          >
            Lancer le challenge {sizeLabel}
          </Link>
          <p className="text-center font-label text-xs text-[var(--text-muted)] sm:text-left sm:text-sm">
            Remboursé à la validation · sans engagement
          </p>
        </div>
      </div>
    </Reveal>
  )
}
