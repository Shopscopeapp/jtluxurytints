import type { Metadata } from 'next'
import Link from 'next/link'
import Coverage, { type CoverageKind } from '../components/Coverage'
import Footer from '../components/Footer'
import Pic from '../components/Pic'
import { Arrow, PCta, PHero, Proc7, SHead } from '../components/blocks'
import Wipe from '../components/wipe/Wipe'

export const metadata: Metadata = {
  title: 'Automotive PPF Melbourne · XPEL paint protection film · JT Luxury Tints',
  description:
    'XPEL paint protection film in Melbourne: front pack, full front or full body, plus a window tint bundle. Patterned to every panel and fitted by hand by Julian.',
  alternates: { canonical: '/automotive-ppf' },
}

const PACKS: { kind: CoverageKind; label: string; h: string; items: string[]; mid?: boolean }[] = [
  { kind: 'front', label: 'Pack A', h: 'Front', items: ['Front bumper', 'Headlights', 'Leading edge of bonnet', 'Leading edge of guards'] },
  { kind: 'full', label: 'Pack B', h: 'Full front', items: ['Full bonnet', 'Full front guards', 'Bumper and headlights', 'Mirror caps'], mid: true },
  { kind: 'body', label: 'Pack C', h: 'Full body', items: ['Every painted panel', 'Gloss, or satin to go matte', 'Edges wrapped where they can be', 'Door cups and sills'] },
]

const STEPS = [
  { h: 'Wash', p: 'Full hand wash. Grit left on the paint ends up under the film.' },
  { h: 'Decon', p: 'Iron and tar off, clay bar, panel wipe. Film only grips clean.' },
  { h: 'Cut', p: 'Patterns cut to your exact model, with room to wrap edges.' },
  { h: 'Lay', p: 'Slip solution down, film floated onto the panel and positioned.' },
  { h: 'Squeegee', p: 'Centre out, one firm pass at a time. Water out, film down.' },
  { h: 'Edges', p: "Wrapped and sealed so they don't lift or collect dirt." },
  { h: 'Final light', p: 'Every panel checked under the studio lights before you get the keys.' },
]

const LAYERS = [
  { a: 'Top coat', b: 'takes the swirls', bg: '#F5730F', c: '#0B0B0C' },
  { a: 'Urethane film', b: 'takes the chips', bg: '#F2A462', c: '#0B0B0C' },
  { a: 'Adhesive', b: 'laid wet', bg: '#d9d4cc', c: '#0B0B0C' },
  { a: 'Clear coat', b: 'untouched', bg: '#3a3a3d', c: '#fff' },
  { a: 'Paint', b: 'factory finish', bg: '#5b5f66', c: '#fff' },
  { a: 'Panel', b: '', bg: '#26272a', c: '#8f8a84' },
]

const WORK = [
  { seed: 61, zone: '.1 .35 .9 .8', chips: 120, src: 'urus-door.jpg', alt: 'Yellow Lamborghini Urus door', b: 'Urus', s: 'Lamborghini · door + guard' },
  { seed: 62, zone: '.1 .35 .9 .7', chips: 140, src: 'c8.jpg', alt: 'Yellow Corvette C8', b: 'C8', s: 'Corvette · front end' },
  { seed: 63, zone: '.1 .35 .9 .7', chips: 110, src: 'g63.jpg', alt: 'Matte black G-Wagon', b: 'G-Wagon', s: 'Mercedes · matte paint' },
  { seed: 64, zone: '.1 .5 .9 .85', chips: 140, src: 'porsche.jpg', alt: 'Grey Porsche 911', op: '50% 70%', b: '911', s: 'Porsche · studio' },
  { seed: 65, zone: '.1 .4 .9 .8', chips: 90, src: 'window.jpg', alt: 'Porsche 911 window line', b: '911', s: 'Porsche · tint + PPF' },
]

const FAQ = [
  ['What does it cost?', 'It depends on the coverage, the model and the state of the paint, so every package is priced on quote. The exact number comes from the person who’ll fit it, once he knows the car.'],
  ['How long does it take?', 'Depends on the car and the pack. Julian gives you a drop-off and pick-up time with the quote, and the car stays until every panel passes the final light.'],
  ['Will I see the film?', "From normal viewing distance, no. Edges are wrapped where the panel allows; where they can't be, they're kept tight and straight."],
  ['Can you do a brand-new car?', "Yes, and it's the best time. The less the paint has seen, the less needs correcting before the film goes on."],
  ['Gloss or matte?', 'Either. Gloss film keeps the factory look; satin film turns gloss paint matte and protects matte paint without making it shiny.'],
  ['How do I wash it after?', 'Like good paint: hand wash, clean mitts, no harsh brushes. Julian runs through aftercare when you pick the car up.'],
]

