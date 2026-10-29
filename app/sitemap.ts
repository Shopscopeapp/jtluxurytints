import type { MetadataRoute } from 'next'
import { SITE_URL } from './lib/site'

// ads landing pages (/ppf/*) are noindex and deliberately left out
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: [string, number][] = [
    ['/', 1],
    ['/automotive-ppf', 0.9],
    ['/benchtop-protection', 0.9],
    ['/commercial-tinting', 0.9],
    ['/our-work', 0.7],
    ['/quote', 0.6],
  ]
  return routes.map(([path, priority]) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(), changeFrequency: 'monthly', priority }))
}
