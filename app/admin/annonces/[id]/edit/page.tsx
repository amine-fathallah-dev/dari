import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updateProperty } from '@/app/actions/properties'
import PropertyForm from '@/components/admin/PropertyForm'
import type { Property } from '@/lib/types'

export const metadata: Metadata = { title: 'Modifier l\'annonce' }

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) notFound()

  const property = data as unknown as Property

  async function update(formData: FormData) {
    'use server'
    await updateProperty(id, formData)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl text-ink">Modifier l'annonce</h1>
        <p className="text-xs text-muted mt-0.5">{property.reference}</p>
      </div>
      <PropertyForm property={property} action={update} />
    </div>
  )
}
