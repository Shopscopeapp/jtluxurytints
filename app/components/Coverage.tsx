/* Top-down coverage diagram (orange hatch = film). Port of coverage.js. */
const BODY =
  'M100 8C150 8 172 22 176 60L180 130C182 160 184 200 184 240L182 380C180 418 160 432 100 432C40 432 20 418 18 380L16 240C16 200 18 160 20 130L24 60C28 22 50 8 100 8Z'
const ZONES = {
  front: [{ y: 0, h: 50 }, { y: 50, h: 40 }],
  full: [{ y: 0, h: 152 }],
  body: [{ y: 0, h: 440 }],
}
export type CoverageKind = keyof typeof ZONES

export default function Coverage({ kind, dark, id }: { kind: CoverageKind; dark?: boolean; id: string }) {
  const base = dark ? '#1f1f22' : '#ebe6de', line = dark ? '#5a5a5e' : '#0B0B0C', glass = dark ? '#2c2c30' : '#cfc9bf'
  const mirror = kind !== 'front' ? '#F5730F' : base
  return (
    <svg viewBox="-14 -6 228 452" overflow="visible" role="img" aria-label={`Coverage diagram: ${kind === 'front' ? 'front pack' : kind === 'full' ? 'full front' : 'full body'}`}>
      <defs>
        <clipPath id={id}><path d={BODY} /></clipPath>
        <pattern id={id + 'h'} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <rect width="6" height="6" fill="#F5730F" />
          <rect width="1.4" height="6" fill="#F2A462" />
        </pattern>
      </defs>
      <rect x="6" y="78" width="14" height="56" rx="4" fill={line} />
      <rect x="180" y="78" width="14" height="56" rx="4" fill={line} />
      <rect x="6" y="318" width="14" height="58" rx="4" fill={line} />
      <rect x="180" y="318" width="14" height="58" rx="4" fill={line} />
      <path d={BODY} fill={base} />
      <g clipPath={`url(#${id})`} fill={`url(#${id}h)`}>
        {ZONES[kind].map((z) => <rect key={z.y} x="0" y={z.y} width="200" height={z.h} />)}
      </g>
      <path d="M46 168C80 156 120 156 154 168L146 212C116 204 84 204 54 212Z" fill={glass} opacity=".9" />
      <path d="M58 318C86 326 114 326 142 318L150 352C116 362 84 362 50 352Z" fill={glass} opacity=".9" />
      <path d="M40 104C60 112 140 112 160 104" fill="none" stroke={line} strokeWidth="1" opacity=".5" />
      <ellipse cx="54" cy="40" rx="20" ry="9" fill="none" stroke={line} strokeWidth="1.4" />
      <ellipse cx="146" cy="40" rx="20" ry="9" fill="none" stroke={line} strokeWidth="1.4" />
      <ellipse cx="2" cy="186" rx="12" ry="8" fill={mirror} stroke={line} strokeWidth="1.4" />
      <ellipse cx="198" cy="186" rx="12" ry="8" fill={mirror} stroke={line} strokeWidth="1.4" />
      <path d={BODY} fill="none" stroke={line} strokeWidth="2" />
      <text x="100" y="-14" textAnchor="middle" style={{ fontFamily: 'var(--mono)' }} fontSize="9" letterSpacing="1.5" fill={dark ? '#8f8a84' : '#6c6760'}>FRONT</text>
    </svg>
  )
}
