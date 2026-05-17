import { Suspense } from "react"

import { AuthCard } from "@/components/auth/auth-card"
import { SignInForm } from "@/components/auth/sign-in-form"

export default function SignInPage() {
  return (
    <AuthCard
      title="Se connecter"
      description="Accédez à votre espace trader PROPIFY"
    >
      <Suspense fallback={<p className="text-center text-on-surface-variant">Chargement...</p>}>
        <SignInForm />
      </Suspense>
    </AuthCard>
  )
}
