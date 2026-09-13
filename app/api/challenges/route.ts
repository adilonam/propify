import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET() {
  const challenges = await prisma.challenge.findMany({
    where: { isActive: true },
    include: {
      challengeInfos: {
        orderBy: { stepNumber: "asc" },
      },
    },
    orderBy: { sortOrder: "asc" },
  })

  const payload = challenges
    .filter((challenge) => challenge.challengeInfos.length > 0)
    .map((challenge) => {
      const steps = challenge.challengeInfos
      const primary = steps[0]!
      const stepCount = steps.length
      const stepType = stepCount >= 2 ? "TWO_STEP" : "ONE_STEP"

      return {
        // Checkout + payments use ChallengeInfo id
        id: primary.id,
        challengeId: challenge.id,
        title: challenge.title,
        accountSize: challenge.accountSize,
        fee: String(challenge.fee),
        currency: challenge.currency,
        stepType,
        stepCount,
        profitTargetPercent: String(primary.profitTargetPercent),
        dailyLossPercent: String(primary.dailyLossPercent),
        maxLossPercent: String(primary.maxLossPercent),
        minTradingDays: primary.minTradingDays,
        isPopular: challenge.isPopular,
        isBestChoice: challenge.isBestChoice,
        isActive: challenge.isActive,
        sortOrder: challenge.sortOrder,
        steps: steps.map((step) => ({
          id: step.id,
          stepNumber: step.stepNumber,
          profitTargetPercent: String(step.profitTargetPercent),
          dailyLossPercent: String(step.dailyLossPercent),
          maxLossPercent: String(step.maxLossPercent),
          minTradingDays: step.minTradingDays,
        })),
      }
    })

  return NextResponse.json(payload)
}
