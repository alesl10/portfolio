import { Metadata } from 'next'
import { FaWhatsapp, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import ContactForm from '@/components/contacto/ContactForm'

export const metadata: Metadata = {
  title: 'Contacto | Alexis López',
  description: 'Ponte en contacto para proyectos, roles o colaboraciones.',
}

const contacts = [
  { icon: FaWhatsapp, label: 'whatsapp', value: '+54 11 3762-3836', href: 'https://wa.me/5491137623836' },
  { icon: FaLinkedin, label: 'linkedin', value: 'Alexis López', href: 'https://linkedin.com/in/alexislopezdev' },
  { icon: FaGithub, label: 'github', value: 'github.com/alesl10', href: 'https://github.com/alesl10' },
  { icon: FaEnvelope, label: 'email', value: 'lopezalexis499@gmail.com', href: 'mailto:lopezalexis499@gmail.com' },
]

export default function ContactoPage() {
  return (
    <div className="section-container py-16 md:py-20">
      <div className="mb-12">
        <p className="kbd-label text-green mb-2">{'// contact'}</p>
        <h1 className="glow text-green">./contacto</h1>
        <p className="text-muted  mt-3">
          <span className="prompt" />
          <span className="text-fg">echo &quot;¿trabajamos juntos?&quot;</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <ContactForm />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted mb-5 prompt">
            <span className="text-fg">cat ./channels</span>
          </p>
          {contacts.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="card flex items-center gap-4 p-4 hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-lg border border-line bg-[rgba(89,233,165,0.05)] flex items-center justify-center shrink-0 group-hover:border-line-strong transition-colors">
                <Icon size={17} className="text-green" />
              </div>
              <div>
                <p className="text-sm font-semibold text-fg group-hover:text-green transition-colors">
                  {label}
                </p>
                <p className="text-xs text-muted mt-0.5">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
