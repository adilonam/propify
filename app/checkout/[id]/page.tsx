import type { Metadata } from "next"
import { Suspense } from "react"

import { SitePage } from "@/components/layout/site-page"
import { CheckoutClient } from "@/components/checkout/checkout-client"

export const metadata: Metadata = {
  title: "Checkout | PROPIFY",
  description: "Finalisez votre challenge PROPIFY — paiement sécurisé.",
}

type CheckoutPageProps = {
  params: Promise<{ id: string }>
}

function CheckoutFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary-blue)] border-t-transparent" />
    </div>
  )
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { id } = await params

  return (
    <SitePage>
      <Suspense fallback={<CheckoutFallback />}>
        <CheckoutClient challengeInfoId={id} />
      </Suspense>
    </SitePage>
  )
}
