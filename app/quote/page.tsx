import type { Metadata } from 'next'
import QuoteFlow from './QuoteFlow'

export const metadata: Metadata = {
  title: 'Get a quote · JT Luxury Tints',
  description: 'Get a quote for XPEL paint protection film, stone benchtop film or commercial window tint in Melbourne. Julian replies himself.',
  alternates: { canonical: '/quote' },
}

export default function QuotePage() {
  return (
    <div className="pg-quote">
      <QuoteFlow />
    </div>
  )
}
