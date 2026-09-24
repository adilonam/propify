const FEATURED_IN = [
  { name: "Forbes", src: "/images/press/forbes.svg", height: 14 },
  { name: "Business Insider", src: "/images/press/business-insider.svg", height: 14 },
  { name: "Yahoo Finance", src: "/images/press/yahoo-finance.svg", height: 15 },
  { name: "Benzinga", src: "/images/press/benzinga.svg", height: 14 },
  { name: "StreetInsider", src: "/images/press/streetinsider.svg", height: 13 },
] as const

export function PressLogos() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 min-[480px]:gap-x-10 md:gap-x-12">
      {FEATURED_IN.map((outlet) => (
        <li key={outlet.name} className="flex items-center">
          <span className="block opacity-50 transition-opacity hover:opacity-75">
            {/* eslint-disable-next-line @next/next/no-img-element -- local SVG press logos */}
            <img
              src={outlet.src}
              alt={outlet.name}
              className="block w-auto"
              style={{ height: outlet.height }}
              loading="lazy"
            />
          </span>
        </li>
      ))}
    </ul>
  )
}
