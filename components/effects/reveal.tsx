"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type RevealProps = {
  as?: "div" | "li" | "article" | "ul" | "section"
  children: React.ReactNode
  className?: string
  /** Stagger delay in ms once the element becomes visible. */
  delay?: number
  /** IntersectionObserver threshold (0–1). */
  threshold?: number
}

/**
 * Fade + rise when the element enters the viewport.
 * Respects prefers-reduced-motion (content stays visible, no transition).
 * Safe to wrap Server Component children from a Client parent.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  threshold = 0.15,
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal", visible && "is-revealed", className)}
      style={
        delay > 0
          ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  )
}
