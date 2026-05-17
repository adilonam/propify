import * as React from "react"

import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input">

function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "w-full rounded-lg border border-white/10 bg-surface-container-high px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant",
        "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
