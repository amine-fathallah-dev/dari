import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20 text-center">
        <div>
          <p className="font-display text-6xl text-border mb-4">404</p>
          <h1 className="font-display text-2xl text-ink mb-2">Page introuvable</h1>
          <p className="text-muted mb-8">Cette page n'existe pas ou a été déplacée.</p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-accent text-white text-sm font-medium rounded-btn hover:bg-accent-dark transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
