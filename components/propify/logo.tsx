import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex size-9 items-center justify-center">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          className="size-9"
          aria-hidden
        >
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="url(#logoGrad)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M12 10h8c4 0 7 3 7 7s-3 7-7 7h-4v6"
            stroke="#e2e2e2"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M26 8l4 4-4 4"
            stroke="#4a8eff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36">
              <stop stopColor="#4a8eff" />
              <stop offset="1" stopColor="#adc7ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="font-heading text-xl font-bold tracking-tight text-on-surface">
        PROPIFY
      </span>
    </div>
  )
}
