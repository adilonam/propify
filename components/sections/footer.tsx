import Link from "next/link"

import {
  FOOTER_LINKS,
  FOOTER_SUPPORT,
} from "@/lib/site-routes"
import { Logo } from "@/components/propify/logo"

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
      title: "Parcours trader",
      links: FOOTER_LINKS["Comment ça marche"],
    },
    { title: "Société", links: companyLinks },
    {
      title: "Cadre légal",
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
        </div>

        <div className="space-y-4">
          <h4 className="flex items-center gap-2 font-label text-xs font-bold tracking-widest text-[var(--text-white)] uppercase">
            Assistance
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
            © 2026 Propify. Les comptes mis à disposition sont des comptes démo
            alimentés en fonds fictifs. PROPIFY n&apos;agit ni comme courtier ni
            comme établissement financier, et ne délivre aucun conseil en
            investissement.
          </p>
          <p>
            <span className="font-semibold text-[var(--text-main)]">
              Cadre simulé.
            </span>{" "}
            Les challenges se déroulent dans un environnement de trading
            simulé à finalité pédagogique. Les résultats passés ne préjugent
            pas des résultats futurs. Le trading expose à un risque de perte
            important.
          </p>
          <p>
            <span className="font-semibold text-[var(--text-main)]">
              Mise en garde.
            </span>{" "}
            Les informations diffusées sur la plateforme, via Discord ou par le
            support restent purement informatives. Vous assumez seul vos
            décisions. Pour le détail, reportez-vous à l&apos;
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
