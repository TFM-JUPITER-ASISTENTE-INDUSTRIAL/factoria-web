import { useEffect, useState } from 'react'
import { stats } from '../config/stats'
import { useInView } from './ui/Reveal'

function Counter({ value, start }: { value: number; start: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(value)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const dur = 1400
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, value])
  return <>{n}</>
}

export default function Statistics() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  return (
    <section aria-labelledby="stats-title" className="relative overflow-hidden bg-navy py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-brand/20 via-transparent to-electric/10" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="stats-title" className="mb-10 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-electric">
          FactorIA en cifras
        </h2>
        <div ref={ref} className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur">
              <p className="text-5xl font-extrabold tracking-tight text-white tabular-nums sm:text-6xl" aria-label={`${s.value} ${s.label}`}>
                <span aria-hidden="true"><Counter value={s.value} start={inView} /></span>
              </p>
              <p className="mt-2 text-base font-semibold text-white">{s.label}</p>
              <p className="mt-1 text-sm text-steel">{s.detail}</p>
              <span className="absolute inset-x-8 -bottom-px h-px bg-gradient-to-r from-transparent via-electric to-transparent" aria-hidden="true" />
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-steel/70">Datos documentados en el repositorio técnico del proyecto.</p>
      </div>
    </section>
  )
}
