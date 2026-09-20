"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Soft blue pointer glow mounted once in the root layout.
 * Hidden for reduced-motion and coarse (touch) pointers.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const pointerQuery = window.matchMedia("(pointer: coarse)")

    const syncEnabled = () => {
      setEnabled(!motionQuery.matches && !pointerQuery.matches)
    }

    syncEnabled()
    motionQuery.addEventListener("change", syncEnabled)
    pointerQuery.addEventListener("change", syncEnabled)

    return () => {
      motionQuery.removeEventListener("change", syncEnabled)
      pointerQuery.removeEventListener("change", syncEnabled)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const glow = glowRef.current
    if (!glow) return

    let frame = 0
    let targetX = -9999
    let targetY = -9999
    let currentX = targetX
    let currentY = targetY

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(frame)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-[420px] w-[420px] will-change-transform"
      style={{
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--landing-glow) 28%, transparent) 0%, color-mix(in srgb, var(--landing-glow-deep) 14%, transparent) 38%, transparent 70%)",
        transform: "translate3d(-9999px, -9999px, 0) translate(-50%, -50%)",
      }}
    />
  )
}
