"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"

export function HeaderAuth({ onNavigate }: { onNavigate?: () => void }) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div
        className="h-10 w-24 animate-pulse rounded-lg bg-surface-container"
        aria-hidden
      />
    )
  }

  if (session?.user) {
    const displayName = session.user.name ?? session.user.email ?? "Trader"

    return (
      <div className="flex flex-wrap items-center gap-3">
        <span className="max-w-35 truncate font-label text-sm font-semibold text-on-surface md:max-w-50">
          {displayName}
        </span>
        <Button
          variant="ghost"
          className="px-4 py-2"
          onClick={() => {
            void signOut({ callbackUrl: "/" })
            onNavigate?.()
          }}
        >
          Déconnexion
        </Button>
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
