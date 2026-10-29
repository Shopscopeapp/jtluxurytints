import type { Metadata } from 'next'
import Footer from '../components/Footer'
import { PCta, PHero, Proc7, SHead } from '../components/blocks'
import Marble from '../components/wipe/Marble'
import Wipe from '../components/wipe/Wipe'

export const metadata: Metadata = {
  title: 'Marble & stone benchtop protection film · Melbourne · JT Luxury Tints',
  description:
    'Clear protection film for marble and stone benchtops in Melbourne. Stops wine rings, lemon and vinegar etch, coffee stains and knife marks. Gloss or satin, fitted on site.',
  alternates: { canonical: '/benchtop-protection' },
}

const STOPS = [
  { b: 'Wine', seed: 201, m: 41, rings: '.3 .34 .2 1; .18 .62 .12 1', p: 'Glass rings and drips that soak in and leave a stain.' },
  { b: 'Lemon', seed: 202, m: 42, rings: '.28 .4 .24 0; .2 .72 .14 0', p: 'Acid etch: a dull, matte patch where the polish used to be.' },
  { b: 'Vinegar', seed: 203, m: 43, rings: '.26 .3 .18 0; .32 .66 .2 0; .12 .5 .1 0', p: 'Splashes from dressing and cleaning sprays. Same etch, wider spread.' },
  { b: 'Coffee', seed: 204, m: 44, rings: '.3 .38 .2 2; .2 .7 .13 2', p: 'Cup rings and spills that stain pale stone overnight.' },
  { b: 'Knives', seed: 205, m: 45, knife: 34, kzone: '.02 .2 .5 .85', p: 'Fine scratches from blades, pots and the odd set of keys.' },
]

const WHERE = [
  ['Kitchen islands', 'The big one. Prep, wine, kids, homework.'],
  ['Vanities', 'Perfume, toothpaste and cleaning products.'],
  ['Splashbacks', 'Lemon, sauce and oil splatter behind the cooktop.'],
  ['Bar tops', 'Citrus garnish and spilt drinks, every night.'],
  ['Tables', 'Marble dining and side tables.'],
]

const STEPS = [
  { h: 'Measure', p: 'Slab, joins, cut-outs and edges measured on the day.' },
  { h: 'Clean', p: 'Degreased and wiped down. Film only grips clean stone.' },
  { h: 'Lay wet', p: 'Slip solution down, film floated into position.' },
  { h: 'Squeegee', p: 'Centre out. Water out, film flat, nothing trapped.' },
  { h: 'Trim edges', p: 'Cut tight to the edge profile and around the sink.' },
  { h: 'Settle', p: "Julian tells you when it's ready for full use." },
]

export default function StonePage() {
  return (
    <main className="pg-stone">
      <PHero
        wipe={{
          kind: 'stone', pos: 0.5, posm: 0.42, seed: 71, rings: '.14 .5 .09 1; .24 .62 .06 1; .08 .28 .1 0; .36 .82 .07 2; .33 .36 .05 0',
          media: <Marble className="w-img" seed={31} width={1440} height={610} />,
          over: <div className="w-over"><div className="pband" /><h1 className="disp w-txt lite" style={{ fontSize: 150, top: 648 }}>Benchtop <em>protection.</em></h1></div>,
        }}
        crumb={<><b>02</b> &nbsp;Stone · Marble &amp; stone benchtops</>}
        ptag={<>Bare marble · under film<span>Sample imagery · generated marble</span></>}
        text="A clear film over marble and stone that takes the acid, the stains and the knife marks, so the stone doesn't. Laid wet and squeegeed flat by Julian, in your kitchen."
        cta={{ href: '/quote?service=stone', label: 'Quote my benchtop' }}
      />

      <section className="s-paper pad" id="stops">
        <SHead title={<>What it<br /><span>stops.</span></>}>
          Marble is calcium carbonate: anything acidic dulls it on contact. With film over it, the spill sits on the film and wipes off.
        </SHead>
        <div className="stops">
          {STOPS.map((s, i) => (
            <div key={s.b} className="stp">
              <Wipe kind="stone" pos={0.5} seed={s.seed} knife={s.knife ?? 0} kzone={s.kzone} rings={s.rings}
                media={<Marble className="w-img" seed={s.m} width={270} height={420} />} />
              <div className="lbl"><b>{s.b}</b><span className="mono">{String(i + 1).padStart(2, '0')}</span></div>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
        <p className="note" style={{ marginTop: 28 }}>Sample imagery · marble generated in code, marks drawn in code</p>
      </section>

      <section className="s-ink pad" id="finishes">
        <SHead title={<>Two<br /><span>finishes.</span></>}>
          Pick the film to match the stone. Gloss keeps a polished benchtop polished; satin suits honed stone and hides the film completely.
        </SHead>
        <div className="fin">
          <div className="fn gloss"><Marble seed={51} width={690} height={520} /><div className="sheen" /><div className="tag"><b>Gloss<span>.</span></b><p>For polished marble and stone. Keeps the reflections sharp.</p></div></div>
          <div className="fn satin"><Marble seed={52} width={690} height={520} /><div className="sheen" /><div className="tag"><b>Satin<span>.</span></b><p>For honed and matte stone. Soft light, no shine added.</p></div></div>
        </div>
        <p className="note" style={{ marginTop: 22 }}>Sample imagery · generated marble</p>
      </section>

      <section className="s-orange pad" id="where">
        <SHead title={<>Where<br /><span>it goes.</span></>}>
          Anywhere stone gets used rather than looked at. Julian measures it on site and cuts to the slab, joins and all.
        </SHead>
        <div className="where">
          {WHERE.map(([b, p], i) => (
            <div key={b} className="wh">
              <span className="mono">{String(i + 1).padStart(2, '0')}</span><b>{b}</b><p>{p}</p>
              <div className="strip"><Marble seed={61 + i} width={300} height={84} /></div>
            </div>
          ))}
        </div>
      </section>

      <section className="s-paper pad" id="process">
        <SHead title={<>Done<br /><span>on site.</span></>}>
          No removal, no workshop. Julian brings the film to the stone and works around your kitchen.
        </SHead>
        <Proc7 steps={STEPS} hot={3} pos={0.54} seed={42} six overStyle={{ background: 'var(--paper)' }} />
      </section>

      <PCta title={<>Spill it.<br /><span>Wipe it.</span></>}
        text="Send a photo of the benchtop and rough measurements. Julian will come back with a price and a day to come out."
        primary={{ href: '/quote?service=stone', label: 'Quote my benchtop' }} />
      <Footer />
    </main>
  )
}
