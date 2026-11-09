import { useState, type FormEvent } from 'react'
import { Mail, Info, ArrowUpRight } from 'lucide-react'
import { site } from '../config/site'
import Reveal from './ui/Reveal'
import GithubIcon from './ui/GithubIcon'

const field =
  'mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-navy placeholder:text-slate-400 transition focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15'

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '', mensaje: '' })
  const configured = site.contactEmail.trim().length > 0

  const onChange = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // Sin backend: abre el gestor de correo del visitante (mailto) solo si hay dirección configurada.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!configured) return
    const subject = `Contacto web FactorIA — ${form.nombre}${form.empresa ? ` (${form.empresa})` : ''}`
    const body = `Nombre: ${form.nombre}\nEmpresa: ${form.empresa}\nCorreo: ${form.email}\n\n${form.mensaje}`
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contacto" aria-labelledby="contact-title" className="relative bg-slate-50 py-24 text-navy sm:py-32">
      <div className="absolute inset-0 bg-grid-light [mask-image:linear-gradient(to_top,black,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            Contacto
          </p>
          <h2 id="contact-title" className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Construyamos el futuro industrial
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
            ¿Te interesa conocer FactorIA, explorar sus posibilidades o colaborar en el desarrollo de nuevas soluciones tecnológicas? Ponte en contacto con nosotros.
          </p>
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-white">
              <GithubIcon />
            </span>
            <span>
              <span className="block text-sm font-semibold">Proyecto en GitHub</span>
              <span className="block text-xs text-slate-500">TFM-JUPITER-ASISTENTE-INDUSTRIAL/factoria</span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-brand" aria-hidden="true" />
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-navy/5 sm:p-8" noValidate={!configured}>
            {!configured && (
              <div role="note" className="mb-6 flex gap-3 rounded-lg border border-industrial/40 bg-industrial/10 p-4 text-sm text-[#8a4a00]">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-industrial" aria-hidden="true" />
                <p>
                  <strong>Formulario pendiente de configuración.</strong> Todavía no hay una dirección de contacto configurada, por lo que este formulario no envía
                  ningún mensaje. Mientras tanto, puedes contactar a través del repositorio de GitHub.
                </p>
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Nombre
                <input className={field} name="nombre" autoComplete="name" required value={form.nombre} onChange={onChange('nombre')} placeholder="Tu nombre" />
              </label>
              <label className="block text-sm font-medium">
                Empresa
                <input className={field} name="empresa" autoComplete="organization" value={form.empresa} onChange={onChange('empresa')} placeholder="Nombre de la empresa" />
              </label>
              <label className="block text-sm font-medium sm:col-span-2">
                Correo electrónico
                <input className={field} type="email" name="email" autoComplete="email" required value={form.email} onChange={onChange('email')} placeholder="nombre@empresa.com" />
              </label>
              <label className="block text-sm font-medium sm:col-span-2">
                Mensaje
                <textarea className={`${field} min-h-32 resize-y`} name="mensaje" required rows={5} value={form.mensaje} onChange={onChange('mensaje')} placeholder="¿En qué podemos ayudarte?" />
              </label>
            </div>
            <button
              type="submit"
              disabled={!configured}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-[#2b74ff] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              {configured ? 'Abrir mi gestor de correo' : 'Envío no disponible todavía'}
            </button>
            {configured && (
              <p className="mt-3 text-center text-xs text-slate-500">Se abrirá tu aplicación de correo con el mensaje preparado. No almacenamos ningún dato.</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
