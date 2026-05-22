import { getExperience } from '@/lib/getData'
import ExperienceForm from '@/components/admin/ExperienceForm'
import ExperienceList from '@/components/admin/ExperienceList'

export default async function AdminExperienciaPage() {
  const experience = await getExperience()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4 text-green prompt">nueva / editar experiencia</h2>
        <ExperienceForm />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-green prompt">experiencia ({experience.length})</h2>
        <ExperienceList experience={experience} />
      </div>
    </div>
  )
}
