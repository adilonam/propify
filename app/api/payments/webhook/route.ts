import { NextRequest, NextResponse } from "next/server"
import { unwrapWebhook, WebhookVerificationError } from "@whop/sdk/helpers"

import { prisma } from "@/lib/prisma"
import { getWhopWebhookSecret } from "@/lib/whop"
import type { OrderStatus } from "@/generated/prisma/client"

type WhopWebhookEvent = {
  id?: string
  type?: string
  data?: {
    id?: string
    status?: string
    metadata?: Record<string, unknown> | null
  }
}

const eventStatusMap: Record<string, OrderStatus> = {
  "payment.created": "WAITING",
  "payment.pending": "WAITING",
  "payment.authorized": "CONFIRMING",
  "payment.succeeded": "FINISHED",
  "payment.failed": "FAILED",
  "payment.canceled": "EXPIRED",
  "refund.created": "REFUNDED",
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined
}

export async function POST(req: NextRequest) {
  const webhookSecret = getWhopWebhookSecret()
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 })
  }

  const payload = await req.text()
  const headers = Object.fromEntries(req.headers)

  let event: WhopWebhookEvent
  try {
    event = unwrapWebhook<WhopWebhookEvent>(payload, {
      headers,
      key: webhookSecret,
    })
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 })
  }

  const eventType = event.type
  if (!eventType) {
    return NextResponse.json({ ok: true })
  }

  const newStatus = eventStatusMap[eventType]
  if (!newStatus) {
    return NextResponse.json({ ok: true })
  }

  const data = event.data ?? {}
  const orderId = asString(data.metadata?.order_id)
  const whopPaymentId = asString(data.id)
  const paymentStatus = asString(data.status) ?? eventType.replace(/^payment\./, "").replace(/^refund\./, "")

  if (!orderId) {
    return NextResponse.json({ error: "Missing order_id metadata" }, { status: 400 })
  }

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    })

    await tx.payment.updateMany({
      where: { orderId },
      data: {
        paymentStatus,
        ...(whopPaymentId ? { whopPaymentId } : {}),
      },
    })
  })

  return NextResponse.json({ ok: true })
}
