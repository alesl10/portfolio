import { getProjects } from '@/lib/getData'
import ProjectForm from '@/components/admin/ProjectForm'
import ProjectList from '@/components/admin/ProjectList'

export default async function AdminProyectosPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4 text-green prompt">nuevo / editar proyecto</h2>
        <ProjectForm />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-green prompt">proyectos ({projects.length})</h2>
        <ProjectList projects={projects} />
      </div>
    </div>
  )
}
