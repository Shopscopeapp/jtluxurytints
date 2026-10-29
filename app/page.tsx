import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Pic from './components/Pic'
import QuickQuote from './components/forms/QuickQuote'
import Ticker from './components/Ticker'
import City from './components/wipe/City'
import Marble from './components/wipe/Marble'
import Wipe from './components/wipe/Wipe'
import { INSTAGRAM, PHONE, TEL } from './lib/site'

export const metadata: Metadata = {
  title: 'JT Luxury Tints · Paint · Stone · Glass Protection · Melbourne',
  description:
    'XPEL paint protection film, marble and stone benchtop film, and commercial window tint in Melbourne. Every job fitted by hand by Julian. Call 0424 718 151.',
  alternates: { canonical: '/' },
}

const Arrow = () => <i aria-hidden="true">&#8599;</i>

const REELS = [
  { left: 48, top: 400, pos: 0.46, seed: 61, zone: '.1 .35 .9 .8', chips: 120, src: 'urus-door.jpg', alt: 'Yellow Urus door', bars: ['on', 'half', ''], cap: 'Urus door, wet lay', len: '0:14' },
  { left: 330, top: 360, seed: 62, zone: '.2 .5 .9 .9', chips: 70, src: 'install.jpg', alt: 'Julian fitting film to a Porsche door', op: '40% 50%', pos: 0.52, bars: ['on', 'on', 'half'], cap: '911 door, the pass', len: '0:22' },
  { left: 612, top: 420, seed: 63, zone: '.1 .35 .9 .7', chips: 140, src: 'c8.jpg', alt: 'Yellow Corvette C8', op: '50% 50%', bars: ['half', '', ''], cap: 'C8 full front', len: '0:18' },
  { left: 894, top: 376, seed: 64, zone: '.1 .35 .9 .7', chips: 110, src: 'g63.jpg', alt: 'Matte black G-Wagon', op: '50% 50%', bars: ['on', 'half'], cap: 'Matte G, stealth film', len: '0:11' },
  { left: 1176, top: 410, width: 216, seed: 65, zone: '.1 .4 .9 .8', chips: 90, src: 'window.jpg', alt: 'Porsche 911 window line', bars: ['on', 'on', 'half'], cap: '911 tint + PPF', len: '0:16' },
]

const STEPS = [
  { n: '01', h: 'Decon', p: 'Wash, clay, panel wipe. Film only grips clean.' },
  { n: '02', h: 'Pattern', p: 'Cut to the panel. Edges wrapped where the surface allows.' },
  { n: '03', h: 'Wet lay', p: 'Slip solution down, film floated into place.' },
  { n: '04', h: 'The pass', p: 'Squeegee from the centre out. Water out, film down, gone.', hot: true },
  { n: '05', h: 'Check', p: 'Cured, inspected under the studio lights, handed back.' },
]

