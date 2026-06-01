import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

const stepSchema = z.object({
  stepNumber: z.number().int().min(1),
  profitTargetPercent: z.number().positive(),
  dailyLossPercent: z.number().positive(),
  maxLossPercent: z.number().positive(),
  minTradingDays: z.number().int().min(1),
})

const challengePayloadSchema = z.object({
  title: z.string().min(1),
  accountSize: z.number().int().positive(),
  fee: z.number().positive(),
  currency: z.string().min(1).max(10),
  isPopular: z.boolean(),
  isBestChoice: z.boolean(),
  isActive: z.boolean(),
  sortOrder: z.number().int().min(0),
  steps: z.array(stepSchema).min(1),
})

const updatePayloadSchema = challengePayloadSchema.extend({
  id: z.string().min(1),
})

const deletePayloadSchema = z.object({
  id: z.string().min(1),
})

async function isAdmin() {
  const session = await auth()
  return session?.user?.role === "ADMIN"
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const challenges = await prisma.challenge.findMany({
    include: {
      challengeInfos: {
        orderBy: { stepNumber: "asc" },
      },
    },
    orderBy: { sortOrder: "asc" },
  })

  const payload = challenges.map((challenge) => ({
    id: challenge.id,
    title: challenge.title,
    accountSize: challenge.accountSize,
    fee: String(challenge.fee),
    currency: challenge.currency,
    isPopular: challenge.isPopular,
    isBestChoice: challenge.isBestChoice,
    isActive: challenge.isActive,
    sortOrder: challenge.sortOrder,
    challengeInfos: challenge.challengeInfos.map((info) => ({
      id: info.id,
      stepNumber: info.stepNumber,
      profitTargetPercent: String(info.profitTargetPercent),
      dailyLossPercent: String(info.dailyLossPercent),
      maxLossPercent: String(info.maxLossPercent),
      minTradingDays: info.minTradingDays,
    })),
  }))

  return NextResponse.json(payload)
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const parsed = challengePayloadSchema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const data = parsed.data

  try {
    const created = await prisma.challenge.create({
      data: {
        title: data.title,
        accountSize: data.accountSize,
        fee: data.fee.toFixed(2),
        currency: data.currency.toUpperCase(),
        isPopular: data.isPopular,
        isBestChoice: data.isBestChoice,
        isActive: data.isActive,
        sortOrder: data.sortOrder,
        challengeInfos: {
          create: data.steps.map((step) => ({
            stepNumber: step.stepNumber,
            profitTargetPercent: step.profitTargetPercent.toFixed(2),
            dailyLossPercent: step.dailyLossPercent.toFixed(2),
            maxLossPercent: step.maxLossPercent.toFixed(2),
            minTradingDays: step.minTradingDays,
          })),
        },
      },
      include: {
        challengeInfos: {
          orderBy: { stepNumber: "asc" },
        },
      },
    })

    return NextResponse.json({
      id: created.id,
      title: created.title,
      accountSize: created.accountSize,
      fee: String(created.fee),
      currency: created.currency,
      isPopular: created.isPopular,
      isBestChoice: created.isBestChoice,
      isActive: created.isActive,
      sortOrder: created.sortOrder,
      challengeInfos: created.challengeInfos.map((info) => ({
        id: info.id,
        stepNumber: info.stepNumber,
        profitTargetPercent: String(info.profitTargetPercent),
        dailyLossPercent: String(info.dailyLossPercent),
        maxLossPercent: String(info.maxLossPercent),
        minTradingDays: info.minTradingDays,
      })),
    })
  } catch {
    return NextResponse.json({ error: "Failed to create challenge" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const parsed = updatePayloadSchema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const { id, ...data } = parsed.data

  try {
    await prisma.$transaction(async (tx) => {
      await tx.challenge.update({
        where: { id },
        data: {
          title: data.title,
          accountSize: data.accountSize,
          fee: data.fee.toFixed(2),
          currency: data.currency.toUpperCase(),
          isPopular: data.isPopular,
          isBestChoice: data.isBestChoice,
          isActive: data.isActive,
          sortOrder: data.sortOrder,
        },
      })

      const keptSteps = data.steps.map((step) => step.stepNumber)

      await tx.challengeInfo.deleteMany({
        where: {
          challengeId: id,
          stepNumber: { notIn: keptSteps },
        },
      })

      for (const step of data.steps) {
        await tx.challengeInfo.upsert({
          where: {
            challengeId_stepNumber: {
              challengeId: id,
              stepNumber: step.stepNumber,
            },
          },
          update: {
            profitTargetPercent: step.profitTargetPercent.toFixed(2),
            dailyLossPercent: step.dailyLossPercent.toFixed(2),
            maxLossPercent: step.maxLossPercent.toFixed(2),
            minTradingDays: step.minTradingDays,
          },
          create: {
            challengeId: id,
            stepNumber: step.stepNumber,
            profitTargetPercent: step.profitTargetPercent.toFixed(2),
            dailyLossPercent: step.dailyLossPercent.toFixed(2),
            maxLossPercent: step.maxLossPercent.toFixed(2),
            minTradingDays: step.minTradingDays,
          },
        })
      }
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Failed to update challenge" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const parsed = deletePayloadSchema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const { id } = parsed.data

  try {
    await prisma.$transaction(async (tx) => {
      await tx.payment.deleteMany({
        where: {
          order: {
            challengeId: id,
          },
        },
      })

      await tx.order.deleteMany({
        where: { challengeId: id },
      })

      await tx.challengeInfo.deleteMany({
        where: { challengeId: id },
      })

      await tx.challenge.delete({
        where: { id },
      })
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete challenge" }, { status: 500 })
  }
}
