import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"

const PAYOUTS = [
  { name: "Marco R.", amount: "$4,850", country: "Italie", flag: "it" },
  { name: "Joon-ho L.", amount: "$6,300", country: "Corée du Sud", flag: "kr" },
  { name: "Erik N.", amount: "$3,200", country: "Norvège", flag: "no" },
  { name: "Camille D.", amount: "$5,100", country: "France", flag: "fr" },
  { name: "Lucas M.", amount: "$8,750", country: "Brésil", flag: "br" },
  { name: "Amina K.", amount: "$2,940", country: "Émirats", flag: "ae" },
  { name: "Tomáš P.", amount: "$7,120", country: "Tchéquie", flag: "cz" },
  { name: "Sofia G.", amount: "$4,180", country: "Espagne", flag: "es" },
] as const

const VIDEOS = [
  {
    id: "38Wi5pgBwKs",
    headline: "ÇA A CHANGÉ\nMON TRADING",
    trader: "Runhai",
  },
  {
    id: "COKt2BR2oYM",
    headline: "LA DISCIPLINE\nMÈNE AU SUCCÈS",
    trader: "Shaqueel",
  },
  {
    id: "FfA9ySEhuY8",
    headline: "TRADEZ L'OR\nSOYEZ PAYÉ",
    trader: "Glaferd",
  },
] as const

const ACTIVITIES = [
  {
    name: "Thiago A.",
    product: "Oracle",
    price: "$559",
    country: "Brésil",
    flag: "br",
    thumb: "/images/products/oracle.webp",
    ago: "il y a 17 min",
  },
  {
    name: "Nadia S.",
    product: "Supernova",
    price: "$299",
    country: "France",
    flag: "fr",
    thumb: "/images/products/supernova.webp",
    ago: "il y a 24 min",
  },
  {
    name: "Kenji T.",
    product: "Vanguard",
    price: "$449",
    country: "Japon",
    flag: "jp",
    thumb: "/images/products/vanguard.webp",
    ago: "il y a 31 min",
  },
  {
    name: "Elena V.",
    product: "Ash",
    price: "$199",
    country: "Italie",
    flag: "it",
    thumb: "/images/products/ash.webp",
    ago: "il y a 42 min",
  },
  {
    name: "Omar H.",
    product: "Phoenix",
    price: "$349",
    country: "Émirats",
    flag: "ae",
    thumb: "/images/products/phoenix.webp",
    ago: "il y a 55 min",
  },
  {
    name: "Priya M.",
    product: "Ember",
    price: "$249",
    country: "Inde",
    flag: "in",
    thumb: "/images/products/ember.webp",
    ago: "il y a 1 h",
  },
] as const

function Flag({ code }: { code: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- local flag SVGs
    <img
      src={`/images/flags/${code}.svg`}
      alt=""
      className="size-4 shrink-0 rounded-full object-cover"
      width={16}
      height={16}
    />
  )
}

function PayoutCard({
  name,
  amount,
  country,
  flag,
}: (typeof PAYOUTS)[number]) {
  return (
    <article className="relative flex w-[min(100%,22rem)] shrink-0 items-center justify-between gap-4 overflow-hidden rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] px-5 py-4 sm:w-[24rem] sm:px-6 sm:py-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 bottom-0 h-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--landing-purple)_55%,transparent),transparent_70%)] blur-md"
      />
      <div className="relative min-w-0 space-y-1">
        <p className="truncate text-sm text-[var(--text-muted)]">{name}</p>
        <p className="font-heading text-2xl font-bold tracking-tight text-[var(--text-white)] sm:text-3xl">
          {amount}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <Flag code={flag} />
          <span>{country}</span>
        </p>
      </div>
      <Link
        href="#how-it-works"
        className="relative max-w-[7.5rem] shrink-0 rounded-md border border-white/35 px-2.5 py-2 text-center font-label text-[0.6rem] leading-snug font-bold tracking-wide text-[var(--text-white)] uppercase transition hover:border-white/60 hover:bg-white/5 sm:max-w-[8.5rem] sm:px-3 sm:text-[0.65rem]"
      >
        Voir le certificat
      </Link>
    </article>
  )
}

