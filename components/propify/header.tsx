"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/propify/logo"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#challenges", label: "Challenges" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#confiance", label: "Confiance" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [active, setActive] = React.useState("accueil")

  React.useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.querySelector(l.href.replace("#", "#"))
    ).filter(Boolean) as HTMLElement[]

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
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-12">
        <a href="#accueil" className="shrink-0">
          <Logo />
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
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

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" className="px-4 py-2">
            Se connecter
          </Button>
          <Button>Commencer</Button>
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
        <div className="border-t border-white/10 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-label text-on-surface-variant hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button variant="ghost">Se connecter</Button>
              <Button>Commencer</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