export default function PpfPage() {
  return (
    <main className="pg-ppf">
      <PHero
        wipe={{
          kind: 'paint', pos: 0.52, posm: 0.4, seed: 31, zone: '.04 .62 .62 .95', chips: 380, swirl: '.35 .55',
          media: <Pic src="mclaren.jpg" eager op="50% 70%" alt="McLaren 750S with doors up in the studio" />,
          over: <div className="w-over"><div className="pband" /><h1 className="disp w-txt lite">Automotive <em>PPF.</em></h1></div>,
        }}
        crumb={<><b>01</b> &nbsp;Paint · Automotive PPF · XPEL film</>}
        ptag={<>McLaren 750S<span>Left simulated · right as fitted</span></>}
        text="Clear XPEL film over the paint, so the stone chips hit the film and not the clear coat. Patterned to every panel and fitted by hand by Julian."
        cta={{ href: '/quote?service=paint', label: 'Quote my car' }}
      />

      <section className="s-paper pad" id="packages">
        <SHead title={<>Pick your<br /><span>coverage.</span></>}>
          Three ways to cover a car. Orange is film. Every pack is cut for your exact model, and the number comes with your quote once Julian has seen the paint.
        </SHead>
        <div className="packs">
          {PACKS.map((pk) => (
            <div key={pk.kind} className={'pk' + (pk.mid ? ' mid' : '')}>
              <Coverage kind={pk.kind} dark={pk.mid} id={`cov-${pk.kind}`} />
              <span className="mono">{pk.label}</span><h3>{pk.h}</h3>
              <ul>{pk.items.map((i) => <li key={i}>{i}</li>)}</ul>
              <div className="price">Price on <b>quote</b></div>
              {pk.mid
                ? <Link className="btn o" href={`/quote?service=paint&package=${encodeURIComponent(pk.h)}`}>Quote {pk.h} <Arrow /></Link>
                : <Link className="btn line k2" href={`/quote?service=paint&package=${encodeURIComponent(pk.h)}`}>Quote {pk.h}</Link>}
            </div>
          ))}
        </div>
        <div className="bundle-bar" id="bundle">
          <b>+ Tint<br />bundle</b>
          <p>Add XPEL window tint in the same visit. One drop-off, one pick-up, one person responsible for the lot.</p>
          <span className="price">Price on <b>quote</b></span>
          <Link className="btn o" href="/quote?service=paint&tint=1">Add to quote <Arrow /></Link>
        </div>
      </section>

      <section className="s-orange pad" id="process">
        <SHead title={<>Seven steps.<br /><span>One pass.</span></>}>
          The film only looks invisible if everything before the squeegee is right. Here&apos;s the job, start to finish, mid-pass.
        </SHead>
        <Proc7 steps={STEPS} hot={4} pos={0.52} seed={41} />
      </section>

      <section className="s-ink pad" id="xpel">
        <div className="xp">
          <div>
            <div className="layers" role="img" aria-label="Cross-section: top coat, urethane film, adhesive, clear coat, paint, panel">
              {LAYERS.map((l, i) => (
                <div key={l.a} className="l" style={{ top: i * 76, left: i * 36, background: l.bg, color: l.c }}><span>{l.a}</span><span>{l.b}</span></div>
              ))}
            </div>
            <span className="note">Illustrative cross-section, not to scale</span>
          </div>
          <div>
            <div className="eyebrow mono"><b>XPEL</b> The film</div>
            <h2 className="disp">XPEL.<br /><span>Nothing else.</span></h2>
            <p style={{ color: '#cfcac2', fontSize: 17, maxWidth: 560 }}>Julian fits XPEL paint protection and XPEL window tint. One film supplier, one standard, and the product warranty sits with a brand you can look up.</p>
            <ul className="spec">
              <li><b>Finish</b><span>Gloss to keep the factory look, or satin to turn gloss paint matte.</span></li>
              <li><b>Clarity</b><span>Optically clear. Laid wet so it sits flat with no haze.</span></li>
              <li><b>Top coat</b><span>Light wash swirls in the film&apos;s top coat settle out with warmth.</span></li>
              <li><b>Warranty</b><span>XPEL product warranty. Details come in writing with your quote.</span></li>
            </ul>
            <div className="van"><Pic className="" src="ig-van.jpg" alt="Julian with XPEL boxes in front of the JT van" /><span>Fresh XPEL stock, straight into the studio.</span></div>
          </div>
        </div>
      </section>

      <section className="s-paper pad" id="work">
        <SHead title={<>Recent<br /><span>passes.</span></>}>
          Straight from the studio and the reels. Left of each blade is what the paint would face without film; right is how it left.
        </SHead>
        <div className="wstrip">
          {WORK.map((w) => (
            <div key={w.seed} className="wt" data-hover-host="">
              <Wipe hover kind="paint" pos={0.5} seed={w.seed} zone={w.zone} chips={w.chips} media={<Pic src={w.src} op={w.op} alt={w.alt} />} />
              <div className="cap"><b>{w.b}</b><span>{w.s}</span></div>
            </div>
          ))}
        </div>
        <div className="wfoot"><span className="note">Chips and haze on the left of each blade are simulated</span><Link className="btn k" href="/our-work?f=paint">All work <Arrow /></Link></div>
      </section>

      <section className="s-ink pad" id="faq">
        <div className="faqgrid">
          <div className="side">
            <div className="eyebrow mono"><b>?</b> Straight answers</div>
            <h2 className="disp" style={{ marginTop: 22 }}>Asked<br /><span>a lot.</span></h2>
            <p>Anything not here, call or text Julian. He&apos;d rather explain it than have you guess.</p>
          </div>
          <div className="faq">
            {FAQ.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary><span className="mono">{String(i + 1).padStart(2, '0')}</span>{q}<i aria-hidden="true">+</i></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <PCta title={<>Book the<br /><span>pass.</span></>}
        text="Tell Julian the car and what you want covered. You'll get options and a price back from the person who'll fit it."
        primary={{ href: '/quote?service=paint', label: 'Quote my car' }} />
      <Footer />
    </main>
  )
}
