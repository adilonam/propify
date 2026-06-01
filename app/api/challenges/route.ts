import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET() {
  const challengeInfos = await prisma.challengeInfo.findMany({
    where: {
      challenge: { isActive: true },
    },
    include: {
      challenge: {
        select: {
          title: true,
          accountSize: true,
          fee: true,
          currency: true,
          isPopular: true,
          isBestChoice: true,
          isActive: true,
          sortOrder: true,
        },
      },
    },
    orderBy: [{ stepNumber: "asc" }, { challenge: { sortOrder: "asc" } }],
  })

  const payload = challengeInfos.map((info) => ({
    id: info.id,
    title: info.challenge.title,
    accountSize: info.challenge.accountSize,
    fee: info.challenge.fee,
    currency: info.challenge.currency,
    stepType: info.stepNumber === 2 ? "TWO_STEP" : "ONE_STEP",
    profitTargetPercent: info.profitTargetPercent,
    dailyLossPercent: info.dailyLossPercent,
    maxLossPercent: info.maxLossPercent,
    minTradingDays: info.minTradingDays,
    isPopular: info.challenge.isPopular,
    isBestChoice: info.challenge.isBestChoice,
    isActive: info.challenge.isActive,
    sortOrder: info.challenge.sortOrder,
  }))

  return NextResponse.json(payload)
}
