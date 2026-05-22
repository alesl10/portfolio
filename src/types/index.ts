export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  repoUrl: string
}

export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'tools'
  icon: string
}

export interface EducationItem {
  id: string
  title: string
  description: string
  completed: boolean
  link?: string
  certificate?: string
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  period: string
  location: string
  current: boolean
  summary: string
  stack: string[]
  highlights: string[]
}
