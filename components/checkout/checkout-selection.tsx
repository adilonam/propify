"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import {
  type ChallengeStepType,
  formatAccountSize,
  formatPrice,
} from "@/lib/challenges-ui"
import { stepTypeDisplayLabel } from "@/lib/checkout"

type AccountSizeOption = {
  accountSize: number
  fee: string
  currency: string
}

type CheckoutSelectionProps = {
  stepTypes: ChallengeStepType[]
  stepType: ChallengeStepType
  onStepTypeChange: (value: ChallengeStepType) => void
  accountSizes: AccountSizeOption[]
  accountSize: number
  onAccountSizeChange: (value: number) => void
  optionId: string
  optionLabels: Array<{ id: string; label: string }>
  onOptionChange: (value: string) => void
  evaluationSummary: string
  accountSummary: string
}

function SelectionTile({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-xl border px-3 py-3.5 text-center font-label text-sm transition-all",
        active
          ? "border-[var(--electric-blue)] bg-[color-mix(in_srgb,var(--primary-blue)_14%,var(--landing-card))] text-[var(--text-white)] shadow-[0_0_22px_color-mix(in_srgb,var(--blue-glow)_40%,transparent)]"
          : "border-[var(--landing-border)] bg-[var(--landing-surface)] text-[var(--text-muted)] hover:border-[color-mix(in_srgb,var(--primary-blue)_45%,var(--landing-border))] hover:text-[var(--text-main)]"
      )}
    >
      {children}
    </button>
  )
}

export function CheckoutSelection({
  stepTypes,
  stepType,
  onStepTypeChange,
  accountSizes,
  accountSize,
  onAccountSizeChange,
  optionId,
  optionLabels,
  onOptionChange,
  evaluationSummary,
  accountSummary,
}: CheckoutSelectionProps) {
  return (
    <section className="space-y-6 rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] p-5 sm:p-6">
      <div>
        <h2 className="font-heading text-lg font-semibold text-[var(--text-white)]">
          Détails de l&apos;achat
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-surface)] px-4 py-3">
            <div className="font-label text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
              Évaluation
            </div>
            <div className="mt-1 font-heading text-2xl font-bold text-[var(--text-white)]">
              {evaluationSummary}
            </div>
          </div>
          <div className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-surface)] px-4 py-3">
            <div className="font-label text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
              Compte
            </div>
            <div className="mt-1 font-heading text-2xl font-bold text-[var(--text-white)]">
              {accountSummary}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-label text-xs uppercase tracking-wide text-[var(--text-muted)]">
          Type d&apos;évaluation
        </h3>
        <div
          className={cn(
            "grid gap-3",
            stepTypes.length > 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"
          )}
        >
          {stepTypes.map((type) => (
            <SelectionTile
              key={type}
              active={stepType === type}
              onClick={() => onStepTypeChange(type)}
            >
              {stepTypeDisplayLabel(type)}
            </SelectionTile>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-label text-xs uppercase tracking-wide text-[var(--text-muted)]">
          Taille du compte
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {accountSizes.map((option) => {
            const active = accountSize === option.accountSize
            return (
              <SelectionTile
                key={option.accountSize}
                active={active}
                onClick={() => onAccountSizeChange(option.accountSize)}
              >
                <div className="font-heading text-base font-semibold tracking-tight">
                  {formatAccountSize(option.accountSize)}
                </div>
                <div
                  className={cn(
                    "mt-1 font-mono text-[11px] tabular-nums",
                    active ? "text-[var(--electric-blue)]" : "text-[var(--text-muted)]"
                  )}
                >
                  {formatPrice(option.fee, option.currency)}
                </div>
              </SelectionTile>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="checkout-option"
          className="font-label text-xs uppercase tracking-wide text-[var(--text-muted)]"
        >
          Option
        </label>
        <select
          id="checkout-option"
          value={optionId}
          onChange={(e) => onOptionChange(e.target.value)}
          className={cn(
            "w-full rounded-lg border border-[var(--landing-border)] bg-[var(--landing-surface)] px-4 py-3 text-sm text-[var(--text-white)]",
            "focus-visible:border-[var(--primary-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-glow)]/30",
            "appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10",
            "[background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%238A98A8%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E')]"
          )}
        >
          {optionLabels.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}
