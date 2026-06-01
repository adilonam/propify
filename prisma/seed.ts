import "dotenv/config"
import bcrypt from "bcryptjs"
import { PrismaPg } from "@prisma/adapter-pg"

import { PrismaClient } from "../generated/prisma/client"

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is required to run seed")
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
})

const challengePlans = [
  {
    title: "10K Challenge",
    accountSize: 10_000,
    fee: "89.00",
    dailyLossPercent: "5.00",
    maxLossPercent: "10.00",
    minTradingDays: 4,
    isPopular: true,
    isBestChoice: false,
    sortOrder: 1,
  },
  {
    title: "25K Challenge",
    accountSize: 25_000,
    fee: "149.00",
    dailyLossPercent: "5.00",
    maxLossPercent: "10.00",
    minTradingDays: 4,
    isPopular: false,
    isBestChoice: false,
    sortOrder: 2,
  },
  {
    title: "50K Challenge",
    accountSize: 50_000,
    fee: "249.00",
    dailyLossPercent: "5.00",
    maxLossPercent: "10.00",
    minTradingDays: 4,
    isPopular: false,
    isBestChoice: true,
    sortOrder: 3,
  },
  {
    title: "100K Challenge",
    accountSize: 100_000,
    fee: "499.00",
    dailyLossPercent: "5.00",
    maxLossPercent: "10.00",
    minTradingDays: 4,
    isPopular: false,
    isBestChoice: false,
    sortOrder: 4,
  },
  {
    title: "200K Challenge",
    accountSize: 200_000,
    fee: "999.00",
    dailyLossPercent: "5.00",
    maxLossPercent: "10.00",
    minTradingDays: 4,
    isPopular: false,
    isBestChoice: false,
    sortOrder: 5,
  },
]

const challengeSteps = [
  {
    stepNumber: 1,
    profitTargetPercent: "10.00",
  },
  {
    stepNumber: 2,
    profitTargetPercent: "5.00",
  },
] as const

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL ?? "admin@propify.com"
  const password = process.env.ADMIN_PASSWORD ?? "Admin123!"
  const name = process.env.ADMIN_NAME ?? "Propify Admin"

  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.user.upsert({
    where: { email },
    update: {
      name,
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  })
}

async function seedChallenges() {
  // Reset challenge catalog before re-seeding to avoid stale plans/steps.
  await prisma.$transaction(async (tx) => {
    const existingChallenges = await tx.challenge.findMany({
      select: { id: true },
    })

    if (existingChallenges.length > 0) {
      const challengeIds = existingChallenges.map((challenge) => challenge.id)

      await tx.payment.deleteMany({
        where: {
          order: {
            challengeId: { in: challengeIds },
          },
        },
      })

      await tx.order.deleteMany({
        where: {
          challengeId: { in: challengeIds },
        },
      })

      await tx.challengeInfo.deleteMany({
        where: {
          challengeId: { in: challengeIds },
        },
      })

      await tx.challenge.deleteMany({
        where: {
          id: { in: challengeIds },
        },
      })
    }
  })

  for (const plan of challengePlans) {
    const challenge = await prisma.challenge.upsert({
      where: { title: plan.title },
      update: {
        accountSize: plan.accountSize,
        fee: plan.fee,
        currency: "EUR",
        isPopular: plan.isPopular,
        isBestChoice: plan.isBestChoice,
        isActive: true,
        sortOrder: plan.sortOrder,
      },
      create: {
        title: plan.title,
        accountSize: plan.accountSize,
        fee: plan.fee,
        currency: "EUR",
        isPopular: plan.isPopular,
        isBestChoice: plan.isBestChoice,
        isActive: true,
        sortOrder: plan.sortOrder,
      },
    })

    for (const step of challengeSteps) {
      await prisma.challengeInfo.upsert({
        where: {
          challengeId_stepNumber: {
            challengeId: challenge.id,
            stepNumber: step.stepNumber,
          },
        },
        update: {
          profitTargetPercent: step.profitTargetPercent,
          dailyLossPercent: plan.dailyLossPercent,
          maxLossPercent: plan.maxLossPercent,
          minTradingDays: plan.minTradingDays,
        },
        create: {
          challengeId: challenge.id,
          stepNumber: step.stepNumber,
          profitTargetPercent: step.profitTargetPercent,
          dailyLossPercent: plan.dailyLossPercent,
          maxLossPercent: plan.maxLossPercent,
          minTradingDays: plan.minTradingDays,
        },
      })
    }
  }
}

async function main() {
  await seedAdmin()
  await seedChallenges()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error("Seed failed:", error)
    await prisma.$disconnect()
    process.exit(1)
  })