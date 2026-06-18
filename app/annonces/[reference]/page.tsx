import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { LABELS, AGENCY } from '@/lib/i18n'
import { formatPrice, formatPieces, formatSurface } from '@/lib/utils'
import PropertyGallery from '@/components/properties/PropertyGallery'
import ContactForm from '@/components/properties/ContactForm'
import FavoritesButton from '@/components/properties/FavoritesButton'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import type { Property } from '@/lib/types'

const getProperty = cache(async (reference: string): Promise<Property | null> => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('reference', reference)
    .single()
  return data as Property | null
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reference: string }>
}): Promise<Metadata> {
  const { reference } = await params
  const property = await getProperty(reference)

  if (!property) return { title: 'Annonce introuvable' }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dari-immo.tn'
  const canonicalUrl = `${siteUrl}/annonces/${property.reference}`

  return {
    title: property.title,
    description: property.description ?? `${LABELS.property_type[property.property_type]} ${property.transaction === 'vente' ? 'à vendre' : 'à louer'} — ${property.governorate}`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: property.title,
      description: `${formatPrice(property.price, property.transaction)} · ${property.governorate}`,
      url: canonicalUrl,
      images: property.images?.length
        ? [{ url: property.images[0], alt: property.title }]
        : undefined,
    },
  }
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ reference: string }>
}) {
  const { reference } = await params
  const property = await getProperty(reference)

  if (!property) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dari-immo.tn'
  const canonicalUrl = `${siteUrl}/annonces/${property.reference}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: canonicalUrl,
    datePosted: property.created_at,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'TND',
      availability:
        property.status === 'disponible'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/SoldOut',
    },
    address: {
      '@type': 'PostalAddress',
      addressRegion: property.governorate,
      addressCountry: 'TN',
    },
    floorSize: property.surface_habitable
      ? { '@type': 'QuantitativeValue', value: property.surface_habitable, unitCode: 'MTK' }
      : undefined,
  }

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted mb-5 flex items-center gap-1.5" aria-label="Fil d'Ariane">
          <a href="/annonces" className="hover:text-accent transition-colors">Annonces</a>
          <span>/</span>
          <span className="text-ink truncate">{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left col: gallery + details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <PropertyGallery
              images={property.images ?? []}
              title={property.title}
            />

            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        property.transaction === 'vente'
                          ? 'bg-accent text-white'
                          : 'bg-available text-white'
                      }`}
                    >
                      {LABELS.transaction[property.transaction]}
                    </span>
                    <span className="text-xs text-muted">
                      {LABELS.property_type[property.property_type]}
                    </span>
                    {property.pieces && (
                      <span className="text-xs text-muted">· {formatPieces(property.pieces)}</span>
                    )}
                  </div>
                  <h1 className="font-display text-2xl md:text-3xl text-ink leading-snug">
                    {property.title}
                  </h1>
                </div>
                <FavoritesButton propertyId={property.id} />
              </div>

              <p className="text-muted text-sm mb-3 flex items-center gap-1">
                <svg viewBox="0 0 16 20" fill="currentColor" className="w-3 h-4 shrink-0" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 0C4.686 0 2 2.686 2 6c0 4.5 6 14 6 14S14 10.5 14 6c0-3.314-2.686-6-6-6zm0 9a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd" />
                </svg>
                {[property.neighborhood, property.delegation, property.governorate].filter(Boolean).join(', ')}
              </p>

              <p className="text-2xl font-semibold text-ink tabular-nums">
                {formatPrice(property.price, property.transaction)}
              </p>

              <p className="text-xs text-muted mt-1">Réf : {property.reference}</p>
            </div>

            {/* Specs */}
            <div className="bg-sand-light border border-border rounded-card p-5">
              <h2 className="font-display text-lg text-ink mb-4">Caractéristiques</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.surface_habitable && (
                  <SpecItem label="Surface habitable" value={formatSurface(property.surface_habitable)} />
                )}
                {property.surface_terrain && (
                  <SpecItem label="Surface terrain" value={formatSurface(property.surface_terrain)} />
                )}
                {property.pieces && (
                  <SpecItem label="Pièces" value={formatPieces(property.pieces)} />
                )}
                {property.bathrooms && (
                  <SpecItem label="Salles de bain" value={String(property.bathrooms)} />
                )}
                {property.floor !== null && property.floor !== undefined && (
                  <SpecItem label="Étage" value={property.floor === 0 ? 'RDC' : `${property.floor}e`} />
                )}
                {property.condition && (
                  <SpecItem label="État" value={LABELS.condition[property.condition]} />
                )}
                {property.title_status && (
                  <SpecItem label="Titre" value={LABELS.title_status[property.title_status]} />
                )}
                <SpecItem label="Meublé" value={property.furnished ? 'Oui' : 'Non'} />
              </div>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-sand-light border border-border rounded-card p-5">
                <h2 className="font-display text-lg text-ink mb-4">Équipements</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((a) => (
                    <span key={a} className="text-sm px-3 py-1 bg-sand border border-border rounded-full text-ink">
                      {LABELS.amenities[a as keyof typeof LABELS.amenities] ?? a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {property.description && (
              <div className="bg-sand-light border border-border rounded-card p-5">
                <h2 className="font-display text-lg text-ink mb-3">Description</h2>
                <p className="text-sm text-ink leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            )}

            {/* Mini map */}
            {property.latitude && property.longitude && (
              <div>
                <h2 className="font-display text-lg text-ink mb-3">Localisation</h2>
                <PropertyMiniMapLoader
                  latitude={property.latitude}
                  longitude={property.longitude}
                  title={property.title}
                />
              </div>
            )}
          </div>

          {/* Right col: contact */}
          <div className="space-y-4">
            <div className="lg:sticky lg:top-20">
              <ContactForm
                propertyId={property.id}
                propertyReference={property.reference}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-sand rounded-lg p-3">
      <p className="text-xs text-muted mb-0.5">{label}</p>
      <p className="text-sm font-medium text-ink">{value}</p>
    </div>
  )
}

async function PropertyMiniMapLoader({
  latitude,
  longitude,
  title,
}: {
  latitude: number
  longitude: number
  title: string
}) {
  const PropertyMiniMap = (await import('@/components/properties/PropertyMiniMap')).default
  return <PropertyMiniMap latitude={latitude} longitude={longitude} title={title} />
}
