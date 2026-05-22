'use client'

import { useRouter } from 'next/navigation'
import { deleteProject } from '@/lib/actions'
import { Project } from '@/types'
import { FaTrash } from 'react-icons/fa'

interface ProjectListProps {
  projects: Project[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro?')) {
      await deleteProject(id)
      router.refresh()
    }
  }

  return (
    <div className="space-y-2">
      {projects.map(project => (
        <div
          key={project.id}
          className="card flex justify-between items-center p-3"
        >
          <div>
            <p className="font-semibold text-fg">{project.title}</p>
            <p className="text-faint text-xs">{project.id}</p>
          </div>
          <button
            onClick={() => handleDelete(project.id)}
            className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
          >
            <FaTrash size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
