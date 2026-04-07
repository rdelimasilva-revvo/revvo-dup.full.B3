import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        receivables: 'http://localhost:5174/assets/remoteEntry.js',
        banks: 'http://localhost:5175/assets/remoteEntry.js',
        warranties: 'http://localhost:5176/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'zustand']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
