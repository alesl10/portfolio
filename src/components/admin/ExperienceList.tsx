'use client'

import { useRouter } from 'next/navigation'
import { deleteExperience } from '@/lib/actions'
import { ExperienceItem } from '@/types'
import { FaTrash } from 'react-icons/fa'

export default function ExperienceList({ experience }: { experience: ExperienceItem[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro?')) {
      await deleteExperience(id)
      router.refresh()
    }
  }

  return (
    <div className="space-y-2">
      {experience.map((item) => (
        <div key={item.id} className="card flex justify-between items-center p-3">
          <div>
            <p className="font-semibold text-fg">
              {item.role} <span className="text-muted">@</span> <span className="text-green">{item.company}</span>
            </p>
            <p className="text-faint text-xs">{item.id} · {item.period}</p>
          </div>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-2 text-magenta hover:bg-[rgba(224,108,159,0.1)] rounded transition-colors"
          >
            <FaTrash size={15} />
          </button>
        </div>
      ))}
    </div>
  )
}
