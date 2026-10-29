/* Squeegee wipe engine, ported from the static design's wipe.js.
   React renders the before/after layers, edge and tags; this module lays them out along a hard
   angled edge (30deg, the cut angle of the JT mark), draws the size-dependent damage + droplets,
   and runs the motion: data-anim (hero on load), data-hover (tiles), data-scroll (sections), data-drag. */

const NS = 'http://www.w3.org/2000/svg'
type Attrs = Record<string, string | number>

export const rngOf = (seed: number) => {
  let s = (seed * 9301 + 49297) % 233280 || 7
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

const el = (tag: string, attrs: Attrs = {}, parent?: Element) => {
  const n = document.createElementNS(NS, tag)
  for (const k in attrs) n.setAttribute(k, String(attrs[k]))
  if (parent) parent.appendChild(n)
  return n
}
const nums = (s: string | undefined, d: string) => (s || d).trim().split(/\s+/).map(Number)

/* ---------- damage overlays ---------- */
function paintDamage(svg: SVGSVGElement, W: number, H: number, ds: DOMStringMap, r: () => number) {
  const z = nums(ds.zone, '0 0 1 1')
  const n = +(ds.chips || 220)
  const g = el('g', {}, svg)
  // swirl marks: short arcs around a light source
  const sw = nums(ds.swirl, '.5 .3'), cx = sw[0] * W, cy = sw[1] * H
  for (let i = 0; i < 260; i++) {
    const rad = 20 + r() * Math.max(W, H) * 0.55, a0 = r() * Math.PI * 2, da = 0.04 + r() * 0.22
    const x1 = cx + Math.cos(a0) * rad, y1 = cy + Math.sin(a0) * rad, x2 = cx + Math.cos(a0 + da) * rad, y2 = cy + Math.sin(a0 + da) * rad
    el('path', { d: `M${x1} ${y1} A${rad} ${rad} 0 0 1 ${x2} ${y2}`, fill: 'none', stroke: '#fff', 'stroke-width': 0.5 + r() * 0.7, opacity: 0.08 + r() * 0.22 }, g)
  }
  // long scratches
  for (let i = 0; i < 9; i++) {
    const x = (z[0] + r() * (z[2] - z[0])) * W, y = (z[1] + r() * (z[3] - z[1])) * H, l = 30 + r() * 140, a = -0.4 + r() * 0.8
    el('path', { d: `M${x} ${y} q${l / 2} ${l * a * 0.3 - 6} ${l} ${l * a}`, fill: 'none', stroke: '#eceae6', 'stroke-width': 0.6 + r() * 0.6, opacity: 0.35 + r() * 0.3 }, g)
  }
  // stone chips: denser toward the leading edge (bottom of zone)
  for (let i = 0; i < n; i++) {
    const fy = Math.pow(r(), 0.55), x = (z[0] + r() * (z[2] - z[0])) * W, y = (z[1] + fy * (z[3] - z[1])) * H
    const s = (0.6 + r() * r() * 3.6) * (W / 1200 + 0.45), k = 5 + Math.floor(r() * 3)
    let d = ''
    for (let j = 0; j < k; j++) {
      const a = (j / k) * Math.PI * 2, rr = s * (0.55 + r() * 0.6)
      d += (j ? 'L' : 'M') + (x + Math.cos(a) * rr).toFixed(1) + ' ' + (y + Math.sin(a) * rr * 0.8).toFixed(1)
    }
    el('path', { d: d + 'Z', fill: r() > 0.35 ? '#e4e1dc' : '#b9b6b0', stroke: 'rgba(0,0,0,.45)', 'stroke-width': 0.6 }, g)
    if (s > 2.4) el('circle', { cx: x + s * 0.1, cy: y, r: s * 0.35, fill: r() > 0.5 ? '#6e6a63' : '#9a958c' }, g)
  }
}

function stoneDamage(svg: SVGSVGElement, W: number, H: number, ds: DOMStringMap, r: () => number, noDrip: boolean) {
  const defs = el('defs', {}, svg), id = 'etch' + Math.floor(r() * 1e6)
  // soft, slightly wobbly edges for everything spilled
  const f = el('filter', { id, x: '-30%', y: '-30%', width: '160%', height: '160%' }, defs)
  el('feTurbulence', { type: 'fractalNoise', baseFrequency: 0.05, numOctaves: 2, seed: 7, result: 't' }, f)
  el('feDisplacementMap', { in: 'SourceGraphic', in2: 't', scale: 5, result: 'd' }, f)
  el('feGaussianBlur', { in: 'd', stdDeviation: 1 }, f)
  const fs = el('filter', { id: id + 's', x: '-30%', y: '-30%', width: '160%', height: '160%' }, defs)
  el('feGaussianBlur', { stdDeviation: 2.2 }, fs)
  // matte etch: mottled, colourless, edges dissolve
  const fm = el('filter', { id: id + 'm', x: '-40%', y: '-40%', width: '180%', height: '180%' }, defs)
  el('feTurbulence', { type: 'fractalNoise', baseFrequency: 0.022, numOctaves: 3, seed: 11, result: 'n' }, fm)
  el('feDisplacementMap', { in: 'SourceGraphic', in2: 'n', scale: 26, result: 'd' }, fm)
  el('feGaussianBlur', { in: 'd', stdDeviation: 3.2 }, fm)
  const g = el('g', { filter: `url(#${id})` }, svg)
  const ring = (x: number, y: number, R: number, segs: number[][], w: number, col: string, op: number) => {
    segs.forEach(([a0, a1]) => {
      let d = ''
      for (let k = 0; k <= 40; k++) {
        const a = a0 + ((a1 - a0) * k) / 40, rr = R * (1 + Math.sin(a * 3 + x) * 0.025 + Math.sin(a * 7 + y) * 0.015)
        d += (k ? 'L' : 'M') + (x + Math.cos(a) * rr).toFixed(1) + ' ' + (y + Math.sin(a) * rr * 0.93).toFixed(1)
      }
      el('path', { d, fill: 'none', stroke: col, 'stroke-width': w, opacity: op, 'stroke-linecap': 'round' }, g)
    })
  }
  const rings = (ds.rings || '').trim().split(';').filter(Boolean).map((s) => s.trim().split(/\s+/).map(Number))
  rings.forEach(([fx, fy, fr, type], i) => {
    const x = fx * W, y = fy * H, R = fr * Math.min(W, H)
    if (type === 1 || type === 2) {
      const coffee = type === 2, rim = coffee ? 'rgb(92,66,44)' : 'rgb(92,58,66)', mid = coffee ? 'rgb(112,84,58)' : 'rgb(108,72,80)'
      // wine: faint pale pool, concentrated dark rim, broken in places
      const gid = id + 'w' + i, rg = el('radialGradient', { id: gid }, defs)
      const stops = coffee
        ? [['0', 'rgba(150,124,100,0)'], ['.72', 'rgba(140,110,84,.06)'], ['.96', 'rgba(118,88,60,.15)'], ['1', 'rgba(118,88,60,0)']]
        : [['0', 'rgba(150,120,124,0)'], ['.72', 'rgba(140,104,110,.05)'], ['.96', 'rgba(118,78,86,.13)'], ['1', 'rgba(118,78,86,0)']]
      stops.forEach(([o, c]) => el('stop', { offset: o, 'stop-color': c }, rg))
      el('ellipse', { cx: x, cy: y, rx: R * 1.02, ry: R * 0.95, fill: `url(#${gid})` }, g)
      const s0 = r() * 6.28, gap1 = 0.35 + r() * 0.5, gap2 = 0.15 + r() * 0.3
      const segs = [[s0, s0 + 6.28 - gap1 - gap2 - 1.1], [s0 + 6.28 - gap1 - 0.9, s0 + 6.28 - gap1]]
      ring(x, y, R, segs, 1.7 + r(), rim, 0.58)
      ring(x, y, R * 0.985, segs, 5 + r() * 2, mid, 0.14)
      if (r() > 0.4) ring(x + R * 0.06, y - R * 0.04, R * (0.9 + r() * 0.06), [[s0 + 1, s0 + 2.6]], 1, mid, 0.22)
      if (i === 0 && !coffee && !noDrip) {
        // one drip, dragged out of the ring
        const a = 0.7, sx = x + Math.cos(a) * R, sy = y + Math.sin(a) * R * 0.93
        const sm = el('g', { filter: `url(#${id}s)` }, svg)
        el('path', { d: `M${sx - R * 0.08} ${sy - R * 0.04} C${sx + R * 0.2} ${sy + R * 0.1} ${sx + R * 0.34} ${sy + R * 0.3} ${sx + R * 0.62} ${sy + R * 0.44} C${sx + R * 0.66} ${sy + R * 0.5} ${sx + R * 0.56} ${sy + R * 0.54} ${sx + R * 0.5} ${sy + R * 0.5} C${sx + R * 0.28} ${sy + R * 0.38} ${sx + R * 0.1} ${sy + R * 0.2} ${sx - R * 0.1} ${sy + R * 0.08}Z`, fill: 'rgba(110,72,80,.2)' }, sm)
        el('ellipse', { cx: sx + R * 0.58, cy: sy + R * 0.47, rx: R * 0.07, ry: R * 0.045, fill: 'rgba(96,60,68,.26)' }, sm)
      }
    } else {
      // lemon / vinegar etch: dull, slightly lighter, colourless patch
      const m = el('g', { filter: `url(#${id}m)` }, svg)
      el('ellipse', { cx: x, cy: y, rx: R, ry: R * (0.6 + r() * 0.25), transform: `rotate(${r() * 180} ${x} ${y})`, fill: 'rgba(255,255,253,.3)', stroke: 'rgba(255,255,255,.42)', 'stroke-width': 2.5 }, m)
      el('ellipse', { cx: x + R * 0.5, cy: y + R * 0.25, rx: R * 0.45, ry: R * 0.35, fill: 'rgba(255,255,253,.2)' }, m)
      el('ellipse', { cx: x - R * 0.1, cy: y - R * 0.05, rx: R * 0.55, ry: R * 0.4, fill: 'rgba(160,156,148,.12)' }, m)
    }
  })
  // a few fine knife marks
  const kn = +(ds.knife || 14), kz = nums(ds.kzone, '0 0 1 1')
  for (let i = 0; i < kn; i++) {
    const x = (kz[0] + r() * (kz[2] - kz[0])) * W, y = (kz[1] + r() * (kz[3] - kz[1])) * H, l = 18 + r() * 60
    const a = ds.knife ? 2.6 + r() * 0.5 : r() * Math.PI
    el('line', { x1: x, y1: y, x2: x + Math.cos(a) * l, y2: y + Math.sin(a) * l, stroke: '#fff', 'stroke-width': 0.6, opacity: 0.3 + r() * 0.25 }, svg)
  }
}

function glassDamage(svg: SVGSVGElement, W: number, H: number, ds: DOMStringMap) {
  const [sx, sy] = nums(ds.sun, '.21 .2'), id = 'g' + Math.floor(Math.random() * 1e6)
  const defs = el('defs', {}, svg)
  const rg = el('radialGradient', { id, cx: sx, cy: sy, r: 0.75 }, defs)
  ;[['0', 'rgba(255,255,250,1)'], ['.08', 'rgba(255,252,240,.95)'], ['.3', 'rgba(255,246,228,.55)'], ['1', 'rgba(255,246,230,0)']].forEach(([o, c]) => el('stop', { offset: o, 'stop-color': c }, rg))
  el('rect', { width: W, height: H, fill: `url(#${id})` }, svg)
  el('rect', { x: 0, y: sy * H - 3, width: W, height: 6, fill: 'rgba(255,255,255,.55)' }, svg)
  el('rect', { x: 0, y: sy * H - 18, width: W, height: 36, fill: 'rgba(255,255,255,.12)' }, svg)
  ;[0.35, 0.52, 0.7, 0.86].forEach((t, i) =>
    el('circle', { cx: sx * W + (W * 0.55 - sx * W) * t * 1.6, cy: sy * H + (H * 0.62 - sy * H) * t * 1.6, r: 10 + i * 9, fill: 'none', stroke: 'rgba(255,240,210,.35)', 'stroke-width': 2 }, svg),
  )
}

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches || /[?&]static\b/.test(window.location.search)

const ease = (k: number) => 1 - Math.pow(1 - k, 4) // ~ cubic-bezier(.22,1,.36,1)

export interface WipeHandle {
  /** move the blade to a new resting position (tweened unless reduced motion) */
  setRest(pos: number): void
  destroy(): void
}

export function mountWipe(wp: HTMLElement): WipeHandle {
  const ds = wp.dataset
  const after = wp.querySelector<HTMLElement>(':scope > .w-after')!
  const edge = wp.querySelector<HTMLElement>(':scope > .w-edge')!
  const dmg = wp.querySelector<SVGSVGElement>(':scope > .w-before .w-dmg')
  const drops = edge.querySelector<SVGSVGElement>('.w-drop')!
  const kind = ds.kind || 'paint'
  const phone = window.matchMedia('(max-width:600px)')
  const still = reducedMotion()
  let rest = +(ds.pos || 0.5)
  let pos = rest
  let raf = 0
  let lastW = 0, lastH = 0
  const cleanups: (() => void)[] = []

  function layout(quick?: boolean) {
    const W = wp.clientWidth, H = wp.clientHeight
    if (!W || !H) return
    const ang = +(ds.ang || 30), t = Math.tan((ang * Math.PI) / 180)
    const p = +((phone.matches && ds.posm) || pos)
    const xc = p * W, xt = xc + (t * H) / 2, xb = xc - (t * H) / 2
    after.style.clipPath = `polygon(${xt}px 0, ${W + 2}px 0, ${W + 2}px ${H}px, ${xb}px ${H}px)`
    const L = H / Math.cos((ang * Math.PI) / 180) + 80
    const bw = parseFloat(getComputedStyle(wp).getPropertyValue('--blade')) || 12
    Object.assign(edge.style, { left: xc - bw / 2 + 'px', top: (H - L) / 2 + 'px', height: L + 'px', transform: `rotate(${ang}deg)` })
    if (quick) return
    // drops (in blade space)
    drops.replaceChildren()
    const r = rngOf(+(ds.seed || 5) + 11)
    const nd = Math.round(L / 9)
    for (let i = 0; i < nd; i++) {
      const y = r() * L, x = 70 - Math.pow(r(), 1.8) * 64, rr = 0.8 + r() * r() * 4.2
      el('circle', { cx: x, cy: y, r: rr, fill: 'rgba(255,255,255,.10)', stroke: 'rgba(255,255,255,.55)', 'stroke-width': 0.7 }, drops)
      el('circle', { cx: x - rr * 0.3, cy: y - rr * 0.35, r: rr * 0.28, fill: 'rgba(255,255,255,.9)' }, drops)
    }
    // damage (in px)
    if (!dmg) return
    dmg.replaceChildren()
    dmg.setAttribute('viewBox', `0 0 ${W} ${H}`)
    const r2 = rngOf(+(ds.seed || 9))
    if (kind === 'paint') paintDamage(dmg, W, H, ds, r2)
    if (kind === 'stone') stoneDamage(dmg, W, H, ds, r2, 'nodrip' in ds)
    if (kind === 'glass') glassDamage(dmg, W, H, ds)
  }

  function tween(to: number, dur: number) {
    cancelAnimationFrame(raf)
    if (still) return
    const from = pos, t0 = performance.now()
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / dur)
      pos = from + (to - from) * ease(k)
      layout(true)
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
  }

  // full layout whenever the box changes size (covers window resize and hidden -> shown tiles)
  const ro = new ResizeObserver(() => {
    if (wp.clientWidth === lastW && wp.clientHeight === lastH) return
    lastW = wp.clientWidth
    lastH = wp.clientHeight
    layout()
  })
  ro.observe(wp)
  cleanups.push(() => ro.disconnect())
  // the phone breakpoint switches between pos and posm
  const onMq = () => layout(true)
  phone.addEventListener('change', onMq)
  cleanups.push(() => phone.removeEventListener('change', onMq))
  layout()
  if (document.fonts) document.fonts.ready.then(() => layout(true))

  // hero on load: the blade enters from the right edge and settles mid-pass
  if ('anim' in ds && !still) {
    pos = 1.2
    layout(true)
    const tm = window.setTimeout(() => tween(rest, +(ds.dur || 1100)), 250)
    cleanups.push(() => clearTimeout(tm))
  }
  // tiles: hover finishes the pass, leaving puts the film back mid-pass
  if ('hover' in ds) {
    const host = (wp.closest('[data-hover-host]') as HTMLElement | null) || wp
    const enter = () => tween(-0.25, 420)
    const leave = () => tween(rest, 520)
    host.addEventListener('pointerenter', enter)
    host.addEventListener('pointerleave', leave)
    cleanups.push(() => {
      host.removeEventListener('pointerenter', enter)
      host.removeEventListener('pointerleave', leave)
    })
  }
  // sections: scroll position drives the blade (IntersectionObserver, no scroll listener)
  if ('scroll' in ds && !still && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { pos = rest + (1 - e.intersectionRatio) * 0.7; layout(true) }),
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    )
    io.observe(wp)
    cleanups.push(() => io.disconnect())
  }
  // drag: the blade follows the pointer; arrow keys move it for keyboard users
  if ('drag' in ds) {
    const set = (p: number) => {
      pos = Math.min(0.92, Math.max(0.08, p))
      wp.setAttribute('aria-valuenow', String(Math.round(pos * 100)))
      layout(true)
    }
    const move = (e: PointerEvent) => { const b = wp.getBoundingClientRect(); set((e.clientX - b.left) / b.width) }
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); set(pos + (e.key === 'ArrowLeft' ? -0.05 : 0.05)) }
    }
    wp.addEventListener('pointermove', move)
    wp.addEventListener('keydown', key)
    cleanups.push(() => { wp.removeEventListener('pointermove', move); wp.removeEventListener('keydown', key) })
  }

  return {
    setRest(p: number) {
      if (p === rest) return
      rest = p
      if (still) { pos = p; layout(true) } else tween(p, 700)
    },
    destroy() {
      cancelAnimationFrame(raf)
      cleanups.forEach((f) => f())
    },
  }
}
