export const FOOTER_SOCIAL = [
  {
    label: "Discord",
    href: "/discord",
    network: "discord" as const,
  },
] as const

export const FOOTER_SUPPORT = {
  headline: "Support 24/7",
  email: "support@propifypulse.com",
  emailHref: "mailto:support@propifypulse.com",
  pageHref: "/support",
  pageLabel: "Centre d'aide",
} as const

export const FOOTER_LINKS = {
  "Comment ça marche": [
    { label: "Challenges", href: "/challenges" },
    { label: "FAQ", href: "/faq" },
    { label: "Comment ça marche", href: "/#confiance" },
  ],
  Entreprise: [
    { label: "Support", href: "/support" },
    { label: "Discord", href: "/discord" },
    { label: "Classement", href: "/classement" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Contact", href: "/#contact" },
  ],
  "Conditions générales": [
    { label: "Politique de confidentialité", href: "/legal/privacy" },
    { label: "Conditions d'utilisation", href: "/legal/terms" },
    { label: "Avertissement sur les risques", href: "/legal/risk-warning" },
    { label: "Copyright", href: "/legal/copyright" },
  ],
} as const
