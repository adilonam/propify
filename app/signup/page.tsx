import { AuthCard } from "@/components/auth/auth-card"
import { SignUpForm } from "@/components/auth/sign-up-form"

export default function SignUpPage() {
  return (
    <AuthCard
      title="Créer un compte"
      description="Rejoignez PROPIFY et commencez votre challenge"
    >
      <SignUpForm />
    </AuthCard>
  )
}
