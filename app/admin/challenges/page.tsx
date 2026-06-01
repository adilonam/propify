import { redirect } from "next/navigation"

import { auth } from "@/auth"
import { Header } from "@/components/propify/header"
import { ChallengesAdminClient } from "@/components/admin/challenges-admin-client"

export default async function AdminChallengesPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16 md:px-12">
        <ChallengesAdminClient />
      </main>
    </>
  )
}
