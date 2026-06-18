'use client'

import { useTransition } from 'react'
import { toggleFeatured } from '@/app/actions/properties'

export default function FeaturedToggleButton({
  id,
  isFeatured,
}: {
  id: string
  isFeatured: boolean
}) {
  const [pending, startTransition] = useTransition()

  return (
    <button
      type="button"
      onClick={() => startTransition(() => toggleFeatured(id, !isFeatured))}
      disabled={pending}
      className={`text-xs px-2 py-0.5 rounded-full transition-colors disabled:opacity-40 ${
        isFeatured
          ? 'bg-accent/10 text-accent hover:bg-accent/20'
          : 'text-muted hover:text-accent border border-border hover:border-accent/50'
      }`}
    >
      {isFeatured ? '★ Oui' : '☆ Non'}
    </button>
  )
}
