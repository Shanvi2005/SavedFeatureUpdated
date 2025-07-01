// vite.config.ts (or vite.config.js)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { // Add this server configuration
    port: 5000, // Change the port to 5000
  }
})