'use server'

import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { Project, Skill, ExperienceItem } from '@/types'

export async function adminLogin(password: string): Promise<{ ok: boolean }> {
  const secret = process.env.ADMIN_SECRET
  if (!secret || password !== secret) return { ok: false }
  const store = await cookies()
  store.set('admin_token', secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8,
    path: '/',
  })
  return { ok: true }
}

async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = join(process.cwd(), 'src/content', filename)
  const content = await readFile(filePath, 'utf-8')
  return JSON.parse(content) as T
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const filePath = join(process.cwd(), 'src/content', filename)
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

// Projects
export async function saveProject(project: Project) {
  const projects = await readJsonFile<Project[]>('projects.json')
  const index = projects.findIndex(p => p.id === project.id)
  if (index >= 0) {
    projects[index] = project
  } else {
    projects.push(project)
  }
  await writeJsonFile('projects.json', projects)
  revalidatePath('/')
  revalidatePath('/proyectos')
}

export async function deleteProject(id: string) {
  const projects = await readJsonFile<Project[]>('projects.json')
  const filtered = projects.filter(p => p.id !== id)
  await writeJsonFile('projects.json', filtered)
  revalidatePath('/')
  revalidatePath('/proyectos')
}

// Skills
export async function saveSkill(skill: Skill) {
  const skills = await readJsonFile<Skill[]>('skills.json')
  const index = skills.findIndex(s => s.id === skill.id)
  if (index >= 0) {
    skills[index] = skill
  } else {
    skills.push(skill)
  }
  await writeJsonFile('skills.json', skills)
  revalidatePath('/')
}

export async function deleteSkill(id: string) {
  const skills = await readJsonFile<Skill[]>('skills.json')
  const filtered = skills.filter(s => s.id !== id)
  await writeJsonFile('skills.json', filtered)
  revalidatePath('/')
}

// Experience
export async function saveExperience(experience: ExperienceItem) {
  const items = await readJsonFile<ExperienceItem[]>('experience.json')
  const index = items.findIndex(e => e.id === experience.id)
  if (index >= 0) {
    items[index] = experience
  } else {
    items.push(experience)
  }
  await writeJsonFile('experience.json', items)
  revalidatePath('/')
}

export async function deleteExperience(id: string) {
  const items = await readJsonFile<ExperienceItem[]>('experience.json')
  const filtered = items.filter(e => e.id !== id)
  await writeJsonFile('experience.json', filtered)
  revalidatePath('/')
}
