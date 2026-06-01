"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

import { Header } from "@/components/propify/header"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type OrderStatus =
  | "PENDING"
  | "WAITING"
  | "CONFIRMING"
  | "CONFIRMED"
  | "SENDING"
  | "PARTIALLY_PAID"
  | "FINISHED"
  | "FAILED"
  | "REFUNDED"
  | "EXPIRED"

type Order = {
  id: string
  amountCents: number
  currency: string
  status: OrderStatus
  createdAt: string
  challenge: {
    title: string
    accountSize: number
    stepType: "ONE_STEP" | "TWO_STEP"
  }
  payment: {
    invoiceUrl: string | null
    paymentStatus: string | null
  } | null
}

function formatPrice(cents: number, currency: string): string {
  const symbol = currency === "EUR" ? "€" : currency
  return `${symbol}${(cents / 100).toLocaleString("fr-FR")}`
}

function formatAccountSize(size: number): string {
  if (size >= 1_000_000) return `${size / 1_000_000}M`
  if (size >= 1_000) return `${size / 1_000}K`
  return String(size)
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "En attente",
  WAITING: "En attente de paiement",
  CONFIRMING: "Confirmation en cours",
  CONFIRMED: "Confirmé",
  SENDING: "Envoi en cours",
  PARTIALLY_PAID: "Partiellement payé",
  FINISHED: "Terminé",
  FAILED: "Échoué",
  REFUNDED: "Remboursé",
  EXPIRED: "Expiré",
}

const STATUS_COLOR: Record<OrderStatus, string> = {
  PENDING: "text-on-surface-variant",
  WAITING: "text-yellow-400",
  CONFIRMING: "text-blue-400",
  CONFIRMED: "text-blue-400",
  SENDING: "text-blue-400",
  PARTIALLY_PAID: "text-yellow-400",
  FINISHED: "text-emerald-400",
  FAILED: "text-red-400",
  REFUNDED: "text-orange-400",
  EXPIRED: "text-red-400",
}

export default function OrdersPage() {
  const [orders, setOrders] = React.useState<Order[]>([])
  const [loading, setLoading] = React.useState(true)
  const [unauthorized, setUnauthorized] = React.useState(false)

  React.useEffect(() => {
    fetch("/api/orders")
      .then(async (res) => {
        if (res.status === 401) {
          setUnauthorized(true)
          return
        }
        const data = (await res.json()) as Order[]
        setOrders(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl space-y-8 px-4 py-16 md:px-12">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-on-surface-variant hover:text-on-surface">
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="font-heading text-3xl font-bold text-on-surface">
            Mes challenges
          </h1>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}

        {!loading && unauthorized && (
          <div className="card space-y-4 p-8 text-center">
            <p className="text-on-surface-variant">
              Veuillez vous connecter pour voir vos challenges.
            </p>
            <Link href="/signin">
              <Button>Se connecter</Button>
            </Link>
          </div>
        )}

        {!loading && !unauthorized && orders.length === 0 && (
          <div className="card space-y-4 p-8 text-center">
            <p className="text-on-surface-variant">
              Vous n&apos;avez pas encore de challenge.
            </p>
            <Link href="/#challenges">
              <Button>Choisir un challenge</Button>
            </Link>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="font-label text-sm font-semibold text-on-surface">
                    {formatAccountSize(order.challenge.accountSize)} —{" "}
                    {order.challenge.stepType === "TWO_STEP" ? "2-Step" : "1-Step"}
                  </div>
                  <div className="text-xs text-on-surface-variant">
                    {order.challenge.title}
                  </div>
                  <div className="text-xs text-on-surface-variant">
                    {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-label text-sm font-bold text-on-surface">
                      {formatPrice(order.amountCents, order.currency)}
                    </div>
                    <div className={cn("font-label text-xs", STATUS_COLOR[order.status])}>
                      {STATUS_LABEL[order.status]}
                    </div>
                  </div>

                  {order.payment?.invoiceUrl &&
                    order.status !== "FINISHED" &&
                    order.status !== "FAILED" &&
                    order.status !== "EXPIRED" && (
                      <a
                        href={order.payment.invoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="gap-2 px-3 py-2 text-xs">
                          Payer
                          <ExternalLink className="size-3" />
                        </Button>
                      </a>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
