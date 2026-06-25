import { cn } from "@/lib/utils"

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <section className={cn("space-y-4", className)}>
      {eyebrow ? (
        <span className="font-label text-xs tracking-widest text-primary uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="font-heading text-4xl font-bold text-on-surface md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-3xl text-lg leading-relaxed text-on-surface-variant">
          {description}
        </p>
      ) : null}
    </section>
  )
}
