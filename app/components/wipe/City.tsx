import React from 'react'
import { rngOf } from './engine'

/* Code-drawn office view through a window (glass sample imagery). Deterministic per seed, so it renders on the server. */
export default function City({ seed, sunx = 250, className = 'w-img', style }: { seed: number; sunx?: number; className?: string; style?: React.CSSProperties }) {
  const r = rngOf(seed)
  const els: React.ReactNode[] = []
  let k = 0
  const rect = (a: React.SVGProps<SVGRectElement>) => els.push(<rect key={k++} {...a} />)
  const layer = (yMin: number, yMax: number, wMin: number, wMax: number, col: string, lit?: string) => {
    let x = -20
    while (x < 1220) {
      const w = wMin + r() * (wMax - wMin), top = yMin + r() * (yMax - yMin)
      rect({ x, y: top, width: w, height: 800 - top, fill: col })
      if (lit) for (let yy = top + 14; yy < 700; yy += 16) rect({ x: x + 6, y: yy, width: w - 12, height: 5, fill: lit, opacity: 0.35 + r() * 0.4 })
      if (r() > 0.7) rect({ x: x + w / 2 - 1.5, y: top - 30 - r() * 30, width: 3, height: 60, fill: col })
      x += w + r() * 14
    }
  }
  layer(300, 420, 50, 110, '#8798a5')
  layer(230, 380, 80, 150, '#55636f', '#9fb2bf')
  layer(360, 520, 110, 190, '#2d363e', '#6c7f8c')
  const sky = `sky${seed}`
  return (
    <svg className={className} style={style} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={sky} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" stopColor="#6f97b3" />
          <stop offset=".55" stopColor="#b9cbd3" />
          <stop offset="1" stopColor="#e8d9c3" />
        </linearGradient>
      </defs>
      <rect width={1200} height={800} fill={`url(#${sky})`} />
      <circle cx={sunx} cy={170} r={34} fill="#fff6e2" />
      {els}
      {/* window frame + interior */}
      <rect x={0} y={640} width={1200} height={160} fill="#15191c" />
      <rect x={0} y={628} width={1200} height={16} fill="#0c0e10" />
      {[0, 395, 790, 1185].map((x) => <rect key={x} x={x - 8} y={0} width={26} height={800} fill="#0c0e10" />)}
      <rect x={0} y={0} width={1200} height={22} fill="#0c0e10" />
      {/* desk + monitor silhouettes */}
      <rect x={560} y={690} width={520} height={14} fill="#22282d" />
      <rect x={700} y={600} width={170} height={96} rx={4} fill="#0f1215" />
      <rect x={778} y={692} width={14} height={10} fill="#0f1215" />
      <path d="M150 800 C150 700 190 640 230 650 C270 640 300 700 300 800Z" fill="#101315" />
    </svg>
  )
}
