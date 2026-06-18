import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/properties/ContactForm'
import { AGENCY } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contactez ${AGENCY.name} — ${AGENCY.address}`,
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dari-immo.tn'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: AGENCY.name,
  description: AGENCY.description,
  telephone: AGENCY.phone,
  email: AGENCY.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tunis',
    addressCountry: 'TN',
  },
  url: siteUrl,
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-sand py-14 px-4 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-accent mb-2">Contact</p>
          <h1 className="font-display text-3xl md:text-4xl text-ink mb-3">Parlons de votre projet</h1>
          <p className="text-muted max-w-md mx-auto">
            Notre équipe vous répond du lundi au samedi, de 9h à 19h.
          </p>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl text-ink mb-4">Coordonnées</h2>
              <address className="not-italic space-y-4">
                <ContactItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  }
                  label="Téléphone"
                  value={AGENCY.phone}
                  href={`tel:${AGENCY.phone}`}
                />
                <ContactItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  }
                  label="Email"
                  value={AGENCY.email}
                  href={`mailto:${AGENCY.email}`}
                />
                <ContactItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  }
                  label="Adresse"
                  value={AGENCY.address}
                />
              </address>
            </div>

            <div className="bg-sand-light border border-border rounded-card p-4">
              <p className="text-sm font-medium text-ink mb-1">WhatsApp disponible</p>
              <p className="text-sm text-muted mb-3">Contactez-nous directement sur WhatsApp pour une réponse rapide.</p>
              <a
                href={`https://wa.me/${AGENCY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-available hover:text-available/80 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.532 5.852L0 24l6.335-1.61A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.002-1.364l-.36-.213-3.716.974.992-3.622-.234-.372A9.814 9.814 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                </svg>
                Écrire sur WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            <ContactForm compact />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-accent mt-0.5 shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-muted mb-0.5">{label}</p>
        {href ? (
          <a href={href} className="text-sm text-ink hover:text-accent transition-colors">
            {value}
          </a>
        ) : (
          <p className="text-sm text-ink">{value}</p>
        )}
      </div>
    </div>
  )
}
