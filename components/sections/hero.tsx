import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section
      id="accueil"
      className="grid scroll-mt-24 grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
    >
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
          <span className="size-2 animate-pulse rounded-full bg-primary" />
          <span className="font-label text-xs text-primary">
            PROP FIRM MODERNE — DESIGN LISIBLE
          </span>
        </div>

        <h1 className="font-heading text-5xl leading-tight font-extrabold tracking-tight md:text-6xl lg:text-7xl">
          Trade Smarter.
          <br />
          <span className="text-primary">Scale Faster.</span>
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant">
          Challenges clairs, règles visibles, récompenses jusqu&apos;à 90%. Une
          expérience premium qui inspire confiance dès la première minute.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button className="px-8 py-4">Commencer un challenge</Button>
          <Button variant="outline" className="px-8 py-4">
            Voir les règles
          </Button>
        </div>

        <p className="font-label text-sm font-bold text-on-surface">
          +2,500 traders nous font déjà confiance
        </p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-4 rounded-full bg-primary/20 opacity-50 blur-3xl transition-opacity group-hover:opacity-70" />
        <div className="glass-card relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl p-8">
          <div className="relative flex size-48 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-surface-container-high md:size-64">
            <svg viewBox="0 0 80 80" className="size-32 md:size-40" aria-hidden>
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="url(#heroGrad)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M24 18h18c8 0 14 6 14 14s-6 14-14 14H30v14"
                stroke="#e2e2e2"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M58 14l8 8-8 8"
                stroke="#4a8eff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="heroGrad" x1="0" y1="0" x2="80" y2="80">
                  <stop stopColor="#4a8eff" />
                  <stop offset="1" stopColor="#adc7ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
