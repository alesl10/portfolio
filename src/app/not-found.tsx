import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="section-container min-h-[70vh] flex items-center justify-center py-16">
      <div className="terminal-window w-full max-w-xl">
        <div className="terminal-bar">
          <span className="terminal-dot" style={{ background: '#f5b340' }} />
          <span className="terminal-dot" style={{ background: '#59e9a5' }} />
          <span className="terminal-dot" style={{ background: '#4cc9d6' }} />
          <span className="ml-2 text-[0.7rem] text-faint">bash — error</span>
        </div>
        <div className="p-6 md:p-8 text-sm space-y-4">
          <p className="text-muted prompt">
            <span className="text-fg">cd ./pagina-solicitada</span>
          </p>
          <p className="text-amber">
            bash: cd: no such file or directory
          </p>
          <p className="text-7xl md:text-8xl font-bold glow text-green py-2">404</p>
          <p className="text-muted">
            La ruta que buscás no existe o fue movida.
          </p>
          <Link href="/" className="btn-primary inline-flex">
            cd ~
          </Link>
        </div>
      </div>
    </div>
  )
}
