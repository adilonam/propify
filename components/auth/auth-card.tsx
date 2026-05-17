import Link from "next/link"

import { Logo } from "@/components/propify/logo"

export function AuthCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 py-12">
      <div className="glass-card w-full max-w-md space-y-8 rounded-2xl p-8 md:p-10">
        <div className="space-y-4 text-center">
          <Link href="/" className="inline-flex justify-center">
            <Logo />
          </Link>
          <div className="space-y-2">
            <h1 className="font-heading text-2xl font-bold text-on-surface">
              {title}
            </h1>
            <p className="text-sm text-on-surface-variant">{description}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
