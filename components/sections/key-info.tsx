import { KEY_STATS } from "@/lib/site-content"

export function KeyInfoSection() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h2 className="font-heading text-4xl font-bold text-on-surface md:text-5xl">
          Chiffres clés
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {KEY_STATS.map((stat) => (
          <div key={stat.label} className="glass-card space-y-3 rounded-2xl p-8">
            <div className="font-heading text-3xl font-bold text-primary">
              {stat.value}
            </div>
            <h3 className="font-heading text-lg font-semibold text-on-surface">
              {stat.label}
            </h3>
            <p className="text-on-surface-variant">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
