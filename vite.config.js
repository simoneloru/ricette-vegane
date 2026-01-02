import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Changed to '/' because for a custom domain (ricette.simoneloru.com) the site lives at the root
  base: '/'
})
