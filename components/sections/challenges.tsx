"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ChallengeStepType = "ONE_STEP" | "TWO_STEP"

type DbChallenge = {
  id: string
  title: string
  accountSize: number
  fee: string
  currency: string
  stepType: ChallengeStepType
  profitTargetPercent: string
  dailyLossPercent: string
  maxLossPercent: string
  minTradingDays: number
  isPopular: boolean
  isBestChoice: boolean
  isActive: boolean
  sortOrder: number
}

function formatAccountSize(size: number): string {
  if (size >= 1_000_000) return `${size / 1_000_000}M`
  if (size >= 1_000) return `${size / 1_000}K`
  return String(size)
}

function formatPrice(amount: string, currency: string): string {
  const symbol = currency === "EUR" ? "€" : currency
  return `${symbol}${Number(amount).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function ChallengeCard({ challenge }: { challenge: DbChallenge }) {
  const router = useRouter()

  const profitLabel = `${challenge.profitTargetPercent}%`

  const tag = challenge.isPopular
    ? "POPULAIRE"
    : challenge.isBestChoice
    ? "MEILLEUR CHOIX"
    : null

  return (
    <div
      className={cn(
        "card flex flex-col items-center space-y-6 p-6 text-center transition-all",
        challenge.isBestChoice && "z-10 scale-105 border-2 border-primary glow-blue"
      )}
    >
      {tag ? (
        <span className="rounded bg-primary/20 px-2 py-1 font-label text-[10px] tracking-widest text-primary uppercase">
          {tag}
        </span>
      ) : (
        <span className="h-6" />
      )}

      <div>
        <div className="font-heading text-3xl font-semibold text-primary">
          {formatAccountSize(challenge.accountSize)}
        </div>
        <div className="font-label text-sm text-on-surface-variant">Challenge</div>
      </div>

      <div className="space-y-1">
        <div className="font-label text-sm text-on-surface-variant">Frais unique</div>
        <div className="font-heading text-2xl font-bold text-on-surface">
          {formatPrice(challenge.fee, challenge.currency)}
        </div>
      </div>

      <div className="w-full space-y-3 border-t border-outline-variant pt-4">
        {[
          ["Profit target", profitLabel],
          ["Daily loss", `${challenge.dailyLossPercent}%`],
          ["Max loss", `${challenge.maxLossPercent}%`],
          ["Min days", `${challenge.minTradingDays} jours`],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between font-label text-sm">
            <span className="text-on-surface-variant">{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>

      <Button
        className="w-full py-3"
        onClick={() => router.push(`/checkout/${challenge.id}`)}
      >
        Choisir
      </Button>
    </div>
  )
}

export function ChallengesSection() {
  const [step, setStep] = React.useState<ChallengeStepType>("TWO_STEP")
  const [challenges, setChallenges] = React.useState<DbChallenge[]>([])

  React.useEffect(() => {
    fetch("/api/challenges")
      .then((res) => res.json())
      .then((data: DbChallenge[]) => setChallenges(data))
      .catch(() => {})
  }, [])

  const filtered = challenges.filter((c) => c.stepType === step)

  return (
    <section id="challenges" className="scroll-mt-24 space-y-8">
      <div className="space-y-4 text-center">
        <h2 className="font-heading text-4xl font-bold text-on-surface md:text-5xl">
          Choisissez votre challenge PROPIFY
        </h2>
        <p className="text-lg text-on-surface-variant">
          Chaque prix, règle et objectif est visible en 2 secondes.
        </p>

        <div className="flex justify-center pt-4">
          <div className="inline-flex rounded-lg border border-outline-variant bg-surface-container-highest p-1">
            {(["TWO_STEP", "ONE_STEP"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setStep(option)}
                className={cn(
                  "rounded-md px-8 py-2 font-label text-sm transition-all",
                  step === option
                    ? "bg-surface-container-high text-on-surface"
                    : "text-on-surface-variant"
                )}
              >
                {option === "TWO_STEP" ? "2-Step" : "1-Step"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {filtered.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>

      <p className="text-center">
        <a
          href="/challenges"
          className="inline-flex items-center gap-2 font-label text-primary hover:underline"
        >
          Comparer tous les challenges
          <ArrowRight className="size-4" />
        </a>
      </p>
    </section>
  )
}
