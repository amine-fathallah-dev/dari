'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { getPublicImageUrl, getPlaceholderImage } from '@/lib/utils'

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
}

export default function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const upload = async (files: FileList) => {
    setUploading(true)
    setError(null)
    const supabase = createClient()
    const newPaths: string[] = []

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} dépasse 5 Mo.`)
        continue
      }

      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(path, file, { upsert: false })

      if (uploadError) {
        setError(`Erreur upload : ${uploadError.message}`)
      } else {
        newPaths.push(path)
      }
    }

    onChange([...images, ...newPaths])
    setUploading(false)
  }

  const remove = async (path: string) => {
    if (!path.startsWith('http')) {
      const supabase = createClient()
      await supabase.storage.from('property-images').remove([path])
    }
    onChange(images.filter((p) => p !== path))
  }

  const move = (from: number, to: number) => {
    const next = [...images]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    onChange(next)
  }

  return (
    <div className="space-y-3">
      {/* Upload zone */}
      <div
        className="border-2 border-dashed border-border rounded-card p-6 text-center cursor-pointer hover:border-accent/50 transition-colors"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          if (e.dataTransfer.files.length) upload(e.dataTransfer.files)
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && upload(e.target.files)}
        />
        {uploading ? (
          <p className="text-sm text-muted">Upload en cours…</p>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-muted mx-auto mb-2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm text-muted">Glissez des photos ici ou <span className="text-accent">parcourez</span></p>
            <p className="text-xs text-muted/60 mt-1">PNG, JPG, WEBP — max 5 Mo par fichier</p>
          </>
        )}
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {images.map((path, i) => {
            const url = path.startsWith('http') ? path : getPublicImageUrl(path)
            return (
              <div key={path} className="relative group aspect-square bg-sand-light rounded-lg overflow-hidden border border-border">
                <Image
                  src={url}
                  alt={`Photo ${i + 1}`}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {i > 0 && (
                    <button
                      type="button"
                      onClick={() => move(i, i - 1)}
                      className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-ink text-xs"
                      title="Déplacer à gauche"
                    >
                      ←
                    </button>
                  )}
                  {i < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => move(i, i + 1)}
                      className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-ink text-xs"
                      title="Déplacer à droite"
                    >
                      →
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(path)}
                    className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                    title="Supprimer"
                  >
                    ×
                  </button>
                </div>
                {i === 0 && (
                  <span className="absolute top-1 left-1 text-xs bg-accent text-white px-1.5 py-0.5 rounded">
                    1re photo
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
