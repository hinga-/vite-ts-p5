import { defineConfig } from 'vite'
import path from 'path'
import legacy from '@vitejs/plugin-legacy'

const src = path.join(__dirname, 'src')
const imagesDir = path.join(src, 'images')
const stylesDir = path.join(src, 'styles')
const scriptsDir = path.join(src, 'scripts')
const dist = path.resolve(__dirname, 'dist')

export default defineConfig({
  root: src,
  build: {
    outDir: dist,
  },
  resolve: {
    alias: {
      images: imagesDir,
      styles: stylesDir,
      '@': scriptsDir,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "styles/global.scss";`,
      },
    },
  },
  plugins: [legacy()],
})
