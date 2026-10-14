import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the build work from any folder (Vercel, Netlify or GitHub Pages)
export default defineConfig({
  base: './',
  plugins: [react()],
})
