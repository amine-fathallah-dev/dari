'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

interface AuthState {
  error?: string
}

export async function signIn(
  _prev: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email et mot de passe requis.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: 'Identifiants incorrects.' }
  }

  redirect('/admin')
}

export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
