import { getSkills } from '@/lib/getData'
import SkillForm from '@/components/admin/SkillForm'
import SkillList from '@/components/admin/SkillList'

export default async function AdminSkillsPage() {
  const skills = await getSkills()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4 text-green prompt">nueva / editar skill</h2>
        <SkillForm />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-green prompt">skills ({skills.length})</h2>
        <SkillList skills={skills} />
      </div>
    </div>
  )
}
