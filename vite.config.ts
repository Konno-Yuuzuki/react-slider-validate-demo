import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [reactRefresh()],
  css: {},
  build: {
    sourcemap: true,
    outDir: '.',
    assetsDir: 'dist',
    rollupOptions: {
      input: 'src/index.tsx',
      output: {
        // file: 'bundle.js',
        format: 'cjs',
      }
    }
  }
})