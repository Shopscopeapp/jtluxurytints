import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CallBar from '../../components/CallBar'
import LandingForm from '../../components/forms/LandingForm'
import Pic from '../../components/Pic'
import Wipe from '../../components/wipe/Wipe'
import { IMG, PHONE, TEL } from '../../lib/site'

/* One template, three ad groups. Landing pages: noindex, no main nav, kept out of the sitemap. */
const V = {
  porsche: {
    title: 'Porsche PPF Melbourne · JT Luxury Tints',
    desc: 'XPEL paint protection film for your Porsche, fitted by hand in a private Melbourne studio. 911, Cayenne, Taycan, Macan.',
    kick: '911 · Cayenne · Taycan · Macan', h1: 'Porsche', small: 'PPF · Melbourne',
    h2: 'Quote for your Porsche, from Julian himself.',
    lead: 'Front-end to full body in XPEL film. Fitted by hand in a private Melbourne studio, edges wrapped, no production line.',
    img: 'porsche.jpg', alt: 'Grey Porsche 911 in the studio', op: undefined as string | undefined, zone: '.1 .55 .9 .85',
    cta: 'Get my Porsche quote', model: 'e.g. 992 Carrera S, 2023', car: 'Porsche',
  },
  'new-car': {
    title: 'New car paint protection · Melbourne',
    desc: 'Protect a new car before the first freeway trip. XPEL paint protection film, patterned to every panel and fitted by hand in Melbourne.',
    kick: 'Any make · straight from delivery', h1: 'New car', small: 'Paint protection',
    h2: 'Protect it before the first freeway trip.',
    lead: 'The best time for film is before the paint has met a stone. Bring it straight from the dealer: Julian patterns every panel and fits XPEL by hand.',
    img: 'c8.jpg', alt: 'Yellow Corvette C8', op: '50% 58%', zone: '.05 .45 .7 .75',
    cta: 'Get my new-car quote', model: 'e.g. Corvette C8, delivery next week', car: 'car',
  },
  xpel: {
    title: 'XPEL PPF Melbourne · JT Luxury Tints',
    desc: 'XPEL paint protection film in Melbourne, from front-end packs to full body, laid wet and squeegeed by Julian. No subbies.',
    kick: 'XPEL film · fitted by hand', h1: 'XPEL', small: 'PPF · Melbourne',
    h2: 'XPEL film, fitted by the person who quotes it.',
    lead: 'XPEL paint protection film from front-end packs to full body, laid wet and squeegeed by Julian in his Melbourne studio. No subbies.',
    img: 'urus.jpg', alt: 'Yellow Lamborghini Urus', op: '50% 66%', zone: '.1 .5 .9 .78',
    cta: 'Get my XPEL quote', model: 'e.g. Lamborghini Urus, full front', car: 'car',
  },
}
type Variant = keyof typeof V
const isVariant = (v: string): v is Variant => v in V

export const dynamicParams = false
export function generateStaticParams() {
  return Object.keys(V).map((variant) => ({ variant }))
}

export function generateMetadata({ params }: { params: { variant: string } }): Metadata {
  if (!isVariant(params.variant)) return {}
  const v = V[params.variant]
  return {
    title: { absolute: v.title },
    description: v.desc,
    robots: { index: false, follow: false },
    alternates: { canonical: `/ppf/${params.variant}` },
  }
}

export default function LandingPage({ params }: { params: { variant: string } }) {
  if (!isVariant(params.variant)) notFound()
  const v = V[params.variant]
  return (
    <main className="lp">
      <section className="first">
        <div className="top">
          <img src={`${IMG}/logo.png`} alt="JT Luxury Tints" width={101} height={32} />
          <span className="mono x">XPEL paint protection film · Melbourne</span>
          <a className="tel" href={TEL}><span className="mono">Call Julian</span><b>{PHONE}</b></a>
        </div>

        <div className="shot">
          <Wipe kind="paint" pos={0.44} posm={0.42} seed={5} zone={v.zone} chips={380} swirl=".5 .62"
            media={<Pic src={v.img} eager op={v.op} alt={v.alt} />}
            over={<div className="w-over"><h1 className="disp w-txt ink">{v.h1}<small>{v.small}</small></h1></div>} />
          <div className="tagline"><span>Left: unprotected (simulated)</span><span className="o">Right: XPEL PPF</span></div>
        </div>

        <div className="side">
          <span className="mono" style={{ color: 'rgba(11,11,12,.6)' }}>{v.kick}</span>
          <h2 style={{ marginTop: 12 }}>{v.h2}</h2>
          <p className="lead">{v.lead}</p>
          <div className="ticks"><span>XPEL film</span><span>Fitted by Julian</span><span>Edges wrapped</span><span>Tint bundle available</span></div>
          <LandingForm variant={params.variant} cta={v.cta} modelHint={v.model} />
        </div>
      </section>

      <section className="packs">
        <div className="hd">
          <h3 className="disp">Pick a <span>pass.</span></h3>
          <p>Every pack is cut for the exact {v.car} in front of us. Prices depend on model and condition, so the quote comes after Julian sees the car.</p>
        </div>
        <ul className="rows">
          <li><span className="mono">A</span><b>Front pack</b><span>Bumper, headlights, leading edge of bonnet and guards</span><em>Price on quote</em></li>
          <li><span className="mono">B</span><b>Full front</b><span>Full bonnet, full guards, mirrors, bumper</span><em>Price on quote</em></li>
          <li><span className="mono">C</span><b>Full body</b><span>Every painted panel, gloss or matte</span><em>Price on quote</em></li>
          <li><span className="mono">+</span><b>Tint bundle</b><span>XPEL window tint in the same visit</span><em>Price on quote</em></li>
        </ul>
      </section>

      <CallBar quoteHref="#lp-form" />
    </main>
  )
}