function ActivityCard({
  name,
  product,
  price,
  country,
  flag,
  thumb,
  ago,
}: (typeof ACTIVITIES)[number]) {
  return (
    <article className="relative flex w-[min(100%,20rem)] shrink-0 items-center gap-3 overflow-hidden rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] px-4 py-3 sm:w-[22rem] sm:gap-4 sm:px-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-3 bottom-0 h-8 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--landing-purple)_40%,transparent),transparent_70%)] blur-md"
      />
      <div className="relative min-w-0 flex-1 space-y-1">
        <p className="truncate text-sm text-[var(--text-white)]">
          <span className="text-[var(--text-muted)]">{name}</span>{" "}
          a acheté{" "}
          <span className="font-medium text-teal-300">{product}</span> pour{" "}
          {price}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <Flag code={flag} />
          <span>{country}</span>
        </p>
      </div>
      <div className="relative flex shrink-0 flex-col items-end gap-1">
        <Image
          src={thumb}
          alt=""
          width={44}
          height={44}
          className="size-10 rounded-full object-cover ring-1 ring-white/10 sm:size-11"
          unoptimized
        />
        <span className="font-label text-[0.65rem] text-[var(--text-muted)]">
          {ago}
        </span>
      </div>
    </article>
  )
}

function MarqueeRow({
  direction,
  durationSec,
  label,
  renderItems,
}: {
  direction: "ltr" | "rtl"
  durationSec: number
  label: string
  renderItems: (keyPrefix: string) => ReactNode
}) {
  const trackClass =
    direction === "rtl"
      ? "animate-bento-marquee-rtl"
      : "animate-bento-marquee-ltr"

  return (
    <div
      className="bento-marquee-row overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
      role="region"
      aria-label={label}
    >
      <div
        className={`flex w-max ${trackClass}`}
        style={{ animationDuration: `${durationSec}s` }}
      >
        <div className="flex shrink-0 items-stretch gap-3 pr-3 sm:gap-4 sm:pr-4">
          {renderItems("a")}
        </div>
        <div
          aria-hidden
          inert
          className="bento-marquee-duplicate flex shrink-0 items-stretch gap-3 pr-3 sm:gap-4 sm:pr-4"
        >
          {renderItems("b")}
        </div>
      </div>
    </div>
  )
}

function VideoCard({ id, headline, trader }: (typeof VIDEOS)[number]) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--landing-purple)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- local YouTube thumbs */}
      <img
        src={`/images/youtube/${id}.jpg`}
        alt=""
        className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
        loading="lazy"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25"
      />

      <div className="absolute left-4 top-4 flex items-center gap-1.5 sm:left-5 sm:top-5">
        <Image
          src="/images/logo.png"
          alt=""
          width={22}
          height={22}
          className="size-5 object-contain sm:size-6"
          unoptimized
        />
        <span className="font-heading text-xs font-bold tracking-tight text-white sm:text-sm">
          PROPIFY
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition group-hover:scale-105 sm:size-14">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="ml-0.5 size-5 fill-current sm:size-6"
          >
            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
          </svg>
          <span className="sr-only">Lire la vidéo de {trader}</span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 space-y-2 p-4 sm:p-5">
        <p className="font-heading text-lg font-bold leading-tight tracking-wide whitespace-pre-line text-white uppercase sm:text-xl md:text-2xl">
          {headline}
        </p>
        <p className="text-sm text-white/80">{trader}</p>
      </div>
    </a>
  )
}

export function VerifiedPayoutsSection() {
  return (
    <section
      id="verified-payouts"
      aria-labelledby="verified-payouts-heading"
      className="relative overflow-hidden border-t border-[var(--landing-border-subtle)] bg-[var(--landing-bg)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-0 py-16 md:gap-14 md:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <h2
            id="verified-payouts-heading"
            className="font-heading text-[clamp(1.75rem,4.5vw,3rem)] leading-tight font-bold tracking-tight text-[var(--text-white)]"
          >
            Plus de 10,5&nbsp;M$+ en payouts vérifiés
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Ce que le trading financé avec Propify a vraiment à offrir.
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          <MarqueeRow
            direction="rtl"
            durationSec={42}
            label="Payouts récents"
            renderItems={(keyPrefix) =>
              PAYOUTS.map((payout) => (
                <PayoutCard
                  key={`${keyPrefix}-${payout.name}-${payout.amount}`}
                  {...payout}
                />
              ))
            }
          />

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:gap-5 md:px-8">
            {VIDEOS.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>

          <MarqueeRow
            direction="ltr"
            durationSec={48}
            label="Activité récente"
            renderItems={(keyPrefix) =>
              ACTIVITIES.map((activity) => (
                <ActivityCard
                  key={`${keyPrefix}-${activity.name}-${activity.product}`}
                  {...activity}
                />
              ))
            }
          />
        </div>
      </div>
    </section>
  )
}
