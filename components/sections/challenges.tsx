"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"

import { Reveal } from "@/components/effects/reveal"
import { ChallengeCard, ChallengeCardSkeleton } from "@/components/sections/challenge-card"
import { ChallengeFilters } from "@/components/sections/challenge-filters"
import {
  availableStepTypes,
  badgeForChallenge,
  CHALLENGE_PLATFORMS,
  type ChallengeApiItem,
  type ChallengeStepType,
  uniqueAccountSizes,
} from "@/lib/challenges-ui"

export function ChallengesSection({
  showBrowseLink = true,
}: {
  showBrowseLink?: boolean
} = {}) {
  const [challenges, setChallenges] = React.useState<ChallengeApiItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [stepType, setStepType] = React.useState<ChallengeStepType>("TWO_STEP")
  const [accountSize, setAccountSize] = React.useState<number | null>(null)
  const [platformId, setPlatformId] = React.useState<string>(
    CHALLENGE_PLATFORMS[0]!.id
  )

  React.useEffect(() => {
    let cancelled = false

    fetch("/api/challenges")
      .then((res) => res.json())
      .then((data: ChallengeApiItem[]) => {
        if (cancelled) return
        const list = Array.isArray(data) ? data : []
        setChallenges(list)

        const types = availableStepTypes(list)
        if (types.length > 0) {
          setStepType(types.includes("TWO_STEP") ? "TWO_STEP" : types[0]!)
        }

        const popular = list.find((c) => c.isPopular)
        const best = list.find((c) => c.isBestChoice)
        const defaultSize =
          popular?.accountSize ?? best?.accountSize ?? list[0]?.accountSize ?? null
        setAccountSize(defaultSize)
      })
      .catch(() => {
        if (!cancelled) setChallenges([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const stepTypes = availableStepTypes(challenges)
  const byStep = challenges.filter((c) => c.stepType === stepType)
  const sizeOptions = uniqueAccountSizes(byStep)

  React.useEffect(() => {
    if (sizeOptions.length === 0) {
      setAccountSize(null)
      return
    }
    if (
      accountSize === null ||
      !sizeOptions.some((o) => o.accountSize === accountSize)
    ) {
      setAccountSize(sizeOptions[0]!.accountSize)
    }
  }, [sizeOptions, accountSize])

  const filtered =
    accountSize === null
      ? byStep
      : byStep.filter((c) => c.accountSize === accountSize)

  const gridClass =
    filtered.length <= 1
      ? "mx-auto grid max-w-md grid-cols-1 gap-5"
      : filtered.length === 2
        ? "mx-auto grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2"
        : "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"

  return (
    <section id="challenges" className="scroll-mt-28 space-y-10">
      <Reveal className="space-y-8 text-center">
        <h2 className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
          Trouvez le challenge qui vous correspond
        </h2>

        {!loading ? (
          <ChallengeFilters
            stepTypes={stepTypes}
            stepType={stepType}
            onStepTypeChange={setStepType}
            accountSizes={sizeOptions}
            accountSize={accountSize}
            onAccountSizeChange={setAccountSize}
            platformId={platformId}
            onPlatformChange={setPlatformId}
            showPlatforms
          />
        ) : (
          <div className="mx-auto h-28 max-w-3xl animate-pulse rounded-2xl bg-white/5" />
        )}
      </Reveal>

      <div className={gridClass}>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Reveal key={i} delay={i * 80}>
                <ChallengeCardSkeleton />
              </Reveal>
            ))
          : filtered.map((challenge, index) => (
              <Reveal key={challenge.id} delay={index * 80}>
                <ChallengeCard
                  challenge={challenge}
                  badge={badgeForChallenge(challenge, filtered)}
                />
              </Reveal>
            ))}
      </div>

      {!loading && filtered.length === 0 ? (
        <p className="text-center text-on-surface-variant">
          Aucun challenge disponible pour ces filtres.
          {showBrowseLink ? (
            <>
              {" "}
              <a href="/challenges" className="text-primary hover:underline">
                Parcourir la page challenges
              </a>
            </>
          ) : null}
        </p>
      ) : null}

      {showBrowseLink ? (
        <p className="text-center">
          <a
            href="/challenges"
            className="inline-flex items-center gap-2 font-label text-primary hover:underline"
          >
            Parcourir tous les challenges
            <ArrowRight className="size-4" />
          </a>
        </p>
      ) : null}
    </section>
  )
}
