import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { getWhopClient, getWhopCompanyId, isWhopConfigured, logWhopError } from "@/lib/whop"

const bodySchema = z.object({
  challengeId: z.string().min(1),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!isWhopConfigured()) {
    return NextResponse.json({ error: "Payment provider not configured" }, { status: 500 })
  }

  const parsed = bodySchema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const { challengeId } = parsed.data

  const challengeInfo = await prisma.challengeInfo.findUnique({
    where: { id: challengeId },
    include: {
      challenge: {
        select: {
          id: true,
          title: true,
          accountSize: true,
          fee: true,
          currency: true,
          isActive: true,
        },
      },
    },
  })
  if (!challengeInfo || !challengeInfo.challenge.isActive) {
    return NextResponse.json({ error: "Challenge not found" }, { status: 404 })
  }

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      challengeId: challengeInfo.challenge.id,
      stepNumber: challengeInfo.stepNumber,
      amountCents: Math.round(Number(challengeInfo.challenge.fee) * 100),
      currency: challengeInfo.challenge.currency,
      status: "PENDING",
    },
  })

  const baseUrl = process.env.AUTH_URL ?? "http://localhost:3000"
  const priceAmount = Number(challengeInfo.challenge.fee)
  const currency = challengeInfo.challenge.currency.toLowerCase()
  const title = `${challengeInfo.challenge.title} ${challengeInfo.challenge.accountSize} - Step ${challengeInfo.stepNumber}`
  const returnUrl = `${baseUrl}/checkout/${challengeId}?orderId=${order.id}`

  try {
    const whop = getWhopClient()
    const companyId = getWhopCompanyId()
    const checkout = await whop.checkoutConfigurations.create({
      // SDK/OpenAPI create field is still account_id (biz_ company id).
      account_id: companyId,
      plan: {
        title,
        plan_type: "one_time",
        initial_price: priceAmount,
        currency,
        force_create_new_plan: true,
      },
      metadata: {
        order_id: order.id,
        challenge_id: challengeInfo.challenge.id,
        user_id: session.user.id,
      },
      redirect_url: returnUrl,
    })

    if (!checkout.id) {
      console.error("[whop] checkoutConfigurations.create returned no id", {
        orderId: order.id,
        checkout,
      })
      await prisma.order.update({ where: { id: order.id }, data: { status: "FAILED" } })
      return NextResponse.json({ error: "Failed to create payment" }, { status: 502 })
    }

    const purchaseUrl = checkout.purchase_url
    if (!purchaseUrl) {
      console.error("[whop] checkoutConfigurations.create returned no purchase_url", {
        orderId: order.id,
        checkoutId: checkout.id,
      })
      await prisma.order.update({ where: { id: order.id }, data: { status: "FAILED" } })
      return NextResponse.json({ error: "Failed to create payment" }, { status: 502 })
    }

    await prisma.payment.create({
      data: {
        orderId: order.id,
        whopCheckoutId: checkout.id,
        invoiceUrl: purchaseUrl,
        paymentStatus: "created",
      },
    })

    await prisma.order.update({ where: { id: order.id }, data: { status: "WAITING" } })

    return NextResponse.json({
      orderId: order.id,
      sessionId: checkout.id,
      purchaseUrl,
      returnUrl,
    })
  } catch (error) {
    logWhopError(`checkoutConfigurations.create failed (orderId=${order.id})`, error)
    await prisma.order.update({ where: { id: order.id }, data: { status: "FAILED" } })
    return NextResponse.json({ error: "Failed to create payment" }, { status: 502 })
  }
}
