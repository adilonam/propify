"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import {
  CHALLENGE_PLATFORMS,
  type ChallengeStepType,
  formatAccountSize,
  stepTypeLabel,
} from "@/lib/challenges-ui"

type AccountSizeOption = {
  accountSize: number
  fee: string
  currency: string
}

type ChallengeFiltersProps = {
  stepTypes: ChallengeStepType[]
  stepType: ChallengeStepType
  onStepTypeChange: (value: ChallengeStepType) => void
  accountSizes: AccountSizeOption[]
  accountSize: number | null
  onAccountSizeChange: (value: number) => void
  platformId: string
  onPlatformChange: (value: string) => void
  showPlatforms?: boolean
}

function PillToggle({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
      <span className="font-label text-xs text-on-surface-variant sm:min-w-[4.5rem] sm:text-right">
        {label}
      </span>
      <div className="inline-flex max-w-full flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-[#121218] p-1">
        {children}
      </div>
    </div>
  )
}

function PillButton({
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
      className={cn(
        "rounded-full px-4 py-2 font-label text-sm transition-colors",
        active
          ? "bg-white font-medium text-black"
          : "text-on-surface-variant hover:text-white"
      )}
    >
      {children}
    </button>
  )
}

export function ChallengeFilters({
  stepTypes,
  stepType,
  onStepTypeChange,
  accountSizes,
  accountSize,
  onAccountSizeChange,
  platformId,
  onPlatformChange,
  showPlatforms = true,
}: ChallengeFiltersProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      {stepTypes.length > 1 ? (
        <PillToggle label="Format">
          {stepTypes.map((type) => (
            <PillButton
              key={type}
              active={stepType === type}
              onClick={() => onStepTypeChange(type)}
            >
              {stepTypeLabel(type)}
            </PillButton>
          ))}
        </PillToggle>
      ) : null}

      {showPlatforms ? (
        <div
          role="listbox"
          aria-label="Plateforme d'exécution"
          className="flex w-full max-w-3xl flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#0c0c10]/80 p-2 sm:gap-3 sm:p-3"
        >
          {CHALLENGE_PLATFORMS.map((platform) => {
            const active = platformId === platform.id
            return (
              <button
                key={platform.id}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => onPlatformChange(platform.id)}
                className={cn(
                  "flex min-h-12 flex-1 items-center justify-center rounded-xl px-3 py-2 transition-colors sm:min-w-[7rem]",
                  active
                    ? "border border-white bg-white/5"
                    : "border border-transparent opacity-70 hover:opacity-100"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- local platform marks */}
                <img
                  src={platform.src}
                  alt={platform.name}
                  className="h-7 w-auto max-w-[7.5rem] object-contain sm:h-8"
                />
              </button>
            )
          })}
        </div>
      ) : null}

      {accountSizes.length > 0 ? (
        <div className="w-full max-w-5xl overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            role="listbox"
            aria-label="Capital du compte"
            className="mx-auto flex w-max justify-center gap-2.5 rounded-full border border-white/10 bg-[#121218] p-1 sm:gap-2"
          >
            {accountSizes.map((option) => {
              const active = accountSize === option.accountSize
              const amount = Number(option.fee).toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
              const symbol =
                option.currency === "EUR"
                  ? "€"
                  : option.currency === "USD"
                    ? "$"
                    : option.currency
              return (
                <button
                  key={option.accountSize}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => onAccountSizeChange(option.accountSize)}
                  className={cn(
                    "flex min-h-16 min-w-[4.5rem] flex-col items-center justify-center gap-1.5 rounded-full px-4 py-3.5 transition-colors sm:min-w-[5rem]",
                    active
                      ? "border border-transparent bg-white text-black"
                      : "border border-white/10 bg-white/[0.04] text-on-surface-variant hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <span className="font-heading text-sm font-semibold leading-none tracking-tight">
                    {formatAccountSize(option.accountSize)}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "h-px w-5",
                      active ? "bg-black/20" : "bg-[var(--landing-border)]"
                    )}
                  />
                  <span
                    className={cn(
                      "font-mono text-[10px] leading-none tabular-nums sm:text-[11px]",
                      active ? "text-black/60" : "text-on-surface-variant/80"
                    )}
                  >
                    {amount}
                    <span className="ml-0.5">{symbol}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
