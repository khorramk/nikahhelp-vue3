import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";
import removeConsole from "vite-plugin-remove-console";


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
    removeConsole()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  esbuild: { loader: { '.js': '.jsx' } }
})
