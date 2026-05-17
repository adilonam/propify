import Image from "next/image"

import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
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
      <span className="font-heading text-xl font-bold tracking-tight text-on-surface">
        PROPIFY
      </span>
    </div>
  )
}
