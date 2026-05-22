'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { adminLogin } from '@/lib/actions'

const SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

export default function KonamiLogin() {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const progress = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (open) return
    if (e.key === SEQUENCE[progress.current]) {
      progress.current += 1
      if (progress.current === SEQUENCE.length) {
        progress.current = 0
        setOpen(true)
      }
    } else {
      progress.current = e.key === SEQUENCE[0] ? 1 : 0
    }
  }, [open])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await adminLogin(password)
    if (result.ok) {
      window.location.href = '/admin/proyectos'
    } else {
      setError('acceso denegado.')
      setLoading(false)
      setPassword('')
      inputRef.current?.focus()
    }
  }

  const handleClose = () => {
    setOpen(false)
    setPassword('')
    setError('')
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div className="terminal-window w-full max-w-sm mx-4">
        <div className="terminal-bar">
          <span className="terminal-dot" style={{ background: '#f5b340' }} />
          <span className="terminal-dot" style={{ background: '#59e9a5' }} />
          <span className="terminal-dot" style={{ background: '#4cc9d6' }} />
          <span className="ml-2 text-[0.7rem] text-faint">sudo login --secret</span>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <p className="text-amber glow-amber text-sm font-bold">root@backoffice ~$</p>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && handleClose()}
            className="w-full bg-transparent border border-[var(--color-line-strong)] text-[var(--color-fg)] px-3 py-2 text-sm focus:outline-none focus:border-amber font-mono"
            placeholder="password:"
            autoComplete="off"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading || !password}
              className="btn-primary text-xs flex-1 disabled:opacity-40"
            >
              {loading ? 'verificando...' : 'login'}
            </button>
            <button type="button" onClick={handleClose} className="btn-secondary text-xs">
              esc
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
