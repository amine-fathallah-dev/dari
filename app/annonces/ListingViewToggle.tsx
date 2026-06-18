'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function ListingViewToggle() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const view = searchParams.get('view') ?? 'list'

  const toggle = (v: 'list' | 'map') => {
    const params = new URLSearchParams(searchParams.toString())
    if (v === 'list') {
      params.delete('view')
    } else {
      params.set('view', v)
    }
    router.push(`/annonces?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-1 p-0.5 bg-sand-light border border-border rounded-btn">
      <button
        onClick={() => toggle('list')}
        className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors flex items-center gap-1.5 ${
          view === 'list' ? 'bg-accent text-white' : 'text-muted hover:text-ink'
        }`}
        aria-pressed={view === 'list'}
      >
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
          <path fillRule="evenodd" d="M2.5 3h11a.5.5 0 010 1h-11a.5.5 0 010-1zm0 4h11a.5.5 0 010 1h-11a.5.5 0 010-1zm0 4h11a.5.5 0 010 1h-11a.5.5 0 010-1z" />
        </svg>
        Liste
      </button>
      <button
        onClick={() => toggle('map')}
        className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors flex items-center gap-1.5 ${
          view === 'map' ? 'bg-accent text-white' : 'text-muted hover:text-ink'
        }`}
        aria-pressed={view === 'map'}
      >
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
          <path fillRule="evenodd" d="M8 1a4.5 4.5 0 110 9A4.5 4.5 0 018 1zm0 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm0 2c-2.5 0-8 1.25-8 3.75V15h16v-1.25C16 11.25 10.5 10 8 10z" clipRule="evenodd" />
        </svg>
        Carte
      </button>
    </div>
  )
}
