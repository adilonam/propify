import { Reveal } from "@/components/effects/reveal"

const KPIS = [
  { value: "400k€", label: "Allocation max" },
  { value: "500k€+", label: "Réservé aux rewards" },
  { value: "4.8/5", label: "Avis vérifiés", accent: true },
  { value: "1 300+", label: "Instruments" },
] as const

export function StatsKpis() {
  return (
    <Reveal>
      <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
        {KPIS.map((kpi) => (
          <li key={kpi.label} className="text-center">
            <p className="font-heading text-2xl font-bold tracking-tight text-[var(--text-white)] sm:text-3xl">
              {kpi.value}
            </p>
            <p
              className={`mt-2 inline-block font-label text-xs text-[var(--text-muted)] sm:text-sm ${
                "accent" in kpi && kpi.accent
                  ? "border-b border-[var(--primary-blue)] pb-0.5"
                  : ""
              }`}
            >
              {kpi.label}
            </p>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
