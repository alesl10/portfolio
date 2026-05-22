'use client'

import { useRouter } from 'next/navigation'
import { deleteSkill } from '@/lib/actions'
import { Skill } from '@/types'
import { FaTrash } from 'react-icons/fa'

interface SkillListProps {
  skills: Skill[]
}

export default function SkillList({ skills }: SkillListProps) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro?')) {
      await deleteSkill(id)
      router.refresh()
    }
  }

  const groups = [
    { label: 'frontend', items: skills.filter(s => s.category === 'frontend') },
    { label: 'backend', items: skills.filter(s => s.category === 'backend') },
    { label: 'tools', items: skills.filter(s => s.category === 'tools') },
  ].filter(g => g.items.length > 0)

  return (
    <div className="space-y-6">
      {groups.map(({ label, items }) => (
        <div key={label}>
          <h3 className="text-sm font-semibold text-green mb-3 prompt">{label}</h3>
          <div className="space-y-2">
            {items.map(skill => (
              <div key={skill.id} className="card flex justify-between items-center p-3">
                <div>
                  <p className="font-semibold text-fg">{skill.name}</p>
                  <p className="text-faint text-xs">{skill.id}</p>
                </div>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="p-2 text-magenta hover:bg-[rgba(224,108,159,0.1)] rounded transition-colors"
                >
                  <FaTrash size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
