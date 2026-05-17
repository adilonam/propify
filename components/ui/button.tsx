import * as React from "react"

import { cn } from "@/lib/utils"

type ButtonVariant = "primary" | "outline" | "ghost"

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: ButtonVariant
}

function Button({
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-6 py-2 font-label text-sm font-bold transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-primary text-on-primary-container hover:opacity-90 active:scale-95",
        variant === "outline" &&
          "border border-white/20 bg-white/5 text-on-surface hover:bg-white/10",
        variant === "ghost" &&
          "border border-white/20 bg-transparent text-on-surface-variant hover:text-on-surface",
        className
      )}
      {...props}
    />
  )
}

export { Button }
