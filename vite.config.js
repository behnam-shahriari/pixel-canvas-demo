import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const repoName = 'pixel-canvas-demo'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  base: `/${repoName}/`,
})
