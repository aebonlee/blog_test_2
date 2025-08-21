import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 배포용 설정
export default defineConfig({
  plugins: [react()],
  base: '/blog_test_2/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})