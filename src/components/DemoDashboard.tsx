import { useMemo, useState } from 'react'
import {
  LayoutDashboard,
  Factory,
  BellRing,
  CircleCheck,
  OctagonAlert,
  TriangleAlert,
  RotateCcw,
  FlaskConical,
  ChevronRight,
  Clock,
  Radio,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import MachineIllustration from './ui/MachineIllustration'
import { machines, type MachineKey } from '../config/machines'
import { demoAlarms, demoEventTimeline, type DemoAlarm, type Severity } from '../config/demoData'

type View = 'resumen' | 'maquinas' | 'alarmas'
type Filter = 'ALL' | 'ACTIVE' | 'SOLVED'

const machineName = (k: MachineKey) => machines.find((m) => m.key === k)!.name
const nowTime = () => new Date().toLocaleTimeString('es-ES', { hour12: false })

function SeverityBadge({ s }: { s: Severity }) {
  return s === 'CRITICAL_ERROR' ? (
    <span className="inline-flex items-center gap-1 rounded-md bg-red-500/15 px-2 py-0.5 text-[11px] font-semibold text-red-300">
      <OctagonAlert className="h-3 w-3" aria-hidden="true" /> Crítica
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-md bg-industrial/15 px-2 py-0.5 text-[11px] font-semibold text-industrial">
      <TriangleAlert className="h-3 w-3" aria-hidden="true" /> Error
    </span>
  )
}

function StatusBadge({ alarm }: { alarm: DemoAlarm }) {
  return alarm.status === 'ACTIVE' ? (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-industrial">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-industrial opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-industrial" />
      </span>
      Activa
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
      <CircleCheck className="h-3 w-3" aria-hidden="true" /> Resuelta
    </span>
  )
}

function Kpi({ label, value, icon: Icon, tone }: { label: string; value: string | number; icon: typeof Factory; tone: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-steel">{label}</p>
        <Icon className={`h-4 w-4 ${tone}`} aria-hidden="true" />
      </div>
      <p className="mt-2 text-3xl font-bold tabular-nums text-white">{value}</p>
    </div>
  )
}

/** Gráfico de barras agrupadas (SVG puro, sin librerías). */
function EventChart() {
  const max = Math.max(...demoEventTimeline.flatMap((d) => [d.activated, d.solved]))
  const W = 560
  const H = 180
  const pad = { l: 24, b: 24, t: 8 }
  const slot = (W - pad.l) / demoEventTimeline.length
  const bw = Math.min(12, slot / 3)
  const y = (v: number) => H - pad.b - (v / max) * (H - pad.b - pad.t)
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Gráfico de eventos simulados: alarmas activadas y resueltas cada 5 minutos">
        {[0, Math.round(max / 2), max].map((v) => (
          <g key={v}>
            <line x1={pad.l} x2={W} y1={y(v)} y2={y(v)} stroke="#CBD5E1" strokeOpacity=".1" />
            <text x={pad.l - 6} y={y(v) + 3} fontSize="9" fill="#CBD5E1" fillOpacity=".6" textAnchor="end">{v}</text>
          </g>
        ))}
        {demoEventTimeline.map((d, i) => {
          const cx = pad.l + slot * i + slot / 2
          return (
            <g key={d.label}>
              <rect x={cx - bw - 1} y={y(d.activated)} width={bw} height={H - pad.b - y(d.activated)} rx="2" fill="#FF8A00">
                <title>{`${d.label}: ${d.activated} activadas`}</title>
              </rect>
              <rect x={cx + 1} y={y(d.solved)} width={bw} height={H - pad.b - y(d.solved)} rx="2" fill="#00D4FF">
                <title>{`${d.label}: ${d.solved} resueltas`}</title>
              </rect>
              {i % 2 === 0 && (
                <text x={cx} y={H - 8} fontSize="9" fill="#CBD5E1" fillOpacity=".6" textAnchor="middle">{d.label}</text>
              )}
            </g>
          )
        })}
      </svg>
      <figcaption className="mt-2 flex gap-4 text-xs text-steel">
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-industrial" aria-hidden="true" />Activadas</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-electric" aria-hidden="true" />Resueltas</span>
      </figcaption>
    </figure>
  )
}

