"use client"

import * as React from "react"

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ")
}

type ButtonProps = React.ComponentProps<"button">

function Button({ className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Button }
