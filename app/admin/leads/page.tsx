import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { markLeadRead } from '@/app/actions/properties'
import type { Contact } from '@/lib/types'

type ContactWithProperty = Contact & {
  properties?: { reference: string; title: string } | null
}

export const metadata: Metadata = { title: 'Leads' }

export default async function AdminLeadsPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('contacts')
    .select('*, properties(reference, title)')
    .order('created_at', { ascending: false })

  const contacts = (data ?? []) as unknown as ContactWithProperty[]
  const unread = contacts.filter((c) => !c.is_read).length

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl text-ink">Leads</h1>
        {unread > 0 && (
          <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">
            {unread} non lu{unread > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {!contacts || contacts.length === 0 ? (
        <div className="text-center py-16 bg-sand-light rounded-card border border-border">
          <p className="text-muted">Aucun lead pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((c) => (
            <div
              key={c.id}
              className={`bg-sand-light border rounded-card p-4 ${
                c.is_read ? 'border-border' : 'border-accent/40'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {!c.is_read && (
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-label="Non lu" />
                    )}
                    <p className="font-medium text-sm text-ink">{c.name}</p>
                    <span className="text-xs text-muted">
                      {new Date(c.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-muted mb-2">
                    <a href={`mailto:${c.email}`} className="hover:text-accent transition-colors">
                      {c.email}
                    </a>
                    {c.phone && (
                      <a href={`tel:${c.phone}`} className="hover:text-accent transition-colors">
                        {c.phone}
                      </a>
                    )}
                    {c.properties && (
                      <Link
                        href={`/annonces/${c.properties?.reference}`}
                        target="_blank"
                        className="text-accent hover:text-accent-dark transition-colors"
                      >
                        Réf. {c.properties?.reference}
                      </Link>
                    )}
                  </div>

                  <p className="text-sm text-ink whitespace-pre-wrap leading-relaxed">
                    {c.message}
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <a
                    href={`mailto:${c.email}?subject=Re: ${c.properties?.title ?? 'Votre demande'}`}
                    className="text-xs px-3 py-1.5 bg-accent text-white rounded-btn hover:bg-accent-dark transition-colors text-center"
                  >
                    Répondre
                  </a>
                  <form
                    action={async () => {
                      'use server'
                      await markLeadRead(c.id, !c.is_read)
                    }}
                  >
                    <button
                      type="submit"
                      className="w-full text-xs px-3 py-1.5 border border-border text-muted rounded-btn hover:border-accent/50 transition-colors"
                    >
                      {c.is_read ? 'Marquer non lu' : 'Marquer lu'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
