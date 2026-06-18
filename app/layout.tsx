import type { Metadata } from 'next'
import { Marcellus, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import { AGENCY } from '@/lib/i18n'

const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marcellus',
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dari-immo.tn'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${AGENCY.name} — Immobilier en Tunisie`,
    template: `%s | ${AGENCY.name}`,
  },
  description: AGENCY.description,
  openGraph: {
    type: 'website',
    siteName: AGENCY.name,
    locale: 'fr_TN',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${marcellus.variable} ${hanken.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  )
}
