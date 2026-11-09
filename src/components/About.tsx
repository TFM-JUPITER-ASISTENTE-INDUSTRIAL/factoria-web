import { Factory, Activity, BellRing, Building2, Cpu, GraduationCap, Lightbulb } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const pillars = [
  { icon: Factory, title: 'Simulación industrial', text: 'Representación de procesos y máquinas de una planta productiva.' },
  { icon: Activity, title: 'Monitorización', text: 'Consulta estructurada de información y estados simulados.' },
  { icon: BellRing, title: 'Gestión de alarmas', text: 'Registro, seguimiento y resolución de incidencias simuladas.' },
]

const audiences = [
  { icon: Building2, title: 'Empresas industriales', text: 'Interesadas en explorar soluciones digitales para sus procesos productivos.' },
  { icon: Cpu, title: 'Departamentos técnicos y de automatización', text: 'Que quieran probar interfaces de supervisión y flujos de alarmas.' },
  { icon: GraduationCap, title: 'Centros de formación técnica', text: 'Que necesiten un entorno controlado para enseñar procesos industriales.' },
  { icon: Lightbulb, title: 'Equipos de ingeniería e innovación', text: 'Que exploren nuevas ideas de monitorización e integración.' },
]

export default function About() {
  return (
    <>
      {/* 5.2 — ¿Qué es FactorIA? */}
      <section id="factoria" aria-labelledby="about-title" className="relative bg-white py-24 text-navy sm:py-32">
        <div className="absolute inset-0 bg-grid-light [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="about-title" tone="light" eyebrow="¿Qué es FactorIA?" title="Simulación y supervisión al alcance de la industria" />
          <Reveal className="mx-auto mb-16 max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-slate-600 sm:text-xl">
              FactorIA nace con el objetivo de acercar la tecnología de simulación y supervisión a los entornos industriales. Nuestra plataforma permite
              representar máquinas, sensores y eventos de una planta productiva en un entorno controlado, facilitando la exploración de procesos industriales y el
              desarrollo de nuevas soluciones tecnológicas.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
                  <span className="absolute right-6 top-6 font-mono text-sm text-slate-300" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-electric text-white shadow-lg shadow-brand/30">
                    <p.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{p.text}</p>
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-electric transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5.3 — ¿A quién se dirige? */}
      <section aria-labelledby="audience-title" className="bg-slate-50 py-24 text-navy sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="audience-title"
            tone="light"
            eyebrow="¿A quién se dirige?"
            title="Pensado para quienes impulsan la transformación industrial"
            subtitle="Posibles destinatarios y aplicaciones de la tecnología de FactorIA."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <article className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-electric transition-colors group-hover:bg-industrial group-hover:text-white">
                    <a.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold leading-snug">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{a.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
