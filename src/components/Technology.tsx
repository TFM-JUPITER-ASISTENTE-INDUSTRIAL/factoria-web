import { Code, Zap, Database, Layers, Container, Network, ArrowUpRight } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import GithubIcon from './ui/GithubIcon'
import { site } from '../config/site'

const techs = [
  { icon: Code, name: 'Python', text: 'Lenguaje principal del simulador: modela máquinas, PLC, sensores y alarmas con una arquitectura por capas.' },
  { icon: Zap, name: 'FastAPI', text: 'Expone la API REST para consultar máquinas, el catálogo de fallos y las ocurrencias de alarma.' },
  { icon: Database, name: 'PostgreSQL', text: 'Persiste el estado de la planta y el histórico de alarmas activas y resueltas.' },
  { icon: Layers, name: 'SQLAlchemy', text: 'Mapea las entidades del dominio a tablas relacionales; Alembic versiona el esquema.' },
  { icon: Container, name: 'Docker', text: 'Docker Compose levanta la base de datos, el simulador y la API con un solo comando.' },
  { icon: Network, name: 'API REST', text: 'Endpoints para consultar el estado de la planta y resolver alarmas de forma estructurada.' },
]

export default function Technology() {
  return (
    <section id="stack" aria-labelledby="tech-title" className="bg-white py-24 text-navy sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="tech-title"
          tone="light"
          eyebrow="Tecnología del proyecto"
          title="Un núcleo tecnológico modular y abierto"
          subtitle="El sistema original de FactorIA está construido con tecnologías robustas y de código abierto, preparado para evolucionar hacia nuevas funcionalidades de supervisión e integración industrial."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {techs.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <article className="group flex h-full gap-4 rounded-2xl border border-slate-200 p-6 transition duration-300 hover:border-brand/40 hover:bg-slate-50">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <t.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{t.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{t.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-navy px-6 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-navy-700"
          >
            <GithubIcon />
            Explorar el proyecto en GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
