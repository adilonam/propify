import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

const bodySchema = z.object({
  challengeId: z.string().min(1),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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

  // Create NowPayments payment
  const apiKey = process.env.NOWPAYMENTS_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Payment provider not configured" }, { status: 500 })
  }

  const priceAmount = Number(challengeInfo.challenge.fee).toFixed(2)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"

  const nowpaymentsRes = await fetch("https://api.nowpayments.io/v1/invoice", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: priceAmount,
      price_currency: challengeInfo.challenge.currency.toLowerCase(),
      order_id: order.id,
      order_description: `${challengeInfo.challenge.title} ${challengeInfo.challenge.accountSize} - Step ${challengeInfo.stepNumber}`,
      ipn_callback_url: `${baseUrl}/api/payments/webhook`,
      success_url: `${baseUrl}/orders/${order.id}?status=success`,
      cancel_url: `${baseUrl}/checkout/${challengeId}?status=cancelled`,
    }),
  })

  if (!nowpaymentsRes.ok) {
    await prisma.order.update({ where: { id: order.id }, data: { status: "FAILED" } })
    return NextResponse.json({ error: "Failed to create payment" }, { status: 502 })
  }

  const invoice = (await nowpaymentsRes.json()) as {
    id: string
    invoice_url: string
  }

  await prisma.payment.create({
    data: {
      orderId: order.id,
      nowpaymentsId: String(invoice.id),
      invoiceUrl: invoice.invoice_url,
    },
  })

  await prisma.order.update({ where: { id: order.id }, data: { status: "WAITING" } })

  return NextResponse.json({ orderId: order.id, invoiceUrl: invoice.invoice_url })
}
