import { BarChart3, Headphones, TrendingUp, Users } from "lucide-react"

const STATS = [
  { icon: Users, value: "+2,500", label: "Traders financés" },
  { icon: TrendingUp, value: "+10M$", label: "Récompenses payées" },
  { icon: BarChart3, value: "90%", label: "Reward split" },
  { icon: Headphones, value: "24/7", label: "Support dédié" },
] as const

export function StatsBarSection() {
  return (
    <section className="glass-card grid grid-cols-2 gap-6 rounded-2xl px-6 py-8 md:grid-cols-4 md:divide-x md:divide-outline-variant">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-4 md:pl-4 first:md:pl-0"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-primary">
            <stat.icon className="size-5 text-primary" />
          </div>
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
