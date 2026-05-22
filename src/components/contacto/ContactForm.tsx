'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import emailjs from '@emailjs/browser'
import { useDraggable } from '@/hooks/useDraggable'
import { useResizable } from '@/hooks/useResizable'

const SERVICE_ID = 'service_sfl0dpb'
const TEMPLATE_ID = 'template_ypr8pr1'
const PUBLIC_KEY = 'Uz1PxRjY_kwdr19gN'

type Step = 'idle' | 'name' | 'email' | 'message' | 'ready' | 'sending' | 'done'

interface Line {
  type: 'cmd' | 'out' | 'success' | 'error' | 'hint'
  prefix?: string
  text: string
}

const PROMPTS: Record<Step, string> = {
  idle:    '$ ',
  name:    '❯ nombre:  ',
  email:   '❯ email:   ',
  message: '❯ mensaje: ',
  ready:   '$ ',
  sending: '$ ',
  done:    '$ ',
}

export default function ContactForm() {
  const [step, setStep]       = useState<Step>('idle')
  const [history, setHistory] = useState<Line[]>([
    { type: 'hint', text: '# bienvenido — escribe "contactar" para iniciar' },
  ])
  const [input, setInput]     = useState('')
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const messageRef            = useRef('')
  const inputRef              = useRef<HTMLInputElement>(null)
  const bottomRef             = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const push = (...lines: Line[]) =>
    setHistory(prev => [...prev, ...lines])

  const handleEnter = async () => {
    const val = input.trim()

    /* ── idle: espera "contactar" ── */
    if (step === 'idle') {
      push({ type: 'cmd', prefix: '$ ', text: val })
      if (val.toLowerCase() === 'contactar') {
        push(
          { type: 'out',  text: 'Iniciando formulario de contacto...' },
          { type: 'hint', text: '# completá los campos y presioná Enter en cada uno' },
        )
        setStep('name')
      } else if (val) {
        push(
          { type: 'error', text: `comando no encontrado: ${val}` },
          { type: 'hint',  text: '# pista: escribe "contactar"' },
        )
      }
      setInput('')
      return
    }

    /* ── nombre ── */
    if (step === 'name') {
      if (!val) return
      push({ type: 'cmd', prefix: '❯ nombre:  ', text: val })
      setName(val)
      setStep('email')
      setInput('')
      return
    }

    /* ── email ── */
    if (step === 'email') {
      if (!val) return
      push({ type: 'cmd', prefix: '❯ email:   ', text: val })
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        push(
          { type: 'error', text: 'email inválido — intentá de nuevo' },
        )
        setInput('')
        return
      }
      setEmail(val)
      setStep('message')
      setInput('')
      return
    }

    /* ── mensaje ── */
    if (step === 'message') {
      if (!val) return
      push(
        { type: 'cmd',  prefix: '❯ mensaje: ', text: val },
        { type: 'out',  text: '' },
        { type: 'out',  text: '  ┌─────────────────────────────────┐' },
        { type: 'out',  text: `  │  nombre:  ${name}` },
        { type: 'out',  text: `  │  email:   ${email}` },
        { type: 'out',  text: `  │  mensaje: ${val}` },
        { type: 'out',  text: '  └─────────────────────────────────┘' },
        { type: 'hint', text: '# revisá los datos y escribe "enviar" para confirmar' },
        { type: 'hint', text: '# o escribe "cancelar" para empezar de nuevo' },
      )
      messageRef.current = val
      setStep('ready')
      setInput('')
      return
    }

    /* ── ready: espera "enviar" o "cancelar" ── */
    if (step === 'ready') {
      push({ type: 'cmd', prefix: '$ ', text: val })

      if (val.toLowerCase() === 'cancelar') {
        push(
          { type: 'out',  text: 'Formulario reiniciado.' },
          { type: 'hint', text: '# escribe "contactar" para empezar de nuevo' },
        )
        setName(''); setEmail('')
        messageRef.current = ''
        setStep('idle')
        setInput('')
        return
      }

      if (val.toLowerCase() !== 'enviar') {
        push(
          { type: 'error', text: `comando no reconocido: ${val}` },
          { type: 'hint',  text: '# escribe "enviar" para confirmar o "cancelar" para reiniciar' },
        )
        setInput('')
        return
      }

      /* enviar */
      const message = messageRef.current
      setStep('sending')
      push({ type: 'out', text: 'Enviando mensaje...' })
      setInput('')

      try {
        await emailjs.send(
          SERVICE_ID, TEMPLATE_ID,
          { from_name: name, from_email: email, message, to_email: 'lopezalexis499@gmail.com' },
          PUBLIC_KEY
        )
        push(
          { type: 'success', text: '✓ mensaje enviado correctamente' },
          { type: 'hint',    text: '# te respondo a la brevedad — hasta pronto!' },
        )
        setStep('done')
      } catch {
        push(
          { type: 'error', text: 'error: no se pudo enviar. Revisá tu conexión.' },
          { type: 'hint',  text: '# escribe "enviar" para reintentar' },
        )
        setStep('ready')
      }
    }
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEnter()
  }

  const activeStep = step !== 'done' && step !== 'sending'
  const currentPrompt = PROMPTS[step] ?? '$ '
  const { dragStyle, onMouseDown } = useDraggable()
  const { containerRef, sizeStyle, onResizeStart, hasSize } = useResizable(300, 200)

  return (
    <div style={dragStyle}>
    <div
      ref={containerRef}
      className="terminal-window cursor-text select-none"
      style={{ ...sizeStyle, display: 'flex', flexDirection: 'column' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* barra superior */}
      <div className="terminal-bar" onMouseDown={onMouseDown} style={{ cursor: 'grab', flexShrink: 0 }}>
        <span className="terminal-dot" style={{ background: '#f5b340' }} />
        <span className="terminal-dot" style={{ background: '#59e9a5' }} />
        <span className="terminal-dot" style={{ background: '#4cc9d6' }} />
        <span className="ml-2 text-[0.7rem] text-faint">mail --compose</span>
      </div>

      {/* área de salida */}
      <div
        className="p-5 overflow-y-auto space-y-[3px] font-mono text-sm leading-relaxed"
        style={{ flex: 1, minHeight: '340px', maxHeight: hasSize ? undefined : '500px' }}
      >
        {history.map((line, i) => (
          <div key={i} className={lineStyle(line.type)}>
            {line.prefix
              ? <><span className="text-green">{line.prefix}</span><span className="select-text">{line.text}</span></>
              : <span className="select-text">{line.text}</span>
            }
          </div>
        ))}

        {/* indicador de envío */}
        {step === 'sending' && (
          <div className="flex items-center gap-1 text-muted mt-1">
            <span className="animate-pulse">▮</span>
            <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>▮</span>
            <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>▮</span>
          </div>
        )}

        {/* línea de input activa */}
        {activeStep && (
          <div className="flex items-center mt-1">
            <span className="text-green font-bold whitespace-pre">{currentPrompt}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              className="flex-1 bg-transparent outline-none text-fg caret-green min-w-0 select-text"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <span className="cursor" />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* resize handle */}
      <div
        onMouseDown={onResizeStart}
        className="absolute bottom-0 right-0 p-1.5 cursor-se-resize opacity-25 hover:opacity-60 transition-opacity"
      >
        <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor" className="text-green">
          <circle cx="7.5" cy="7.5" r="1" />
          <circle cx="4.5" cy="7.5" r="1" />
          <circle cx="7.5" cy="4.5" r="1" />
        </svg>
      </div>
    </div>
    </div>
  )
}

function lineStyle(type: Line['type']) {
  switch (type) {
    case 'cmd':     return 'text-fg'
    case 'out':     return 'text-muted'
    case 'success': return 'text-green font-semibold'
    case 'error':   return 'text-[#f87171]'
    case 'hint':    return 'text-faint italic'
  }
}
