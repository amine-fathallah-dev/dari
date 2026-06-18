'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AGENCY } from '@/lib/i18n'

const NAV = [
  { href: '/', label: 'Accueil' },
  { href: '/annonces', label: 'Annonces' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-sand/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-2xl tracking-[0.2em] text-ink uppercase hover:text-accent transition-colors"
          aria-label="DARI — Accueil"
        >
          Dari
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium tracking-wide transition-colors ${
                pathname === href
                  ? 'text-accent'
                  : 'text-ink hover:text-accent'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/annonces?transaction=vente"
            className="text-sm font-medium px-4 py-2 bg-accent text-white rounded-btn hover:bg-accent-dark transition-colors"
          >
            Vente
          </Link>
          <Link
            href="/annonces?transaction=location"
            className="text-sm font-medium px-4 py-2 border border-accent text-accent rounded-btn hover:bg-accent hover:text-white transition-colors"
          >
            Location
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 text-ink"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-border bg-sand px-4 py-4 flex flex-col gap-4" aria-label="Navigation mobile">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium ${pathname === href ? 'text-accent' : 'text-ink'}`}
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2 border-t border-border">
            <Link
              href="/annonces?transaction=vente"
              onClick={() => setOpen(false)}
              className="flex-1 text-center text-sm font-medium py-2 bg-accent text-white rounded-btn"
            >
              Vente
            </Link>
            <Link
              href="/annonces?transaction=location"
              onClick={() => setOpen(false)}
              className="flex-1 text-center text-sm font-medium py-2 border border-accent text-accent rounded-btn"
            >
              Location
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
