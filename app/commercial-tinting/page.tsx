import type { Metadata } from 'next'
import React from 'react'
import Footer from '../components/Footer'
import SiteVisit from '../components/forms/SiteVisit'
import { PHero, SHead } from '../components/blocks'
import City from '../components/wipe/City'
import Wipe from '../components/wipe/Wipe'

export const metadata: Metadata = {
  title: 'Commercial window tinting Melbourne · offices & shopfronts · JT Luxury Tints',
  description:
    'Commercial window film for Melbourne offices, shopfronts, clinics, hospitality and whole buildings. Less heat, no glare, privacy and UV control. Book a site visit.',
  alternates: { canonical: '/commercial-tinting' },
}

type Fac = 'tower' | 'shop' | 'clinic' | 'cafe' | 'apt'
const INK = '#0B0B0C'

/** Line-drawn facade: glare left of a 30deg blade, tinted right. */
function Facade({ kind, id }: { kind: Fac; id: string }) {
  const panes: [number, number, number, number][] = []
  const P = (x: number, y: number, w: number, h: number) => panes.push([x, y, w, h])
  const frame: React.ReactNode[] = []
  const line = { fill: 'none', stroke: INK, strokeWidth: 2 }
  if (kind === 'tower') {
    frame.push(<rect key="f" x="40" y="10" width="160" height="240" {...line} />)
    for (let r = 0; r < 9; r++) for (let c = 0; c < 5; c++) P(46 + c * 31, 16 + r * 26, 27, 22)
  }
  if (kind === 'shop') {
    frame.push(<rect key="f" x="16" y="70" width="208" height="180" {...line} />, <rect key="a" x="16" y="70" width="208" height="34" fill={INK} />, <path key="p" d="M16 104 L32 126 H208 L224 104" {...line} />)
    P(26, 132, 88, 112); P(122, 132, 58, 112); P(186, 132, 30, 112)
  }
  if (kind === 'clinic') {
    frame.push(<rect key="f" x="10" y="90" width="220" height="160" {...line} />, <line key="l" x1="10" y1="170" x2="230" y2="170" stroke={INK} strokeWidth="2" />)
    for (let c = 0; c < 4; c++) { P(18 + c * 53, 100, 47, 58); P(18 + c * 53, 180, 47, 62) }
  }
  if (kind === 'cafe') {
    frame.push(<path key="f" d="M20 250 V60 H220 V250" {...line} />, <rect key="a" x="20" y="60" width="200" height="26" fill={INK} />)
    P(28, 96, 90, 150); P(124, 96, 90, 150)
  }
  if (kind === 'apt') {
    frame.push(<rect key="f" x="50" y="6" width="140" height="244" {...line} />)
    for (let r = 0; r < 7; r++) {
      P(58, 14 + r * 34, 58, 24); P(124, 14 + r * 34, 58, 24)
      frame.push(<line key={'l' + r} x1="50" y1={40 + r * 34} x2="190" y2={40 + r * 34} stroke={INK} strokeWidth="2" />)
    }
  }
  const cx = 120, t = Math.tan(Math.PI / 6) * 125
  const poly = `${cx + t},0 240,0 240,250 ${cx - t},250`
  return (
    <svg viewBox="0 0 240 250" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        <clipPath id={id + 'g'}>{panes.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} />)}</clipPath>
        <linearGradient id={id + 's'} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fffdf6" /><stop offset="1" stopColor="#f4d9b8" /></linearGradient>
      </defs>
      <g clipPath={`url(#${id}g)`}>
        <rect width="240" height="250" fill={`url(#${id}s)`} />
        <polygon points={poly} fill="#1b2730" />
        <polygon points={poly} fill={`url(#${id}s)`} opacity=".08" />
      </g>
      {frame}
      <line x1={cx + t} y1="0" x2={cx - t} y2="250" stroke="#fff" strokeWidth="5" />
    </svg>
  )
}

