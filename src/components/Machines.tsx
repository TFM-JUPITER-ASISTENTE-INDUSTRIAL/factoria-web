import { useEffect, useRef, useState } from 'react'
import { ArrowRight, X, Radio, TriangleAlert, Cpu } from 'lucide-react'
import { machines, type Machine } from '../config/machines'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import MachineIllustration from './ui/MachineIllustration'

function MachineVisual({ m, className }: { m: Machine; className?: string }) {
  return m.image ? (
    <img src={m.image} alt={`Máquina ${m.name}`} loading="lazy" className={`h-full w-full object-cover ${className ?? ''}`} />
  ) : (
    <MachineIllustration machine={m.key} className={className} />
  )
}

function MachineDialog({ machine, onClose }: { machine: Machine | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (machine && !d.open) d.showModal()
    if (!machine && d.open) d.close()
  }, [machine])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="machine-dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl border border-white/10 bg-navy-800 p-0 text-white shadow-2xl backdrop:bg-navy/80 backdrop:backdrop-blur-sm"
    >
      {machine && (
        <div className="fade-in">
          <div className="relative aspect-[240/112] w-full border-b border-white/10 bg-navy bg-grid">
            <MachineVisual m={machine} className="h-full w-full p-6" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy/80 text-steel hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="max-h-[55vh] overflow-y-auto p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-electric">{machine.externalId}</p>
            <h3 id="machine-dialog-title" className="mt-1 text-2xl font-bold">
              {machine.name}
            </h3>
            <p className="mt-1 font-medium text-industrial">{machine.function}</p>
            <p className="mt-4 leading-relaxed text-steel">{machine.summary}</p>

            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: 'PLC', v: 1 },
                { k: 'Sensores agrupados', v: machine.sensors },
                { k: 'Definiciones de alarma', v: machine.definitions },
                { k: 'Críticas / Error', v: `${machine.severity.critical} / ${machine.severity.error}` },
              ].map((s) => (
                <div key={s.k} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <dt className="text-xs text-steel">{s.k}</dt>
                  <dd className="mt-1 text-xl font-bold">{s.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold"><Cpu className="h-4 w-4 text-electric" aria-hidden="true" /> Componentes principales</h4>
                <ul className="space-y-1.5 text-sm text-steel">
                  {machine.components.map((c) => (
                    <li key={c} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-electric" aria-hidden="true" />{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold"><TriangleAlert className="h-4 w-4 text-industrial" aria-hidden="true" /> Ejemplos del catálogo de alarmas</h4>
                <ul className="space-y-1.5 text-sm text-steel">
                  {machine.sampleAlarms.map((c) => (
                    <li key={c} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-industrial" aria-hidden="true" />{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <h4 className="mb-2 mt-6 flex items-center gap-2 text-sm font-semibold"><Radio className="h-4 w-4 text-electric" aria-hidden="true" /> Algunos tipos de sensor</h4>
            <div className="flex flex-wrap gap-2">
              {machine.sensorTypes.map((t) => (
                <span key={t} className="rounded-md border border-electric/20 bg-electric/10 px-2 py-1 font-mono text-[11px] text-electric">{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}

export default function Machines() {
  const [selected, setSelected] = useState<Machine | null>(null)

  return (
    <section id="tecnologia" aria-labelledby="machines-title" className="relative bg-slate-50 py-24 text-navy sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="machines-title"
          tone="light"
          eyebrow="Nuestra planta industrial"
          title="Conoce el entorno industrial de FactorIA"
          subtitle="Cinco máquinas de una línea de envasado, cada una con su PLC, sus sensores agrupados y su propio catálogo de alarmas."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {machines.map((m, i) => (
            <Reveal key={m.key} delay={i * 80} className={i === 3 ? 'lg:col-start-1 lg:col-end-2 lg:translate-x-1/2' : i === 4 ? 'lg:translate-x-1/2' : ''}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10">
                <div className="relative aspect-[240/112] overflow-hidden bg-navy">
                  <div className="absolute inset-0 bg-grid" aria-hidden="true" />
                  <MachineVisual m={m} className="relative h-full w-full p-4 transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-md bg-navy/80 px-2 py-1 font-mono text-[10px] tracking-wider text-electric">{m.externalId}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold">{m.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand">{m.function}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{m.summary}</p>
                  <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <span><strong className="text-base text-navy">{m.sensors}</strong> sensores</span>
                    <span><strong className="text-base text-navy">{m.definitions}</strong> alarmas</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(m)}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-navy/10 bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand"
                    aria-haspopup="dialog"
                  >
                    Más información <span className="sr-only">sobre {m.name}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <MachineDialog machine={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
