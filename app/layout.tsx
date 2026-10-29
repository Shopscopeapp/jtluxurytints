import type { Metadata, Viewport } from 'next'
import { Archivo, Big_Shoulders_Display, IBM_Plex_Mono } from 'next/font/google'
import React from 'react'
import StructuredData from './components/StructuredData'
import './styles/wipe.css'
import './globals.css'
import './styles/pages.css'

const disp = Big_Shoulders_Display({ subsets: ['latin'], weight: ['500', '700', '800', '900'], variable: '--font-disp', display: 'swap' })
const body = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-body', display: 'swap' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' })

const title = 'JT Luxury Tints · Paint · Stone · Glass Protection · Melbourne'
const description =
  'Paint protection film, stone benchtop film and commercial window tint in Melbourne. XPEL film, fitted by hand by Julian. Call 0424 718 151.'

export const metadata: Metadata = {
  metadataBase: new URL('https://jtluxurytints.com.au'),
  title,
  description,
  authors: [{ name: 'JT Luxury Tints' }],
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'JT Luxury Tints',
    locale: 'en_AU',
    type: 'website',
    images: [{ url: '/images/site/hsv.jpg', width: 1500, height: 2000, alt: 'HSV GTSR bonnet under XPEL paint protection film' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/site/hsv.jpg'] },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { themeColor: '#0B0B0C', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${disp.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <meta name="geo.region" content="AU-VIC" />
        <meta name="geo.placename" content="Melbourne" />
      </head>
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  )
}
