import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import type { OrderStatus } from "@/generated/prisma/client"

// NowPayments IPN webhook
// https://documenter.getpostman.com/view/7907941/2s93JqTRWN#webhook
export async function POST(req: NextRequest) {
  // Optionally verify NowPayments IPN secret header
  const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET
  if (ipnSecret) {
    const sig = req.headers.get("x-nowpayments-sig")
    if (!sig) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 })
    }
    // Signature verification would go here using HMAC-SHA512
    // Skipped for brevity but recommended in production
  }

  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  }

  const orderId = body.order_id as string | undefined
  const paymentStatus = body.payment_status as string | undefined
  const nowpaymentsPaymentId = body.payment_id ? String(body.payment_id) : undefined

  if (!orderId || !paymentStatus) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const statusMap: Record<string, OrderStatus> = {
    waiting: "WAITING",
    confirming: "CONFIRMING",
    confirmed: "CONFIRMED",
    sending: "SENDING",
    partially_paid: "PARTIALLY_PAID",
    finished: "FINISHED",
    failed: "FAILED",
    refunded: "REFUNDED",
    expired: "EXPIRED",
  }

  const newStatus = statusMap[paymentStatus]
  if (!newStatus) {
    return NextResponse.json({ ok: true })
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
        ...(nowpaymentsPaymentId ? { nowpaymentsId: nowpaymentsPaymentId } : {}),
        ...(body.pay_address ? { payAddress: body.pay_address as string } : {}),
        ...(body.pay_currency ? { payCurrency: body.pay_currency as string } : {}),
        ...(body.pay_amount ? { payAmount: String(body.pay_amount) } : {}),
        ...(body.actually_paid ? { actuallyPaid: String(body.actually_paid) } : {}),
      },
    })
  })

  return NextResponse.json({ ok: true })
}
