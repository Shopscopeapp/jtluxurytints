import { INSTAGRAM, SITE_URL } from '../lib/site'

const service = (name: string, description: string) => ({
  '@type': 'Offer',
  itemOffered: { '@type': 'Service', name, description, areaServed: 'Melbourne VIC' },
})

const data = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'AutoRepair'],
  '@id': `${SITE_URL}/#business`,
  name: 'JT Luxury Tints',
  description: 'Paint protection film, stone benchtop film and commercial window tint in Melbourne. XPEL film, fitted by hand.',
  url: SITE_URL,
  logo: `${SITE_URL}/images/site/logo.png`,
  image: `${SITE_URL}/images/site/hsv.jpg`,
  telephone: '+61424718151',
  address: { '@type': 'PostalAddress', addressLocality: 'Melbourne', addressRegion: 'VIC', addressCountry: 'AU' },
  geo: { '@type': 'GeoCoordinates', latitude: -37.8136, longitude: 144.9631 },
  areaServed: { '@type': 'City', name: 'Melbourne' },
  sameAs: [INSTAGRAM],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Paint, stone and glass protection',
    itemListElement: [
      service('Automotive paint protection film (PPF)', 'XPEL paint protection film, from front-end packs to full body.'),
      service('Stone benchtop protection film', 'Clear film for marble and stone benchtops, in gloss or satin.'),
      service('Commercial window tinting', 'Window film for offices, shopfronts and buildings: heat, glare, privacy and UV.'),
      service('Automotive window tint', 'XPEL window tint, available bundled with PPF in the same visit.'),
    ],
  },
}

export default function StructuredData() {
  // JSON-LD has to be emitted as raw script text; the content is a static object defined above.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
