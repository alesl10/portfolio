import { readFile } from 'fs/promises'
import { join } from 'path'
import { Project, Skill, EducationItem, ExperienceItem } from '@/types'

async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = join(process.cwd(), 'src/content', filename)
  const content = await readFile(filePath, 'utf-8')
  return JSON.parse(content) as T
}

export async function getProjects(): Promise<Project[]> {
  return readJsonFile<Project[]>('projects.json')
}

export async function getSkills(): Promise<Skill[]> {
  return readJsonFile<Skill[]>('skills.json')
}

export async function getEducation(): Promise<EducationItem[]> {
  return readJsonFile<EducationItem[]>('education.json')
}

export async function getExperience(): Promise<ExperienceItem[]> {
  return readJsonFile<ExperienceItem[]>('experience.json')
}
