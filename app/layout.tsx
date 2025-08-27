import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import React from 'react'
import StructuredData from './components/StructuredData'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'JT Luxury Tints | Premium Automotive Window Tinting Melbourne',
  description: 'Melbourne\'s premier automotive window tinting specialists. Carbon & nano ceramic tints for luxury vehicles. Professional service for individuals, detailers & dealerships.',
  keywords: 'automotive window tinting, car tinting Melbourne, luxury car tinting, carbon window tint, nano ceramic tint, professional car tinting, dealership tinting services',
  authors: [{ name: 'JT Luxury Tints' }],
  creator: 'JT Luxury Tints',
  publisher: 'JT Luxury Tints',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jtluxurytints.com.au'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'JT Luxury Tints | Premium Automotive Window Tinting Melbourne',
    description: 'Melbourne\'s premier automotive window tinting specialists. Carbon & nano ceramic tints for luxury vehicles.',
    url: 'https://jtluxurytints.com.au',
    siteName: 'JT Luxury Tints',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JT Luxury Tints - Premium Automotive Window Tinting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JT Luxury Tints | Premium Automotive Window Tinting Melbourne',
    description: 'Melbourne\'s premier automotive window tinting specialists. Carbon & nano ceramic tints for luxury vehicles.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="canonical" href="https://jtluxurytints.com.au" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f5730f" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="geo.region" content="AU-VIC" />
        <meta name="geo.placename" content="Melbourne" />
        <meta name="geo.position" content="-37.8136;144.9631" />
        <meta name="ICBM" content="-37.8136, 144.9631" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <StructuredData />
        {children}
      </body>
    </html>
  )
} 