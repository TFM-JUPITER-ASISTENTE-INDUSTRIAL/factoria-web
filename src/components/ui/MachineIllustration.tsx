import type { MachineKey } from '../../config/machines'

/**
 * Ilustraciones vectoriales esquemáticas de cada máquina.
 * Ligeras, sin dependencias externas y escalables.
 */
const S = { stroke: '#00D4FF', strokeWidth: 2, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
const SOFT = { ...S, stroke: '#CBD5E1', strokeWidth: 1.5, opacity: 0.55 }

function Base() {
  return (
    <>
      <line x1="10" y1="104" x2="230" y2="104" {...SOFT} />
      {/* Cinta transportadora */}
      <rect x="20" y="88" width="200" height="10" rx="5" {...S} stroke="#1463FF" />
      {[34, 60, 86, 112, 138, 164, 190, 206].map((x) => (
        <circle key={x} cx={x} cy="93" r="2" fill="#1463FF" />
      ))}
    </>
  )
}

function Sensor({ x, y, alert = false }: { x: number; y: number; alert?: boolean }) {
  const c = alert ? '#FF8A00' : '#00D4FF'
  return (
    <g>
      <circle cx={x} cy={y} r="3" fill={c} />
      <circle cx={x} cy={y} r="3" fill="none" stroke={c} className="pulse-ring" />
    </g>
  )
}

const drawings: Record<MachineKey, JSX.Element> = {
  denester: (
    <>
      <Base />
      {/* Pila de bandejas */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="40" y={34 + i * 9} width="46" height="6" rx="2" {...S} stroke="#CBD5E1" />
      ))}
      {/* Pórtico y pinza */}
      <path d="M110 84V20h90v64" {...S} />
      <path d="M150 20v34" {...S} stroke="#FF8A00" />
      <path d="M138 54h24M142 54v8M158 54v8" {...S} stroke="#FF8A00" />
      <rect x="132" y="72" width="36" height="12" rx="2" {...SOFT} />
      <Sensor x={150} y={20} />
      <Sensor x={63} y={28} alert />
    </>
  ),
  encajadora: (
    <>
      <Base />
      {/* Robot articulado */}
      <path d="M70 84h28" {...S} />
      <path d="M84 84V66l22-24 28 10" {...S} />
      <circle cx="84" cy="66" r="5" {...S} />
      <circle cx="106" cy="42" r="5" {...S} />
      <path d="M134 52v10M128 62h12" {...S} stroke="#FF8A00" />
      {/* Cajas */}
      <path d="M156 84V62h40v22M156 62l8-8h24l8 8" {...S} stroke="#CBD5E1" />
      <path d="M30 84V66h28v18" {...S} stroke="#CBD5E1" />
      <Sensor x={106} y={42} />
      <Sensor x={176} y={54} alert />
    </>
  ),
  estuchadora: (
    <>
      <Base />
      {/* Cuerpo de máquina */}
      <rect x="40" y="30" width="160" height="50" rx="6" {...S} />
      <path d="M40 46h160" {...SOFT} />
      {/* Estuches */}
      {[56, 92, 128, 164].map((x) => (
        <path key={x} d={`M${x} 76V58h20v18M${x} 58l4-5h12l4 5`} {...S} stroke="#CBD5E1" />
      ))}
      {/* Prospecto */}
      <path d="M100 30V14h24v16M104 20h16M104 25h12" {...S} stroke="#FF8A00" />
      <Sensor x={66} y={38} />
      <Sensor x={182} y={38} />
    </>
  ),
  serializadora: (
    <>
      <Base />
      {/* Cámara de visión */}
      <path d="M90 20h40v16H90z" {...S} />
      <path d="M110 36l-14 30M110 36l14 30" {...S} stroke="#00D4FF" opacity=".5" strokeDasharray="3 4" />
      {/* Impresora */}
      <path d="M40 40h30v24H40z" {...S} stroke="#1463FF" />
      <path d="M55 64v8" {...S} stroke="#1463FF" />
      {/* Unidades con DataMatrix */}
      {[60, 98, 136, 174].map((x) => (
        <g key={x}>
          <rect x={x} y="68" width="22" height="18" rx="2" {...S} stroke="#CBD5E1" />
          <path d={`M${x + 6} 72h4v4h-4zM${x + 12} 78h4v4h-4z`} fill="#CBD5E1" opacity=".7" />
        </g>
      ))}
      {/* Rechazo */}
      <path d="M200 70l16-14" {...S} stroke="#FF8A00" />
      <Sensor x={110} y={28} />
      <Sensor x={208} y={62} alert />
    </>
  ),
  termoformadora: (
    <>
      <Base />
      {/* Bobina de film */}
      <circle cx="40" cy="40" r="16" {...S} />
      <circle cx="40" cy="40" r="5" {...S} />
      <path d="M40 56l20 24h160" {...S} stroke="#CBD5E1" />
      {/* Estaciones: formado, sellado, corte */}
      <rect x="76" y="26" width="34" height="34" rx="3" {...S} stroke="#FF8A00" />
      <path d="M82 50c4-8 18-8 22 0" {...S} stroke="#FF8A00" />
      <rect x="128" y="26" width="34" height="34" rx="3" {...S} />
      <path d="M134 46h22" {...S} />
      <path d="M180 26h30v22h-30zM195 48v18" {...S} stroke="#1463FF" />
      {/* Blísteres */}
      {[84, 104, 124, 144].map((x) => (
        <path key={x} d={`M${x} 80c0-6 12-6 12 0`} {...S} stroke="#CBD5E1" />
      ))}
      <Sensor x={93} y={26} alert />
      <Sensor x={145} y={26} />
    </>
  ),
}

export default function MachineIllustration({ machine, className = '' }: { machine: MachineKey; className?: string }) {
  return (
    <svg viewBox="0 0 240 112" className={className} aria-hidden="true">
      {drawings[machine]}
    </svg>
  )
}
