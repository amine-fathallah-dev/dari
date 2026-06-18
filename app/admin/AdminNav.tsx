'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/app/actions/auth'

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/annonces', label: 'Annonces' },
  { href: '/admin/leads', label: 'Leads' },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <header className="bg-ink text-sand border-b border-sand/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-display text-lg tracking-[0.2em] uppercase">
            Dari
          </Link>
          <span className="text-sand/30">|</span>
          <nav className="flex items-center gap-4">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors ${
                  pathname === href
                    ? 'text-accent'
                    : 'text-sand/60 hover:text-sand'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-sand/40 hover:text-sand/70 transition-colors"
          >
            Voir le site →
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="text-xs text-sand/60 hover:text-sand transition-colors"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
