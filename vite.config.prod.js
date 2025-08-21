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
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        // 파일 확장자를 .js로 강제
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  // 개발 서버에서도 같은 base 사용
  server: {
    open: true
  }
})