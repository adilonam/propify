import { NextResponse } from "next/server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      challenge: {
        select: {
          accountSize: true,
          title: true,
        },
      },
      payment: { select: { invoiceUrl: true, paymentStatus: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  const payload = orders.map((order) => ({
    id: order.id,
    amountCents: order.amountCents,
    currency: order.currency,
    status: order.status,
    createdAt: order.createdAt,
    challenge: {
      title: order.challenge.title,
      accountSize: order.challenge.accountSize,
      stepType: order.stepNumber === 2 ? "TWO_STEP" : "ONE_STEP",
    },
    payment: order.payment,
  }))

  return NextResponse.json(payload)
}