const TYPES: { k: Fac; b: string; p: string }[] = [
  { k: 'tower', b: 'Offices', p: 'Floors, meeting rooms and reception glass.' },
  { k: 'shop', b: 'Shopfronts', p: 'Street glass that cooks the window display.' },
  { k: 'clinic', b: 'Clinics', p: 'Privacy for consult and treatment rooms.' },
  { k: 'cafe', b: 'Hospitality', p: 'Afternoon sun on diners and the bar.' },
  { k: 'apt', b: 'Buildings', p: 'Common areas, lobbies and whole facades.' },
]

export default function GlassPage() {
  return (
    <main className="pg-glass">
      <PHero
        wipe={{
          kind: 'glass', pos: 0.5, posm: 0.42, seed: 81, sun: '.33 .3',
          media: <City seed={14} sunx={430} style={{ height: 610 }} />,
          over: <div className="w-over"><div className="pband" /><h1 className="disp w-txt lite">Commercial <em>tint.</em></h1></div>,
        }}
        crumb={<><b>03</b> &nbsp;Glass · Offices, shopfronts &amp; buildings</>}
        ptag={<>3pm, west-facing glass<span>Sample imagery · illustrated view</span></>}
        text="Window film for offices, shopfronts and whole buildings. Less heat, no glare on screens, privacy where you want it, and the view stays."
        cta={{ href: '#visit', label: 'Book a site visit' }}
      />

      <section className="s-ink pad" id="benefits">
        <div className="ben">
          <div className="view">
            <Wipe kind="glass" pos={0.5} seed={83} sun=".42 .2" lb="Bare glass" la="Tinted" tagy="b" media={<City seed={22} sunx={520} />} />
            <span className="note">Sample imagery · illustrated office view</span>
          </div>
          <div>
            <div className="eyebrow mono"><b>03</b> What it fixes</div>
            <h2 className="disp gh">Glare off.<br /><span>View on.</span></h2>
            <ul className="bl">
              <li><span className="mono">01</span><b>Heat</b><p>Cuts the solar load through big and west-facing glass, so the air-con isn&apos;t fighting the sun all afternoon.</p></li>
              <li><span className="mono">02</span><b>Glare</b><p>Screens readable at 3pm. Blinds go back up and the view comes back.</p></li>
              <li><span className="mono">03</span><b>Privacy</b><p>One-way by day, frosted or decorative film for meeting rooms and street-level glass.</p></li>
              <li><span className="mono">04</span><b>UV</b><p>Slows fading on floors, furniture and stock in the window.</p></li>
              <li><span className="mono">05</span><b>After hours</b><p>Installs scheduled around trading hours, so the floor keeps working.</p></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="s-orange pad" id="types">
        <SHead title={<>Building<br /><span>types.</span></>}>
          From a single shopfront to a full floor. Every site starts with Julian looking at the glass, the aspect and how the space is used.
        </SHead>
        <div className="types">
          {TYPES.map((t) => (
            <div key={t.k} className="ty"><Facade kind={t.k} id={'fac-' + t.k} /><b>{t.b}</b><p>{t.p}</p></div>
          ))}
        </div>
        <p className="note" style={{ marginTop: 20, color: 'rgba(11,11,12,.6)' }}>Line drawings · glare left of the blade, film right</p>
      </section>

      <section className="s-paper pad" id="visit">
        <div className="sv">
          <div>
            <div className="eyebrow mono"><b>→</b> Site visit</div>
            <h2 className="disp">Book a<br /><span>site visit.</span></h2>
            <p style={{ fontSize: 17, fontWeight: 500, maxWidth: 520 }}>Commercial jobs get priced on site. Julian looks at the glass, the aspect and how the space is used, then quotes the film that suits it.</p>
            <ol className="next" style={{ borderColor: 'rgba(11,11,12,.2)' }}>
              <li><span className="mono">01</span><b>Request</b><p>Tell us the site and the problem.</p></li>
              <li><span className="mono">02</span><b>Visit</b><p>Julian measures and checks the glass.</p></li>
              <li><span className="mono">03</span><b>Quote</b><p>Film options and a price in writing.</p></li>
            </ol>
          </div>
          <SiteVisit />
        </div>
      </section>
      <Footer />
    </main>
  )
}
