import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/** GitHub repository name — the default base path for the project-pages URL. */
const REPO_NAME = 'winstonscollegeprep'

/** Public routes, used to generate sitemap.xml at build time. */
const ROUTES = ['/', '/services', '/testimonials', '/gallery', '/contact']

/** Ensures a base path has exactly one leading and one trailing slash ('' → '/'). */
function normalizeBase(value: string): string {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}/` : '/'
}

/**
 * Post-build files for GitHub Pages:
 *  - 404.html: Pages serves its own 404 for any path that is not a real file, which breaks
 *    client-side routes such as /services on a hard refresh. A copy of index.html makes
 *    Pages serve the app shell instead, so react-router can take over.
 *  - sitemap.xml / robots.txt: generated from the deployed site URL so they are correct
 *    on both the project-pages URL and the custom domain.
 */
function githubPagesFiles(siteUrl: string): Plugin {
  let outDir = path.resolve(process.cwd(), 'dist')
  return {
    name: 'github-pages-files',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const index = path.join(outDir, 'index.html')
      if (existsSync(index)) copyFileSync(index, path.join(outDir, '404.html'))

      // siteUrl already includes the base path (e.g. https://<user>.github.io/winstonscollegeprep).
      const origin = siteUrl.replace(/\/+$/, '')
      const urls = ROUTES.map((route) => `  <url><loc>${origin}${route}</loc><changefreq>monthly</changefreq></url>`)
      writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
      )
      writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  // Where the site is served from. The deploy workflow sets both values from
  // actions/configure-pages, so they switch automatically when a custom domain is
  // configured in the repository's Pages settings:
  //   project URL  → base '/winstonscollegeprep/', site URL https://<user>.github.io/winstonscollegeprep
  //   custom domain → base '/',                     site URL https://winstoncollegeprep.net
  const base = normalizeBase(env.VITE_BASE_PATH ?? `/${REPO_NAME}/`)
  const siteUrl = env.VITE_SITE_URL?.trim() || `https://shiwaumkhera2.github.io/${REPO_NAME}`

  return {
    base,
    define: {
      // Exposed to the app for canonical and Open Graph URLs (see src/config.ts).
      'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
    },
    plugins: [react(), tailwindcss(), githubPagesFiles(siteUrl)],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      target: 'es2022',
      sourcemap: false,
    },
  }
})
