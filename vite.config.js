import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2019',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Only split in client build (SSR marks these as external)
          if (id.includes('node_modules/framer-motion')) return 'framer';
          if (id.includes('node_modules/lucide-react')) return 'icons';
        },
      },
    },
  },
})
