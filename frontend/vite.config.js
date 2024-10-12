import { fileURLToPath, URL } from 'url'  // Ispravan import za node:url

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))  // Ispravan način za korištenje fileURLToPath
    }
  },
  define: {
    'process.env': {},  // Definiranje praznog objekta za process.env kako bi se izbjegla greška
  },
})



