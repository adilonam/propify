import { auth } from "@/auth"
import { LandingNav } from "@/components/layout/landing-nav"
import { Footer } from "@/components/sections/footer"

export async function SitePage({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <div className="min-h-dvh bg-[var(--landing-bg)] text-[var(--text-main)]">
      <LandingNav />
      <main className="mx-auto max-w-7xl space-y-12 px-4 py-16 md:space-y-16 md:px-12 md:py-20">
        {children}
      </main>
      <Footer isAuthenticated={Boolean(session?.user)} />
    </div>
  )
}
