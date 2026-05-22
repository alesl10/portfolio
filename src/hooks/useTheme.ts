'use client'

import { useState, useEffect } from 'react'

export type Theme = 'terminal' | 'mario'

const STORAGE_KEY = 'portfolio-theme'

function applyTheme(t: Theme) {
  if (t === 'mario') document.documentElement.setAttribute('data-theme', 'mario')
  else document.documentElement.removeAttribute('data-theme')
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('terminal')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (s === 'mario') setTheme('mario')
    } catch {}
    setMounted(true)
  }, [])

  const toggle = () => {
    setTheme(prev => {
      const next: Theme = prev === 'terminal' ? 'mario' : 'terminal'
      applyTheme(next)
      try { localStorage.setItem(STORAGE_KEY, next) } catch {}
      return next
    })
  }

  return { theme, toggle, mounted }
}
