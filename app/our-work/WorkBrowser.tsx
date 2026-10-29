'use client'

import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Pic from '../components/Pic'
import City from '../components/wipe/City'
import Marble from '../components/wipe/Marble'
import Wipe from '../components/wipe/Wipe'

type Cat = 'paint' | 'stone' | 'glass'
type Filter = Cat | 'all'
type Tile = {
  cat: Cat
  seed: number
  shape?: 'wide' | 'reel'
  b: string
  s: string
  bars?: string[]
  img?: { src: string; alt: string; op?: string }
  marble?: { seed: number; w: number; h: number }
  city?: { seed: number; sunx: number }
  zone?: string
  chips?: number
  rings?: string
  knife?: number
  kzone?: string
  sun?: string
}

const TILES: Tile[] = [
  { cat: 'paint', seed: 301, shape: 'wide', zone: '.1 .2 .9 .7', chips: 300, img: { src: 'hsv.jpg', alt: 'HSV GTSR bonnet', op: '50% 50%' }, b: 'HSV GTSR', s: 'Bonnet · front end' },
  { cat: 'paint', seed: 302, shape: 'reel', zone: '.1 .55 .7 .9', chips: 160, img: { src: 'mclaren.jpg', alt: 'McLaren 750S, doors up', op: '30% 60%' }, b: 'McLaren 750S', s: 'Reel', bars: ['on', '', ''] },
  { cat: 'paint', seed: 303, zone: '.1 .35 .9 .8', chips: 120, img: { src: 'c8.jpg', alt: 'Yellow Corvette C8', op: '50% 52%' }, b: 'C8', s: 'Corvette' },
  { cat: 'paint', seed: 304, shape: 'reel', zone: '.1 .4 .9 .8', chips: 90, img: { src: 'install.jpg', alt: 'Julian fitting film to a Porsche door', op: '40% 50%' }, b: '911 door', s: 'Reel · the pass', bars: ['on', 'on', ''] },
  { cat: 'paint', seed: 305, shape: 'wide', zone: '.1 .45 .9 .85', chips: 200, img: { src: 'urus.jpg', alt: 'Yellow Lamborghini Urus in a showroom', op: '50% 62%' }, b: 'Urus', s: 'Lamborghini' },
  { cat: 'paint', seed: 306, zone: '.1 .4 .9 .8', chips: 120, img: { src: 'porsche.jpg', alt: 'Grey Porsche 911 in the studio', op: '50% 68%' }, b: '911', s: 'Porsche' },
  { cat: 'paint', seed: 307, shape: 'reel', zone: '.1 .4 .9 .85', chips: 120, img: { src: 'g63.jpg', alt: 'Matte black G-Wagon' }, b: 'G-Wagon', s: 'Reel · matte', bars: ['on', ''] },
  { cat: 'paint', seed: 308, zone: '.1 .35 .9 .8', chips: 90, img: { src: 'urus-door.jpg', alt: 'Urus door detail' }, b: 'Urus', s: 'Door detail' },
  { cat: 'paint', seed: 309, zone: '.1 .4 .9 .8', chips: 80, img: { src: 'window.jpg', alt: 'Porsche 911 window line', op: '50% 45%' }, b: '911', s: 'Tint + PPF' },
  { cat: 'paint', seed: 310, shape: 'wide', zone: '.1 .3 .9 .8', chips: 80, img: { src: 'fitting.jpg', alt: 'Julian at work in the studio', op: '50% 30%' }, b: 'In the studio', s: 'Julian · on the tools' },
  { cat: 'stone', seed: 311, shape: 'wide', rings: '.2 .45 .14 1; .34 .7 .1 0; .12 .78 .07 2', marble: { seed: 71, w: 664, h: 300 }, b: 'Kitchen island', s: 'Sample imagery' },
  { cat: 'stone', seed: 312, shape: 'reel', rings: '.3 .3 .16 1; .26 .66 .14 0', marble: { seed: 72, w: 324, h: 616 }, b: 'Wine test', s: 'Reel · sample', bars: ['on', ''] },
  { cat: 'stone', seed: 313, knife: 30, kzone: '.02 .2 .5 .85', marble: { seed: 73, w: 324, h: 300 }, b: 'Vanity', s: 'Sample imagery' },
  { cat: 'stone', seed: 314, rings: '.28 .4 .2 0', marble: { seed: 74, w: 324, h: 300 }, b: 'Bar top', s: 'Sample imagery' },
  { cat: 'glass', seed: 315, shape: 'wide', sun: '.3 .25', city: { seed: 31, sunx: 400 }, b: 'Office floor', s: 'Sample imagery' },
  { cat: 'glass', seed: 316, shape: 'reel', sun: '.4 .2', city: { seed: 32, sunx: 520 }, b: 'Glare test', s: 'Reel · sample', bars: ['on', ''] },
  { cat: 'glass', seed: 317, sun: '.35 .22', city: { seed: 33, sunx: 460 }, b: 'Shopfront', s: 'Sample imagery' },
]

