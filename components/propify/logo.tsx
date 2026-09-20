import Image from "next/image"

import { cn } from "@/lib/utils"

export function Logo({
  className,
  tone = "default",
}: {
  className?: string
  /** `inverse` for black marketing bars (white wordmark). */
  tone?: "default" | "inverse"
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/images/logo.png"
        alt="Propify"
        width={36}
        height={36}
        className="size-9 object-contain"
        unoptimized
      />
      <span
        className={cn(
          "font-heading text-xl font-bold tracking-[0.06em]",
          tone === "inverse" ? "text-[var(--text-white)]" : "text-on-surface"
        )}
      >
        PROPIFY
      </span>
    </div>
  )
}
