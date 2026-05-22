'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveExperience } from '@/lib/actions'
import { ExperienceItem } from '@/types'

const EMPTY: ExperienceItem = {
  id: '',
  company: '',
  role: '',
  period: '',
  location: '',
  current: false,
  summary: '',
  stack: [],
  highlights: [],
}

export default function ExperienceForm({ initial }: { initial?: ExperienceItem }) {
  const router = useRouter()
  const [item, setItem] = useState<ExperienceItem>(initial || EMPTY)
  const [stack, setStack] = useState(initial?.stack.join(', ') || '')
  const [highlights, setHighlights] = useState(initial?.highlights.join('\n') || '')
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await saveExperience({
        ...item,
        stack: stack.split(',').map((t) => t.trim()).filter(Boolean),
        highlights: highlights.split('\n').map((t) => t.trim()).filter(Boolean),
      })
      setItem(EMPTY)
      setStack('')
      setHighlights('')
      router.refresh()
    } catch (error) {
      console.error('Error saving experience:', error)
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2 rounded-lg border border-line bg-panel-2 text-fg placeholder-faint text-sm focus:outline-none focus:border-line-strong transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-4 card p-5">
      <input type="text" name="id" placeholder="ID (ej: exp-lead)" value={item.id} onChange={handleChange} required className={inputClass} />
      <input type="text" name="company" placeholder="Empresa" value={item.company} onChange={handleChange} required className={inputClass} />
      <input type="text" name="role" placeholder="Rol" value={item.role} onChange={handleChange} required className={inputClass} />
      <input type="text" name="period" placeholder="Período (ej: 2023 — Presente)" value={item.period} onChange={handleChange} required className={inputClass} />
      <input type="text" name="location" placeholder="Ubicación" value={item.location} onChange={handleChange} required className={inputClass} />
      <textarea name="summary" placeholder="Resumen" value={item.summary} onChange={handleChange} required rows={3} className={`${inputClass} resize-none`} />
      <input type="text" placeholder="Stack (separado por comas)" value={stack} onChange={(e) => setStack(e.target.value)} className={inputClass} />
      <textarea placeholder="Highlights (uno por línea)" value={highlights} onChange={(e) => setHighlights(e.target.value)} rows={4} className={`${inputClass} resize-none`} />
      <label className="flex items-center gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={item.current}
          onChange={(e) => setItem((prev) => ({ ...prev, current: e.target.checked }))}
          className="accent-[#59e9a5]"
        />
        rol actual (HEAD → main)
      </label>

      <button type="submit" disabled={loading} className="btn-primary text-sm disabled:opacity-50">
        {loading ? 'guardando...' : initial ? 'actualizar' : 'agregar'} experiencia
      </button>
    </form>
  )
}
