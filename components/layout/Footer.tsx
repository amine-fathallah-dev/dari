import Link from 'next/link'
import { AGENCY } from '@/lib/i18n'

export default function Footer() {
  return (
    <footer className="bg-ink text-sand/80 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl tracking-[0.2em] text-sand uppercase mb-3">
              Dari
            </p>
            <p className="text-sm leading-relaxed text-sand/60">{AGENCY.tagline}</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-sand/40 mb-4">
              Navigation
            </p>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/annonces?transaction=vente', label: 'Biens à vendre' },
                { href: '/annonces?transaction=location', label: 'Biens à louer' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm hover:text-accent transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-sand/40 mb-4">
              Contact
            </p>
            <address className="not-italic flex flex-col gap-2 text-sm">
              <a href={`tel:${AGENCY.phone}`} className="hover:text-accent transition-colors">
                {AGENCY.phone}
              </a>
              <a href={`mailto:${AGENCY.email}`} className="hover:text-accent transition-colors">
                {AGENCY.email}
              </a>
              <p className="text-sand/60">{AGENCY.address}</p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-sand/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-sand/40">
          <p>© {new Date().getFullYear()} {AGENCY.name}. Tous droits réservés.</p>
          <p>Agence immobilière en Tunisie</p>
        </div>
      </div>
    </footer>
  )
}
