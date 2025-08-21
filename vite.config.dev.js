import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 로컬 개발용 설정
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    cors: true
  }
})