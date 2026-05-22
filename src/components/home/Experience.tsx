import { ExperienceItem } from '@/types'
import Reveal from '@/components/ui/Reveal'

interface ExperienceProps {
  experience: ExperienceItem[]
}

function hash(id: string) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h.toString(16).padStart(7, '0').slice(0, 7)
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section className="section-container py-16 border-t border-line">
      <Reveal>
        <p className="kbd-label text-green mb-2">{'// experience'}</p>
        <h2>git log --career</h2>
        <p className="text-muted mt-2">
          <span className="prompt" />Trayectoria construyendo software en producción
        </p>
      </Reveal>

      <div className="mt-10 relative pl-6 md:pl-8 ">
        <div className="absolute left-[5px] md:left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-green via-green-dim to-transparent" />

        <div className="space-y-4">
          {experience.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <div className="relative ">
                <span
                  className="experience-dot absolute -left-[1.55rem] md:-left-[1.85rem] top-1.5 w-3 h-3 rounded-full border-2 border-base"
                  data-current={item.current ? 'true' : undefined}
                  style={{
                    background: item.current ? '#59e9a5' : '#2f8f67',
                    boxShadow: item.current ? '0 0 12px #59e9a5' : 'none',
                  }}
                />
                <div className="card p-2 md:p-4 ">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-amber text-xs">commit {hash(item.id)}</span>
                    {item.current && (
                      <span className="tag !text-green">HEAD → main</span>
                    )}
                    <span className="text-faint text-xs ml-auto">{item.period}</span>
                  </div>

                  <h3 className="mt-3 text-fg">
                    {item.role}
                    <span className="text-muted"> @ </span>
                    <span className="text-green">{item.company}</span>
                  </h3>
                  <p className="text-xs text-faint mt-0.5">{item.location}</p>

                  <p className="text-sm text-muted mt-3 leading-relaxed">{item.summary}</p>

                  <ul className="mt-4 space-y-1.5">
                    {item.highlights.map((h, hi) => (
                      <li key={hi} className="text-sm text-muted flex gap-2.5">
                        <span className="text-green flex-shrink-0">+</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.stack.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