export default function Home() {
  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="hero" id="top">
        <Nav />
        <Wipe
          anim kind="paint" pos={0.5} posm={0.36} seed={11} zone=".08 .03 .92 .36" chips={420} swirl=".3 .12"
          media={<Pic src="hsv.jpg" eager alt="HSV GTSR bonnet, half unprotected, half under film" />}
          over={<div className="w-over"><div className="band" /><h1 className="disp w-txt ink">Wet. Wipe. Gone.</h1></div>}
        />
        <div className="scrim" />
        <div className="cap l">Before<span>Road wear · simulated</span></div>
        <div className="cap r">After<span>XPEL PPF · one pass</span></div>
        <div className="row">
          <div>
            <span className="mono">Paint · Stone · Glass Protection — Melbourne</span>
            <p>Paint protection film, fitted by hand by Julian in his own studio. The last squeegee pass is where it disappears. The chips never get a look in.</p>
          </div>
          <div className="cta">
            <a className="btn line" href={TEL}>Call<span className="hm">&nbsp;{PHONE}</span></a>
            <a className="btn k" href="#quote">Get a PPF quote <Arrow /></a>
          </div>
        </div>
      </section>

      <Ticker items={['McLaren 750S', 'Urus', '911', 'C8', 'G-Wagon', 'GTSR']} />

      {/* ============ SURFACES ============ */}
      <section className="surf" id="surfaces">
        <div className="head">
          <h2 className="disp">One craft.<br /><span className="o">Three surfaces.</span></h2>
          <aside><span className="mono">Paint · Stone · Glass</span>Car paint, stone benchtops, office glass. Different surfaces, same job: lay it wet, squeegee it flat, leave nothing to see.</aside>
        </div>
        <div className="strip">
          <div className="panel" style={{ left: -120, width: 771 }}>
            <Wipe kind="paint" pos={0.52} seed={21} zone=".1 .45 .9 .9" chips={160} swirl=".5 .3"
              media={<Pic src="porsche.jpg" op="50% 62%" alt="Grey Porsche 911 in the studio" />} />
            <div className="lab" style={{ left: 271 }}><span className="n">01 / Lead service</span><b>Paint</b></div>
            <div className="foot" style={{ left: 168 }}>Automotive PPF in XPEL. Front-end packs to full body, tint bundled in.<br /><Link href="/automotive-ppf">Paint protection →</Link></div>
          </div>
          <div className="panel" style={{ left: 396, width: 771 }}>
            <Wipe kind="stone" pos={0.52} seed={31} rings=".36 .42 .15 1; .55 .74 .13 0; .27 .74 .07 1"
              media={<Marble className="w-img" seed={7} width={771} height={470} />} />
            <div className="lab" style={{ left: 271 }}><span className="n">02 / Kitchens &amp; bars</span><b>Stone</b></div>
            <div className="foot" style={{ left: 0 }}>Clear film for marble and stone benchtops. Wine, lemon and vinegar wipe straight off.<br /><Link href="/benchtop-protection">Stone protection →</Link></div>
          </div>
          <div className="panel" style={{ left: 912, width: 771 }}>
            <Wipe kind="glass" pos={0.54} seed={41} sun=".42 .22" media={<City seed={3} />} />
            <div className="lab" style={{ left: 271 }}><span className="n">03 / Offices &amp; shopfronts</span><b>Glass</b></div>
            <div className="foot" style={{ left: 0 }}>Commercial window tint. Heat, glare, privacy and UV, sorted on site.<br /><Link href="/commercial-tinting">Commercial tint →</Link></div>
          </div>
        </div>
      </section>

      {/* ============ PAINT ============ */}
      <section className="paint" id="paint">
        <div className="copy">
          <div className="eyebrow mono"><b>01</b> Automotive PPF <span>·</span> XPEL film</div>
          <h2 className="disp">Chips stop<br /><span>at the film.</span></h2>
          <p>Freeway gravel, bird lime, car-park scuffs. They hit the film, not the clear coat. Julian patterns every panel, wraps the edges where the car allows, and squeegees it until you can&apos;t find it.</p>
          <ul className="cov">
            <li><span className="mono">A</span><b>Front pack<small>Bumper, headlights, leading edge of bonnet and guards</small></b><em>Price on quote</em></li>
            <li><span className="mono">B</span><b>Full front<small>Full bonnet, full guards, mirrors, bumper</small></b><em>Price on quote</em></li>
            <li><span className="mono">C</span><b>Full body<small>Every painted panel. Gloss or matte finish</small></b><em>Price on quote</em></li>
            <li className="plus"><span className="mono">+</span><b>Tint bundle<small>XPEL window tint, same visit. One drop-off, one pick-up</small></b><em>Price on quote</em></li>
          </ul>
          <div className="acts"><a className="btn o" href="#quote">Quote my car <Arrow /></a><a className="btn line" href={TEL}>Call Julian</a></div>
        </div>
        <div className="shot">
          <Wipe kind="paint" drag pos={0.6} seed={51} zone=".04 .62 .4 .9" chips={300} swirl=".3 .5" lb="Unprotected" la="XPEL PPF" tagy="b"
            media={<Pic src="mclaren.jpg" op="50% 80%" alt="McLaren 750S, doors up, in the studio" />} />
          <div className="handle" style={{ left: 470, top: 520 }} aria-hidden="true"><i>&#8596;</i>Drag the squeegee</div>
        </div>
      </section>

      {/* ============ REELS ============ */}
      <section className="reels" id="reels">
        <h2 className="disp"><span className="at">@</span>jtluxurytints</h2>
        <div className="sub">
          <p>Every job gets filmed. Half of Julian&apos;s reels are just the wipe: wet film, one pass, gone. Here&apos;s the latest off the feed.</p>
          <a className="btn k" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Follow on Instagram <Arrow /></a>
        </div>
        <div className="rtrack">
          {REELS.map((r) => (
            <div key={r.seed} className="rl" data-hover-host="" style={{ left: r.left, top: r.top, width: r.width }}>
              <Wipe hover kind="paint" pos={r.pos ?? 0.5} seed={r.seed} zone={r.zone} chips={r.chips}
                media={<Pic src={r.src} op={r.op} alt={r.alt} />} />
              <div className="bars">{r.bars.map((b, i) => <s key={i} className={b || undefined} />)}</div>
              <div className="who"><Pic className="" src="mark-only.png" alt="" width={26} height={26} />jtluxurytints</div>
              <div className="cap"><b>{r.cap}</b><span>Reel · {r.len}</span></div>
            </div>
          ))}
        </div>
        <div className="foot"><span className="mono">Reel covers shown as before / after · damage simulated</span><a className="mono" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram · @jtluxurytints</a></div>
      </section>

      {/* ============ STONE ============ */}
      <section className="stone" id="stone">
        <Wipe scroll kind="stone" pos={0.5} posm={0.38} seed={71} lb="Bare marble" la="Under film" tagy="b" tagx={48}
          rings=".2 .6 .1 1; .31 .67 .068 1; .1 .44 .09 0; .44 .52 .055 1; .3 .86 .11 0"
          media={<Marble className="w-img" seed={12} width={1440} height={920} />}
          over={<div className="w-over"><div className="t1 disp w-txt ink">Spill it.</div><div className="t2 disp w-txt ink stone-t">Wipe <span>it.</span></div></div>} />
        <div className="card">
          <div className="eyebrow mono"><b>02</b> Stone &amp; marble benchtops</div>
          <h3>Shiraz rings and lemon etch, wiped off.</h3>
          <p>Marble etches the moment acid touches it. A clear film takes the hit instead: optically clear, gloss or satin, laid wet and squeegeed flat by Julian on site.</p>
          <div className="chips"><span>Wine</span><span>Lemon</span><span>Vinegar</span><span>Coffee</span><span>Knife marks</span></div>
          <a className="btn o" href="#quote">Quote my benchtop <Arrow /></a>
        </div>
        <span className="sample" style={{ left: 48, top: 40, color: 'rgba(11,11,12,.6)' }}>Sample imagery · generated marble, rings drawn in code</span>
      </section>

      {/* ============ GLASS ============ */}
      <section className="glass" id="glass">
        <div className="huge disp" aria-hidden="true">Glass</div>
        <div className="view">
          <Wipe kind="glass" pos={0.52} seed={81} sun=".44 .21" lb="Bare glass, 3pm" la="Tinted" tagy="b" tagx={28} media={<City seed={9} sunx={560} />} />
          <span className="sample" style={{ left: 28, top: 24, background: 'rgba(11,11,12,.7)', padding: '6px 8px' }}>Sample imagery · illustrated office view</span>
        </div>
        <div className="copy">
          <div className="eyebrow mono"><b>03</b> Commercial window tint</div>
          <h2 className="disp">Glare off. <span>View on.</span></h2>
          <p>Offices, shopfronts and whole buildings. Julian measures on site, fits after hours if that suits, and leaves the glass looking like nothing was done. Except now you can see your screen.</p>
          <ul className="spec">
            <li><b>Heat</b><span>Cuts the solar load through west-facing glass.</span></li>
            <li><b>Glare</b><span>Screens readable at 3pm. Blinds up again.</span></li>
            <li><b>Privacy</b><span>One-way by day, frosted or decorative where needed.</span></li>
            <li><b>UV</b><span>Slows fading on floors, stock and furniture.</span></li>
          </ul>
          <Link className="btn w" href="/commercial-tinting#visit">Book a site measure <Arrow /></Link>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="proc" id="process">
        <h2 className="disp">How a pass<br />goes.</h2>
        <p className="side">No production line, no subbies. Julian does every job himself, the same five steps whether it&apos;s a 750S bonnet or a bar top.</p>
        <div className="steps">
          {STEPS.map((s, i) => (
            <div key={s.n} className={'step' + (s.hot ? ' hot' : '')} style={{ left: 48 + i * 282, top: i * 46 }}>
              <div className="num">{s.n}</div><h4>{s.h}</h4><p>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ STUDIO ============ */}
      <section className="studio" id="studio">
        <div className="ph">
          <Wipe kind="flat" pos={0.55} seed={88} lb="Wet" la="Gone" tagy="b"
            media={<Pic src="install.jpg" op="42% 50%" alt="Julian fitting film to a Porsche door in the studio" />} />
        </div>
        <div className="copy">
          <div className="eyebrow mono"><b>04</b> The studio</div>
          <h2 className="disp">One pair <span>of hands.</span></h2>
          <p>No subbies, no production line. Julian quotes it, patterns it, lays it and does the last pass himself, in his own Melbourne studio. Detailers and dealerships send him their cars for the same reason.</p>
          <ul className="facts">
            <li><span className="mono">01</span><b>Every job fitted by Julian</b></li>
            <li><span className="mono">02</span><b>XPEL film, cut to the panel</b></li>
            <li><span className="mono">03</span><b>Paint, stone and glass</b></li>
            <li><span className="mono">04</span><b>Partner detailers &amp; dealerships</b></li>
          </ul>
          <Link className="btn k" href="/quote">Trade &amp; dealer enquiries <Arrow /></Link>
        </div>
      </section>

      {/* ============ QUOTE ============ */}
      <section className="quote" id="quote">
        <Wipe kind="flat" className="qwipe" pos={0.52} posm={0.22} seed={91} ang={30}
          over={<div className="w-over"><h2 className="disp w-txt lite">Get a <span className="o">quote.</span></h2></div>} />
        <div className="qgrid">
          <div className="call">
            <span className="mono">Rather talk it through</span>
            <a className="tel" href={TEL}>{PHONE}</a>
            <p>Call or text Julian. Send a photo of the car, the benchtop or the window and you&apos;ll get a straight answer on what it needs.</p>
            <div className="ig">
              <Pic className="" src="ig-van.jpg" alt="Julian with XPEL boxes and the JT van" />
              <div><b>@jtluxurytints</b><span>Melbourne, VIC · jtluxurytints.com.au</span></div>
            </div>
            <ol className="next">
              <li><span className="mono">01</span><b>Send the job</b><p>Car, benchtop or window, plus a photo if you have one.</p></li>
              <li><span className="mono">02</span><b>Julian replies</b><p>Options and a price, from the person who&apos;ll fit it.</p></li>
              <li><span className="mono">03</span><b>Book it in</b><p>Drop the car at the studio, or book a site visit.</p></li>
            </ol>
          </div>
          <QuickQuote />
        </div>
      </section>

      <Footer />
    </main>
  )
}
