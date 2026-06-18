'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getPublicImageUrl, getPlaceholderImage } from '@/lib/utils'

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const urls =
    images.length > 0
      ? images.map((img) => getPublicImageUrl(img))
      : [getPlaceholderImage(0), getPlaceholderImage(1), getPlaceholderImage(2)]

  const prev = () => setCurrent((c) => (c - 1 + urls.length) % urls.length)
  const next = () => setCurrent((c) => (c + 1) % urls.length)

  return (
    <>
      <div className="space-y-2">
        {/* Main image */}
        <div
          className="relative aspect-[16/9] rounded-card overflow-hidden cursor-zoom-in bg-sand-light"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={urls[current]}
            alt={`${title} — photo ${current + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
            priority
          />
          {urls.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-sand/80 rounded-full flex items-center justify-center hover:bg-sand transition-colors"
                aria-label="Photo précédente"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-ink">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-sand/80 rounded-full flex items-center justify-center hover:bg-sand transition-colors"
                aria-label="Photo suivante"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-ink">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="absolute bottom-3 right-3 bg-ink/50 text-white text-xs px-2 py-1 rounded-full">
                {current + 1}/{urls.length}
              </span>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {urls.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {urls.map((url, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                  i === current ? 'border-accent' : 'border-transparent'
                }`}
              >
                <Image
                  src={url}
                  alt={`Miniature ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            aria-label="Fermer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-4xl w-full aspect-[16/9]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={urls[current]}
              alt={`${title} — photo ${current + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  )
}
