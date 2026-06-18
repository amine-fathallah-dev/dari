import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { LABELS } from '@/lib/i18n'
import { formatPrice } from '@/lib/utils'
import AdminPropertyActions from './AdminPropertyActions'
import DeletePropertyButton from './DeletePropertyButton'
import FeaturedToggleButton from './FeaturedToggleButton'
import type { Property } from '@/lib/types'

export const metadata: Metadata = { title: 'Annonces' }

export default async function AdminAnnoncesPage() {
  const supabase = await createClient()
  const { data: properties } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Annonces</h1>
        <Link
          href="/admin/annonces/new"
          className="text-sm font-medium px-4 py-2 bg-accent text-white rounded-btn hover:bg-accent-dark transition-colors"
        >
          + Nouvelle annonce
        </Link>
      </div>

      {!properties || properties.length === 0 ? (
        <div className="text-center py-16 bg-sand-light rounded-card border border-border">
          <p className="text-muted">Aucune annonce. Créez votre première annonce.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-card border border-border">
          <table className="w-full text-sm">
            <thead className="bg-sand-light border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wide">Référence</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wide">Titre</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wide">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wide">Prix</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wide">Lieu</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wide">Statut</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wide">Coup de cœur</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-sand">
              {(properties as unknown as Property[]).map((p) => (
                <tr key={p.id} className="hover:bg-sand-light transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted">{p.reference}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/annonces/${p.reference}`}
                      target="_blank"
                      className="text-ink hover:text-accent transition-colors line-clamp-1 max-w-[200px] block"
                    >
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted whitespace-nowrap">
                    {LABELS.property_type[p.property_type]}
                  </td>
                  <td className="px-4 py-3 tabular-nums whitespace-nowrap">
                    {formatPrice(p.price, p.transaction)}
                  </td>
                  <td className="px-4 py-3 text-muted whitespace-nowrap">{p.governorate}</td>
                  <td className="px-4 py-3">
                    <AdminPropertyActions
                      id={p.id}
                      status={p.status}
                      isFeatured={p.is_featured}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <FeaturedToggleButton id={p.id} isFeatured={p.is_featured} />
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link
                      href={`/admin/annonces/${p.id}/edit`}
                      className="text-xs text-accent hover:text-accent-dark transition-colors mr-3"
                    >
                      Modifier
                    </Link>
                    <DeletePropertyButton id={p.id} title={p.title} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


