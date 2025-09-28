import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    VitePWA({
      injectRegister: 'auto',
      manifest: {
        name: 'Code Editor [html,css,js]',
        short_name: 'Code Editor',
        description: 'A code edtor built with React, Vite, and primeflex CSS. -Soumabha Saha',
        theme_color: '#00000000',
        icons: [{
          src: "pwa-64x64.png",
          sizes: "64x64",
          type: "image/png"
        },
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }]
      }
    })],
})
