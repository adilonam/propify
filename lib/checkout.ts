import type { ChallengeApiItem, ChallengeStepType } from "@/lib/challenges-ui"

export type CheckoutAddon = {
  id: string
  label: string
  percent: number
}

/** Percentage add-ons applied as total = base * (1 + sum(percents)/100). */
export const CHECKOUT_ADDONS: readonly CheckoutAddon[] = [
  {
    id: "reward-split-100",
    label: "Reward Split 100%",
    percent: 30,
  },
  {
    id: "swap-free",
    label: "Compte sans swap",
    percent: 15,
  },
] as const

export const CHECKOUT_ADDON_IDS = new Set(
  CHECKOUT_ADDONS.map((addon) => addon.id)
)

export type CheckoutOption = {
  id: string
  label: string
}

/** UI-only evaluation options (not separate catalog SKUs). */
export const CHECKOUT_OPTIONS: readonly CheckoutOption[] = [
  { id: "standard", label: "Évaluation standard" },
  { id: "priority", label: "Accès prioritaire" },
] as const

export function stepTypeDisplayLabel(stepType: ChallengeStepType): string {
  return stepType === "TWO_STEP" ? "2-Step — Regular" : "1-Step — Regular"
}

export function findChallenge(
  challenges: ChallengeApiItem[],
  stepType: ChallengeStepType,
  accountSize: number
): ChallengeApiItem | null {
  return (
    challenges.find(
      (c) => c.stepType === stepType && c.accountSize === accountSize
    ) ?? null
  )
}

export function accountSizesForStep(
  challenges: ChallengeApiItem[],
  stepType: ChallengeStepType
): Array<{ accountSize: number; fee: string; currency: string }> {
  const bySize = new Map<
    number,
    { accountSize: number; fee: string; currency: string }
  >()
  for (const c of challenges) {
    if (c.stepType !== stepType) continue
    const existing = bySize.get(c.accountSize)
    if (!existing || Number(c.fee) < Number(existing.fee)) {
      bySize.set(c.accountSize, {
        accountSize: c.accountSize,
        fee: c.fee,
        currency: c.currency,
      })
    }
  }
  return Array.from(bySize.values()).sort(
    (a, b) => a.accountSize - b.accountSize
  )
}

export function sumAddonPercents(selectedIds: readonly string[]): number {
  return CHECKOUT_ADDONS.filter((addon) => selectedIds.includes(addon.id)).reduce(
    (sum, addon) => sum + addon.percent,
    0
  )
}

/**
 * Live checkout total.
 * total = basePrice * (1 + sum(selectedAddonPercents) / 100)
 */
export function computeCheckoutTotal(
  basePrice: number,
  selectedAddonIds: readonly string[]
): {
  basePrice: number
  addonPercentTotal: number
  multiplier: number
  total: number
} {
  const addonPercentTotal = sumAddonPercents(selectedAddonIds)
  const multiplier = 1 + addonPercentTotal / 100
  const total = Math.round(basePrice * multiplier * 100) / 100
  return { basePrice, addonPercentTotal, multiplier, total }
}

export function resolveAddonPercentTotal(
  selectedAddonIds: readonly string[] | undefined
): number {
  if (!selectedAddonIds?.length) return 0
  const valid = selectedAddonIds.filter((id) => CHECKOUT_ADDON_IDS.has(id))
  return sumAddonPercents(valid)
}
