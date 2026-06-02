import { redirect } from "next/navigation"
import Link from "next/link"

import { auth } from "@/auth"
import { Header } from "@/components/propify/header"

const ADMIN_CARDS = [
  {
    title: "Challenges",
    description: "Gerer les plans, regles et tarifs des challenges.",
    href: "/admin/challenges",
  },
  {
    title: "Users",
    description: "Consulter les comptes, roles et activite des utilisateurs.",
    href: "/admin/users",
  },
  {
    title: "Orders",
    description: "Suivre les commandes et leurs statuts de paiement.",
    href: "/admin/orders",
  },
]

export default async function AdminPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-16 md:px-12">
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-bold text-on-surface md:text-4xl">
            Admin Dashboard
          </h1>
          <p className="text-on-surface-variant">
            Espace reserve aux administrateurs.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {ADMIN_CARDS.map((card) => (
            <article
              key={card.title}
              className="card space-y-3 p-6 transition-all hover:-translate-y-0.5 hover:border-primary/50"
            >
              <h2 className="font-label text-xl font-bold text-on-surface">
                {card.title}
              </h2>
              <p className="text-sm text-on-surface-variant">{card.description}</p>
              {card.href ? (
                <Link
                  href={card.href}
                  className="inline-flex rounded-md border border-primary/40 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/10"
                >
                  Ouvrir
                </Link>
              ) : (
                <span className="inline-flex rounded-md border border-outline-variant px-3 py-1 text-xs font-semibold text-on-surface-variant">
                  Bientot
                </span>
              )}
            </article>
          ))}
        </section>
      </main>
    </>
  )
}
