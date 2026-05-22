'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EducationItem } from '@/types'
import Reveal from '@/components/ui/Reveal'

interface EducationTimelineProps {
  education: EducationItem[]
}

function EducationCard({ item }: { item: EducationItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="group flex items-start gap-3 cursor-pointer w-full text-left p-4"
      >
        <span
          className={`text-green flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
        >
          ❯
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h3 className="text-base font-semibold text-fg group-hover:text-green transition-colors">
              {item.title}
            </h3>
            <span
              className={`text-[0.7rem] px-2 py-0.5 rounded border flex-shrink-0 ${
                item.completed
                  ? 'text-green border-line bg-[rgba(89,233,165,0.06)]'
                  : 'text-amber border-[rgba(245,179,64,0.25)] bg-[rgba(245,179,64,0.06)]'
              }`}
            >
              {item.completed ? '✓ done' : '● running'}
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 pb-4 pl-11 text-sm text-muted leading-relaxed">
              <p className="mb-3">{item.description}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-green hover:text-fg transition-colors text-xs font-medium"
                >
                  ❯ ver certificado
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function EducationTimeline({ education }: EducationTimelineProps) {
  return (
    <section className="section-container py-16 border-t border-line">
      <Reveal>
        <p className="kbd-label text-green mb-2">{'// education'}</p>
        <h2>cat ./formacion.log</h2>
        <p className="text-muted mt-2">
          <span className="prompt" />Formación técnica y aprendizaje continuo
        </p>
      </Reveal>

      <div className="mt-10 space-y-3">
        {education.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <EducationCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
