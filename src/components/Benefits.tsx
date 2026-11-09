import { Workflow, TriangleAlert, MonitorPlay, PanelsTopLeft, ShieldCheck, BookOpen } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const benefits = [
  { icon: Workflow, title: 'Comprender procesos industriales mediante simulación', text: 'Visualiza cómo interactúan máquinas, sensores y eventos en una línea productiva.' },
  { icon: TriangleAlert, title: 'Explorar escenarios de fallos', text: 'Reproduce incidencias a partir de un catálogo estructurado de alarmas sin afectar a una planta real.' },
  { icon: MonitorPlay, title: 'Facilitar demostraciones de monitorización', text: 'Presenta de forma clara el estado de una planta ante equipos técnicos y de negocio.' },
  { icon: PanelsTopLeft, title: 'Probar interfaces de supervisión', text: 'Valida diseños de paneles y flujos de trabajo con datos coherentes.' },
  { icon: ShieldCheck, title: 'Analizar la gestión de alarmas', text: 'Estudia la activación, el seguimiento y la resolución de incidencias.' },
  { icon: BookOpen, title: 'Facilitar el aprendizaje tecnológico', text: 'Un entorno controlado para formarse en automatización e Industria 4.0.' },
]

export default function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand/20 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="benefits-title" eyebrow="Beneficios potenciales" title="Nuevas posibilidades para explorar la planta" />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 60} className="h-full">
              <article className="group h-full bg-navy-800 p-8 transition-colors duration-300 hover:bg-navy-700">
                <b.icon className="mb-5 h-8 w-8 text-electric transition-colors group-hover:text-industrial" aria-hidden="true" />
                <h3 className="text-lg font-semibold leading-snug text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">{b.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
