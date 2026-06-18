'use server'

import { createClient } from '@/lib/supabase/server'

interface ContactState {
  success?: boolean
  error?: string
}

export async function submitContact(
  _prev: ContactState | null,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string | null
  const message = formData.get('message') as string
  const property_id = formData.get('property_id') as string | null

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { error: 'Veuillez remplir tous les champs obligatoires.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: 'Adresse email invalide.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.from('contacts').insert({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    message: message.trim(),
    property_id: property_id || null,
    is_read: false,
  })

  if (error) {
    return { error: 'Une erreur est survenue. Veuillez réessayer.' }
  }

  return { success: true }
}
