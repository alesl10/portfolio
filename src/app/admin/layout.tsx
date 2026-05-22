import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const secret = process.env.ADMIN_SECRET
  const store = await cookies()
  const hasValidToken = !!secret && store.get('admin_token')?.value === secret
  if (!hasValidToken) notFound()

  const tabs = [
    { href: '/admin/proyectos', label: 'proyectos' },
    { href: '/admin/skills', label: 'skills' },
    { href: '/admin/experiencia', label: 'experiencia' },
  ]

  return (
    <div className="section-container py-10 space-y-6">
      <div className="terminal-window">
        <div className="terminal-bar">
          <span className="terminal-dot" style={{ background: '#f5b340' }} />
          <span className="terminal-dot" style={{ background: '#59e9a5' }} />
          <span className="terminal-dot" style={{ background: '#4cc9d6' }} />
          <span className="ml-2 text-[0.7rem] text-faint">sudo ./admin --dev</span>
        </div>
        <div className="p-5">
          <h1 className="text-2xl font-bold text-amber glow-amber">root@backoffice</h1>
          <p className="text-muted text-xs mt-2">
            <span className="text-green">●</span> development only · {process.env.NODE_ENV} mode
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {tabs.map((t) => (
              <Link key={t.href} href={t.href} className="btn-secondary text-xs">
                /{t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}
