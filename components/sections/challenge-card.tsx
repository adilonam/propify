"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  type ChallengeApiItem,
  type ChallengeBadge,
  formatPercent,
  formatPrice,
  productImageForChallenge,
  productImageSrc,
} from "@/lib/challenges-ui"

type ChallengeCardProps = {
  challenge: ChallengeApiItem
  badge: ChallengeBadge | null
}

export function ChallengeCard({ challenge, badge }: ChallengeCardProps) {
  const router = useRouter()
  const imageSlug = productImageForChallenge(challenge.accountSize)

  const specs: Array<{ label: string; value: string }> = [
    {
      label: "Cible de profit",
      value: formatPercent(challenge.profitTargetPercent),
    },
    {
      label: "Perte journalière max",
      value: formatPercent(challenge.dailyLossPercent),
    },
    {
      label: "Perte maximale",
      value: formatPercent(challenge.maxLossPercent),
    },
    {
      label: "Jours de trading minimum",
      value: `${challenge.minTradingDays} jours`,
    },
  ]

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c]",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-colors duration-300",
        "hover:border-white/20"
      )}
    >
      <div className="relative flex h-44 items-end justify-center overflow-hidden bg-gradient-to-b from-[#1a1528] via-[#0d0c14] to-[#0a0a0c] sm:h-52">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(120,80,255,0.22),transparent_65%)]"
        />
        <Image
          src={productImageSrc(imageSlug)}
          alt=""
          width={1440}
          height={785}
          sizes="(max-width: 640px) 90vw, 800px"
          quality={92}
          // Full-res product PNG; skip Next resize/reencode.
          unoptimized
          className="relative z-[1] h-[9.5rem] w-auto object-contain drop-shadow-[0_12px_40px_rgba(31,143,232,0.35)] sm:h-[11rem]"
          priority={false}
        />
      </div>

      <div className="flex flex-1 flex-col gap-5 px-5 pb-5 pt-2 sm:px-6 sm:pb-6">
        <div className="space-y-2 text-center">
          <h3 className="font-heading text-2xl font-bold tracking-tight text-white">
            {challenge.title}
          </h3>
          {badge ? (
            <span className="inline-flex rounded-full bg-[#f5c542] px-3 py-1 font-label text-[11px] font-semibold tracking-wide text-[#1a1400]">
              {badge.label}
            </span>
          ) : (
            <span className="inline-block h-6" />
          )}
        </div>

        <dl className="space-y-3 border-t border-white/8 pt-4">
          {specs.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-3 font-label text-sm"
            >
              <dt className="text-on-surface-variant">{row.label}</dt>
              <dd className="font-medium text-white">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto space-y-4 pt-2">
          <div className="font-heading text-3xl font-bold tracking-tight text-white">
            {formatPrice(challenge.fee, challenge.currency)}
          </div>

          <button
            type="button"
            onClick={() => router.push(`/checkout/${challenge.id}`)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 font-label text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Souscrire
            <ArrowUpRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </article>
  )
}

export function ChallengeCardSkeleton() {
  return (
    <div className="h-[28rem] animate-pulse rounded-2xl border border-white/8 bg-[#0a0a0c]" />
  )
}
