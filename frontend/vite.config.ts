import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward API calls to ASP.NET so frontend and backend work together locally.
      '/api': {
        target: 'http://localhost:5069',
        changeOrigin: true,
      },
    },
  },
})
