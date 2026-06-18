import type { Metadata } from 'next'
import { createProperty } from '@/app/actions/properties'
import PropertyForm from '@/components/admin/PropertyForm'

export const metadata: Metadata = { title: 'Nouvelle annonce' }

export default function NewPropertyPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl text-ink">Nouvelle annonce</h1>
      <PropertyForm action={createProperty} />
    </div>
  )
}
