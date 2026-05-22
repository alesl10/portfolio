'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveProject } from '@/lib/actions'
import { Project } from '@/types'

interface ProjectFormProps {
  initialProject?: Project
}

const EMPTY_PROJECT: Project = {
  id: '',
  title: '',
  description: '',
  image: '',
  tags: [],
  demoUrl: '',
  repoUrl: '',
}

export default function ProjectForm({ initialProject }: ProjectFormProps) {
  const router = useRouter()
  const [project, setProject] = useState<Project>(initialProject || EMPTY_PROJECT)
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState(initialProject?.tags.join(', ') || '')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setProject(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await saveProject({
        ...project,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      })
      setProject(EMPTY_PROJECT)
      setTags('')
      router.refresh()
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2 rounded-lg border border-line bg-panel-2 text-fg placeholder-faint text-sm focus:outline-none focus:border-line-strong transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-4 card p-5">
      <input type="text" name="id" placeholder="ID (ej: my-project)" value={project.id} onChange={handleChange} required className={inputClass} />
      <input type="text" name="title" placeholder="Título" value={project.title} onChange={handleChange} required className={inputClass} />
      <textarea name="description" placeholder="Descripción" value={project.description} onChange={handleChange} required rows={4} className={`${inputClass} resize-none`} />
      <input type="text" name="image" placeholder="URL de imagen (ej: /tareas.jpg)" value={project.image} onChange={handleChange} required className={inputClass} />
      <input type="text" placeholder="Tags (separadas por comas)" value={tags} onChange={e => setTags(e.target.value)} className={inputClass} />
      <input type="url" name="demoUrl" placeholder="URL de demostración" value={project.demoUrl} onChange={handleChange} required className={inputClass} />
      <input type="url" name="repoUrl" placeholder="URL del repositorio" value={project.repoUrl} onChange={handleChange} required className={inputClass} />

      <button type="submit" disabled={loading} className="btn-primary text-sm disabled:opacity-50">
        {loading ? 'guardando...' : initialProject ? 'actualizar' : 'agregar'} proyecto
      </button>
    </form>
  )
}
