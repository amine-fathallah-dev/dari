'use client'

import { useEffect, useState } from 'react'

interface FavoritesButtonProps {
  propertyId: string
}

const STORAGE_KEY = 'dari_favorites'

function getFavorites(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export default function FavoritesButton({ propertyId }: FavoritesButtonProps) {
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(getFavorites().includes(propertyId))
  }, [propertyId])

  const toggle = () => {
    const favs = getFavorites()
    const next = isFav ? favs.filter((id) => id !== propertyId) : [...favs, propertyId]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setIsFav(!isFav)
  }

  return (
    <button
      onClick={toggle}
      aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className="flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        fill={isFav ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={1.5}
        className={`w-5 h-5 transition-colors ${isFav ? 'text-accent' : 'text-muted'}`}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      {isFav ? 'Favori' : 'Sauvegarder'}
    </button>
  )
}
