import { Helmet } from 'react-helmet-async'

import { site } from '@/config'

interface SeoProps {
  /** Page title; the site name is appended automatically. Omit on the home page. */
  title?: string
  description?: string
  /** Route path, e.g. "/services". Used for the canonical URL and og:url. */
  path?: string
  /** Absolute URL or a path under public/. */
  image?: string
}

export function Seo({ title, description = site.description, path = '/', image = site.ogImage }: SeoProps) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`
  const url = `${site.url}${path === '/' ? '/' : path}`
  const imageUrl = image.startsWith('http') ? image : `${site.url}/${image.replace(/^\/+/, '')}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  )
}
