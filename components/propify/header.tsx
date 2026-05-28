"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { useSession } from "next-auth/react"

import { Logo } from "@/components/propify/logo"
import { HeaderAuth } from "@/components/propify/header-auth"
import { cn } from "@/lib/utils"

const PUBLIC_NAV_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#challenges", label: "Challenges" },
  { href: "#confiance", label: "Confiance" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const

const DASHBOARD_NAV_LINK = {
  href: "#dashboard",
  label: "Dashboard",
} as const

function getNavLinks(isAuthenticated: boolean) {
  if (!isAuthenticated) {
    return [...PUBLIC_NAV_LINKS]
  }

  return [
    PUBLIC_NAV_LINKS[0],
    PUBLIC_NAV_LINKS[1],
    DASHBOARD_NAV_LINK,
    ...PUBLIC_NAV_LINKS.slice(2),
  ]
}

export function Header() {
  const { data: session } = useSession()
  const navLinks = React.useMemo(
    () => getNavLinks(Boolean(session?.user)),
    [session?.user]
  )
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [active, setActive] = React.useState("accueil")

  React.useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    )

    for (const section of sections) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [navLinks])

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-12">
        <a href="#accueil" className="shrink-0">
          <Logo />
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "font-label text-sm transition-colors",
                active === link.href.slice(1)
                  ? "border-b-2 border-primary pb-0.5 text-primary"
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <HeaderAuth />
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-on-surface md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-outline-variant px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-label text-on-surface-variant hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2">
              <HeaderAuth onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
