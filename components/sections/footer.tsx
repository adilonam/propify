import { Logo } from "@/components/propify/logo"

const FOOTER_LINKS = {
  Plateforme: ["Challenges", "Dashboard", "Classement"],
  Support: ["Contact Support", "FAQ", "Discord"],
  Légal: [
    "Politique de confidentialité",
    "Conditions d'utilisation",
    "Avertissement sur les risques",
  ],
} as const

export function Footer() {
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

        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title} className="space-y-4">
            <h4 className="font-label text-xs font-bold tracking-widest text-on-surface uppercase">
              {title}
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-on-surface-variant transition-colors hover:text-on-surface"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 px-4 py-8 md:px-12">
        <p className="mx-auto max-w-7xl text-center font-label text-sm text-on-surface-variant md:text-left">
          © 2026 Propify. Tous les comptes fournis sont des comptes démo avec
          fonds fictifs.
        </p>
      </div>
    </footer>
  )
}
