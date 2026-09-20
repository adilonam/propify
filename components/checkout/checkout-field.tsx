import * as React from "react"

import { cn } from "@/lib/utils"

type CheckoutFieldProps = {
  label: string
  required?: boolean
  htmlFor?: string
  className?: string
  children: React.ReactNode
}

export function CheckoutField({
  label,
  required,
  htmlFor,
  className,
  children,
}: CheckoutFieldProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("flex flex-col gap-1.5", className)}
    >
      <span className="font-label text-xs text-[var(--text-muted)]">
        {label}
        {required ? (
          <span className="ml-0.5 text-[var(--danger-red)]" aria-hidden>
            *
          </span>
        ) : null}
      </span>
      {children}
    </label>
  )
}

export const checkoutControlClassName = cn(
  "w-full rounded-lg border border-[var(--landing-border)] bg-[var(--landing-surface)] px-4 py-3 text-sm text-[var(--text-white)]",
  "placeholder:text-[var(--text-muted)]",
  "focus-visible:border-[var(--primary-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-glow)]/30",
  "disabled:cursor-not-allowed disabled:opacity-50"
)

export const checkoutSelectClassName = cn(
  checkoutControlClassName,
  "appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10",
  "[background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%238A98A8%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E')]"
)
