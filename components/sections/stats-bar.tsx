const STATS = [
  { value: "+2,500", label: "Traders financés" },
  { value: "+10M$", label: "Récompenses payées" },
  { value: "90%", label: "Reward split" },
  { value: "24/7", label: "Support dédié" },
] as const

export function StatsBarSection() {
  return (
    <section className="card grid grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4 md:divide-x md:divide-outline-variant">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-4 md:pl-4 first:md:pl-0"
        >
          <div className="size-12 shrink-0 rounded-full border-2 border-primary bg-primary/10" />
          <div>
            <div className="font-heading text-2xl font-bold text-on-surface">
              {stat.value}
            </div>
            <div className="font-label text-xs text-on-surface-variant">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
