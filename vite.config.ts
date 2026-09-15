import { copyFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/**
 * GitHub Pages serves its own 404 page for any path that is not a real file,
 * which breaks client-side routes such as /services on a hard refresh.
 * Copying index.html to 404.html makes Pages serve the app shell instead,
 * so react-router can take over.
 */
function githubPagesSpaFallback(): Plugin {
  let outDir = path.resolve(process.cwd(), 'dist')
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const index = path.join(outDir, 'index.html')
      if (existsSync(index)) copyFileSync(index, path.join(outDir, '404.html'))
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  // '/' is correct for the custom domain (public/CNAME) or a <user>.github.io root site.
  // For a project site without a custom domain, set VITE_BASE_PATH="/<repo-name>/".
  const base = env.VITE_BASE_PATH || '/'

  return {
    base,
    plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      target: 'es2022',
      sourcemap: false,
    },
  }
})