const FILTERS: { f: Filter; label: string; sup?: string }[] = [
  { f: 'all', label: 'All' },
  { f: 'paint', label: 'Paint', sup: 'PPF' },
  { f: 'stone', label: 'Stone', sup: 'Sample' },
  { f: 'glass', label: 'Glass', sup: 'Sample' },
]
const isFilter = (v: string | null): v is Filter => v === 'all' || v === 'paint' || v === 'stone' || v === 'glass'

export default function WorkBrowser() {
  const [filter, setFilter] = useState<Filter>('paint')
  const [reelsOnly, setReelsOnly] = useState(false)

  // ?f=paint|stone|glass|all deep-links a filter
  useEffect(() => {
    const f = new URLSearchParams(window.location.search).get('f')
    if (isFilter(f)) setFilter(f)
  }, [])
  const choose = (f: Filter) => {
    setFilter(f)
    const u = new URL(window.location.href)
    u.searchParams.set('f', f)
    window.history.replaceState(null, '', u)
  }

  const show = (t: Tile) => (filter === 'all' || t.cat === filter) && (!reelsOnly || t.shape === 'reel')

  return (
    <>
      <section className="whead">
        <Nav />
        <h1 className="disp">Our <span>work.</span></h1>
        <div className="intro"><span className="mono">Before / after · reels</span>Every tile is split on the blade: left is what the surface faces without film, right is how it left the studio. Hover to finish the pass.</div>
        <div className="fbar">
          {FILTERS.map((x) => (
              <button key={x.f} type="button" className={filter === x.f ? 'on' : undefined} aria-pressed={filter === x.f} onClick={() => choose(x.f)}>
                {x.label}{x.sup && <sup>{x.sup}</sup>}
              </button>
          ))}
          <div className="view" role="group" aria-label="Layout">
            <button type="button" className={'rs' + (!reelsOnly ? ' on' : '')} aria-pressed={!reelsOnly} onClick={() => setReelsOnly(false)}>Grid</button>
            <button type="button" className={'rs' + (reelsOnly ? ' on' : '')} aria-pressed={reelsOnly} onClick={() => setReelsOnly(true)}>Reels only</button>
          </div>
        </div>
      </section>

      <section className="grid" aria-label="Before and after gallery">
        {TILES.map((t) => (
          <div key={t.seed} className={'tile' + (t.shape ? ' ' + t.shape : '')} data-cat={t.cat} data-hover-host="" hidden={!show(t)}>
            <Wipe hover kind={t.cat} pos={0.5} seed={t.seed} zone={t.zone} chips={t.chips} rings={t.rings} knife={t.knife} kzone={t.kzone} sun={t.sun}
              media={
                t.img ? <Pic src={t.img.src} op={t.img.op} alt={t.img.alt} />
                : t.marble ? <Marble className="w-img" seed={t.marble.seed} width={t.marble.w} height={t.marble.h} />
                : t.city ? <City seed={t.city.seed} sunx={t.city.sunx} /> : null
              } />
            {t.bars && <><div className="bars">{t.bars.map((b, i) => <s key={i} className={b || undefined} />)}</div><div className="play" aria-hidden="true" /></>}
            <div className="meta"><div><b>{t.b}</b><span>{t.s}</span></div>{t.shape !== 'reel' && <em>{t.cat}</em>}</div>
          </div>
        ))}
      </section>
      <div className="wnote"><span className="note">Paint: real photos, damage left of the blade simulated</span><span className="note">Stone + glass: sample imagery until the first jobs are shot</span></div>
    </>
  )
}
