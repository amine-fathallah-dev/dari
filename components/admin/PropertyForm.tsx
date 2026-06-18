'use client'

import { useState, useTransition } from 'react'
import { LABELS, GOVERNORATES } from '@/lib/i18n'
import type { Property, Amenity } from '@/lib/types'
import ImageUpload from './ImageUpload'

interface PropertyFormProps {
  property?: Property
  action: (formData: FormData) => Promise<void>
}

export default function PropertyForm({ property, action }: PropertyFormProps) {
  const [pending, startTransition] = useTransition()
  const [images, setImages] = useState<string[]>(property?.images ?? [])
  const [amenities, setAmenities] = useState<Amenity[]>(
    (property?.amenities ?? []) as Amenity[]
  )
  const [error, setError] = useState<string | null>(null)

  const field =
    'w-full text-sm bg-sand border border-border rounded-btn px-3 py-2 text-ink placeholder:text-muted focus:outline-none focus:border-accent'
  const label = 'block text-xs font-medium text-muted uppercase tracking-wide mb-1'
  const section = 'bg-sand-light border border-border rounded-card p-5 space-y-4'

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('images', JSON.stringify(images))
    amenities.forEach((a) => fd.append('amenities', a))
    startTransition(async () => {
      try {
        await action(fd)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inattendue')
      }
    })
  }

  const toggleAmenity = (a: Amenity) => {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-card text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Transaction & Type */}
      <div className={section}>
        <h2 className="font-display text-lg text-ink">Informations générales</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="pf-transaction" className={label}>Transaction *</label>
            <select
              id="pf-transaction"
              name="transaction"
              required
              defaultValue={property?.transaction ?? ''}
              className={field}
            >
              <option value="">Choisir…</option>
              {Object.entries(LABELS.transaction).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pf-type" className={label}>Type de bien *</label>
            <select
              id="pf-type"
              name="property_type"
              required
              defaultValue={property?.property_type ?? ''}
              className={field}
            >
              <option value="">Choisir…</option>
              {Object.entries(LABELS.property_type).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="pf-title" className={label}>Titre *</label>
          <input
            id="pf-title"
            name="title"
            type="text"
            required
            defaultValue={property?.title}
            placeholder="ex: Appartement S+2 vue mer à La Marsa"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="pf-desc" className={label}>Description</label>
          <textarea
            id="pf-desc"
            name="description"
            rows={4}
            defaultValue={property?.description ?? ''}
            placeholder="Description détaillée du bien…"
            className={`${field} resize-none`}
          />
        </div>

        <div>
          <label htmlFor="pf-price" className={label}>Prix (TND) *</label>
          <input
            id="pf-price"
            name="price"
            type="number"
            required
            min={0}
            defaultValue={property?.price}
            placeholder="ex: 320000"
            className={field}
          />
          <p className="text-xs text-muted mt-1">Pour une location, indiquer le loyer mensuel.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="pf-status" className={label}>Statut</label>
            <select
              id="pf-status"
              name="status"
              defaultValue={property?.status ?? 'disponible'}
              className={field}
            >
              {Object.entries(LABELS.status).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-ink">
              <input
                type="checkbox"
                name="is_featured"
                value="true"
                defaultChecked={property?.is_featured}
                className="w-4 h-4 accent-accent"
              />
              Coup de cœur (home)
            </label>
          </div>
        </div>
      </div>

      {/* Localisation */}
      <div className={section}>
        <h2 className="font-display text-lg text-ink">Localisation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="pf-gov" className={label}>Gouvernorat *</label>
            <select
              id="pf-gov"
              name="governorate"
              required
              defaultValue={property?.governorate ?? ''}
              className={field}
            >
              <option value="">Choisir…</option>
              {GOVERNORATES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pf-del" className={label}>Délégation</label>
            <input
              id="pf-del"
              name="delegation"
              type="text"
              defaultValue={property?.delegation ?? ''}
              placeholder="ex: La Marsa"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="pf-hood" className={label}>Quartier</label>
            <input
              id="pf-hood"
              name="neighborhood"
              type="text"
              defaultValue={property?.neighborhood ?? ''}
              placeholder="ex: Gammarth"
              className={field}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="pf-lat" className={label}>Latitude</label>
            <input
              id="pf-lat"
              name="latitude"
              type="number"
              step="any"
              defaultValue={property?.latitude ?? ''}
              placeholder="ex: 36.8882"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="pf-lng" className={label}>Longitude</label>
            <input
              id="pf-lng"
              name="longitude"
              type="number"
              step="any"
              defaultValue={property?.longitude ?? ''}
              placeholder="ex: 10.3236"
              className={field}
            />
          </div>
        </div>
        <p className="text-xs text-muted">Vous pouvez trouver les coordonnées sur maps.google.com (clic droit → «Qu'y a-t-il ici ?»)</p>
      </div>

      {/* Caractéristiques */}
      <div className={section}>
        <h2 className="font-display text-lg text-ink">Caractéristiques</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="pf-surf" className={label}>Surface habitable (m²)</label>
            <input
              id="pf-surf"
              name="surface_habitable"
              type="number"
              min={0}
              defaultValue={property?.surface_habitable ?? ''}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="pf-terrain" className={label}>Surface terrain (m²)</label>
            <input
              id="pf-terrain"
              name="surface_terrain"
              type="number"
              min={0}
              defaultValue={property?.surface_terrain ?? ''}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="pf-pieces" className={label}>Pièces (S+X)</label>
            <select
              id="pf-pieces"
              name="pieces"
              defaultValue={property?.pieces ?? ''}
              className={field}
            >
              <option value="">—</option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>S+{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pf-bath" className={label}>Salles de bain</label>
            <select
              id="pf-bath"
              name="bathrooms"
              defaultValue={property?.bathrooms ?? ''}
              className={field}
            >
              <option value="">—</option>
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pf-floor" className={label}>Étage</label>
            <input
              id="pf-floor"
              name="floor"
              type="number"
              min={0}
              defaultValue={property?.floor ?? ''}
              placeholder="0 = RDC"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="pf-cond" className={label}>État</label>
            <select
              id="pf-cond"
              name="condition"
              defaultValue={property?.condition ?? ''}
              className={field}
            >
              <option value="">—</option>
              {Object.entries(LABELS.condition).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pf-title-status" className={label}>Statut du titre</label>
            <select
              id="pf-title-status"
              name="title_status"
              defaultValue={property?.title_status ?? ''}
              className={field}
            >
              <option value="">—</option>
              {Object.entries(LABELS.title_status).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-ink">
              <input
                type="checkbox"
                name="furnished"
                value="true"
                defaultChecked={property?.furnished}
                className="w-4 h-4 accent-accent"
              />
              Meublé
            </label>
          </div>
        </div>
      </div>

      {/* Équipements */}
      <div className={section}>
        <h2 className="font-display text-lg text-ink">Équipements</h2>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(LABELS.amenities) as [Amenity, string][]).map(([k, v]) => (
            <button
              key={k}
              type="button"
              onClick={() => toggleAmenity(k)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                amenities.includes(k)
                  ? 'bg-accent text-white border-accent'
                  : 'border-border text-ink hover:border-accent/50'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Photos */}
      <div className={section}>
        <h2 className="font-display text-lg text-ink">Photos</h2>
        <ImageUpload images={images} onChange={setImages} />
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-2.5 text-sm font-medium bg-accent text-white rounded-btn hover:bg-accent-dark transition-colors disabled:opacity-60"
        >
          {pending ? 'Enregistrement…' : property ? 'Mettre à jour' : 'Créer l\'annonce'}
        </button>
        <a
          href="/admin/annonces"
          className="px-6 py-2.5 text-sm font-medium border border-border text-muted rounded-btn hover:border-accent/50 transition-colors"
        >
          Annuler
        </a>
      </div>
    </form>
  )
}
