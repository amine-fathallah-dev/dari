import type { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Connexion',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-sand flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-display text-3xl tracking-[0.25em] text-ink uppercase mb-1">Dari</p>
          <p className="text-sm text-muted">Administration</p>
        </div>
        <div className="bg-sand-light border border-border rounded-card p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
