export type ChallengeStepType = "ONE_STEP" | "TWO_STEP"

export type ChallengeApiItem = {
  id: string
  challengeId: string
  title: string
  accountSize: number
  fee: string
  currency: string
  stepType: ChallengeStepType
  stepCount: number
  profitTargetPercent: string
  dailyLossPercent: string
  maxLossPercent: string
  minTradingDays: number
  isPopular: boolean
  isBestChoice: boolean
  isActive: boolean
  sortOrder: number
  steps?: Array<{
    id: string
    stepNumber: number
    profitTargetPercent: string
    dailyLossPercent: string
    maxLossPercent: string
    minTradingDays: number
  }>
}

const PRODUCT_IMAGE_SLUGS = ["oracle", "vanguard", "ember"] as const

export type ProductImageSlug = (typeof PRODUCT_IMAGE_SLUGS)[number]

/** Known account-size → product art (10K/25K Oracle, 50K/100K Vanguard, 200K Ember). */
const ACCOUNT_SIZE_IMAGE_TIERS: ReadonlyArray<{
  size: number
  slug: ProductImageSlug
}> = [
  { size: 10_000, slug: "oracle" },
  { size: 25_000, slug: "oracle" },
  { size: 50_000, slug: "vanguard" },
  { size: 100_000, slug: "vanguard" },
  { size: 200_000, slug: "ember" },
]

/** Platforms shown for visual preference only — not stored on Challenge. */
export const CHALLENGE_PLATFORMS = [
  {
    id: "mt5",
    name: "MetaTrader 5",
    src: "/images/platforms/meta-trader-5.svg",
  },
  {
    id: "tradelocker",
    name: "TradeLocker",
    src: "/images/platforms/tradelocker.svg",
  },
  {
    id: "ctrader",
    name: "cTrader",
    src: "/images/platforms/cTrader.webp",
  },
] as const

export function formatAccountSize(size: number): string {
  if (size >= 1_000_000) {
    const millions = size / 1_000_000
    return Number.isInteger(millions) ? `${millions}M` : `${millions}M`
  }
  if (size >= 1_000) {
    const thousands = size / 1_000
    return Number.isInteger(thousands) ? `${thousands}K` : `${thousands}K`
  }
  return String(size)
}

export function formatPrice(amount: string | number, currency: string): string {
  const value = typeof amount === "string" ? Number(amount) : amount
  const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : `${currency} `
  return `${symbol}${value.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function formatPercent(value: string | number): string {
  const n = typeof value === "string" ? Number(value) : value
  if (Number.isNaN(n)) return String(value)
  return `${n.toLocaleString("fr-FR", {
    maximumFractionDigits: 2,
  })}%`
}

/** Normalize account size to absolute dollars (accepts 10 / "10K" / 10000). */
export function normalizeAccountSize(size: number | string): number {
  if (typeof size === "number" && Number.isFinite(size)) {
    // Compact forms like 10 / 25 / 50 / 100 / 200 → treat as *K
    if (size > 0 && size < 1_000) return Math.round(size * 1_000)
    return Math.round(size)
  }
  const raw = String(size).trim().toLowerCase().replace(/[\s,]/g, "")
  const kMatch = raw.match(/^(\d+(?:\.\d+)?)\s*k$/)
  if (kMatch) return Math.round(Number(kMatch[1]) * 1_000)
  const mMatch = raw.match(/^(\d+(?:\.\d+)?)\s*m$/)
  if (mMatch) return Math.round(Number(mMatch[1]) * 1_000_000)
  const n = Number(raw)
  if (!Number.isFinite(n) || n <= 0) return 10_000
  if (n < 1_000) return Math.round(n * 1_000)
  return Math.round(n)
}

/**
 * Map account size → product art.
 * 10K/25K → oracle, 50K/100K → vanguard, 200K → ember.
 * Other sizes → nearest known tier; invalid → oracle.
 */
export function productImageForChallenge(
  accountSize: number | string
): ProductImageSlug {
  const size = normalizeAccountSize(accountSize)
  const exact = ACCOUNT_SIZE_IMAGE_TIERS.find((t) => t.size === size)
  if (exact) return exact.slug

  let nearest = ACCOUNT_SIZE_IMAGE_TIERS[0]!
  let bestDist = Math.abs(size - nearest.size)
  for (const tier of ACCOUNT_SIZE_IMAGE_TIERS) {
    const dist = Math.abs(size - tier.size)
    if (dist < bestDist) {
      nearest = tier
      bestDist = dist
    }
  }
  return nearest.slug
}

export function productImageSrc(slug: ProductImageSlug): string {
  if (slug === "oracle") return "/images/products/oracle.png"
  if (slug === "vanguard") return "/images/products/vencor.png"
  return `/images/products/${slug}.webp`
}

export type ChallengeBadge = {
  label: string
  tone: "yellow" | "primary"
}

function hasNoDailyDrawdown(challenge: ChallengeApiItem): boolean {
  const daily = Number(challenge.dailyLossPercent)
  return !Number.isNaN(daily) && daily <= 0
}

export function badgeForChallenge(
  challenge: ChallengeApiItem,
  among: ChallengeApiItem[]
): ChallengeBadge | null {
  const art = productImageForChallenge(challenge.accountSize)

  if (art === "oracle") {
    return { label: "Tarif le plus bas", tone: "yellow" }
  }
  if (art === "vanguard") {
    return { label: "Part de gains renforcée", tone: "yellow" }
  }
  if (art === "ember" && hasNoDailyDrawdown(challenge)) {
    return { label: "Sans limite de perte journalière", tone: "yellow" }
  }

  if (challenge.isBestChoice) {
    return { label: "Coup de cœur", tone: "yellow" }
  }
  if (challenge.isPopular) {
    return { label: "Très demandé", tone: "yellow" }
  }
  if (among.length > 1) {
    const cheapest = among.reduce((min, c) =>
      Number(c.fee) < Number(min.fee) ? c : min
    )
    if (cheapest.id === challenge.id) {
      return { label: "Tarif le plus bas", tone: "yellow" }
    }
  }
  return null
}

export function stepTypeLabel(stepType: ChallengeStepType): string {
  return stepType === "TWO_STEP" ? "2 Step" : "1 Step"
}

export function uniqueAccountSizes(
  challenges: ChallengeApiItem[]
): Array<{ accountSize: number; fee: string; currency: string }> {
  const bySize = new Map<
    number,
    { accountSize: number; fee: string; currency: string }
  >()
  for (const c of challenges) {
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

export function availableStepTypes(
  challenges: ChallengeApiItem[]
): ChallengeStepType[] {
  const types = new Set(challenges.map((c) => c.stepType))
  const ordered: ChallengeStepType[] = []
  if (types.has("ONE_STEP")) ordered.push("ONE_STEP")
  if (types.has("TWO_STEP")) ordered.push("TWO_STEP")
  return ordered
}
