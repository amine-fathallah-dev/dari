import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { AGENCY, LABELS } from '@/lib/i18n'
import PropertyCard from '@/components/properties/PropertyCard'
import ArchDivider from '@/components/layout/ArchDivider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: `${AGENCY.name} — Immobilier en Tunisie`,
  description: AGENCY.description,
  openGraph: {
    title: `${AGENCY.name} — Immobilier en Tunisie`,
    description: AGENCY.description,
  },
}

const HERO_SEARCH_TYPES = [
  { href: '/annonces?transaction=vente', label: 'Acheter' },
  { href: '/annonces?transaction=location', label: 'Louer' },
]

const WHY_ITEMS = [
  {
    title: 'Expertise locale',
    description: 'Une connaissance approfondie du marché immobilier tunisien, de Tunis à Djerba.',
  },
  {
    title: 'Sélection rigoureuse',
    description: "Chaque bien est visité et vérifié avant d'être publié sur notre plateforme.",
  },
  {
    title: 'Accompagnement complet',
    description: 'De la première visite à la signature, nous vous accompagnons à chaque étape.',
  },
]

export default async function HomePage() {
  const supabase = await createClient()

  const { data: featured } = await supabase
    .from('properties')
    .select('*')
    .eq('is_featured', true)
    .eq('status', 'disponible')
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-sand py-20 md:py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-6xl text-ink tracking-wide leading-tight mb-4">
              L'immobilier tunisien,<br />autrement.
            </h1>
            <p className="text-muted text-lg mb-10 max-w-lg mx-auto">
              Découvrez notre sélection de biens à vendre et à louer en Tunisie — des adresses choisies avec soin.
            </p>

            {/* Quick search */}
            <div className="bg-sand-light border border-border rounded-card p-4 max-w-xl mx-auto">
              <div className="flex gap-2 mb-3">
                {HERO_SEARCH_TYPES.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex-1 py-2 text-sm font-medium text-center border border-accent text-accent rounded-btn hover:bg-accent hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <Link
                href="/annonces"
                className="block w-full py-3 text-sm font-medium text-center bg-accent text-white rounded-btn hover:bg-accent-dark transition-colors"
              >
                Voir toutes les annonces
              </Link>
            </div>
          </div>
        </section>

        <ArchDivider className="py-8" />

        {/* Coups de cœur */}
        {featured && featured.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-accent mb-1">
                  Sélection
                </p>
                <h2 className="font-display text-2xl md:text-3xl text-ink">
                  Nos coups de cœur
                </h2>
              </div>
              <Link
                href="/annonces"
                className="text-sm text-accent hover:text-accent-dark transition-colors"
              >
                Voir tout →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((p, i) => (
                <PropertyCard key={p.id} property={p as any} priority={i < 3} />
              ))}
            </div>
          </section>
        )}

        <ArchDivider className="py-8" />

        {/* Why DARI */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-widest text-accent mb-1">
              Notre approche
            </p>
            <h2 className="font-display text-2xl md:text-3xl text-ink">
              Pourquoi DARI ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_ITEMS.map(({ title, description }) => (
              <div key={title} className="text-center px-4">
                <div className="flex justify-center mb-4">
                  <div className="w-8 h-8 border border-accent/40 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 200 24" className="w-12 h-3" aria-hidden="true">
                      <path d="M 80 20 Q 100 2 120 20" stroke="#A87C56" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-display text-lg text-ink mb-2">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink text-sand py-16 px-4 mt-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl mb-4">
              Vous avez un bien à vendre ou à louer ?
            </h2>
            <p className="text-sand/60 mb-8">
              Contactez-nous pour une estimation gratuite et un accompagnement personnalisé.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 border border-accent text-accent font-medium rounded-btn hover:bg-accent hover:text-white transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
