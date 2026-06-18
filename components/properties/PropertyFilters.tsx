'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { LABELS, GOVERNORATES } from '@/lib/i18n'
import type { Transaction, PropertyType } from '@/lib/types'

export default function PropertyFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [transaction, setTransaction] = useState<string>(
    searchParams.get('transaction') ?? ''
  )
  const [propertyType, setPropertyType] = useState<string>(
    searchParams.get('property_type') ?? ''
  )
  const [governorate, setGovernorate] = useState<string>(
    searchParams.get('governorate') ?? ''
  )
  const [priceMin, setPriceMin] = useState(searchParams.get('price_min') ?? '')
  const [priceMax, setPriceMax] = useState(searchParams.get('price_max') ?? '')
  const [pieces, setPieces] = useState(searchParams.get('pieces') ?? '')
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'created_desc')

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams()
    if (transaction) params.set('transaction', transaction)
    if (propertyType) params.set('property_type', propertyType)
    if (governorate) params.set('governorate', governorate)
    if (priceMin) params.set('price_min', priceMin)
    if (priceMax) params.set('price_max', priceMax)
    if (pieces) params.set('pieces', pieces)
    if (sort && sort !== 'created_desc') params.set('sort', sort)
    router.push(`/annonces?${params.toString()}`)
  }, [transaction, propertyType, governorate, priceMin, priceMax, pieces, sort, router])

  const reset = useCallback(() => {
    setTransaction('')
    setPropertyType('')
    setGovernorate('')
    setPriceMin('')
    setPriceMax('')
    setPieces('')
    setSort('created_desc')
    router.push('/annonces')
  }, [router])

  const select =
    'w-full text-sm bg-sand border border-border rounded-btn px-3 py-2 text-ink focus:outline-none focus:border-accent'
  const input =
    'w-full text-sm bg-sand border border-border rounded-btn px-3 py-2 text-ink placeholder:text-muted focus:outline-none focus:border-accent'
  const label = 'block text-xs font-medium text-muted uppercase tracking-wide mb-1'

  return (
    <aside className="w-full">
      <div className="bg-sand-light border border-border rounded-card p-4 space-y-4">
        <h2 className="font-display text-lg text-ink">Filtres</h2>

        {/* Transaction */}
        <div>
          <p className={label}>Transaction</p>
          <div className="flex gap-2">
            {(['', 'vente', 'location'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTransaction(t)}
                className={`flex-1 text-sm py-1.5 rounded-btn border transition-colors ${
                  transaction === t
                    ? 'bg-accent text-white border-accent'
                    : 'border-border text-ink hover:border-accent/50'
                }`}
              >
                {t === '' ? 'Tous' : LABELS.transaction[t as Transaction]}
              </button>
            ))}
          </div>
        </div>

        {/* Type */}
        <div>
          <label htmlFor="filter-type" className={label}>Type de bien</label>
          <select
            id="filter-type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className={select}
          >
            <option value="">Tous</option>
            {Object.entries(LABELS.property_type).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>

        {/* Gouvernorat */}
        <div>
          <label htmlFor="filter-gov" className={label}>Gouvernorat</label>
          <select
            id="filter-gov"
            value={governorate}
            onChange={(e) => setGovernorate(e.target.value)}
            className={select}
          >
            <option value="">Tous</option>
            {GOVERNORATES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Prix */}
        <div>
          <p className={label}>Prix (TND)</p>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className={input}
            />
            <input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className={input}
            />
          </div>
        </div>

        {/* Pièces */}
        <div>
          <p className={label}>Pièces (S+X)</p>
          <div className="flex gap-2 flex-wrap">
            {['', '1', '2', '3', '4'].map((p) => (
              <button
                key={p}
                onClick={() => setPieces(p)}
                className={`px-3 py-1.5 text-sm rounded-btn border transition-colors ${
                  pieces === p
                    ? 'bg-accent text-white border-accent'
                    : 'border-border text-ink hover:border-accent/50'
                }`}
              >
                {p === '' ? 'Tous' : `S+${p}`}
              </button>
            ))}
          </div>
        </div>

        {/* Tri */}
        <div>
          <label htmlFor="filter-sort" className={label}>Trier par</label>
          <select
            id="filter-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={select}
          >
            <option value="created_desc">Plus récents</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={applyFilters}
            className="flex-1 py-2.5 text-sm font-medium bg-accent text-white rounded-btn hover:bg-accent-dark transition-colors"
          >
            Appliquer
          </button>
          <button
            onClick={reset}
            className="px-4 py-2.5 text-sm text-muted border border-border rounded-btn hover:border-accent/50 transition-colors"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </aside>
  )
}
