"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"

import { HeaderAuth } from "@/components/propify/header-auth"
import { Logo } from "@/components/propify/logo"
import { SkylineCanvas } from "@/components/skyline/skyline-canvas"
import { TrustLaurelBadge } from "@/components/skyline/trust-laurel"
import { cn } from "@/lib/utils"
import type { SkylineQuality } from "@/lib/skyline/create-skyline"

const NAV = [
  { href: "/#challenges", label: "Challenges" },
  { href: "/#dashboard", label: "Dashboard" },
  { href: "/classement", label: "Classement" },
  { href: "/faq", label: "FAQ" },
  { href: "/support", label: "Support" },
  { href: "/#confiance", label: "À propos" },
] as const

const ANNOUNCEMENT_LINKS = [
  { href: "/#challenges", label: "Challenges" },
  { href: "/classement", label: "Classement" },
  {
    href: "/#dashboard",
    label: "Markets 24/7",
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

const FEATURED_IN = [
  { name: "Forbes", src: "/images/press/forbes.svg", height: 14 },
  { name: "Business Insider", src: "/images/press/business-insider.svg", height: 14 },
  { name: "Yahoo Finance", src: "/images/press/yahoo-finance.svg", height: 15 },
  { name: "Benzinga", src: "/images/press/benzinga.svg", height: 14 },
  { name: "StreetInsider", src: "/images/press/streetinsider.svg", height: 13 },
] as const

const HERO_VIDEO_SRC = "/hero/hero2.mp4"

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
        Trade <span className="font-semibold text-white">24/7</span> gold, indices,
        crypto and more
      </span>
      <MarketIconStack />
      <span className="shrink-0 font-label text-[11px] font-semibold tracking-wide text-white">
        weekends included
      </span>
    </span>
  )
}

function useMediaQuery(query: string) {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener("change", onStoreChange)
      return () => mql.removeEventListener("change", onStoreChange)
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}

function HeroBackgroundVideo({ reducedMotion }: { reducedMotion: boolean }) {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (reducedMotion) {
      video.pause()
      return
    }

    void video.play().catch(() => {
      /* autoplay may be blocked; muted + playsInline usually works */
    })
  }, [reducedMotion])

  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--landing-bg)]" aria-hidden>
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
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
          Prop firm européenne
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

function LandingNav() {
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
            {NAV.map((item) => (
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
              href="/#challenges"
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-white px-3.5 py-2",
                "font-heading text-xs font-bold tracking-tight text-[#0a0612]"
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
              {NAV.map((item) => (
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

export type SkylineHeroProps = {
  /** Default video background; pass `"canvas"` for the live WebGL skyline. */
  background?: "video" | "canvas"
}

function pickCanvasQuality(isNarrow: boolean, reducedMotion: boolean): SkylineQuality {
  if (reducedMotion) return "min"
  if (isNarrow) return "lite"
  return "high"
}

export function SkylineHero({ background = "video" }: SkylineHeroProps) {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const isNarrow = useMediaQuery("(max-width: 768px)")
  const canvasQuality = pickCanvasQuality(isNarrow, prefersReducedMotion)

  return (
    <>
      <LandingNav />

      <section
        id="accueil"
        className="relative flex min-h-[calc(100dvh-7.5rem)] scroll-mt-0 overflow-hidden bg-[var(--landing-bg)] text-white md:min-h-[calc(100dvh-6.75rem)]"
      >
        {background === "canvas" ? (
          <SkylineCanvas
            reducedMotion={prefersReducedMotion}
            quality={canvasQuality}
          />
        ) : (
          <HeroBackgroundVideo reducedMotion={prefersReducedMotion} />
        )}

        {/* Atmospheric vignette — keeps copy readable over scene/video */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              background === "canvas"
                ? "linear-gradient(180deg, color-mix(in srgb, var(--landing-bg) 28%, transparent) 0%, transparent 22%, transparent 58%, color-mix(in srgb, var(--landing-bg) 82%, transparent) 100%)"
                : "linear-gradient(180deg, color-mix(in srgb, var(--landing-bg) 32%, transparent) 0%, transparent 24%, transparent 60%, color-mix(in srgb, var(--landing-bg) 85%, transparent) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center px-4 pb-28 pt-16 text-center md:pb-32 md:pt-20">
          <div
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-5 md:gap-6",
              !prefersReducedMotion && "animate-hero-rise"
            )}
          >
            <h1 className="font-heading text-[clamp(2.35rem,7.5vw,4.75rem)] leading-[1.05] font-extrabold tracking-tight text-white">
              Financé rapidement
              <br />
              Payé plus vite
            </h1>

            <TrustLaurelBadge />

            <Link href="/#challenges" className="mt-2 md:mt-4">
              <span
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-white px-10 py-4",
                  "font-heading text-base font-bold tracking-tight text-[#0a0612]",
                  "shadow-[0_0_40px_rgba(168,85,247,0.28)] transition-transform hover:scale-[1.03] active:scale-[0.98]",
                  "md:px-14 md:py-5 md:text-lg"
                )}
              >
                Commencer un challenge
              </span>
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-6 md:py-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 min-[480px]:gap-x-10 md:gap-x-8 lg:gap-x-12">
              {FEATURED_IN.map((outlet) => (
                <li key={outlet.name} className="flex items-center">
                  <span className="block opacity-55 transition-opacity duration-200 hover:opacity-80">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local SVG press logos */}
                    <img
                      src={outlet.src}
                      alt={outlet.name}
                      className="block w-auto"
                      style={{ height: outlet.height }}
                      loading="lazy"
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
