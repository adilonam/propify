"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { SkylineQuality } from "@/lib/skyline/create-skyline"

type SkylineCanvasProps = {
  className?: string
  reducedMotion?: boolean
  quality?: SkylineQuality
}

export function SkylineCanvas({
  className,
  reducedMotion = false,
  quality = "high",
}: SkylineCanvasProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let handle: Awaited<
      ReturnType<typeof import("@/lib/skyline/create-skyline").createSkyline>
    > | null = null
    let resizeObserver: ResizeObserver | null = null

    const onPointerMove = (e: PointerEvent) => {
      if (!handle || reducedMotion) return
      const rect = container.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      handle.setPointer(nx, ny)
    }

    const onScroll = () => {
      if (!handle || reducedMotion) return
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      handle.setScroll(Math.min(1, window.scrollY / max))
    }

    async function init() {
      try {
        const { createSkyline } = await import("@/lib/skyline/create-skyline")
        if (cancelled || !container) return

        handle = createSkyline(container, {
          quality,
          flow: !reducedMotion,
          onContextLost: () => {
            if (!cancelled) setFailed(true)
          },
        })

        handle.setPaused(reducedMotion)

        resizeObserver = new ResizeObserver((entries) => {
          const entry = entries[0]
          if (!entry || !handle) return
          const { width, height } = entry.contentRect
          handle.resize(width, height)
        })
        resizeObserver.observe(container)

        window.addEventListener("pointermove", onPointerMove, { passive: true })
        window.addEventListener("scroll", onScroll, { passive: true })
        onScroll()
      } catch {
        if (!cancelled) setFailed(true)
      }
    }

    // Idle-load to avoid blocking first paint (matches common hero pattern)
    const ric = window.requestIdleCallback?.(
      () => {
        void init()
      },
      { timeout: 400 }
    )

    if (ric == null) {
      void init()
    }

    return () => {
      cancelled = true
      if (ric != null) window.cancelIdleCallback?.(ric)
      resizeObserver?.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("scroll", onScroll)
      handle?.destroy()
    }
  }, [quality, reducedMotion])

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden bg-[var(--landing-bg)]",
        className
      )}
      aria-hidden
    >
      {failed ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 70%, rgba(124,58,237,0.45), transparent 60%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(88,28,135,0.5), transparent 55%), var(--landing-bg)",
          }}
        />
      ) : null}
    </div>
  )
}
