import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves the site from /<repo>/ — keep in sync with the repo name.
export default defineConfig({
  base: '/altaigidrobur/',
  plugins: [react(), tailwindcss()],
})
