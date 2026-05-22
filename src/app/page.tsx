import { getSkills, getEducation, getExperience } from '@/lib/getData'
import About from '@/components/home/About'
import SkillsSection from '@/components/home/SkillsSection'
import Experience from '@/components/home/Experience'
import EducationTimeline from '@/components/home/EducationTimeline'

export default async function Home() {
  const skills = await getSkills()
  const education = await getEducation()
  const experience = await getExperience()

  return (
    <div className='flex flex-col gap-4'>
      <About />
      <Experience experience={experience} />
      <SkillsSection skills={skills} />
      <EducationTimeline education={education} />
    </div>
  )
}
