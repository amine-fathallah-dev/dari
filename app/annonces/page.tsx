import type { Metadata } from 'next'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import PropertyCard from '@/components/properties/PropertyCard'
import PropertyFilters from '@/components/properties/PropertyFilters'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ListingViewToggle from './ListingViewToggle'
import type { Property, PropertyFilters as Filters } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Annonces',
  description: 'Recherchez parmi nos annonces immobilières en Tunisie — appartements, villas, studios, terrains à vendre et à louer.',
}

interface SearchParams {
  transaction?: string
  property_type?: string
  governorate?: string
  price_min?: string
  price_max?: string
  pieces?: string
  sort?: string
  view?: string
}

export default async function AnnoncesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase.from('properties').select('*')

  if (params.transaction) query = query.eq('transaction', params.transaction)
  if (params.property_type) query = query.eq('property_type', params.property_type)
  if (params.governorate) query = query.eq('governorate', params.governorate)
  if (params.price_min) query = query.gte('price', parseFloat(params.price_min))
  if (params.price_max) query = query.lte('price', parseFloat(params.price_max))
  if (params.pieces) query = query.eq('pieces', parseInt(params.pieces))

  switch (params.sort) {
    case 'price_asc':
      query = query.order('price', { ascending: true })
      break
    case 'price_desc':
      query = query.order('price', { ascending: false })
      break
    default:
      query = query.order('created_at', { ascending: false })
  }

  const { data: properties, error } = await query.limit(60)

  const hasFilters = !!(
    params.transaction ||
    params.property_type ||
    params.governorate ||
    params.price_min ||
    params.price_max ||
    params.pieces
  )

  return (
    <>
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl md:text-3xl text-ink mb-1">
            {params.transaction === 'vente'
              ? 'Biens à vendre'
              : params.transaction === 'location'
              ? 'Biens à louer'
              : 'Toutes les annonces'}
          </h1>
          <p className="text-sm text-muted">
            {properties?.length ?? 0} bien{(properties?.length ?? 0) !== 1 ? 's' : ''} trouvé{(properties?.length ?? 0) !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="lg:w-64 shrink-0">
            <Suspense>
              <PropertyFilters />
            </Suspense>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted">
                {hasFilters && 'Résultats filtrés'}
              </span>
              <Suspense>
                <ListingViewToggle />
              </Suspense>
            </div>

            {error ? (
              <p className="text-sm text-red-600 p-4">Erreur lors du chargement des annonces.</p>
            ) : !properties || properties.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-display text-xl text-ink mb-2">Aucun bien trouvé</p>
                <p className="text-sm text-muted">Essayez d'élargir vos critères de recherche.</p>
              </div>
            ) : (
              <Suspense>
                <ListingContent properties={properties as unknown as Property[]} view={params.view} />
              </Suspense>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

async function ListingContent({
  properties,
  view,
}: {
  properties: Property[]
  view?: string
}) {
  if (view === 'map') {
    const MapView = (await import('@/components/properties/MapView')).default
    return (
      <div className="h-[600px]">
        <MapView properties={properties} />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {properties.map((p, i) => (
        <PropertyCard key={p.id} property={p} priority={i < 4} />
      ))}
    </div>
  )
}
