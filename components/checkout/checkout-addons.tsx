"use client"

import {
  CHECKOUT_ADDONS,
  type CheckoutAddon,
} from "@/lib/checkout"
import { cn } from "@/lib/utils"

type CheckoutAddonsProps = {
  selectedIds: string[]
  onToggle: (addon: CheckoutAddon) => void
}

export function CheckoutAddons({ selectedIds, onToggle }: CheckoutAddonsProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] p-5 sm:p-6">
      <h2 className="font-heading text-lg font-semibold text-[var(--text-white)]">
        Add-ons disponibles
      </h2>
      <ul className="space-y-2">
        {CHECKOUT_ADDONS.map((addon) => {
          const checked = selectedIds.includes(addon.id)
          return (
            <li key={addon.id}>
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
                  checked
                    ? "border-[var(--electric-blue)] bg-[color-mix(in_srgb,var(--primary-blue)_12%,var(--landing-surface))]"
                    : "border-[var(--landing-border)] bg-[var(--landing-surface)] hover:border-[color-mix(in_srgb,var(--primary-blue)_40%,var(--landing-border))]"
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(addon)}
                  className="size-4 rounded border-[var(--landing-border)] accent-[var(--primary-blue)]"
                />
                <span className="flex-1 text-sm text-[var(--text-main)]">
                  {addon.label}
                </span>
                <span className="font-label text-sm font-semibold text-[var(--electric-blue)]">
                  +{addon.percent}%
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
