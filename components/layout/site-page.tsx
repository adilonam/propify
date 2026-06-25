import { auth } from "@/auth"
import { Header } from "@/components/propify/header"
import { Footer } from "@/components/sections/footer"

export async function SitePage({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl space-y-12 px-4 py-16 md:space-y-16 md:px-12">
        {children}
      </main>
      <Footer isAuthenticated={Boolean(session?.user)} />
    </>
  )
}
