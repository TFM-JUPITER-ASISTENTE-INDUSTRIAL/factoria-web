import { useRef, useState, type SyntheticEvent } from 'react'
import { Play, ArrowRight, ExternalLink } from 'lucide-react'
import { videos } from '../config/videos'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const thumb = (id: string, q: 'hqdefault' | 'maxresdefault' = 'hqdefault') => `https://i.ytimg.com/vi/${id}/${q}.jpg`

/** Si la miniatura en alta resolución no existe, YouTube devuelve una imagen de 120 px: usamos la estándar. */
function fallbackThumb(id: string) {
  return (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    if (img.naturalWidth <= 120 && !img.src.includes('hqdefault')) img.src = thumb(id)
  }
}

export default function VideoGallery() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)
  const featured = videos[current]

  const select = (i: number) => {
    setCurrent(i)
    setPlaying(true)
    playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section id="anuncios" aria-labelledby="videos-title" className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent" aria-hidden="true" />
      <div className="absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-industrial/10 blur-[140px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="videos-title"
          eyebrow="Campañas audiovisuales"
          title="FactorIA en acción"
          subtitle="La innovación también se comunica. Descubre nuestra visión de la industria a través de campañas publicitarias creadas con inteligencia artificial."
        />

        {/* Reproductor destacado: solo se carga un iframe, y únicamente tras pulsar */}
        <Reveal>
          <div ref={playerRef} className="mx-auto max-w-5xl">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-brand/20">
              {playing ? (
                <iframe
                  key={featured.youtubeId}
                  className="fade-in absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${featured.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={`${featured.title} — reproductor de YouTube`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 h-full w-full"
                  aria-label={`Reproducir ${featured.title}`}
                >
                  <img
                    key={featured.youtubeId}
                    src={thumb(featured.youtubeId, 'maxresdefault')}
                    onLoad={fallbackThumb(featured.youtubeId)}
                    onError={fallbackThumb(featured.youtubeId)}
                    alt={`Miniatura de ${featured.title}`}
                    className="fade-in h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" aria-hidden="true" />
                  <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand/90 shadow-2xl shadow-brand/50 ring-8 ring-white/10 transition group-hover:scale-110 group-hover:bg-brand sm:h-24 sm:w-24">
                    <Play className="ml-1 h-9 w-9 fill-white text-white" aria-hidden="true" />
                  </span>
                  <span className="absolute bottom-0 left-0 p-5 text-left sm:p-8">
                    <span className="mb-2 inline-block rounded bg-industrial px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-navy">Destacado</span>
                    <span className="block text-2xl font-bold text-white sm:text-3xl">{featured.title}</span>
                    <span className="mt-1 block text-sm text-steel">{featured.description}</span>
                  </span>
                </button>
              )}
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-sm">
              <p className="font-semibold text-white">
                {featured.title} <span className="font-normal text-steel">· {current + 1} de {videos.length}</span>
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${featured.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-steel hover:text-white"
              >
                Ver en YouTube <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Resto de anuncios en tarjetas */}
        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" aria-label="Otros anuncios">
          {videos.map((v, i) =>
            i === current ? null : (
              <li key={v.youtubeId} className="fade-in">
                <button
                  type="button"
                  onClick={() => select(i)}
                  className="group block w-full text-left"
                  aria-label={`Reproducir ${v.title}`}
                >
                  <span className="relative block aspect-video overflow-hidden rounded-xl border border-white/10 bg-navy-800 transition group-hover:border-electric/60 group-hover:shadow-lg group-hover:shadow-electric/10">
                    <img src={thumb(v.youtubeId)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute inset-0 bg-navy/30 transition group-hover:bg-navy/10" aria-hidden="true" />
                    <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 transition group-hover:scale-110 group-hover:bg-electric" aria-hidden="true">
                      <Play className="ml-0.5 h-4 w-4 fill-navy text-navy" />
                    </span>
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-white group-hover:text-electric">{v.title}</span>
                </button>
              </li>
            ),
          )}
        </ul>

        <div className="mt-14 text-center">
          <a
            href="#tecnologia"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:border-electric/50"
          >
            Descubre nuestra tecnología
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
