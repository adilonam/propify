"use client"

import * as React from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

type DbChallenge = {
  id: string
  title: string
  accountSize: number
  fee: string
  currency: string
  stepType: "ONE_STEP" | "TWO_STEP"
  profitTargetPercent: string
  dailyLossPercent: string
  maxLossPercent: string
  minTradingDays: number
}

function formatPrice(amount: string, currency: string): string {
  const symbol = currency === "EUR" ? "€" : currency
  return `${symbol}${Number(amount).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function formatAccountSize(size: number): string {
  if (size >= 1_000_000) return `${size / 1_000_000}M`
  if (size >= 1_000) return `${size / 1_000}K`
  return String(size)
}

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [challenge, setChallenge] = React.useState<DbChallenge | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [paying, setPaying] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const cancelled = searchParams.get("status") === "cancelled"

  React.useEffect(() => {
    fetch("/api/challenges")
      .then((res) => res.json())
      .then((data: DbChallenge[]) => {
        const found = data.find((c) => c.id === id) ?? null
        setChallenge(found)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  async function handlePay() {
    setPaying(true)
    setError(null)
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: id }),
      })
      if (res.status === 401) {
        router.push(`/signin?callbackUrl=/checkout/${id}`)
        return
      }
      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        setError(data.error ?? "Une erreur est survenue")
        return
      }
      const data = (await res.json()) as { invoiceUrl: string }
      window.location.href = data.invoiceUrl
    } catch {
      setError("Une erreur est survenue")
    } finally {
      setPaying(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!challenge) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-on-surface-variant">Challenge introuvable.</p>
        <Link href="/#challenges">
          <Button variant="outline">Retour aux challenges</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg space-y-8 px-4 py-16">
      <Link
        href="/#challenges"
        className="inline-flex items-center gap-2 font-label text-sm text-on-surface-variant hover:text-on-surface"
      >
        <ArrowLeft className="size-4" />
        Retour aux challenges
      </Link>

      <div className="card space-y-6 p-8">
        <div className="space-y-1 text-center">
          <div className="font-heading text-4xl font-bold text-primary">
            {formatAccountSize(challenge.accountSize)}
          </div>
          <div className="font-label text-sm text-on-surface-variant">
            {challenge.stepType === "TWO_STEP" ? "2-Step Challenge" : "1-Step Challenge"}
          </div>
        </div>

        <div className="space-y-3 border-t border-outline-variant pt-4">
          {[
            ["Profit target", `${challenge.profitTargetPercent}%`],
            ["Daily loss", `${challenge.dailyLossPercent}%`],
            ["Max loss", `${challenge.maxLossPercent}%`],
            ["Min days", `${challenge.minTradingDays} jours`],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between font-label text-sm">
              <span className="text-on-surface-variant">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-outline-variant bg-surface-container p-4 text-center">
          <div className="font-label text-sm text-on-surface-variant">Frais unique</div>
          <div className="font-heading text-3xl font-bold text-on-surface">
            {formatPrice(challenge.fee, challenge.currency)}
          </div>
        </div>

        {cancelled && (
          <p className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-center font-label text-sm text-yellow-300">
            Paiement annulé. Vous pouvez réessayer.
          </p>
        )}

        {error && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center font-label text-sm text-red-300">
            {error}
          </p>
        )}

        <Button
          className="w-full py-3"
          onClick={handlePay}
          disabled={paying}
        >
          {paying ? "Redirection…" : "Payer"}
        </Button>

        <div className="flex items-center justify-center gap-2 font-label text-xs text-on-surface-variant">
          <ShieldCheck className="size-4 text-primary" />
          Paiement sécurisé via Whop
        </div>
      </div>
    </div>
  )
}
