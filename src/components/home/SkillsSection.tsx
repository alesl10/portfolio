import { Skill } from '@/types'
import SkillCard from './SkillCard'
import Reveal from '@/components/ui/Reveal'

interface SkillsSectionProps {
  skills: Skill[]
}

const categoryMeta: Record<string, { label: string; cmd: string }> = {
  frontend: { label: 'frontend', cmd: 'ls ./frontend' },
  backend: { label: 'backend', cmd: 'ls ./backend' },
  tools: { label: 'tools', cmd: 'ls ./tools' },
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = (['frontend', 'backend', 'tools'] as const)
    .map((key) => ({ key, items: skills.filter((s) => s.category === key) }))
    .filter((c) => c.items.length > 0)

  return (
    <section className="section-container py-16 border-t border-line">
      <Reveal>
        <p className="kbd-label text-green mb-2">{'// stack'}</p>
        <h2>Tech stack</h2>
        <p className="text-muted mt-2">
          <span className="prompt" />Herramientas que uso para construir y escalar
        </p>
      </Reveal>

      <div className="mt-10 space-y-8">
        {categories.map(({ key, items }, ci) => (
          <Reveal key={key} delay={ci * 0.05}>
            <p className="text-sm text-muted mb-4 prompt">
              <span className="text-fg">{categoryMeta[key].cmd}</span>
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
              {items.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
