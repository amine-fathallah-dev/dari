'use client'

import { useTransition } from 'react'
import { updateStatus, toggleFeatured } from '@/app/actions/properties'
import { LABELS } from '@/lib/i18n'
import type { PropertyStatus } from '@/lib/types'

interface Props {
  id: string
  status: PropertyStatus
  isFeatured: boolean
}

export default function AdminPropertyActions({ id, status }: Props) {
  const [pending, startTransition] = useTransition()

  const handleStatus = (s: PropertyStatus) => {
    startTransition(() => updateStatus(id, s))
  }

  return (
    <select
      value={status}
      onChange={(e) => handleStatus(e.target.value as PropertyStatus)}
      disabled={pending}
      className="text-xs bg-sand border border-border rounded px-2 py-1 text-ink focus:outline-none focus:border-accent disabled:opacity-60"
    >
      {Object.entries(LABELS.status).map(([k, v]) => (
        <option key={k} value={k}>{v}</option>
      ))}
    </select>
  )
}
