'use client'

import { useEffect, useRef } from 'react'

/* Procedural marble: sine bands warped by turbulence. Sample imagery only (always labelled on the page). */
function drawMarble(cv: HTMLCanvasElement, seed: number) {
  const W = cv.width, H = cv.height, ctx = cv.getContext('2d')
  if (!ctx) return
  const img = ctx.createImageData(W, H), d = img.data
  const P = new Uint8Array(512)
  let s = seed
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647
  const p = Array.from({ length: 256 }, (_, i) => i)
  for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [p[i], p[j]] = [p[j], p[i]] }
  for (let i = 0; i < 512; i++) P[i] = p[i & 255]
  const g: number[] = []
  for (let i = 0; i < 256; i++) g.push(rnd() * 2 - 1)
  const fade = (t: number) => t * t * (3 - 2 * t)
  const noise = (x: number, y: number) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, X = xi & 255, Y = yi & 255
    const a = g[P[P[X] + Y]], b = g[P[P[X + 1] + Y]], c = g[P[P[X] + Y + 1]], e = g[P[P[X + 1] + Y + 1]]
    const u = fade(xf), v = fade(yf)
    return a + (b - a) * u + (c + (e - c) * u - (a + (b - a) * u)) * v
  }
  const turb = (x: number, y: number) => { let t = 0, f = 1, amp = 1; for (let o = 0; o < 6; o++) { t += Math.abs(noise(x * f, y * f)) * amp; f *= 2; amp *= 0.5 } return t }
  const sc = 3 / Math.max(W, H)
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const nx = x * sc, ny = y * sc
    const v1 = Math.sin((nx * 1.0 + ny * 1.9) * 2.2 + turb(nx * 0.8, ny * 0.8) * 2.4)
    const v2 = Math.sin((nx * 1.1 + ny * 2.4) * 3.1 + turb(nx * 1.1 + 7.3, ny * 1.1 + 2.1) * 4.8)
    const vein = Math.pow(1 - Math.abs(v1), 10) * 0.5 + Math.pow(1 - Math.abs(v1), 60) * 0.4 + Math.pow(1 - Math.abs(v2), 45) * 0.32
    const cloud = noise(nx * 2, ny * 2) * 0.5 + 0.5
    const i = (y * W + x) * 4, base = 240 - cloud * 10
    d[i] = base - vein * 120; d[i + 1] = base - 3 - vein * 124; d[i + 2] = base - 8 - vein * 128; d[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  const gr = ctx.createLinearGradient(0, 0, W, H * 0.8)
  gr.addColorStop(0, 'rgba(255,255,255,.35)')
  gr.addColorStop(0.45, 'rgba(255,255,255,0)')
  ctx.fillStyle = gr
  ctx.fillRect(0, 0, W, H)
}

// every wipe renders its media twice (before + after); draw each seed/size once and copy it
const cache = new Map<string, HTMLCanvasElement>()

export default function Marble({ seed, width, height, className }: { seed: number; width: number; height: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const key = `${seed}:${width}x${height}`
    const hit = cache.get(key)
    if (hit) { cv.getContext('2d')?.drawImage(hit, 0, 0); return }
    drawMarble(cv, seed)
    cache.set(key, cv)
  }, [seed, width, height])
  return <canvas ref={ref} className={className} width={width} height={height} aria-hidden="true" />
}
