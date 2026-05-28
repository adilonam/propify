"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ChallengeStep = "2-step" | "1-step"

type Challenge = {
  size: string
  price: string
  tag?: string
  featured?: boolean
  profitTarget: string
  dailyLoss: string
  maxLoss: string
  minDays: string
}

const CHALLENGES_2STEP: Challenge[] = [
  {
    size: "10K",
    price: "€89",
    tag: "POPULAIRE",
    profitTarget: "10% / 5%",
    dailyLoss: "5%",
    maxLoss: "10%",
    minDays: "4 jours",
  },
  {
    size: "25K",
    price: "€149",
    profitTarget: "10% / 5%",
    dailyLoss: "5%",
    maxLoss: "10%",
    minDays: "4 jours",
  },
  {
    size: "50K",
    price: "€249",
    tag: "MEILLEUR CHOIX",
    featured: true,
    profitTarget: "10% / 5%",
    dailyLoss: "5%",
    maxLoss: "10%",
    minDays: "4 jours",
  },
  {
    size: "100K",
    price: "€499",
    profitTarget: "10% / 5%",
    dailyLoss: "5%",
    maxLoss: "10%",
    minDays: "4 jours",
  },
  {
    size: "200K",
    price: "€999",
    profitTarget: "10% / 5%",
    dailyLoss: "5%",
    maxLoss: "10%",
    minDays: "4 jours",
  },
]

const CHALLENGES_1STEP: Challenge[] = CHALLENGES_2STEP.map((c) => ({
  ...c,
  profitTarget: "10%",
}))

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <div
      className={cn(
        "card flex flex-col items-center space-y-6 p-6 text-center transition-all",
        challenge.featured &&
          "z-10 scale-105 border-2 border-primary glow-blue"
      )}
    >
      {challenge.tag ? (
        <span className="rounded bg-primary/20 px-2 py-1 font-label text-[10px] tracking-widest text-primary uppercase">
          {challenge.tag}
        </span>
      ) : (
        <span className="h-6" />
      )}

      <div>
        <div className="font-heading text-3xl font-semibold text-primary">
          {challenge.size}
        </div>
        <div className="font-label text-sm text-on-surface-variant">
          Challenge
        </div>
      </div>

      <div className="space-y-1">
        <div className="font-label text-sm text-on-surface-variant">
          Frais unique
        </div>
        <div className="font-heading text-2xl font-bold text-on-surface">
          {challenge.price}
        </div>
      </div>

      <div className="w-full space-y-3 border-t border-outline-variant pt-4">
        {[
          ["Profit target", challenge.profitTarget],
          ["Daily loss", challenge.dailyLoss],
          ["Max loss", challenge.maxLoss],
          ["Min days", challenge.minDays],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between font-label text-sm"
          >
            <span className="text-on-surface-variant">{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>

      <Button className="w-full py-3">Choisir</Button>
    </div>
  )
}

export function ChallengesSection() {
  const [step, setStep] = React.useState<ChallengeStep>("2-step")
  const challenges =
    step === "2-step" ? CHALLENGES_2STEP : CHALLENGES_1STEP

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
            {(["2-step", "1-step"] as const).map((option) => (
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
                {option === "2-step" ? "2-Step" : "1-Step"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.size} challenge={challenge} />
        ))}
      </div>

      <p className="text-center">
        <a
          href="#challenges"
          className="inline-flex items-center gap-2 font-label text-primary hover:underline"
        >
          Comparer tous les challenges
          <ArrowRight className="size-4" />
        </a>
      </p>
    </section>
  )
}
