import { Metadata } from 'next'
import { getProjects } from '@/lib/getData'
import ProjectModal from '@/components/proyectos/ProjectModal'

export const metadata: Metadata = {
  title: 'Proyectos | Alexis López',
  description: 'Proyectos destacados en React, Node.js, .NET y más.',
}

export default async function ProyectosPage() {
  const projects = await getProjects()

  return (
    <div className="section-container py-16 md:py-20">
      <div className="mb-12">
        <p className="kbd-label text-green mb-2">{'// projects'}</p>
        <h1 className="glow text-green">./proyectos</h1>
        <p className="text-muted text-base mt-3">
          <span className="prompt" />
          <span className="text-fg">find . -type project</span>
          <span className="text-faint"> — {projects.length} resultados</span>
        </p>
      </div>

      <ProjectModal projects={projects} />
    </div>
  )
}
