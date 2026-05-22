'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Project } from '@/types'
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface ProjectModalProps {
  projects: Project[]
}

function Card({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="card group cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="terminal-bar">
        <span className="terminal-dot" style={{ background: '#f5b340' }} />
        <span className="terminal-dot" style={{ background: '#59e9a5' }} />
        <span className="terminal-dot" style={{ background: '#4cc9d6' }} />
        <span className="ml-2 text-[0.7rem] text-faint truncate">
          {String(index + 1).padStart(2, '0')} · {project.id}
        </span>
      </div>

      <div className="relative h-44 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-sm text-green font-medium prompt-arrow">ver detalles</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg text-fg group-hover:text-green transition-colors mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-muted line-clamp-2 mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectModal({ projects }: ProjectModalProps) {
  const [selected, setSelected] = useState<Project | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
              className="terminal-window max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="terminal-bar sticky top-0 bg-panel z-10">
                <span className="terminal-dot" style={{ background: '#f5b340' }} />
                <span className="terminal-dot" style={{ background: '#59e9a5' }} />
                <span className="terminal-dot" style={{ background: '#4cc9d6' }} />
                <span className="ml-2 text-[0.7rem] text-faint truncate">
                  ~/proyectos/{selected.id}
                </span>
                <button
                  onClick={() => setSelected(null)}
                  className="ml-auto text-muted hover:text-green transition-colors"
                  aria-label="Cerrar"
                >
                  <FaTimes size={15} />
                </button>
              </div>

              <div className="relative h-56">
                <Image src={selected.image} alt={selected.title} fill className="object-cover" />
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <h2 className="text-2xl font-bold text-fg mb-2">{selected.title}</h2>
                  <p className="text-muted leading-relaxed text-sm">{selected.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="flex gap-3 pt-1">
                  <a href={selected.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                    <FaExternalLinkAlt size={12} />
                    demo
                  </a>
                  <a href={selected.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                    <FaGithub size={14} />
                    git clone
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <Card key={project.id} project={project} index={i} onClick={() => setSelected(project)} />
        ))}
      </div>
    </>
  )
}
