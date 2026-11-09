# FactorIA — Web comercial

Web estática (React + TypeScript + Vite + Tailwind CSS + Lucide). Sin backend, sin base de datos y sin servicios de pago.

## Comandos

```bash
npm install       # instalar dependencias (solo la primera vez)
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # genera la versión estática en /dist
npm run preview   # sirve /dist localmente para comprobarla
```

La carpeta `dist/` se puede publicar tal cual en GitHub Pages o Cloudflare Pages (`base: './'` usa rutas relativas).

## Dónde editar

| Qué | Archivo |
| --- | --- |
| Eslogan, enlace de GitHub, **correo de contacto**, enlaces legales | `src/config/site.ts` |
| Máquinas (textos, cifras, imagen opcional) | `src/config/machines.ts` |
| Cifras de “FactorIA en cifras” | `src/config/stats.ts` |
| Anuncios de YouTube (ID, título, descripción) | `src/config/videos.ts` |
| Datos simulados del dashboard | `src/config/demoData.ts` |
| Textos de cada sección | `src/components/*.tsx` |
| Colores y tipografía | `src/index.css` (bloque `@theme`) |
| Título y descripción SEO | `index.html` |

- **Contacto:** mientras `contactEmail` esté vacío, el formulario muestra un aviso y no envía nada. Al rellenarlo, el botón abre el gestor de correo del visitante (`mailto`).
- **Imágenes de máquinas:** copia una foto a `public/images/` y pon `image: './images/denester.jpg'` en la máquina; si no hay imagen se usa la ilustración SVG.
