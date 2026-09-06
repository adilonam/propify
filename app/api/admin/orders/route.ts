import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

const ORDER_STATUSES = [
  "PENDING",
  "WAITING",
  "CONFIRMING",
  "CONFIRMED",
  "SENDING",
  "PARTIALLY_PAID",
  "FINISHED",
  "FAILED",
  "REFUNDED",
  "EXPIRED",
] as const

const orderPayloadSchema = z.object({
  userId: z.string().min(1),
  challengeId: z.string().min(1),
  stepNumber: z.number().int().min(1),
  amountCents: z.number().int().min(0),
  currency: z.string().min(1).max(10),
  status: z.enum(ORDER_STATUSES),
})

const updatePayloadSchema = orderPayloadSchema.extend({
  id: z.string().min(1),
})

const deletePayloadSchema = z.object({
  id: z.string().min(1),
})

async function isAdmin() {
  const session = await auth()
  return session?.user?.role === "ADMIN"
}

function formatOrder(order: {
  id: string
  userId: string
  challengeId: string
  stepNumber: number
  amountCents: number
  currency: string
  status: (typeof ORDER_STATUSES)[number]
  createdAt: Date
  updatedAt: Date
  user: {
    id: string
    name: string
    email: string
  }
  challenge: {
    id: string
    title: string
    accountSize: number
    currency: string
  }
  payment: {
    id: string
    whopPaymentId: string | null
    paymentStatus: string | null
    invoiceUrl: string | null
  } | null
}) {
  return {
    id: order.id,
    userId: order.userId,
    challengeId: order.challengeId,
    stepNumber: order.stepNumber,
    amountCents: order.amountCents,
    currency: order.currency,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    user: order.user,
    challenge: order.challenge,
    payment: order.payment,
  }
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const [orders, users, challenges] = await Promise.all([
    prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
            accountSize: true,
            currency: true,
          },
        },
        payment: {
          select: {
            id: true,
            whopPaymentId: true,
            paymentStatus: true,
            invoiceUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.challenge.findMany({
      select: {
        id: true,
        title: true,
        accountSize: true,
        currency: true,
      },
      orderBy: { sortOrder: "asc" },
    }),
  ])

  return NextResponse.json({
    orders: orders.map(formatOrder),
    users,
    challenges,
    statuses: ORDER_STATUSES,
  })
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const parsed = orderPayloadSchema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const data = parsed.data

  try {
    const created = await prisma.order.create({
      data: {
        userId: data.userId,
        challengeId: data.challengeId,
        stepNumber: data.stepNumber,
        amountCents: data.amountCents,
        currency: data.currency.toUpperCase(),
        status: data.status,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
            accountSize: true,
            currency: true,
          },
        },
        payment: {
          select: {
            id: true,
            whopPaymentId: true,
            paymentStatus: true,
            invoiceUrl: true,
          },
        },
      },
    })

    return NextResponse.json(formatOrder(created))
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
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
    const updated = await prisma.order.update({
      where: { id },
      data: {
        userId: data.userId,
        challengeId: data.challengeId,
        stepNumber: data.stepNumber,
        amountCents: data.amountCents,
        currency: data.currency.toUpperCase(),
        status: data.status,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
            accountSize: true,
            currency: true,
          },
        },
        payment: {
          select: {
            id: true,
            whopPaymentId: true,
            paymentStatus: true,
            invoiceUrl: true,
          },
        },
      },
    })

    return NextResponse.json(formatOrder(updated))
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
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
    await prisma.order.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 })
  }
}