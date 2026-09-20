export const FOOTER_SUPPORT = {
  headline: "Assistance continue",
  email: "support@propifypulse.com",
  emailHref: "mailto:support@propifypulse.com",
  pageHref: "/support",
  pageLabel: "Espace d'aide",
} as const

export const FOOTER_LINKS = {
  "Comment ça marche": [
    { label: "Challenges", href: "/challenges" },
    { label: "FAQ", href: "/faq" },
    { label: "À propos", href: "/a-propos" },
    { label: "Le parcours", href: "/#confiance" },
  ],
  Entreprise: [
    { label: "Assistance", href: "/support" },
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
