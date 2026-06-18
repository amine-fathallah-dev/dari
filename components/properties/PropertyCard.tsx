import Link from 'next/link'
import Image from 'next/image'
import type { Property } from '@/lib/types'
import { LABELS } from '@/lib/i18n'
import { formatPrice, formatPieces, formatSurface, getPlaceholderImage, getPublicImageUrl } from '@/lib/utils'

interface PropertyCardProps {
  property: Property
  priority?: boolean
}

export default function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const imageUrl =
    property.images && property.images.length > 0
      ? getPublicImageUrl(property.images[0])
      : getPlaceholderImage(parseInt(property.id.slice(-1), 16) % 7)

  const location = [property.neighborhood, property.delegation, property.governorate]
    .filter(Boolean)
    .slice(0, 2)
    .join(', ')

  return (
    <Link
      href={`/annonces/${property.reference}`}
      className="group block bg-sand-light rounded-card overflow-hidden border border-border hover:border-accent/40 hover:shadow-md transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={imageUrl}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={priority}
        />
        {/* Transaction badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full ${
            property.transaction === 'vente'
              ? 'bg-accent text-white'
              : 'bg-available text-white'
          }`}
        >
          {LABELS.transaction[property.transaction]}
        </span>
        {/* Status badge */}
        {property.status !== 'disponible' && (
          <span className="absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full bg-ink/70 text-white">
            {LABELS.status[property.status]}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-muted mb-1 font-medium uppercase tracking-wide">
          {LABELS.property_type[property.property_type]}
          {property.pieces ? ` · ${formatPieces(property.pieces)}` : ''}
        </p>

        <h2 className="text-base font-medium text-ink leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {property.title}
        </h2>

        <p className="text-sm text-muted mb-3 flex items-center gap-1">
          <svg viewBox="0 0 16 20" fill="currentColor" className="w-3 h-3.5 shrink-0" aria-hidden="true">
            <path fillRule="evenodd" d="M8 0C4.686 0 2 2.686 2 6c0 4.5 6 14 6 14S14 10.5 14 6c0-3.314-2.686-6-6-6zm0 9a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd" />
          </svg>
          {location}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-ink tabular-nums">
            {formatPrice(property.price, property.transaction)}
          </p>
          {property.surface_habitable && (
            <p className="text-sm text-muted">{formatSurface(property.surface_habitable)}</p>
          )}
        </div>

        {/* Reference */}
        <p className="mt-2 text-xs text-muted/60">{property.reference}</p>
      </div>
    </Link>
  )
}
