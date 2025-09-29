import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'EcoPass',
        short_name: 'EcoPass',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4CAF50',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: ['all'],
  },
})
