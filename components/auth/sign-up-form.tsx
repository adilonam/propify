"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SignUpForm() {
  const router = useRouter()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    const data = (await response.json()) as { error?: string }

    if (!response.ok) {
      setLoading(false)
      setError(data.error ?? "Inscription impossible")
      return
    }

    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (signInResult?.error) {
      router.push("/signin")
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="name" className="font-label text-sm text-on-surface-variant">
          Nom
        </label>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jean Dupont"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="font-label text-sm text-on-surface-variant">
          Email
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@exemple.com"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="font-label text-sm text-on-surface-variant"
        >
          Mot de passe
        </label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="6 caractères minimum"
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <Button type="submit" className="w-full py-3" disabled={loading}>
        {loading ? "Création du compte..." : "S'inscrire"}
      </Button>

      <p className="text-center text-sm text-on-surface-variant">
        Déjà un compte ?{" "}
        <Link href="/signin" className="text-primary hover:underline">
          Se connecter
        </Link>
      </p>
    </form>
  )
}
