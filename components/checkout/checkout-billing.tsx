"use client"

import {
  CheckoutField,
  checkoutControlClassName,
  checkoutSelectClassName,
} from "@/components/checkout/checkout-field"

export type BillingDetails = {
  email: string
  firstName: string
  lastName: string
  phone: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

type CheckoutBillingProps = {
  value: BillingDetails
  onChange: (next: BillingDetails) => void
}

const COUNTRIES = [
  { code: "FR", label: "France" },
  { code: "BE", label: "Belgique" },
  { code: "CH", label: "Suisse" },
  { code: "CA", label: "Canada" },
  { code: "LU", label: "Luxembourg" },
  { code: "OTHER", label: "Autre" },
] as const

export function CheckoutBilling({ value, onChange }: CheckoutBillingProps) {
  function patch<K extends keyof BillingDetails>(key: K, next: BillingDetails[K]) {
    onChange({ ...value, [key]: next })
  }

  return (
    <section className="space-y-5 rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] p-5 sm:p-6">
      <h2 className="font-heading text-lg font-semibold text-[var(--text-white)]">
        Coordonnées de facturation
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CheckoutField
          label="Email"
          required
          htmlFor="billing-email"
          className="sm:col-span-2"
        >
          <input
            id="billing-email"
            type="email"
            autoComplete="email"
            required
            value={value.email}
            onChange={(e) => patch("email", e.target.value)}
            className={checkoutControlClassName}
            placeholder="vous@exemple.com"
          />
        </CheckoutField>

        <CheckoutField label="Prénom" required htmlFor="billing-first-name">
          <input
            id="billing-first-name"
            type="text"
            autoComplete="given-name"
            required
            value={value.firstName}
            onChange={(e) => patch("firstName", e.target.value)}
            className={checkoutControlClassName}
            placeholder="Prénom"
          />
        </CheckoutField>

        <CheckoutField label="Nom" required htmlFor="billing-last-name">
          <input
            id="billing-last-name"
            type="text"
            autoComplete="family-name"
            required
            value={value.lastName}
            onChange={(e) => patch("lastName", e.target.value)}
            className={checkoutControlClassName}
            placeholder="Nom"
          />
        </CheckoutField>

        <CheckoutField label="Téléphone" required htmlFor="billing-phone">
          <input
            id="billing-phone"
            type="tel"
            autoComplete="tel"
            required
            value={value.phone}
            onChange={(e) => patch("phone", e.target.value)}
            className={checkoutControlClassName}
            placeholder="+33 6 00 00 00 00"
          />
        </CheckoutField>

        <CheckoutField label="Adresse" required htmlFor="billing-address">
          <input
            id="billing-address"
            type="text"
            autoComplete="street-address"
            required
            value={value.address}
            onChange={(e) => patch("address", e.target.value)}
            className={checkoutControlClassName}
            placeholder="Adresse"
          />
        </CheckoutField>

        <CheckoutField label="Ville" required htmlFor="billing-city">
          <input
            id="billing-city"
            type="text"
            autoComplete="address-level2"
            required
            value={value.city}
            onChange={(e) => patch("city", e.target.value)}
            className={checkoutControlClassName}
            placeholder="Ville"
          />
        </CheckoutField>

        <CheckoutField label="Région (optionnel)" htmlFor="billing-state">
          <input
            id="billing-state"
            type="text"
            autoComplete="address-level1"
            value={value.state}
            onChange={(e) => patch("state", e.target.value)}
            className={checkoutControlClassName}
            placeholder="Région"
          />
        </CheckoutField>

        <CheckoutField label="Code postal" required htmlFor="billing-postal">
          <input
            id="billing-postal"
            type="text"
            autoComplete="postal-code"
            required
            value={value.postalCode}
            onChange={(e) => patch("postalCode", e.target.value)}
            className={checkoutControlClassName}
            placeholder="75001"
          />
        </CheckoutField>

        <CheckoutField label="Pays" required htmlFor="billing-country">
          <select
            id="billing-country"
            value={value.country}
            onChange={(e) => patch("country", e.target.value)}
            className={checkoutSelectClassName}
            required
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </CheckoutField>
      </div>
    </section>
  )
}
