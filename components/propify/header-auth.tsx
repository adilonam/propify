"use client"

import Link from "next/link"
import * as React from "react"
import { User, LayoutDashboard, Shield } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function MarketingCta({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/challenges"
      onClick={onNavigate}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5",
        "font-heading text-sm font-bold tracking-tight text-[#0a0612]",
        "transition-transform hover:scale-[1.03] active:scale-[0.98]"
      )}
    >
      Commencer un challenge
    </Link>
  )
}

export function HeaderAuth({
  onNavigate,
  variant = "default",
}: {
  onNavigate?: () => void
  /** Marketing hero/nav: text Sign in + white pill CTA. */
  variant?: "default" | "marketing"
}) {
  const { data: session, status } = useSession()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const isMarketing = variant === "marketing"

  React.useEffect(() => {
    if (!menuOpen) return

    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [menuOpen])

  if (status === "loading") {
    return (
      <div
        className={cn(
          "h-10 w-24 animate-pulse",
          isMarketing
            ? "rounded-full bg-white/15"
            : "rounded-lg bg-surface-container"
        )}
        aria-hidden
      />
    )
  }

  if (session?.user) {
    const displayName = session.user.name ?? session.user.email ?? "Trader"
    const userEmail = session.user.email ?? "Aucun email"
    const isAdmin = session.user.role === "ADMIN"
    const roleLabel = isAdmin ? "Admin" : null

    const userMenu = (
      <div className="relative" ref={menuRef}>
        <Button
          variant="ghost"
          className={cn(
            "h-10 w-10 rounded-full px-0! py-0!",
            isMarketing
              ? "border-white/20 text-white hover:bg-white/10 hover:text-white"
              : "border-outline-variant text-on-surface"
          )}
          aria-label="Ouvrir le menu utilisateur"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <User
            className={cn(
              "size-5",
              isMarketing ? "text-white" : "text-on-surface"
            )}
            strokeWidth={2.25}
          />
        </Button>

        {menuOpen ? (
          <div
            className="absolute left-0 z-50 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-outline-variant bg-surface-container p-4 shadow-xl md:left-auto md:right-0 md:w-72"
            role="menu"
          >
            <div className="mb-3 border-b border-outline-variant pb-3">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-label text-sm font-semibold text-on-surface">
                  {displayName}
                </p>
                {roleLabel ? (
                  <span className="inline-flex shrink-0 items-center rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
                    {roleLabel}
                  </span>
                ) : null}
              </div>
              <p className="truncate text-xs text-on-surface-variant">{userEmail}</p>
            </div>

            <div className="mb-2 space-y-1">
              <Link
                href="/orders"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-label text-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              >
                <LayoutDashboard className="size-4" />
                Mes challenges
              </Link>
              {isAdmin ? (
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-label text-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                >
                  <Shield className="size-4" />
                  Admin
                </Link>
              ) : null}
            </div>

            <Button
              variant="primary"
              className="w-full justify-center px-4 py-2"
              onClick={() => {
                setMenuOpen(false)
                void signOut({ callbackUrl: "/" })
                onNavigate?.()
              }}
            >
              Déconnexion
            </Button>
          </div>
        ) : null}
      </div>
    )

    if (isMarketing) {
      return (
        <div className="flex items-center gap-3">
          <MarketingCta onNavigate={onNavigate} />
          {userMenu}
        </div>
      )
    }

    return userMenu
  }

  if (isMarketing) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/signin"
          onClick={onNavigate}
          className="font-label text-sm text-white/80 transition-colors hover:text-white"
        >
          Se connecter
        </Link>
        <MarketingCta onNavigate={onNavigate} />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link href="/signin" onClick={onNavigate}>
        <Button variant="ghost" className="px-4 py-2">
          Se connecter
        </Button>
      </Link>
      <Link href="/signup" onClick={onNavigate}>
        <Button>Commencer</Button>
      </Link>
    </div>
  )
}
