export type Transaction = 'vente' | 'location'
export type PropertyType =
  | 'appartement'
  | 'villa'
  | 'studio'
  | 'terrain'
  | 'local_commercial'
export type PropertyStatus = 'disponible' | 'vendu' | 'loue'
export type TitleStatus = 'titre_foncier' | 'titre_bleu' | 'non_immatricule'
export type Condition = 'neuf' | 'ancien' | 'sur_plan'
export type Amenity =
  | 'parking'
  | 'garage'
  | 'jardin'
  | 'piscine'
  | 'climatisation'
  | 'chauffage'
  | 'ascenseur'
  | 'vue_mer'
  | 'terrasse'
  | 'concierge'

export interface Property {
  id: string
  created_at: string
  updated_at: string
  reference: string
  transaction: Transaction
  property_type: PropertyType
  title: string
  description: string | null
  price: number
  governorate: string
  delegation: string | null
  neighborhood: string | null
  latitude: number | null
  longitude: number | null
  surface_habitable: number | null
  surface_terrain: number | null
  pieces: number | null
  bathrooms: number | null
  floor: number | null
  furnished: boolean
  condition: Condition | null
  title_status: TitleStatus | null
  amenities: Amenity[] | null
  images: string[] | null
  is_featured: boolean
  status: PropertyStatus
}

export interface Contact {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  message: string
  property_id: string | null
  is_read: boolean
  properties?: Pick<Property, 'reference' | 'title'> | null
}

export interface PropertyFilters {
  transaction?: Transaction
  property_type?: PropertyType
  governorate?: string
  price_min?: number
  price_max?: number
  surface_min?: number
  surface_max?: number
  pieces?: number
  sort?: 'price_asc' | 'price_desc' | 'created_desc'
}
