import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('v-app')
        }
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  terserOptions: {
      compress: {
        warnings: false,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    }
})