function Distribution({ alarms }: { alarms: DemoAlarm[] }) {
  const rows = machines.map((m) => ({
    m,
    active: alarms.filter((a) => a.machine === m.key && a.status === 'ACTIVE').length,
    solved: alarms.filter((a) => a.machine === m.key && a.status === 'SOLVED').length,
  }))
  const max = Math.max(...rows.map((r) => r.active + r.solved), 1)
  return (
    <ul className="space-y-3">
      {rows.map(({ m, active, solved }) => (
        <li key={m.key}>
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-white">{m.name}</span>
            <span className="tabular-nums text-steel">{active} activas · {solved} resueltas</span>
          </div>
          <div className="flex h-2.5 overflow-hidden rounded-full bg-white/5" role="presentation">
            <div className="bg-industrial transition-all duration-500" style={{ width: `${(active / max) * 100}%` }} />
            <div className="bg-electric/70 transition-all duration-500" style={{ width: `${(solved / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

function Panel({ title, children, className = '', action }: { title: string; children: React.ReactNode; className?: string; action?: React.ReactNode }) {
  return (
    <section className={`rounded-xl border border-white/10 bg-navy-800/70 p-4 sm:p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        {action}
      </div>
      {children}
    </section>
  )
}

export default function DemoDashboard() {
  const [alarms, setAlarms] = useState<DemoAlarm[]>(demoAlarms)
  const [view, setView] = useState<View>('resumen')
  const [machine, setMachine] = useState<MachineKey>('denester')
  const [filter, setFilter] = useState<Filter>('ACTIVE')
  const [selectedAlarm, setSelectedAlarm] = useState<number | null>(demoAlarms[0].id)

  const active = alarms.filter((a) => a.status === 'ACTIVE')
  const solved = alarms.filter((a) => a.status === 'SOLVED')
  const machineStatus = (k: MachineKey) => {
    const act = active.filter((a) => a.machine === k)
    if (act.some((a) => a.severity === 'CRITICAL_ERROR')) return 'critical'
    if (act.length) return 'warning'
    return 'online'
  }
  const online = machines.filter((m) => machineStatus(m.key) === 'online').length

  const filtered = useMemo(() => alarms.filter((a) => filter === 'ALL' || a.status === filter), [alarms, filter])
  const current = alarms.find((a) => a.id === selectedAlarm) ?? null
  const currentMachine = machines.find((m) => m.key === machine)!

  const resolve = (id: number) =>
    setAlarms((list) => list.map((a) => (a.id === id ? { ...a, status: 'SOLVED', resolvedAt: nowTime() } : a)))
  const reset = () => {
    setAlarms(demoAlarms)
    setSelectedAlarm(demoAlarms[0].id)
  }
  const openMachine = (k: MachineKey) => {
    setMachine(k)
    setView('maquinas')
  }
  const openAlarm = (id: number) => {
    setSelectedAlarm(id)
    if (view !== 'alarmas') {
      setFilter('ALL')
      setView('alarmas')
    }
  }

  const statusStyle = {
    online: { label: 'Operativa', dot: 'bg-emerald-400', ring: 'border-emerald-400/30' },
    warning: { label: 'Con avisos', dot: 'bg-industrial', ring: 'border-industrial/40' },
    critical: { label: 'Alarma crítica', dot: 'bg-red-400', ring: 'border-red-400/40' },
  } as const

  const tabs: { id: View; label: string; icon: typeof Factory }[] = [
    { id: 'resumen', label: 'Resumen', icon: LayoutDashboard },
    { id: 'maquinas', label: 'Máquinas', icon: Factory },
    { id: 'alarmas', label: 'Alarmas', icon: BellRing },
  ]

  const AlarmRow = ({ a }: { a: DemoAlarm }) => (
    <li>
      <button
        type="button"
        onClick={() => openAlarm(a.id)}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-white/5 ${
          view === 'alarmas' && selectedAlarm === a.id ? 'bg-brand/15 ring-1 ring-brand/50' : ''
        }`}
      >
        <span className={`h-8 w-1 shrink-0 rounded-full ${a.severity === 'CRITICAL_ERROR' ? 'bg-red-400' : 'bg-industrial'} ${a.status === 'SOLVED' ? 'opacity-30' : ''}`} aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-white">{a.name}</span>
          <span className="block font-mono text-[11px] text-steel">{a.code} · {machineName(a.machine)} · {a.triggeredAt}</span>
        </span>
        <StatusBadge alarm={a} />
      </button>
    </li>
  )

  return (
    <section id="demo" aria-labelledby="demo-title" className="relative overflow-hidden bg-navy-900 py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <div className="absolute left-1/2 top-40 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand/15 blur-[140px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="demo-title" eyebrow="Dashboard de demostración" title="Explora FactorIA" subtitle="Una demostración interactiva del entorno de monitorización industrial." />

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy shadow-2xl shadow-black/40">
            {/* Barra superior */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-navy-800 px-4 py-3">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
              </div>
              <p className="inline-flex items-center gap-2 rounded-md border border-industrial/50 bg-industrial/15 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-industrial sm:text-xs">
                <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
                DEMO INTERACTIVA — DATOS SIMULADOS
              </p>
              <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-steel hover:bg-white/5 hover:text-white">
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Restablecer
              </button>
            </div>

            {/* Pestañas */}
            <div role="tablist" aria-label="Pantallas del dashboard" className="flex gap-1 overflow-x-auto border-b border-white/10 px-3 pt-3">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={view === t.id}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => setView(t.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                    view === t.id ? 'border-electric bg-white/5 text-white' : 'border-transparent text-steel hover:text-white'
                  }`}
                >
                  <t.icon className="h-4 w-4" aria-hidden="true" />
                  {t.label}
                  {t.id === 'alarmas' && active.length > 0 && (
                    <span className="rounded-full bg-industrial px-1.5 text-[10px] font-bold text-navy">{active.length}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6" role="tabpanel" id={`panel-${view}`} aria-labelledby={`tab-${view}`}>
              {/* ───────── RESUMEN ───────── */}
              {view === 'resumen' && (
                <div className="fade-in space-y-4">
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    <Kpi label="Máquinas operativas" value={`${online}/${machines.length}`} icon={Factory} tone="text-emerald-400" />
                    <Kpi label="Alarmas activas" value={active.length} icon={BellRing} tone="text-industrial" />
                    <Kpi label="Alarmas resueltas" value={solved.length} icon={CircleCheck} tone="text-electric" />
                    <Kpi label="Críticas activas" value={active.filter((a) => a.severity === 'CRITICAL_ERROR').length} icon={OctagonAlert} tone="text-red-400" />
                  </div>

                  <Panel title="Estado de las máquinas">
                    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                      {machines.map((m) => {
                        const st = statusStyle[machineStatus(m.key)]
                        return (
                          <li key={m.key}>
                            <button
                              type="button"
                              onClick={() => openMachine(m.key)}
                              className={`group w-full rounded-lg border ${st.ring} bg-white/[0.03] p-3 text-left transition hover:bg-white/[0.07]`}
                            >
                              <span className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${st.dot}`} aria-hidden="true" />
                                <span className="text-sm font-semibold text-white">{m.name}</span>
                              </span>
                              <span className="mt-1 flex items-center justify-between text-xs text-steel">
                                {st.label}
                                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                              </span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </Panel>

                  <div className="grid gap-4 lg:grid-cols-5">
                    <Panel title="Eventos de alarma (últimos 60 min)" className="lg:col-span-3">
                      <EventChart />
                    </Panel>
                    <Panel title="Distribución por máquina" className="lg:col-span-2">
                      <Distribution alarms={alarms} />
                    </Panel>
                  </div>

                  <Panel
                    title="Últimas incidencias"
                    action={
                      <button type="button" onClick={() => setView('alarmas')} className="text-xs font-medium text-electric hover:underline">
                        Ver todas
                      </button>
                    }
                  >
                    <ul className="space-y-1">
                      {alarms.slice(0, 5).map((a) => (
                        <AlarmRow key={a.id} a={a} />
                      ))}
                    </ul>
                  </Panel>
                </div>
              )}

              {/* ───────── MÁQUINAS ───────── */}
              {view === 'maquinas' && (
                <div className="fade-in grid gap-4 lg:grid-cols-[260px_1fr]">
                  <nav aria-label="Seleccionar máquina">
                    <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
                      {machines.map((m) => {
                        const st = statusStyle[machineStatus(m.key)]
                        return (
                          <li key={m.key} className="shrink-0">
                            <button
                              type="button"
                              onClick={() => setMachine(m.key)}
                              aria-pressed={machine === m.key}
                              className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
                                machine === m.key ? 'border-brand bg-brand/15 text-white' : 'border-white/10 text-steel hover:bg-white/5 hover:text-white'
                              }`}
                            >
                              <span className={`h-2 w-2 rounded-full ${st.dot}`} aria-hidden="true" />
                              <span className="text-sm font-medium">{m.name}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </nav>

                  <div key={machine} className="fade-in space-y-4">
                    <Panel title={`${currentMachine.name} · ${currentMachine.externalId}`}>
                      <div className="grid gap-5 md:grid-cols-[1fr_1.2fr]">
                        <div className="rounded-lg border border-white/10 bg-navy bg-grid p-3">
                          <MachineIllustration machine={machine} className="h-auto w-full" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-industrial">{currentMachine.function}</p>
                          <p className="mt-2 text-sm leading-relaxed text-steel">{currentMachine.summary}</p>
                          <dl className="mt-4 grid grid-cols-3 gap-2">
                            {[
                              { k: 'Estado', v: statusStyle[machineStatus(machine)].label },
                              { k: 'Sensores', v: currentMachine.sensors },
                              { k: 'Definiciones', v: currentMachine.definitions },
                            ].map((d) => (
                              <div key={d.k} className="rounded-lg bg-white/[0.04] p-2.5">
                                <dt className="text-[11px] text-steel">{d.k}</dt>
                                <dd className="mt-0.5 text-sm font-semibold text-white">{d.v}</dd>
                              </div>
                            ))}
                          </dl>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {currentMachine.sensorTypes.map((t) => (
                              <span key={t} className="inline-flex items-center gap-1 rounded bg-electric/10 px-1.5 py-0.5 font-mono text-[10px] text-electric">
                                <Radio className="h-2.5 w-2.5" aria-hidden="true" />{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Panel>
                    <Panel title="Alarmas de esta máquina (simuladas)">
                      {alarms.filter((a) => a.machine === machine).length ? (
                        <ul className="space-y-1">
                          {alarms.filter((a) => a.machine === machine).map((a) => (
                            <AlarmRow key={a.id} a={a} />
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-steel">Sin incidencias registradas en esta simulación.</p>
                      )}
                    </Panel>
                  </div>
                </div>
              )}

              {/* ───────── ALARMAS ───────── */}
              {view === 'alarmas' && (
                <div className="fade-in grid gap-4 lg:grid-cols-[1.3fr_1fr]">
                  <Panel
                    title="Listado de incidencias"
                    action={
                      <div role="group" aria-label="Filtrar alarmas por estado" className="flex rounded-lg bg-white/5 p-0.5">
                        {(
                          [
                            ['ACTIVE', `Activas (${active.length})`],
                            ['SOLVED', `Resueltas (${solved.length})`],
                            ['ALL', 'Todas'],
                          ] as [Filter, string][]
                        ).map(([f, label]) => (
                          <button
                            key={f}
                            type="button"
                            aria-pressed={filter === f}
                            onClick={() => setFilter(f)}
                            className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${filter === f ? 'bg-brand text-white' : 'text-steel hover:text-white'}`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    }
                  >
                    {filtered.length ? (
                      <ul className="max-h-[440px] space-y-1 overflow-y-auto pr-1">
                        {filtered.map((a) => (
                          <AlarmRow key={a.id} a={a} />
                        ))}
                      </ul>
                    ) : (
                      <p className="py-8 text-center text-sm text-steel">No hay alarmas con este filtro. ¡Planta sin incidencias activas!</p>
                    )}
                  </Panel>

                  <Panel title="Detalle de la incidencia">
                    {current ? (
                      <div key={current.id} className="fade-in" aria-live="polite">
                        <div className="flex flex-wrap items-center gap-2">
                          <SeverityBadge s={current.severity} />
                          <StatusBadge alarm={current} />
                        </div>
                        <h5 className="mt-3 text-lg font-semibold leading-snug text-white">{current.name}</h5>
                        <dl className="mt-4 divide-y divide-white/5 text-sm">
                          {[
                            ['ID de ocurrencia', `#${current.id}`],
                            ['Código', current.code],
                            ['Máquina', machineName(current.machine)],
                            ['Tipo de sensor', current.sensorType],
                            ['Componente', current.component],
                            ['Activada', current.triggeredAt],
                            ['Resuelta', current.resolvedAt ?? '—'],
                          ].map(([k, v]) => (
                            <div key={k} className="flex justify-between gap-4 py-2">
                              <dt className="text-steel">{k}</dt>
                              <dd className="text-right font-medium text-white">{v}</dd>
                            </div>
                          ))}
                        </dl>
                        {current.status === 'ACTIVE' ? (
                          <button
                            type="button"
                            onClick={() => resolve(current.id)}
                            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-emerald-400"
                          >
                            <CircleCheck className="h-4 w-4" aria-hidden="true" /> Resolver alarma (simulación)
                          </button>
                        ) : (
                          <p className="mt-5 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-300">
                            <Clock className="h-4 w-4" aria-hidden="true" /> Incidencia resuelta a las {current.resolvedAt}
                          </p>
                        )}
                        <p className="mt-3 text-[11px] leading-relaxed text-steel/70">
                          La resolución solo modifica esta interfaz de demostración. No se envía ninguna orden a equipos ni servidores.
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-steel">Selecciona una incidencia para ver su detalle.</p>
                    )}
                  </Panel>
                </div>
              )}
            </div>
          </div>
        </Reveal>
        <p className="mt-6 text-center text-sm text-steel/80">
          Los datos de esta demostración son ficticios y se generan en tu navegador. No existe conexión con ninguna planta real.
        </p>
      </div>
    </section>
  )
}
