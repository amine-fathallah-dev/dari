'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { generateReference } from '@/lib/utils'
import type { PropertyType, Transaction, PropertyStatus, Condition, TitleStatus, Amenity } from '@/lib/types'

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  return supabase
}

export async function createProperty(formData: FormData) {
  const supabase = await requireAuth()

  // Generate unique reference
  const { count } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
  const reference = generateReference(count ?? 0)

  const amenities = formData.getAll('amenities') as Amenity[]

  const { error } = await supabase.from('properties').insert({
    reference,
    transaction: formData.get('transaction') as Transaction,
    property_type: formData.get('property_type') as PropertyType,
    title: (formData.get('title') as string).trim(),
    description: (formData.get('description') as string)?.trim() || null,
    price: parseFloat(formData.get('price') as string),
    governorate: formData.get('governorate') as string,
    delegation: (formData.get('delegation') as string)?.trim() || null,
    neighborhood: (formData.get('neighborhood') as string)?.trim() || null,
    latitude: formData.get('latitude') ? parseFloat(formData.get('latitude') as string) : null,
    longitude: formData.get('longitude') ? parseFloat(formData.get('longitude') as string) : null,
    surface_habitable: formData.get('surface_habitable') ? parseInt(formData.get('surface_habitable') as string) : null,
    surface_terrain: formData.get('surface_terrain') ? parseInt(formData.get('surface_terrain') as string) : null,
    pieces: formData.get('pieces') ? parseInt(formData.get('pieces') as string) : null,
    bathrooms: formData.get('bathrooms') ? parseInt(formData.get('bathrooms') as string) : null,
    floor: formData.get('floor') ? parseInt(formData.get('floor') as string) : null,
    furnished: formData.get('furnished') === 'true',
    condition: (formData.get('condition') as Condition) || null,
    title_status: (formData.get('title_status') as TitleStatus) || null,
    amenities: amenities.length > 0 ? amenities : null,
    images: JSON.parse((formData.get('images') as string) || '[]'),
    is_featured: formData.get('is_featured') === 'true',
    status: (formData.get('status') as PropertyStatus) || 'disponible',
  })

  if (error) throw new Error(error.message)

  revalidatePath('/annonces')
  revalidatePath('/')
  redirect('/admin/annonces')
}

export async function updateProperty(id: string, formData: FormData) {
  const supabase = await requireAuth()

  const amenities = formData.getAll('amenities') as Amenity[]

  const { error } = await supabase
    .from('properties')
    .update({
      transaction: formData.get('transaction') as Transaction,
      property_type: formData.get('property_type') as PropertyType,
      title: (formData.get('title') as string).trim(),
      description: (formData.get('description') as string)?.trim() || null,
      price: parseFloat(formData.get('price') as string),
      governorate: formData.get('governorate') as string,
      delegation: (formData.get('delegation') as string)?.trim() || null,
      neighborhood: (formData.get('neighborhood') as string)?.trim() || null,
      latitude: formData.get('latitude') ? parseFloat(formData.get('latitude') as string) : null,
      longitude: formData.get('longitude') ? parseFloat(formData.get('longitude') as string) : null,
      surface_habitable: formData.get('surface_habitable') ? parseInt(formData.get('surface_habitable') as string) : null,
      surface_terrain: formData.get('surface_terrain') ? parseInt(formData.get('surface_terrain') as string) : null,
      pieces: formData.get('pieces') ? parseInt(formData.get('pieces') as string) : null,
      bathrooms: formData.get('bathrooms') ? parseInt(formData.get('bathrooms') as string) : null,
      floor: formData.get('floor') ? parseInt(formData.get('floor') as string) : null,
      furnished: formData.get('furnished') === 'true',
      condition: (formData.get('condition') as Condition) || null,
      title_status: (formData.get('title_status') as TitleStatus) || null,
      amenities: amenities.length > 0 ? amenities : null,
      images: JSON.parse((formData.get('images') as string) || '[]'),
      is_featured: formData.get('is_featured') === 'true',
      status: formData.get('status') as PropertyStatus,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/annonces')
  revalidatePath('/')
  redirect('/admin/annonces')
}

export async function deleteProperty(id: string) {
  const supabase = await requireAuth()

  const { error } = await supabase.from('properties').delete().eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/annonces')
  revalidatePath('/')
  revalidatePath('/admin/annonces')
}

export async function toggleFeatured(id: string, value: boolean) {
  const supabase = await requireAuth()
  const { error } = await supabase
    .from('properties')
    .update({ is_featured: value })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/')
  revalidatePath('/admin/annonces')
}

export async function updateStatus(id: string, status: PropertyStatus) {
  const supabase = await requireAuth()
  const { error } = await supabase
    .from('properties')
    .update({ status })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/annonces')
  revalidatePath('/admin/annonces')
}

export async function markLeadRead(id: string, value: boolean) {
  const supabase = await requireAuth()
  const { error } = await supabase
    .from('contacts')
    .update({ is_read: value })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/leads')
}
