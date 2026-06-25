import Link from "next/link"

import { FOOTER_LINKS } from "@/lib/site-routes"
import { Logo } from "@/components/propify/logo"

export function Footer({
  isAuthenticated = false,
}: {
  isAuthenticated?: boolean
}) {
  const footerLinks = {
    ...FOOTER_LINKS,
    Plateforme: isAuthenticated
      ? FOOTER_LINKS.Plateforme
      : FOOTER_LINKS.Plateforme.filter((link) => link.label !== "Dashboard"),
  }

  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-white/5 bg-surface-container"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 md:grid-cols-4 md:px-12">
        <div className="space-y-4">
          <Logo />
          <p className="text-on-surface-variant">
            L&apos;excellence du trading institutionnel accessible aux
            particuliers.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="space-y-4">
            <h4 className="font-label text-xs font-bold tracking-widest text-on-surface uppercase">
              {title}
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-on-surface-variant transition-colors hover:text-on-surface"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 px-4 py-8 md:px-12">
        <p className="mx-auto max-w-7xl text-center font-label text-sm text-on-surface-variant md:text-left">
          © 2026 Propify. Tous les comptes fournis sont des comptes démo avec
          fonds fictifs.{" "}
          <Link
            href="/legal/copyright"
            className="text-primary transition-colors hover:text-on-surface"
          >
            Copyright
          </Link>
        </p>
      </div>
    </footer>
  )
}
