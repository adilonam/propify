"use client"

import Link from "next/link"
import { CheckCircle2, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  CheckoutField,
  checkoutControlClassName,
  checkoutSelectClassName,
} from "@/components/checkout/checkout-field"
import { CHECKOUT_ADDONS } from "@/lib/checkout"
import { formatPrice } from "@/lib/challenges-ui"
import { cn } from "@/lib/utils"

type SummaryRow = {
  label: string
  value: string
}

type CheckoutSummaryProps = {
  couponCode: string
  onCouponCodeChange: (value: string) => void
  onApplyCoupon: () => void
  couponMessage: string | null
  rows: SummaryRow[]
  basePrice: number
  subTotal: number
  total: number
  currency: string
  selectedAddonIds: string[]
  platformName: string
  onPlatformChange: (platformId: string) => void
  platforms: Array<{ id: string; name: string }>
  termsAccepted: boolean
  onTermsChange: (value: boolean) => void
  paying: boolean
  paymentFailed: boolean
  error: string | null
  onPay: () => void
  canPay: boolean
}

export function CheckoutSummary({
  couponCode,
  onCouponCodeChange,
  onApplyCoupon,
  couponMessage,
  rows,
  basePrice,
  subTotal,
  total,
  currency,
  selectedAddonIds,
  platformName,
  onPlatformChange,
  platforms,
  termsAccepted,
  onTermsChange,
  paying,
  paymentFailed,
  error,
  onPay,
  canPay,
}: CheckoutSummaryProps) {
  const selectedAddons = CHECKOUT_ADDONS.filter((a) =>
    selectedAddonIds.includes(a.id)
  )

  return (
    <aside className="space-y-5 rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] p-5 sm:p-6 lg:sticky lg:top-24">
      <div>
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="font-heading text-lg font-semibold text-[var(--text-white)]">
            Récapitulatif
          </h2>
          <span className="rounded-full border border-[var(--landing-border)] px-2 py-0.5 font-label text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
            Optionnel
          </span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => onCouponCodeChange(e.target.value)}
            placeholder="Code promo"
            className={cn(checkoutControlClassName, "flex-1")}
            aria-label="Code promo"
          />
          <Button
            type="button"
            variant="primary"
            className="shrink-0 px-4"
            onClick={onApplyCoupon}
          >
            Appliquer
          </Button>
        </div>
        {couponMessage ? (
          <p className="mt-2 font-label text-xs text-[var(--text-muted)]">
            {couponMessage}
          </p>
        ) : null}
      </div>

      <dl className="space-y-2.5 border-t border-[var(--landing-border-subtle)] pt-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-3 font-label text-sm"
          >
            <dt className="text-[var(--text-muted)]">{row.label}</dt>
            <dd className="text-right text-[var(--text-main)]">{row.value}</dd>
          </div>
        ))}
        <div className="flex items-start justify-between gap-3 font-label text-sm">
          <dt className="text-[var(--text-muted)]">Plateforme</dt>
          <dd className="text-right text-[var(--text-main)]">{platformName}</dd>
        </div>
        {selectedAddons.map((addon) => (
          <div
            key={addon.id}
            className="flex items-start justify-between gap-3 font-label text-sm"
          >
            <dt className="text-[var(--text-muted)]">{addon.label}</dt>
            <dd className="text-right text-[var(--electric-blue)]">
              +{addon.percent}%
            </dd>
          </div>
        ))}
      </dl>

      <div className="space-y-2 border-t border-[var(--landing-border-subtle)] pt-4">
        <div className="flex justify-between font-label text-sm">
          <span className="text-[var(--text-muted)]">Prix de base</span>
          <span className="text-[var(--text-main)]">
            {formatPrice(basePrice, currency)}
          </span>
        </div>
        <div className="flex justify-between font-label text-sm">
          <span className="text-[var(--text-muted)]">Sous-total</span>
          <span className="text-[var(--text-main)]">
            {formatPrice(subTotal, currency)}
          </span>
        </div>
        <div className="flex items-end justify-between gap-3 pt-1">
          <span className="font-heading text-base font-semibold text-[var(--text-white)]">
            Total
          </span>
          <span className="font-heading text-3xl font-bold tracking-tight text-[var(--text-white)]">
            {formatPrice(total, currency)}
          </span>
        </div>
      </div>

      <div className="space-y-3 border-t border-[var(--landing-border-subtle)] pt-4">
        <CheckoutField label="Mode de paiement" htmlFor="payment-method">
          <select
            id="payment-method"
            className={checkoutSelectClassName}
            defaultValue="card"
            aria-label="Mode de paiement"
          >
            <option value="card">Carte bancaire</option>
          </select>
        </CheckoutField>

        <CheckoutField label="Plateforme de trading" htmlFor="trading-platform">
          <select
            id="trading-platform"
            className={checkoutSelectClassName}
            value={platforms.find((p) => p.name === platformName)?.id ?? platforms[0]?.id}
            onChange={(e) => onPlatformChange(e.target.value)}
          >
            {platforms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </CheckoutField>

        <p className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-surface)] px-4 py-3 font-label text-xs leading-relaxed text-[var(--text-muted)]">
          Paiement sécurisé par carte via les serveurs Whop. Vos données ne sont
          pas stockées sur PROPIFY.
        </p>
      </div>

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => onTermsChange(e.target.checked)}
          className="mt-0.5 size-4 rounded border-[var(--landing-border)] accent-[var(--primary-blue)]"
        />
        <span className="font-label text-xs leading-relaxed text-[var(--text-muted)]">
          J&apos;accepte les{" "}
          <Link
            href="/legal/terms"
            className="text-[var(--electric-blue)] underline-offset-2 hover:underline"
          >
            Conditions générales
          </Link>{" "}
          et la{" "}
          <Link
            href="/legal/privacy"
            className="text-[var(--electric-blue)] underline-offset-2 hover:underline"
          >
            Politique de confidentialité
          </Link>
          .
        </span>
      </label>

      {paymentFailed ? (
        <p className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-center font-label text-sm text-yellow-300">
          Paiement annulé ou échoué. Vous pouvez réessayer.
        </p>
      ) : null}

      {error ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center font-label text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <Button
        type="button"
        className="w-full py-3.5 text-base"
        onClick={onPay}
        disabled={paying || !canPay}
      >
        {paying
          ? "Redirection…"
          : paymentFailed
            ? "Réessayer le paiement"
            : "Suivant"}
      </Button>

      <p className="font-label text-[11px] leading-relaxed text-[var(--text-muted)]">
        Le nom figurant sur votre compte doit correspondre à une pièce
        d&apos;identité officielle.
      </p>

      <div className="flex items-center justify-center gap-2 font-label text-xs text-[var(--text-muted)]">
        <ShieldCheck className="size-4 text-[var(--success-green)]" />
        <span>Paiement sécurisé — vos données sont protégées</span>
        <CheckCircle2 className="size-3.5 text-[var(--success-green)]" />
      </div>
    </aside>
  )
}
