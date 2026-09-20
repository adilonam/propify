"use client"

import * as React from "react"
import Link from "next/link"

import { LandingNav } from "@/components/layout/landing-nav"
import { SkylineCanvas } from "@/components/skyline/skyline-canvas"
import { TrustLaurelBadge } from "@/components/skyline/trust-laurel"
import { cn } from "@/lib/utils"
import type { SkylineQuality } from "@/lib/skyline/create-skyline"

const FEATURED_IN = [
  { name: "Forbes", src: "/images/press/forbes.svg", height: 14 },
  { name: "Business Insider", src: "/images/press/business-insider.svg", height: 14 },
  { name: "Yahoo Finance", src: "/images/press/yahoo-finance.svg", height: 15 },
  { name: "Benzinga", src: "/images/press/benzinga.svg", height: 14 },
  { name: "StreetInsider", src: "/images/press/streetinsider.svg", height: 13 },
] as const

const HERO_VIDEO_SRC = "/hero/hero2.mp4"

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

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 pb-28 pt-16 text-center md:pb-32 md:pt-20">
          <div className="flex flex-1 flex-col items-center justify-center gap-5 md:gap-6">
            <h1
              className={cn(
                "font-heading relative isolate max-w-[10ch] text-[clamp(3.75rem,14vw,8.5rem)] font-bold leading-[0.95] tracking-[0.06em] text-balance",
                !prefersReducedMotion && "animate-hero-rise"
              )}
            >
              {/* Soft atmospheric bloom behind the word */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-[-10%] inset-y-[-28%] -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,#7DD3FC_50%,transparent)_0%,color-mix(in_srgb,#12B9FB_22%,transparent)_42%,transparent_72%)] blur-2xl"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 select-none bg-gradient-to-b from-[#12B9FB] to-[#A5E4FF] bg-clip-text text-transparent opacity-65 blur-[1.75rem]"
              >
                PROPIFY
              </span>
              <span className="bg-gradient-to-b from-[#12B9FB] via-[#7DD3FC] to-[#A5E4FF] bg-clip-text text-transparent">
                PROPIFY
              </span>
            </h1>

            <TrustLaurelBadge
              className={cn(
                "w-full max-w-3xl md:max-w-none",
                !prefersReducedMotion &&
                  "animate-hero-rise animate-hero-rise-delay-1"
              )}
            />

            <Link
              href="/challenges"
              className={cn(
                "mt-2 md:mt-4",
                !prefersReducedMotion &&
                  "animate-hero-rise animate-hero-rise-delay-2"
              )}
            >
              <span
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-white px-10 py-4",
                  "font-heading text-base font-bold tracking-tight text-[var(--landing-ink)]",
                  "shadow-[0_0_40px_rgba(31,143,232,0.28)] transition-transform hover:scale-[1.03] active:scale-[0.98]",
                  "md:px-14 md:py-5 md:text-lg"
                )}
              >
                Lancer mon challenge
              </span>
            </Link>
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 z-10",
            !prefersReducedMotion &&
              "animate-hero-rise animate-hero-rise-delay-3"
          )}
        >
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
