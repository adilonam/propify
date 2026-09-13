import type { ReactNode } from "react"
import Image from "next/image"

function CertificateFace({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] shadow-[0_24px_60px_rgba(0,0,0,0.55)] ${className ?? ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-20%] bottom-[18%] h-24 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--landing-purple)_70%,transparent),transparent_72%)] blur-md"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[28%] h-px bg-gradient-to-r from-transparent via-[var(--landing-purple)] to-transparent opacity-90"
      />

      <div className="relative flex h-full flex-col px-6 pb-5 pt-5 sm:px-7 sm:pb-6 sm:pt-6">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt=""
            width={28}
            height={28}
            className="size-7 object-contain"
            unoptimized
          />
          <span className="font-heading text-sm font-bold tracking-tight text-[var(--text-white)]">
            PROPIFY
          </span>
        </div>

        <div className="mt-8 flex flex-1 flex-col justify-center sm:mt-10">
          <p className="font-heading text-xl font-bold tracking-[0.04em] text-[var(--text-white)] sm:text-2xl">
            PAYOUT CERTIFICATE
          </p>
          <div className="mt-5 space-y-1">
            <p className="text-xs text-[var(--text-muted)]">Émis à</p>
            <p className="text-sm font-medium text-[var(--text-white)]">Oskar L.</p>
          </div>
          <div className="mt-4 space-y-1">
            <p className="text-xs text-[var(--text-muted)]">Montant du payout</p>
            <p className="font-heading text-3xl font-bold tracking-tight text-[var(--text-white)] sm:text-4xl">
              $18,600
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div
            aria-hidden
            className="size-8 rounded-full border border-[var(--landing-border)] bg-[var(--landing-surface)]"
          />
          <svg
            aria-hidden
            viewBox="0 0 120 36"
            className="h-8 w-24 text-[var(--text-white)] opacity-80"
            fill="none"
          >
            <path
              d="M4 24c12-14 18-2 28-8s14-14 22-6 10 16 20 10 16-18 28-12 12 14 14 16"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

function FloatingCard({
  className,
  delayClass,
  children,
}: {
  className?: string
  delayClass?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <div className={`animate-how-float h-full ${delayClass ?? ""}`}>{children}</div>
    </div>
  )
}

export function PayoutCertificateStack() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] sm:max-w-[380px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--landing-purple)_28%,transparent),transparent_68%)] blur-2xl"
      />

      <FloatingCard className="absolute inset-[8%] origin-bottom rotate-[-14deg] scale-[0.92] opacity-55">
        <CertificateFace className="h-full" />
      </FloatingCard>
      <FloatingCard
        className="absolute inset-[8%] origin-bottom rotate-[12deg] scale-[0.94] opacity-70"
        delayClass="[animation-delay:0.4s]"
      >
        <CertificateFace className="h-full" />
      </FloatingCard>
      <FloatingCard
        className="absolute inset-[6%] origin-bottom"
        delayClass="[animation-delay:0.8s]"
      >
        <CertificateFace className="h-full" />
      </FloatingCard>
    </div>
  )
}
