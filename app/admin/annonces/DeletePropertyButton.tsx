'use client'

import { useTransition } from 'react'
import { deleteProperty } from '@/app/actions/properties'

export default function DeletePropertyButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm(`Supprimer "${title}" ? Cette action est irréversible.`)) return
    startTransition(() => deleteProperty(id))
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-40"
    >
      {pending ? '…' : 'Supprimer'}
    </button>
  )
}
