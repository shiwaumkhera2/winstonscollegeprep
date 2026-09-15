/**
 * Prefixes a `public/` asset path with Vite's base URL so images resolve
 * correctly whether the site is served from "/" or "/<repo-name>/".
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL
  return `${base.endsWith('/') ? base : `${base}/`}${path.replace(/^\/+/, '')}`
}
