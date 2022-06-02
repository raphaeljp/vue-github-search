import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const projectRoot = path.resolve(__dirname, './src')

export default defineConfig({
  plugins: [
    vue()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "${projectRoot}/assets/styles/reset";
          @import "${projectRoot}/assets/styles/variables";
        `
      },
    },
  },
  resolve: {
    alias: {
      '@': projectRoot,
    }
  }
})
