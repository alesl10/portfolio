'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { FaFileDownload, FaArrowRight } from 'react-icons/fa'
import { useDraggable } from '@/hooks/useDraggable'
import { useResizable } from '@/hooks/useResizable'

const COMMAND = 'whoami --verbose'
const BAR_CHARS = 20
const LOAD_STEPS = 20
const LOAD_INTERVAL = 50 // ms — total ~1000ms

const stats = [
  { value: '3+', label: 'años de experiencia' },
  { value: '15+', label: 'tecnologías' },
]

type Phase = 'typing' | 'loading' | 'ready'

function useTyping(text: string, speed = 55) {
  const [out, setOut] = useState('')
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return out
}

function ResizeHandle({ onMouseDown }: { onMouseDown: (e: React.MouseEvent) => void }) {
  return (
    <div
      onMouseDown={onMouseDown}
      className="absolute bottom-0 right-0 p-1.5 cursor-se-resize opacity-25 hover:opacity-60 transition-opacity"
    >
      <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor" className="text-green">
        <circle cx="7.5" cy="7.5" r="1" />
        <circle cx="4.5" cy="7.5" r="1" />
        <circle cx="7.5" cy="4.5" r="1" />
      </svg>
    </div>
  )
}

export default function About() {
  const typed = useTyping(COMMAND)
  const typingDone = typed.length === COMMAND.length

  const [phase, setPhase] = useState<Phase>('typing')
  const [loadStep, setLoadStep] = useState(0)

  // typing done → start loading
  useEffect(() => {
    if (!typingDone || phase !== 'typing') return
    setPhase('loading')
    setLoadStep(0)
  }, [typingDone, phase])

  // loading bar progress
  useEffect(() => {
    if (phase !== 'loading') return
    const id = setInterval(() => {
      setLoadStep(s => {
        if (s >= LOAD_STEPS) { clearInterval(id); return s }
        return s + 1
      })
    }, LOAD_INTERVAL)
    return () => clearInterval(id)
  }, [phase])

  // loading done → ready
  useEffect(() => {
    if (phase !== 'loading' || loadStep < LOAD_STEPS) return
    const t = setTimeout(() => setPhase('ready'), 120)
    return () => clearTimeout(t)
  }, [phase, loadStep])

  const progress = Math.round((loadStep / LOAD_STEPS) * 100)
  const filled = Math.round(loadStep / LOAD_STEPS * BAR_CHARS)
  const loadBar = '█'.repeat(filled) + '░'.repeat(BAR_CHARS - filled)

  const drag1 = useDraggable()
  const drag2 = useDraggable()
  const resize1 = useResizable(300, 120)
  const resize2 = useResizable(200, 120)

  return (
    <section className="section-container pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="grid lg:grid-cols-[1.7fr_0.85fr] gap-12 lg:gap-16 items-center">

        {/* ── Terminal principal ── */}
        <div style={drag1.dragStyle}>
          <div
            ref={resize1.containerRef}
            style={{
              ...resize1.sizeStyle,
              display: 'flex',
              flexDirection: 'column',
            }}
            className="terminal-window"
          >
            <div
              className="terminal-bar"
              onMouseDown={drag1.onMouseDown}
              style={{ cursor: 'grab', flexShrink: 0 }}
            >
              <span className="terminal-dot" style={{ background: '#f5b340' }} />
              <span className="terminal-dot" style={{ background: '#59e9a5' }} />
              <span className="terminal-dot" style={{ background: '#4cc9d6' }} />
              <span className="ml-2 text-xs text-faint">alexis@portfolio: ~</span>
            </div>

            <div
              className="p-2 md:p-4 text-sm leading-relaxed overflow-y-auto"
              style={{ flex: 1 }}
            >
              {/* comando */}
              <p className="text-muted">
                <span className="prompt" />
                <span className="text-fg">{typed}</span>
                {phase === 'typing' && <span className="cursor" />}
              </p>

              {/* barra de carga */}
              {phase !== 'typing' && (
                <p className="mt-2 font-mono text-sm">
                  <span className="text-faint">[</span>
                  <span className="text-green">{loadBar}</span>
                  <span className="text-faint">]</span>
                  <span className="text-muted ml-2">{progress}%</span>
                  {phase === 'ready' && (
                    <span className="text-green ml-2">— profile loaded</span>
                  )}
                </p>
              )}

              {/* contenido — siempre en el DOM para fijar el tamaño */}
              <motion.div
                initial="hidden"
                animate={phase === 'ready' ? 'show' : 'hidden'}
                variants={{ show: { transition: { staggerChildren: 0.12 } } }}
                className="mt-6 space-y-5"
                style={{ pointerEvents: phase !== 'ready' ? 'none' : undefined }}
              >
                <Line>
                  <p className="kbd-label text-green">{'// identity'}</p>
                  <h1 className="mt-2 glow text-green">Alexis López</h1>
                  <p className="mt-2 text-lg md:text-xl text-fg">
                    Senior Full-Stack Engineer
                    <span className="blink-cursor" />
                  </p>
                </Line>

                <Line>
                  <p className="text-muted max-w-xl">
                    Diseño y construyo <span className="text-fg">sistemas web escalables</span> de
                    punta a punta. Me obsesiona la <span className="text-amber">arquitectura limpia</span>,
                    la performance y el código. · .NET · SQL · Node.js · React ·
                  </p>
                </Line>

                <Line>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <Link href="/proyectos" className="btn-primary">
                      ./ver-proyectos
                      <FaArrowRight size={12} />
                    </Link>
                    <a
                      href="/CVAlexisLopez.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <FaFileDownload size={13} />
                      cat CV.pdf
                    </a>
                  </div>
                </Line>

                <Line>
                  <div className="flex gap-7 pt-4 border-t border-line">
                    {stats.map((s) => (
                      <div key={s.label}>
                        <p className="text-2xl font-bold text-green glow">{s.value}</p>
                        <p className="text-[0.7rem] text-muted mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </Line>
              </motion.div>
            </div>

            <ResizeHandle onMouseDown={resize1.onResizeStart} />
          </div>
        </div>

        {/* ── Terminal foto ── */}
        <div style={drag2.dragStyle}>
          <motion.div
            ref={resize2.containerRef}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
            className="hidden lg:flex lg:flex-col terminal-window"
            style={resize2.sizeStyle}
          >
            <div
              className="terminal-bar"
              onMouseDown={drag2.onMouseDown}
              style={{ cursor: 'grab', flexShrink: 0 }}
            >
              <span className="terminal-dot" style={{ background: '#f5b340' }} />
              <span className="terminal-dot" style={{ background: '#59e9a5' }} />
              <span className="terminal-dot" style={{ background: '#4cc9d6' }} />
              <span className="ml-2 text-xs text-faint">~/foto.png</span>
            </div>
            <div className="p-2 flex-1 overflow-hidden">
              <div className="relative h-full min-h-[200px] rounded-md overflow-hidden">
                <Image
                  src="/FotoPerfil.png"
                  alt="Alexis López"
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent 55%, rgba(8,11,12,0.65) 100%)',
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
                  style={{
                    background: 'repeating-linear-gradient(to bottom, transparent 0 2px, rgba(89,233,165,0.15) 2px 3px)',
                  }}
                />
                <p className="absolute bottom-3 left-3 text-[0.7rem] text-green prompt-arrow">
                  online · Buenos Aires
                </p>
              </div>
            </div>
            <ResizeHandle onMouseDown={resize2.onResizeStart} />
          </motion.div>
        </div>

      </div>
    </section>
  )
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
    >
      {children}
    </motion.div>
  )
}
