interface LogoProps {
  className?: string
  /** 'dark' para fondos oscuros (texto blanco), 'light' para fondos claros. */
  tone?: 'dark' | 'light'
}

/** Logotipo FactorIA: símbolo de fábrica conectada + logotipo tipográfico. */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="fa-logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1463FF" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#fa-logo-g)" />
      {/* Cubierta en diente de sierra (fábrica) */}
      <path d="M10 36V22l8 5v-5l8 5v-9l12-6v24z" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
      {/* Pistas de circuito */}
      <path d="M15 36v-4M22 36v-4M29 36v-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".55" />
      {/* Nodo conectado */}
      <circle cx="38" cy="12" r="3.5" fill="#FF8A00" />
    </svg>
  )
}

export default function Logo({ className = '', tone = 'dark' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className={`text-xl font-extrabold tracking-tight ${tone === 'dark' ? 'text-white' : 'text-navy'}`}>
        Factor<span className="text-gradient">IA</span>
      </span>
    </span>
  )
}
