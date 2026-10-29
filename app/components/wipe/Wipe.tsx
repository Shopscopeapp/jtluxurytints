'use client'

import React, { useEffect, useRef } from 'react'
import { mountWipe, type WipeHandle } from './engine'

type Kind = 'paint' | 'stone' | 'glass' | 'flat'

export interface WipeProps {
  kind?: Kind
  /** resting blade position, 0..1 across the box */
  pos?: number
  /** resting position at phone width (<=600px) */
  posm?: number
  seed?: number
  /** paint: chip zone "x0 y0 x1 y1" (fractions) */
  zone?: string
  chips?: number
  swirl?: string
  /** stone: "x y r type; ..." type 0 = etch, 1 = wine, 2 = coffee */
  rings?: string
  knife?: number
  kzone?: string
  nodrip?: boolean
  /** glass: sun position "x y" */
  sun?: string
  ang?: number
  dur?: number
  /** before / after corner tags */
  lb?: string
  la?: string
  tagx?: number
  tagy?: 'b'
  anim?: boolean
  hover?: boolean
  scroll?: boolean
  drag?: boolean
  className?: string
  style?: React.CSSProperties
  /** the image / canvas / svg (class w-img), rendered in both layers */
  media?: React.ReactNode
  /** overlay content (wrap in .w-over), rendered in both layers; .w-txt goes hollow in the before layer */
  over?: React.ReactNode
}

export default function Wipe(p: WipeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const handle = useRef<WipeHandle | null>(null)
  const kind = p.kind || 'paint'

  useEffect(() => {
    if (!ref.current) return
    const h = mountWipe(ref.current)
    handle.current = h
    return () => {
      h.destroy()
      handle.current = null
    }
  }, [])

  // a changed resting position (quote progress) moves the blade
  useEffect(() => {
    if (p.pos !== undefined) handle.current?.setRest(p.pos)
  }, [p.pos])

  const tagSide = p.tagy === 'b' ? 'bottom' : 'top'
  const tagx = p.tagx ?? 20
  const data: Record<string, string | number | undefined> = {
    'data-kind': kind, 'data-pos': p.pos, 'data-posm': p.posm, 'data-seed': p.seed, 'data-zone': p.zone, 'data-chips': p.chips,
    'data-swirl': p.swirl, 'data-rings': p.rings, 'data-knife': p.knife, 'data-kzone': p.kzone, 'data-sun': p.sun,
    'data-ang': p.ang, 'data-dur': p.dur, 'data-anim': p.anim ? '' : undefined, 'data-hover': p.hover ? '' : undefined,
    'data-scroll': p.scroll ? '' : undefined, 'data-drag': p.drag ? '' : undefined, 'data-nodrip': p.nodrip ? '' : undefined,
  }
  const dragProps = p.drag
    ? { tabIndex: 0, role: 'slider', 'aria-label': 'Before and after: use arrow keys to move the squeegee', 'aria-valuemin': 8, 'aria-valuemax': 92, 'aria-valuenow': Math.round((p.pos ?? 0.5) * 100) }
    : {}

  return (
    <div ref={ref} className={'wipe' + (p.className ? ' ' + p.className : '')} style={p.style} {...data} {...dragProps}>
      <div className="w-layer w-before" aria-hidden="true">
        <div className="w-in">
          {p.media}
          <div className="w-haze" />
          <svg className="w-dmg" />
          {p.over}
        </div>
      </div>
      <div className="w-layer w-after">
        <div className="w-in">
          {p.media}
          {kind === 'glass' && <div className="w-tint" />}
          {kind !== 'flat' && <div className="w-gloss" />}
          {p.over}
        </div>
      </div>
      <div className="w-edge" aria-hidden="true">
        <div className="wet" />
        <div className="bead" />
        <div className="blade" />
        <svg className="w-drop" style={{ position: 'absolute', right: 'calc(100% + 2px)', top: 0, height: '100%', width: 70, overflow: 'visible' }} />
      </div>
      {p.lb && <span className="w-tag b" style={{ left: tagx, [tagSide]: 20 }}>{p.lb}</span>}
      {p.la && <span className="w-tag a" style={{ right: tagx, [tagSide]: 20 }}>{p.la}</span>}
    </div>
  )
}
