import React from 'react'
import { IMG } from '../lib/site'

// natural sizes of public/images/site/*, so every <img> carries width/height (no layout shift)
const SIZES: Record<string, [number, number]> = {
  'c8.jpg': [1500, 2000], 'fitting.jpg': [1320, 1760], 'g63.jpg': [1500, 2000], 'hsv.jpg': [1500, 2000],
  'ig-van.jpg': [640, 640], 'install.jpg': [1320, 1760], 'logo.png': [1001, 318], 'mark-only.png': [1642, 1001],
  'mclaren.jpg': [1500, 2000], 'porsche.jpg': [1440, 1920], 'urus-door.jpg': [1500, 2000], 'urus.jpg': [1500, 2000],
  'window.jpg': [1440, 1920],
}

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string
  /** above the fold: load eagerly */
  eager?: boolean
  /** object-position shorthand */
  op?: string
}

/** Plain <img> from /images/site with intrinsic size + lazy loading by default. */
export default function Pic({ src, eager, op, style, className = 'w-img', alt = '', ...rest }: Props) {
  const [w, h] = SIZES[src] ?? [1200, 1600]
  return (
    <img
      src={`${IMG}/${src}`}
      alt={alt}
      width={w}
      height={h}
      className={className || undefined}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={op ? { objectPosition: op, ...style } : style}
      {...rest}
    />
  )
}
