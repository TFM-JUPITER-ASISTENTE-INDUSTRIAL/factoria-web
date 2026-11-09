import { ArrowRight, LayoutDashboard } from 'lucide-react'
import { machines } from '../config/machines'

// Posiciones de los nodos (máquinas) en el diagrama animado de planta
const nodes = [
  { x: 90, y: 110 },
  { x: 250, y: 70 },
  { x: 400, y: 140 },
  { x: 220, y: 230 },
  { x: 380, y: 300 },
]
const hub = { x: 250, y: 160 }

function PlantNetwork() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" role="img" aria-label="Esquema animado de cinco máquinas conectadas a un núcleo de datos">
      <defs>
        <radialGradient id="hub-g">
          <stop offset="0" stopColor="#00D4FF" stopOpacity=".5" />
          <stop offset="1" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="line-g" x1="0" x2="1">
          <stop offset="0" stopColor="#1463FF" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>

      {/* Conexiones máquina ↔ núcleo */}
      {nodes.map((n, i) => (
        <g key={i}>
          <line x1={n.x} y1={n.y} x2={hub.x} y2={hub.y} stroke="#1463FF" strokeOpacity=".25" strokeWidth="1.5" />
          <line
            x1={n.x}
            y1={n.y}
            x2={hub.x}
            y2={hub.y}
            stroke="url(#line-g)"
            strokeWidth="2"
            className="flow-line"
            style={{ animationDelay: `${i * -0.3}s` }}
          />
        </g>
      ))}
      {/* Conexiones entre máquinas consecutivas (línea de producción) */}
      <path d="M90 110 L250 70 L400 140 L380 300 L220 230 Z" fill="none" stroke="#CBD5E1" strokeOpacity=".12" strokeDasharray="2 6" />

      {/* Núcleo de datos */}
      <circle cx={hub.x} cy={hub.y} r="70" fill="url(#hub-g)" />
      <g className="float-y">
        <rect x={hub.x - 34} y={hub.y - 34} width="68" height="68" rx="16" fill="#0B1220" stroke="#00D4FF" strokeWidth="1.5" />
        <path
          d={`M${hub.x - 18} ${hub.y + 14}v-16l8 5v-5l8 5v-9l14-7v27z`}
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <circle cx={hub.x + 18} cy={hub.y - 18} r="3.5" fill="#FF8A00" />
      </g>

      {/* Máquinas */}
      {nodes.map((n, i) => (
        <g key={machines[i].key}>
          <circle cx={n.x} cy={n.y} r="9" fill="none" stroke={i === 2 ? '#FF8A00' : '#00D4FF'} className="pulse-ring" style={{ animationDelay: `${i * 0.45}s` }} />
          <circle cx={n.x} cy={n.y} r="9" fill="#0B1220" stroke={i === 2 ? '#FF8A00' : '#00D4FF'} strokeWidth="2" />
          <circle cx={n.x} cy={n.y} r="3" fill={i === 2 ? '#FF8A00' : '#00D4FF'} />
          <text x={n.x} y={n.y + 28} textAnchor="middle" fill="#CBD5E1" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing=".05em">
            {machines[i].externalId}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy pt-24 pb-16">
      {/* Fondo: fábrica automatizada con iluminación azul, recreada en CSS/SVG */}
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" aria-hidden="true" />
      <div className="absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand/25 blur-[140px]" aria-hidden="true" />
      <div className="absolute right-0 bottom-0 -z-10 h-[360px] w-[520px] rounded-full bg-electric/10 blur-[120px]" aria-hidden="true" />
      <svg className="absolute inset-x-0 bottom-0 -z-10 h-48 w-full opacity-40" viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 200V120l80 40V120l80 40V100l80 40V80h60v120h40V110l90 45V110l90 45V90h40V60h30v140h60V120l80 40V120l80 40V100l80 40V70h50v130h40V120l90 45V120l90 45V90l70 35v75z" fill="#0F1829" stroke="#1463FF" strokeOpacity=".5" />
      </svg>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div className="fade-in">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-electric sm:text-xs sm:tracking-[0.18em]">
            <span className="h-1.5 w-1.5 rounded-full bg-electric" aria-hidden="true" />
            Industria 4.0 · Simulación · Monitorización
          </p>
          <h1 id="hero-title" className="text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            <span className="text-gradient">FactorIA</span>: impulsando la industria del futuro
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel sm:text-xl">
            Explora una nueva forma de comprender los procesos industriales mediante simulación, monitorización y gestión de alarmas.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#factoria"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-[#2b74ff]"
            >
              Descubre FactorIA
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-electric/50 hover:bg-white/10"
            >
              <LayoutDashboard className="h-5 w-5 text-electric" aria-hidden="true" />
              Explora la demo
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-xl">
          <div className="absolute inset-0 rounded-3xl border border-white/10 bg-navy-800/40 backdrop-blur-sm" aria-hidden="true" />
          <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-steel/70">
            <span className="h-2 w-2 rounded-full bg-industrial" aria-hidden="true" />
            Planta simulada
          </div>
          <div className="relative h-full p-4 pt-8">
            <PlantNetwork />
          </div>
        </div>
      </div>
    </section>
  )
}
