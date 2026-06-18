'use client'

import { useActionState } from 'react'
import { submitContact } from '@/app/actions/contacts'
import { AGENCY } from '@/lib/i18n'

interface ContactFormProps {
  propertyId?: string
  propertyReference?: string
  compact?: boolean
}

export default function ContactForm({
  propertyId,
  propertyReference,
  compact = false,
}: ContactFormProps) {
  const [state, action, pending] = useActionState(submitContact, null)

  if (state?.success) {
    return (
      <div className="p-6 bg-available/10 border border-available/30 rounded-card text-center">
        <p className="text-available font-medium mb-1">Message envoyé !</p>
        <p className="text-sm text-muted">Nous vous répondrons dans les plus brefs délais.</p>
      </div>
    )
  }

  return (
    <div className="bg-sand-light border border-border rounded-card p-5 space-y-4">
      {!compact && (
        <h3 className="font-display text-xl text-ink">Nous contacter</h3>
      )}

      {/* WhatsApp + Tel */}
      <div className="flex gap-3">
        <a
          href={`https://wa.me/${AGENCY.whatsapp}${propertyReference ? `?text=Bonjour, je suis intéressé par l'annonce ${propertyReference}` : ''}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-available text-white text-sm font-medium rounded-btn hover:opacity-90 transition-opacity"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.532 5.852L0 24l6.335-1.61A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.002-1.364l-.36-.213-3.716.974.992-3.622-.234-.372A9.814 9.814 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
          </svg>
          WhatsApp
        </a>
        <a
          href={`tel:${AGENCY.phone}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-accent text-accent text-sm font-medium rounded-btn hover:bg-accent hover:text-white transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          Appeler
        </a>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-sand-light px-3 text-xs text-muted">ou par message</span>
        </div>
      </div>

      {/* Form */}
      <form action={action} className="space-y-3">
        {propertyId && (
          <input type="hidden" name="property_id" value={propertyId} />
        )}

        {state?.error && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}

        <div>
          <label htmlFor="cf-name" className="block text-xs font-medium text-muted mb-1">
            Nom complet *
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            placeholder="Votre nom"
            className="w-full text-sm bg-sand border border-border rounded-btn px-3 py-2 text-ink placeholder:text-muted focus:outline-none focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="cf-email" className="block text-xs font-medium text-muted mb-1">
              Email *
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              placeholder="email@exemple.com"
              className="w-full text-sm bg-sand border border-border rounded-btn px-3 py-2 text-ink placeholder:text-muted focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="cf-phone" className="block text-xs font-medium text-muted mb-1">
              Téléphone
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              placeholder="+216 XX XXX XXX"
              className="w-full text-sm bg-sand border border-border rounded-btn px-3 py-2 text-ink placeholder:text-muted focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="cf-message" className="block text-xs font-medium text-muted mb-1">
            Message *
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={3}
            placeholder="Je souhaite obtenir plus d'informations…"
            className="w-full text-sm bg-sand border border-border rounded-btn px-3 py-2 text-ink placeholder:text-muted focus:outline-none focus:border-accent resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full py-2.5 text-sm font-medium bg-accent text-white rounded-btn hover:bg-accent-dark transition-colors disabled:opacity-60"
        >
          {pending ? 'Envoi…' : 'Envoyer le message'}
        </button>
      </form>
    </div>
  )
}
