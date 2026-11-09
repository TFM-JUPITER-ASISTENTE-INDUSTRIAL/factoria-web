import Reveal from './Reveal'

interface Props {
  eyebrow: string
  title: string
  subtitle?: string
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  id?: string
}

export default function SectionHeading({ eyebrow, title, subtitle, tone = 'dark', align = 'center', id }: Props) {
  const center = align === 'center'
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} mb-12 max-w-3xl`}>
      <p className={`mb-3 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] ${tone === 'dark' ? 'text-electric' : 'text-brand'}`}>
        <span className="h-px w-6 bg-current" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className={`text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-tight ${tone === 'dark' ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed text-pretty ${tone === 'dark' ? 'text-steel' : 'text-slate-600'}`}>{subtitle}</p>
      )}
    </Reveal>
  )
}
