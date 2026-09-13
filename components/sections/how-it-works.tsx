"use client"

import * as React from "react"

import { PayoutCertificateStack } from "@/components/sections/payout-certificate-stack"

const STEPS = [
  {
    id: "challenge",
    title: "Choisissez votre challenge",
    body: "Sélectionnez le challenge adapté à votre style et à votre capital. Règles transparentes, comptes dimensionnés pour progresser, et une plateforme prête dès le premier trade.",
  },
  {
    id: "evaluation",
    title: "Passez l’évaluation",
    body: "Atteignez vos objectifs de profit tout en respectant les limites de risque. Une fois l’évaluation réussie, vous passez sur un compte financé Propify.",
  },
  {
    id: "funded",
    title: "Soyez financé & payé",
    body: "Obtenez un financement jusqu’à $1.5M et tradez-le comme le vôtre, puis demandez un payout dès que vous êtes en profit. Conservez jusqu’à 100% de vos gains, avec la plupart des retraits examinés et envoyés sous 12 heures.",
  },
] as const

export function HowItWorksSection() {
  const [activeId, setActiveId] = React.useState<(typeof STEPS)[number]["id"]>(
    "funded"
  )

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative scroll-mt-28 overflow-hidden border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:gap-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <div className="order-1 flex justify-center lg:order-none">
          <PayoutCertificateStack />
        </div>

        <div className="order-2 min-w-0 lg:order-none">
          <h2
            id="how-it-works-heading"
            className="font-heading text-3xl font-bold tracking-tight text-[var(--text-white)] sm:text-4xl md:text-5xl"
          >
            Comment ça marche
          </h2>

          <ul className="mt-8 divide-y divide-[var(--landing-border)] border-y border-[var(--landing-border)] md:mt-10">
            {STEPS.map((step) => {
              const isActive = step.id === activeId

              return (
                <li key={step.id}>
                  <button
                    type="button"
                    aria-expanded={isActive}
                    onClick={() => setActiveId(step.id)}
                    className="group relative w-full py-5 text-left transition-colors md:py-6"
                  >
                    <span
                      className={`font-heading block text-lg font-semibold tracking-tight transition-colors sm:text-xl md:text-2xl ${
                        isActive
                          ? "text-[var(--text-white)]"
                          : "text-[var(--text-muted)] group-hover:text-[var(--text-main)]"
                      }`}
                    >
                      {step.title}
                    </span>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-xl pt-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                          {step.body}
                        </p>
                      </div>
                    </div>

                    <span
                      aria-hidden
                      className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[var(--landing-purple)] transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
