import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { AuthSessionProvider } from "@/components/auth/session-provider"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["600", "700", "800"],
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["500"],
})

export const metadata = {
  title: "PROPIFY | Trade Smarter. Scale Faster.",
  description:
    "Challenges clairs, règles visibles, récompenses jusqu'à 90%. Une expérience premium qui inspire confiance.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className="dark"
      suppressHydrationWarning
      style={{ colorScheme: "dark" }}
    >
      <body
        className={`${inter.variable} ${hanken.variable} ${jetbrains.variable} font-sans`}
      >
        <ThemeProvider defaultTheme="dark" forcedTheme="dark">
          <AuthSessionProvider>{children}</AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
