import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' genera rutas relativas, compatibles con GitHub Pages y Cloudflare Pages.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
