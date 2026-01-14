import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // gray-matterがNode.jsのBufferを使用するため、ブラウザ向けにpolyfillを設定
  define: {
    'global': 'globalThis',
  },
  resolve: {
    alias: {
      'buffer': 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
})
