"use client"

import * as React from "react"
import { X } from "lucide-react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

type DialogContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

function useDialogContext() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog components must be used inside Dialog")
  }
  return context
}

type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

type DialogTriggerProps = {
  asChild?: boolean
  children: React.ReactElement<{ onClick?: (event: React.MouseEvent) => void }>
}

function DialogTrigger({ asChild, children }: DialogTriggerProps) {
  const { onOpenChange } = useDialogContext()
  const child = children as React.ReactElement<{ onClick?: (event: React.MouseEvent) => void }>

  if (asChild) {
    return React.cloneElement(child, {
      onClick: (event: React.MouseEvent) => {
        child.props.onClick?.(event)
        onOpenChange(true)
      },
    })
  }

  return React.cloneElement(child, {
    onClick: () => onOpenChange(true),
  })
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return createPortal(children, document.body)
}

function DialogOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-background/70 backdrop-blur-sm",
        className
      )}
    />
  )
}

type DialogContentProps = {
  className?: string
  children: React.ReactNode
}

function DialogContent({ className, children }: DialogContentProps) {
  const { open, onOpenChange } = useDialogContext()

  if (!open) {
    return null
  }

  return (
    <DialogPortal>
      <DialogOverlay />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            "card w-full max-w-5xl space-y-4 border border-card-border bg-card-bg p-6 shadow-2xl",
            className
          )}
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute right-6 top-6 rounded-md p-1 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
          {children}
        </div>
      </div>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1", className)} {...props} />
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("font-label text-lg font-bold text-on-surface", className)} {...props} />
  )
}

function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-on-surface-variant", className)} {...props} />
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-3", className)} {...props} />
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
}
