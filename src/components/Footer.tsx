import Logo from './ui/Logo'
import GithubIcon from './ui/GithubIcon'
import { navLinks, site } from '../config/site'

const legalItems = [
  { label: 'Aviso legal', url: site.legal.avisoLegalUrl },
  { label: 'Política de privacidad', url: site.legal.privacidadUrl },
  { label: 'Política de cookies', url: site.legal.cookiesUrl },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-900 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-steel">
              <strong className="font-semibold text-white">FactorIA:</strong> {site.slogan}.
            </p>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-steel transition hover:border-white/30 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" /> GitHub
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
          </div>
          <nav aria-label="Navegación del pie">
            <h2 className="mb-4 text-sm font-semibold text-white">Navegación</h2>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-steel transition hover:text-electric">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="mb-4 text-sm font-semibold text-white">Legal</h2>
            <ul className="space-y-2.5 text-sm">
              {legalItems.map((l) => (
                <li key={l.label}>
                  {l.url ? (
                    <a href={l.url} className="text-steel transition hover:text-electric">{l.label}</a>
                  ) : (
                    <span className="text-steel/60">{l.label} <span className="text-xs">(próximamente)</span></span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-steel/70 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} FactorIA. Todos los derechos reservados.</p>
          <p>Los anuncios se reproducen mediante el reproductor oficial de YouTube.</p>
        </div>
      </div>
    </footer>
  )
}
