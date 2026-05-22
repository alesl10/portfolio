'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const links = [
  { href: '/', label: 'home' },
  { href: '/proyectos', label: 'proyectos' },
  { href: '/contacto', label: 'contacto' },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-30 border-b border-line bg-base/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Window dots + path */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:flex items-center gap-2">
            <span className="terminal-dot" style={{ background: '#f5b340' }} />
            <span className="terminal-dot" style={{ background: '#59e9a5' }} />
            <span className="terminal-dot" style={{ background: '#4cc9d6' }} />
          </div>
          <Link href="/" className="text-sm text-muted hover:text-green transition-colors truncate">
            <span className="text-green">~/</span>alexis-lopez
            <span className="text-faint">.dev</span>
          </Link>
        </div>

        {/* Nav */}
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`px-2.5 py-1 rounded text-[0.82rem] transition-colors ${active
                    ? 'text-green'
                    : 'text-muted hover:text-fg'
                  }`}
              >
                <span className={active ? 'text-green' : 'text-faint'}>/</span>
                {label}
              </Link>
            )
          })}

          <span className="w-px h-4 bg-line mx-1 sm:mx-2" />
          <a
            href="https://github.com/alesl10"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-green transition-colors p-1.5"
            aria-label="GitHub"
          >
            <FaGithub size={17} />
          </a>
          <a
            href="https://linkedin.com/in/alexislopezdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-green transition-colors p-1.5"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={17} />
          </a>
        </div>
      </div>
    </nav>
  )
}
