import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-[2] border-t border-line mt-24 bg-panel/40">
      {/* status bar */}
      <div className="max-w-6xl mx-auto px-6 h-9 flex items-center justify-between text-[0.72rem] text-faint">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-green">
            <span className="w-1.5 h-1.5 rounded-full bg-green inline-block" style={{ boxShadow: '0 0 8px #59e9a5' }} />
            main
          </span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline">LF</span>
          <span>TypeScript</span>
        </div>
        <div className="flex items-center gap-4">
          <span>build: passing</span>
          <span className="hidden sm:inline">ln 1, col 1</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-line">
        <p className="text-xs text-muted">
          <span className="text-faint">{'// '}</span>
          © {currentYear} Alexis López — built from scratch
        </p>
        <div className="flex gap-4 items-center">
          <a
            href="https://github.com/alesl10"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-green transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={17} />
          </a>
          <a
            href="https://linkedin.com/in/alexis-lopez-desarrollador-front-end"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-green transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}
