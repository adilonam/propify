import { cn } from "@/lib/utils"

export function ContentBlock({
  title,
  children,
  className,
}: {
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("glass-card space-y-4 rounded-2xl p-8 md:p-10", className)}>
      {title ? (
        <h2 className="font-heading text-2xl font-bold text-on-surface md:text-3xl">
          {title}
        </h2>
      ) : null}
      <div className="space-y-4 text-on-surface-variant">{children}</div>
    </div>
  )
}
