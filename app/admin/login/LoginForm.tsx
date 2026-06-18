'use client'

import { useActionState } from 'react'
import { signIn } from '@/app/actions/auth'

export default function LoginForm() {
  const [state, action, pending] = useActionState(signIn, null)

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="block text-xs font-medium text-muted mb-1">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full text-sm bg-sand border border-border rounded-btn px-3 py-2.5 text-ink focus:outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="login-password" className="block text-xs font-medium text-muted mb-1">
          Mot de passe
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full text-sm bg-sand border border-border rounded-btn px-3 py-2.5 text-ink focus:outline-none focus:border-accent"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-2.5 text-sm font-medium bg-accent text-white rounded-btn hover:bg-accent-dark transition-colors disabled:opacity-60"
      >
        {pending ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  )
}
