'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveSkill } from '@/lib/actions'
import { Skill } from '@/types'

interface SkillFormProps {
  initialSkill?: Skill
}

const EMPTY_SKILL: Skill = {
  id: '',
  name: '',
  category: 'frontend',
  icon: '',
}

export default function SkillForm({ initialSkill }: SkillFormProps) {
  const router = useRouter()
  const [skill, setSkill] = useState<Skill>(initialSkill || EMPTY_SKILL)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setSkill(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await saveSkill(skill)
      setSkill(EMPTY_SKILL)
      router.refresh()
    } catch (error) {
      console.error('Error saving skill:', error)
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2 rounded-lg border border-line bg-panel-2 text-fg placeholder-faint text-sm focus:outline-none focus:border-line-strong transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-4 card p-5">
      <input type="text" name="id" placeholder="ID (ej: react)" value={skill.id} onChange={handleChange} required className={inputClass} />
      <input type="text" name="name" placeholder="Nombre (ej: React)" value={skill.name} onChange={handleChange} required className={inputClass} />
      <select name="category" value={skill.category} onChange={handleChange} className={inputClass}>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="tools">Tools</option>
      </select>
      <input type="text" name="icon" placeholder="Archivo SVG (ej: react-svgrepo-com.svg)" value={skill.icon} onChange={handleChange} required className={inputClass} />

      <button type="submit" disabled={loading} className="btn-primary text-sm disabled:opacity-50">
        {loading ? 'guardando...' : initialSkill ? 'actualizar' : 'agregar'} skill
      </button>
    </form>
  )
}
