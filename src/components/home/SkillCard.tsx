import Image from 'next/image'
import { Skill } from '@/types'

interface SkillCardProps {
  skill: Skill
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="card group flex flex-col items-center gap-2.5 p-4 cursor-default hover:-translate-y-1">
      <div className="w-9 h-9 relative opacity-75 group-hover:opacity-100 transition-opacity">
        <Image
          src={`/icons/${skill.icon}`}
          alt={skill.name}
          width={36}
          height={36}
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-[0.72rem] font-medium text-center text-muted group-hover:text-green transition-colors">
        {skill.name}
      </p>
    </div>
  )
}
