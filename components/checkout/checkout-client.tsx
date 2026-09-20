"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CheckoutAddons } from "@/components/checkout/checkout-addons"
import {
  CheckoutBilling,
  type BillingDetails,
} from "@/components/checkout/checkout-billing"
import { CheckoutSelection } from "@/components/checkout/checkout-selection"
import { CheckoutSummary } from "@/components/checkout/checkout-summary"
import {
  CHALLENGE_PLATFORMS,
  type ChallengeApiItem,
  type ChallengeStepType,
  availableStepTypes,
  formatAccountSize,
} from "@/lib/challenges-ui"
import {
  CHECKOUT_OPTIONS,
  accountSizesForStep,
  computeCheckoutTotal,
  findChallenge,
  stepTypeDisplayLabel,
  type CheckoutAddon,
} from "@/lib/checkout"

const EMPTY_BILLING: BillingDetails = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "FR",
}

type CheckoutClientProps = {
  challengeInfoId: string
}

export function CheckoutClient({ challengeInfoId }: CheckoutClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()

  const [challenges, setChallenges] = React.useState<ChallengeApiItem[]>([])
  const [selectedId, setSelectedId] = React.useState(challengeInfoId)
  const [loading, setLoading] = React.useState(true)
  const [paying, setPaying] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const [optionId, setOptionId] = React.useState(CHECKOUT_OPTIONS[0]!.id)
  const [platformId, setPlatformId] = React.useState<string>(
    CHALLENGE_PLATFORMS[0]!.id
  )
  const [selectedAddonIds, setSelectedAddonIds] = React.useState<string[]>([])
  const [billing, setBilling] = React.useState<BillingDetails>(EMPTY_BILLING)
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const [couponCode, setCouponCode] = React.useState("")
  const [couponMessage, setCouponMessage] = React.useState<string | null>(null)

  const paymentStatus = searchParams.get("status")
  const orderIdFromQuery = searchParams.get("orderId")
  const paymentSucceeded = paymentStatus === "success"
  const paymentFailed =
    paymentStatus === "error" || paymentStatus === "cancelled"

  React.useEffect(() => {
    fetch("/api/challenges")
      .then((res) => res.json())
      .then((data: ChallengeApiItem[]) => {
        setChallenges(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  React.useEffect(() => {
    setSelectedId(challengeInfoId)
  }, [challengeInfoId])

  React.useEffect(() => {
    const email = session?.user?.email
    if (!email) return
    setBilling((prev) => (prev.email ? prev : { ...prev, email }))
  }, [session?.user?.email])

  const selected =
    challenges.find((c) => c.id === selectedId) ??
    challenges.find((c) => c.challengeId === selectedId) ??
    null

  const stepTypes = availableStepTypes(challenges)
  const stepType: ChallengeStepType =
    selected?.stepType ?? stepTypes[0] ?? "ONE_STEP"
  const accountSizes = accountSizesForStep(challenges, stepType)
  const accountSize =
    selected?.accountSize ?? accountSizes[0]?.accountSize ?? 0

  const basePrice = selected ? Number(selected.fee) : 0
  const currency = selected?.currency ?? "EUR"
  const pricing = computeCheckoutTotal(basePrice, selectedAddonIds)

  const platform =
    CHALLENGE_PLATFORMS.find((p) => p.id === platformId) ??
    CHALLENGE_PLATFORMS[0]!
  const optionLabel =
    CHECKOUT_OPTIONS.find((o) => o.id === optionId)?.label ??
    CHECKOUT_OPTIONS[0]!.label

  function selectChallenge(next: ChallengeApiItem) {
    setSelectedId(next.id)
    setError(null)
    if (next.id !== challengeInfoId) {
      const qs = searchParams.toString()
      router.replace(qs ? `/checkout/${next.id}?${qs}` : `/checkout/${next.id}`)
    }
  }

  function handleStepTypeChange(nextType: ChallengeStepType) {
    const sizes = accountSizesForStep(challenges, nextType)
    const preferredSize =
      sizes.find((s) => s.accountSize === accountSize)?.accountSize ??
      sizes[0]?.accountSize
    if (preferredSize == null) return
    const next = findChallenge(challenges, nextType, preferredSize)
    if (next) selectChallenge(next)
  }

  function handleAccountSizeChange(nextSize: number) {
    const next = findChallenge(challenges, stepType, nextSize)
    if (next) selectChallenge(next)
  }

  function toggleAddon(addon: CheckoutAddon) {
    setSelectedAddonIds((prev) =>
      prev.includes(addon.id)
        ? prev.filter((id) => id !== addon.id)
        : [...prev, addon.id]
    )
  }

  function handleApplyCoupon() {
    const code = couponCode.trim()
    if (!code) {
      setCouponMessage("Saisissez un code promo.")
      return
    }
    setCouponMessage(
      "Ce code n’est pas applicable pour le moment. Le total reste inchangé."
    )
  }

  function billingComplete(details: BillingDetails): boolean {
    return Boolean(
      details.email.trim() &&
        details.firstName.trim() &&
        details.lastName.trim() &&
        details.phone.trim() &&
        details.address.trim() &&
        details.city.trim() &&
        details.postalCode.trim() &&
        details.country.trim()
    )
  }

  async function handlePay() {
    if (!selected) return
    if (!termsAccepted) {
      setError("Veuillez accepter les conditions pour continuer.")
      return
    }
    if (!billingComplete(billing)) {
      setError("Veuillez renseigner les coordonnées de facturation.")
      return
    }

    setPaying(true)
    setError(null)
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId: selected.id,
          selectedAddonIds,
          platformId,
          optionId,
          billing: {
            email: billing.email.trim(),
            firstName: billing.firstName.trim(),
            lastName: billing.lastName.trim(),
            phone: billing.phone.trim(),
            address: billing.address.trim(),
            city: billing.city.trim(),
            state: billing.state.trim() || undefined,
            postalCode: billing.postalCode.trim(),
            country: billing.country,
          },
        }),
      })
      if (res.status === 401) {
        router.push(`/signin?callbackUrl=/checkout/${selected.id}`)
        return
      }
      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        setError(data.error ?? "Une erreur est survenue")
        setPaying(false)
        return
      }
      const data = (await res.json()) as { orderId: string; purchaseUrl: string }
      if (!data.purchaseUrl) {
        setError("Une erreur est survenue")
        setPaying(false)
        return
      }
      window.location.href = data.purchaseUrl
    } catch {
      setError("Une erreur est survenue")
      setPaying(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary-blue)] border-t-transparent" />
      </div>
    )
  }

  if (!selected) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
        <p className="text-[var(--text-muted)]">Challenge introuvable.</p>
        <Link href="/challenges">
          <Button variant="outline">Retour aux challenges</Button>
        </Link>
      </div>
    )
  }

  if (paymentSucceeded) {
    return (
      <div className="mx-auto max-w-lg space-y-8">
        <div className="space-y-6 rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] p-8 text-center">
          <div className="font-heading text-2xl font-bold text-emerald-400">
            Paiement réussi
          </div>
          <p className="font-label text-sm text-[var(--text-muted)]">
            Votre commande a bien été enregistrée.
            {orderIdFromQuery ? ` Référence : ${orderIdFromQuery}` : null}
          </p>
          <Link href="/orders">
            <Button className="w-full py-3">Voir mes commandes</Button>
          </Link>
        </div>
      </div>
    )
  }

  const evaluationSummary = formatAccountSize(selected.accountSize)
  const summaryRows = [
    {
      label: "Taille d'évaluation",
      value: formatAccountSize(selected.accountSize),
    },
    {
      label: "Type d'évaluation",
      value: stepTypeDisplayLabel(selected.stepType),
    },
    { label: "Option", value: optionLabel },
    {
      label: "Taille du compte",
      value: formatAccountSize(selected.accountSize),
    },
    { label: "Devise", value: currency },
  ]

  return (
    <div className="space-y-6">
      <Link
        href="/challenges"
        className="inline-flex items-center gap-2 font-label text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-white)]"
      >
        <ArrowLeft className="size-4" />
        Retour aux challenges
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.9fr)] lg:items-start">
        <div className="space-y-6">
          <CheckoutSelection
            stepTypes={stepTypes.length ? stepTypes : [selected.stepType]}
            stepType={stepType}
            onStepTypeChange={handleStepTypeChange}
            accountSizes={accountSizes}
            accountSize={accountSize}
            onAccountSizeChange={handleAccountSizeChange}
            optionId={optionId}
            optionLabels={[...CHECKOUT_OPTIONS]}
            onOptionChange={setOptionId}
            evaluationSummary={evaluationSummary}
            accountSummary={formatAccountSize(selected.accountSize)}
          />

          <CheckoutAddons
            selectedIds={selectedAddonIds}
            onToggle={toggleAddon}
          />

          <CheckoutBilling value={billing} onChange={setBilling} />
        </div>

        <CheckoutSummary
          couponCode={couponCode}
          onCouponCodeChange={setCouponCode}
          onApplyCoupon={handleApplyCoupon}
          couponMessage={couponMessage}
          rows={summaryRows}
          basePrice={pricing.basePrice}
          subTotal={pricing.total}
          total={pricing.total}
          currency={currency}
          selectedAddonIds={selectedAddonIds}
          platformName={platform.name}
          onPlatformChange={setPlatformId}
          platforms={[...CHALLENGE_PLATFORMS]}
          termsAccepted={termsAccepted}
          onTermsChange={setTermsAccepted}
          paying={paying}
          paymentFailed={paymentFailed}
          error={error}
          onPay={handlePay}
          canPay={termsAccepted}
        />
      </div>
    </div>
  )
}
