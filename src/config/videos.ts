// ─────────────────────────────────────────────────────────────
// ANUNCIOS DE YOUTUBE — edita títulos y descripciones libremente.
// `youtubeId` es el código que aparece tras "watch?v=" en el enlace.
// ─────────────────────────────────────────────────────────────

export interface Video {
  youtubeId: string
  title: string
  description: string
}

export const videos: Video[] = [
  { youtubeId: 'KGDLgbIt6wU', title: 'Campaña FactorIA 01', description: 'Anuncio publicitario creado con inteligencia artificial.' },
  { youtubeId: 'FJX8uvkCq9U', title: 'Campaña FactorIA 02', description: 'Anuncio publicitario creado con inteligencia artificial.' },
  { youtubeId: 'RS6lq7wKvz0', title: 'Campaña FactorIA 03', description: 'Anuncio publicitario creado con inteligencia artificial.' },
  { youtubeId: 'zZoxQYI2s-Q', title: 'Campaña FactorIA 04', description: 'Anuncio publicitario creado con inteligencia artificial.' },
  { youtubeId: 'HO1h7P1ZeMI', title: 'Campaña FactorIA 05', description: 'Anuncio publicitario creado con inteligencia artificial.' },
  { youtubeId: 'hBVweGoMGfM', title: 'Campaña FactorIA 06', description: 'Anuncio publicitario creado con inteligencia artificial.' },
]
