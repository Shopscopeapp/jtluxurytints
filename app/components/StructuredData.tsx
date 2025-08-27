'use client'

import React from 'react'

const StructuredData = () => {
  return (
    <>
      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://jtluxurytints.com.au",
            "name": "JT Luxury Tints",
            "alternateName": "JT Luxury Tints Melbourne",
            "description": "Melbourne's premier automotive window tinting specialists",
            "url": "https://jtluxurytints.com.au",
            "telephone": "+61424718151",
            "email": "info@jtluxurytints.com.au",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Melbourne",
              "addressRegion": "VIC",
              "addressCountry": "AU"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -37.8136,
              "longitude": 144.9631
            },
            "serviceType": "Automotive Window Tinting",
            "areaServed": "Melbourne, Victoria, Australia",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Window Tinting Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Carbon Window Tint",
                    "description": "Premium carbon film providing excellent heat rejection and UV protection"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Nano Ceramic Tint",
                    "description": "Advanced ceramic technology offering superior heat rejection and optical clarity"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Professional Installation",
                    "description": "Expert installation by certified technicians with years of experience"
                  }
                }
              ]
            },
            "sameAs": [
              "https://www.facebook.com/jtluxurytints",
              "https://www.instagram.com/jtluxurytints",
              "https://www.linkedin.com/company/jtluxurytints"
            ],
            "openingHours": [
              "Mo-Fr 08:00-18:00",
              "Sa 09:00-16:00",
              "Su 10:00-16:00"
            ],
            "priceRange": "$$",
            "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
            "currenciesAccepted": "AUD"
          })
        }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "JT Luxury Tints",
            "url": "https://jtluxurytints.com.au",
            "logo": "https://jtluxurytints.com.au/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+61424718151",
              "contactType": "customer service",
              "areaServed": "AU",
              "availableLanguage": "English"
            },
            "sameAs": [
              "https://www.facebook.com/jtluxurytints",
              "https://www.instagram.com/jtluxurytints",
              "https://www.linkedin.com/company/jtluxurytints"
            ]
          })
        }}
      />

      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "JT Luxury Tints",
            "url": "https://jtluxurytints.com.au",
            "description": "Melbourne's premier automotive window tinting specialists. Carbon & nano ceramic tints for luxury vehicles.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://jtluxurytints.com.au/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Automotive Window Tinting",
            "provider": {
              "@type": "LocalBusiness",
              "name": "JT Luxury Tints",
              "telephone": "+61424718151"
            },
            "areaServed": {
              "@type": "City",
              "name": "Melbourne",
              "addressRegion": "VIC",
              "addressCountry": "AU"
            },
            "serviceType": "Window Tinting",
            "description": "Professional automotive window tinting services including carbon and nano ceramic films",
            "offers": {
              "@type": "Offer",
              "price": "200",
              "priceCurrency": "AUD",
              "description": "Starting from $200 for basic window tinting"
            }
          })
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What types of window tinting do you offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer carbon window tinting and nano ceramic tinting, both providing excellent heat rejection and UV protection."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide mobile service?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we offer mobile window tinting services throughout Melbourne for your convenience."
                }
              },
              {
                "@type": "Question",
                "name": "What is your warranty policy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "All our installations come with a comprehensive warranty covering both materials and workmanship."
                }
              }
            ]
          })
        }}
      />
    </>
  )
}

export default StructuredData 