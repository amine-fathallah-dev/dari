import type { Metadata } from 'next'
import AdminNav from './AdminNav'

export const metadata: Metadata = {
  title: {
    default: 'Administration',
    template: '%s | Admin DARI',
  },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand flex flex-col">
      <AdminNav />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">{children}</main>
    </div>
  )
}
