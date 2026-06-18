import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: total },
    { count: disponible },
    { count: vendu },
    { count: loue },
    { count: vente },
    { count: location },
    { count: unreadLeads },
    { count: totalLeads },
  ] = await Promise.all([
    supabase.from('properties').select('*', { count: 'exact', head: true }),
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'disponible'),
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'vendu'),
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'loue'),
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('transaction', 'vente'),
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('transaction', 'location'),
    supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('is_read', false),
    supabase.from('contacts').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'Annonces totales', value: total ?? 0, href: '/admin/annonces' },
    { label: 'Disponibles', value: disponible ?? 0, color: 'text-available', href: '/admin/annonces' },
    { label: 'Vendus', value: vendu ?? 0, href: '/admin/annonces' },
    { label: 'Loués', value: loue ?? 0, href: '/admin/annonces' },
    { label: 'À vendre', value: vente ?? 0, href: '/admin/annonces' },
    { label: 'À louer', value: location ?? 0, href: '/admin/annonces' },
    {
      label: 'Leads non lus',
      value: unreadLeads ?? 0,
      color: (unreadLeads ?? 0) > 0 ? 'text-accent' : undefined,
      href: '/admin/leads',
    },
    { label: 'Leads totaux', value: totalLeads ?? 0, href: '/admin/leads' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Dashboard</h1>
        <Link
          href="/admin/annonces/new"
          className="text-sm font-medium px-4 py-2 bg-accent text-white rounded-btn hover:bg-accent-dark transition-colors"
        >
          + Nouvelle annonce
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(({ label, value, color, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-sand-light border border-border rounded-card p-4 hover:border-accent/40 transition-colors"
          >
            <p className="text-xs text-muted mb-1">{label}</p>
            <p className={`text-2xl font-semibold tabular-nums ${color ?? 'text-ink'}`}>
              {value}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/annonces/new"
          className="flex items-center gap-3 p-4 bg-sand-light border border-border rounded-card hover:border-accent/40 transition-colors"
        >
          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-ink">Ajouter une annonce</p>
            <p className="text-xs text-muted">Créer un nouveau bien immobilier</p>
          </div>
        </Link>

        <Link
          href="/admin/leads"
          className="flex items-center gap-3 p-4 bg-sand-light border border-border rounded-card hover:border-accent/40 transition-colors"
        >
          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-ink">
              Gérer les leads
              {(unreadLeads ?? 0) > 0 && (
                <span className="ml-2 text-xs bg-accent text-white px-1.5 py-0.5 rounded-full">
                  {unreadLeads} non lu{(unreadLeads ?? 0) > 1 ? 's' : ''}
                </span>
              )}
            </p>
            <p className="text-xs text-muted">Messages et demandes de contact</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
