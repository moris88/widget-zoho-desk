import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        // for example, lint .ts and .tsx
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        dev: {
          logLevel: ['error', 'warning'],
        },
      },
    }),
  ],
  base: './',
  build: {
    minify: true,
    outDir: 'app',
    watch: {
      include: 'src/**',
    },
    rollupOptions: {
      input: {
        app: './widget.html',
      },
    },
  },
})
