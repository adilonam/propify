"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"

import { HeaderAuth } from "@/components/propify/header-auth"
import { Logo } from "@/components/propify/logo"
import { cn } from "@/lib/utils"

export const LANDING_NAV = [
  { href: "/challenges", label: "Challenges" },
  { href: "/classement", label: "Classement" },
  { href: "/faq", label: "FAQ" },
  { href: "/support", label: "Support" },
  { href: "/a-propos", label: "À propos" },
] as const

const ANNOUNCEMENT_LINKS = [
  { href: "/challenges", label: "Challenges" },
  { href: "/classement", label: "Classement" },
  {
    href: "/#dashboard",
    label: "Marchés 24/7",
    badge: "NEW" as const,
    mark: "/images/platforms/hyperliquid-mark.svg",
  },
] as const

const MARKET_ICONS = [
  { src: "/images/markets/gold.svg", alt: "Gold", bg: undefined as string | undefined },
  { src: "/images/markets/btc.svg", alt: "Bitcoin", bg: undefined },
  {
    src: "/images/markets/nvidia.svg",
    alt: "NVIDIA",
    bg: "#76b900",
    invert: true,
  },
  { src: "/images/markets/sp500.svg", alt: "S&P 500", bg: undefined },
] as const

function MarketIconStack({ className }: { className?: string }) {
  return (
    <span className={cn("flex shrink-0 items-center", className)} aria-hidden>
      {MARKET_ICONS.map((icon, index) => (
        <span
          key={icon.src}
          style={{
            zIndex: MARKET_ICONS.length - index,
            background: icon.bg,
          }}
          className={cn(
            "relative -ml-1.5 flex size-5 items-center justify-center overflow-hidden rounded-full",
            "ring-2 ring-black first:ml-0 xl:size-6"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- local SVG market marks */}
          <img
            src={icon.src}
            alt=""
            className={cn(
              "size-full",
              "invert" in icon && icon.invert && "size-3 xl:size-3.5 brightness-0 invert"
            )}
          />
        </span>
      ))}
      <span
        aria-hidden
        className="relative -ml-1.5 size-5 shrink-0 rounded-full ring-2 ring-black xl:size-6"
        style={{
          zIndex: 0,
          background:
            "linear-gradient(to right, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.13) 45%, rgba(255,255,255,0.06) 75%, rgba(255,255,255,0.02) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, #000 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.28) 80%, rgba(0,0,0,0.08) 100%)",
          maskImage:
            "linear-gradient(to right, #000 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.28) 80%, rgba(0,0,0,0.08) 100%)",
        }}
      />
    </span>
  )
}

function AnnouncementTapeSegment() {
  return (
    <span className="flex items-center gap-2.5 pr-10">
      <span className="font-label text-[11px] tracking-wide text-white/65">
        Opérez <span className="font-semibold text-white">24h/24</span> sur l&apos;or,
        les indices, la crypto et plus
      </span>
      <MarketIconStack />
      <span className="shrink-0 font-label text-[11px] font-semibold tracking-wide text-white">
        week-ends inclus
      </span>
    </span>
  )
}

function AnnouncementBar() {
  return (
    <div className="border-b border-white/10 bg-[var(--landing-bg)] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 md:px-10">
        <div className="hidden items-center gap-4 lg:flex">
          {ANNOUNCEMENT_LINKS.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="inline-flex items-center gap-1.5 font-label text-[11px] tracking-wide text-white/70 transition-colors hover:text-white"
            >
              {"mark" in item && item.mark ? (
                <>
                  <span className="lg:hidden">{item.label.split(" ")[0]}</span>
                  <span className="hidden lg:inline">{item.label}</span>
                  <span className="ml-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full leading-none lg:bg-white/5 lg:py-1 lg:pl-1.5 lg:pr-2 lg:ring-1 lg:ring-white/15">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.mark}
                      alt=""
                      className="size-3.5 shrink-0"
                    />
                    {item.badge ? (
                      <span className="hidden text-[9px] font-bold tracking-[0.06em] text-white uppercase lg:inline">
                        {item.badge}
                      </span>
                    ) : null}
                  </span>
                </>
              ) : (
                <>
                  {item.label}
                  {"badge" in item && item.badge ? (
                    <span className="inline-flex items-center rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-black">
                      {item.badge}
                    </span>
                  ) : null}
                </>
              )}
            </Link>
          ))}
        </div>

        <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent)]">
          <div className="animate-topbar-tape flex w-max">
            <AnnouncementTapeSegment />
            <AnnouncementTapeSegment />
          </div>
        </div>

        <p className="hidden shrink-0 font-label text-[11px] tracking-wide text-white/55 xl:block">
          Prop firm basée en Europe
        </p>
      </div>
    </div>
  )
}

function LocaleSelector() {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-label text-[11px] tracking-wide text-white/75 transition-colors hover:bg-white/5 hover:text-white"
      aria-label="Langue et devise"
    >
      <span
        className="relative inline-block shrink-0 overflow-hidden rounded-[3px] bg-white/10"
        style={{ width: 18, height: 14 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- local SVG flag */}
        <img
          src="/images/flags/us.svg"
          alt=""
          width={18}
          height={14}
          className="block size-full object-cover"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[3px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18),inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_1px_rgba(0,0,0,0.2)]"
        />
      </span>
      <span>EN</span>
      <span aria-hidden className="mx-0.5 h-3 w-px bg-white/20" />
      <span className="tabular-nums">$</span>
      <ChevronDown className="mt-px size-2.5 opacity-70" aria-hidden />
    </button>
  )
}

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[var(--landing-bg)] text-white">
      <AnnouncementBar />

      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 md:px-10">
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-90">
            <Logo tone="inverse" />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {LANDING_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-label text-sm text-white/80 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <LocaleSelector />
            <HeaderAuth variant="marketing" />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LocaleSelector />
            <Link
              href="/challenges"
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-white px-3.5 py-2",
                "font-heading text-xs font-bold tracking-tight text-[var(--landing-ink)]"
              )}
            >
              Challenge
            </Link>
            <button
              type="button"
              className="rounded-lg p-2 text-white"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-white/10 bg-[var(--landing-bg)] px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {LANDING_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-label text-sm text-white/80 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-white/10 pt-4">
                <HeaderAuth
                  variant="marketing"
                  onNavigate={() => setMobileOpen(false)}
                />
              </div>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  )
}
