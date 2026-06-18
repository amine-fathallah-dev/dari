import type { Transaction, PropertyType } from './types'

export function formatPrice(price: number, transaction: Transaction): string {
  const formatted = new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(price)
  return transaction === 'location' ? `${formatted} TND/mois` : `${formatted} TND`
}

export function formatPieces(pieces: number | null): string {
  if (!pieces) return ''
  return `S+${pieces}`
}

export function formatSurface(m2: number | null): string {
  if (!m2) return ''
  return `${m2} m²`
}

export function propertyTypeIcon(type: PropertyType): string {
  const icons: Record<PropertyType, string> = {
    appartement: '🏢',
    villa: '🏡',
    studio: '🛋️',
    terrain: '🌿',
    local_commercial: '🏪',
  }
  return icons[type]
}

export function generateReference(count: number): string {
  const year = new Date().getFullYear()
  return `DARI-${year}-${String(count + 1).padStart(4, '0')}`
}

export function getPlaceholderImage(index: number = 0): string {
  const ids = [
    'photo-1545324418-cc1a3fa10c00',
    'photo-1512917774080-9991f1c4c750',
    'photo-1600596542815-ffad4c1539a9',
    'photo-1600585154340-be6161a56a0c',
    'photo-1484154218962-a197022b5858',
    'photo-1493809842364-78817add7ffb',
    'photo-1502672260266-1c1ef2d93688',
  ]
  const id = ids[index % ids.length]
  return `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`
}

export function getPublicImageUrl(path: string): string {
  if (path.startsWith('http')) return path
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${supabaseUrl}/storage/v1/object/public/property-images/${path}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
