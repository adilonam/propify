import { redirect } from "next/navigation"

import { auth } from "@/auth"
import { OrdersAdminClient } from "@/components/admin/orders-admin-client"
import { Header } from "@/components/propify/header"

export default async function AdminOrdersPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16 md:px-12">
        <OrdersAdminClient />
      </main>
    </>
  )
}
