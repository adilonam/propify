import Link from "next/link"

import {
  FOOTER_LINKS,
  FOOTER_SOCIAL,
  FOOTER_SUPPORT,
} from "@/lib/site-routes"
import { Logo } from "@/components/propify/logo"

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

const SOCIAL_ICONS = {
  discord: DiscordIcon,
} as const

export function Footer({
  isAuthenticated = false,
}: {
  isAuthenticated?: boolean
}) {
  const companyLinks = isAuthenticated
    ? FOOTER_LINKS.Entreprise
    : FOOTER_LINKS.Entreprise.filter((link) => link.label !== "Dashboard")

  const linkColumns = [
    {
      title: "Comment ça marche",
      links: FOOTER_LINKS["Comment ça marche"],
    },
    { title: "Entreprise", links: companyLinks },
    {
      title: "Conditions générales",
      links: FOOTER_LINKS["Conditions générales"],
    },
  ] as const

  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 md:px-12">
        <div className="space-y-5 sm:col-span-2 lg:col-span-1">
          <Link href="/#accueil" className="inline-flex">
            <Logo tone="inverse" />
          </Link>
          {FOOTER_SOCIAL.length > 0 ? (
            <ul className="flex items-center gap-4">
              {FOOTER_SOCIAL.map((item) => {
                const Icon = SOCIAL_ICONS[item.network]
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[var(--text-white)] transition-opacity hover:opacity-70"
                      aria-label={item.label}
                    >
                      <Icon className="size-5" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>

        <div className="space-y-4">
          <h4 className="flex items-center gap-2 font-label text-xs font-bold tracking-widest text-[var(--text-white)] uppercase">
            Support
            <span
              className="inline-block size-2 rounded-full bg-[var(--success-green)]"
              aria-label="En ligne"
              title="En ligne"
            />
          </h4>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li>
              <Link
                href={FOOTER_SUPPORT.pageHref}
                className="text-[var(--text-white)] transition-colors hover:text-[var(--text-muted)]"
              >
                {FOOTER_SUPPORT.headline}
              </Link>
            </li>
            <li>
              <a
                href={FOOTER_SUPPORT.emailHref}
                className="transition-colors hover:text-[var(--text-white)]"
              >
                {FOOTER_SUPPORT.email}
              </a>
            </li>
            <li>
              <Link
                href={FOOTER_SUPPORT.pageHref}
                className="transition-colors hover:text-[var(--text-white)]"
              >
                {FOOTER_SUPPORT.pageLabel}
              </Link>
            </li>
          </ul>
        </div>

        {linkColumns.map((column) => (
          <div key={column.title} className="space-y-4">
            <h4 className="font-label text-xs font-bold tracking-widest text-[var(--text-white)] uppercase">
              {column.title}
            </h4>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-white)] transition-colors hover:text-[var(--text-muted)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--landing-border-subtle)] px-4 py-10 md:px-12">
        <div className="mx-auto max-w-7xl space-y-4 text-xs leading-relaxed text-[var(--text-muted)] md:text-[13px]">
          <p>
            © 2026 Propify. Tous les comptes fournis sont des comptes démo avec
            fonds fictifs. PROPIFY n&apos;est pas un courtier, ni un
            établissement financier, et ne fournit pas de conseils en
            investissement.
          </p>
          <p>
            <span className="font-semibold text-[var(--text-main)]">
              Environnement simulé.
            </span>{" "}
            Les challenges s&apos;effectuent dans un environnement de trading
            simulé à vocation éducative. Les performances passées ne garantissent
            pas les performances futures. Le trading comporte un risque de perte
            significatif.
          </p>
          <p>
            <span className="font-semibold text-[var(--text-main)]">
              Avertissement.
            </span>{" "}
            Les contenus de la plateforme, de la communauté Discord ou du support
            ont une vocation informative. Vous restez seul responsable de vos
            décisions. Pour plus de détails, consultez l&apos;
            <Link
              href="/legal/risk-warning"
              className="text-[var(--text-main)] underline-offset-2 hover:underline"
            >
              avertissement sur les risques
            </Link>
            , la{" "}
            <Link
              href="/legal/privacy"
              className="text-[var(--text-main)] underline-offset-2 hover:underline"
            >
              politique de confidentialité
            </Link>{" "}
            et les{" "}
            <Link
              href="/legal/terms"
              className="text-[var(--text-main)] underline-offset-2 hover:underline"
            >
              conditions d&apos;utilisation
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
