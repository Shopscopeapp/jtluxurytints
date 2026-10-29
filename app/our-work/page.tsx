import type { Metadata } from 'next'
import Footer from '../components/Footer'
import { PCta } from '../components/blocks'
import { INSTAGRAM } from '../lib/site'
import WorkBrowser from './WorkBrowser'

export const metadata: Metadata = {
  title: 'Our work · PPF, benchtop film & commercial tint · JT Luxury Tints',
  description:
    'Before and after: XPEL paint protection film on McLaren, Urus, 911, C8 and G-Wagon, plus stone benchtop film and commercial window tint. Melbourne.',
  alternates: { canonical: '/our-work' },
}

export default function WorkPage() {
  return (
    <main className="pg-work">
      <WorkBrowser />
      <PCta title={<>Yours<br /><span>next.</span></>}
        text="Car, benchtop or office glass. Tell Julian what it is and you'll get options and a price back."
        primary={{ href: '/quote', label: 'Get a quote' }}
        secondary={{ href: INSTAGRAM, label: '@jtluxurytints', external: true }} />
      <Footer />
    </main>
  )
}
