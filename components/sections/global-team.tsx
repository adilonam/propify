const OFFICES = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    badge: "Siège",
    src: "/images/about/dubai.webp",
  },
  {
    city: "Prague",
    country: "Czech Republic",
    badge: "Bureau Europe",
    src: "/images/about/prague.webp",
  },
  {
    city: "Miami",
    country: "United States",
    badge: "Bureau US",
    src: "/images/about/miami.webp",
  },
] as const

export function GlobalTeamSection() {
  return (
    <section
      aria-labelledby="global-team-heading"
      className="border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-16 md:gap-14 md:px-8 md:py-20 lg:py-24">
        <div className="max-w-2xl text-center">
          <h2
            id="global-team-heading"
            className="font-heading text-[clamp(1.75rem,4.5vw,2.75rem)] leading-tight font-bold tracking-tight text-white"
          >
            Une équipe mondiale
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Une équipe senior répartie sur trois fuseaux — marchés, risque,
            ingénierie et support 24&nbsp;h/24, entièrement en interne.
          </p>
        </div>

        <ul className="grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
          {OFFICES.map((office) => (
            <li key={office.city} className="group relative">
              <article className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
                {/* eslint-disable-next-line @next/next/no-img-element -- local office photos */}
                <img
                  src={office.src}
                  alt={`Bureau Propify — ${office.city}`}
                  className="absolute inset-0 size-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-110"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-5 md:p-6">
                  <span className="rounded-full bg-white/15 px-3 py-1 font-label text-xs text-white backdrop-blur-sm">
                    {office.badge}
                  </span>
                  <h3 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
                    {office.city}
                  </h3>
                  <p className="font-label text-xs tracking-wide text-white/80 uppercase">
                    {office.country}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
