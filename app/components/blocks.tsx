import Link from 'next/link'
import React from 'react'
import { PHONE, TEL } from '../lib/site'
import Nav from './Nav'
import Wipe, { type WipeProps } from './wipe/Wipe'

export const Arrow = () => <i aria-hidden="true">&#8599;</i>

/** Internal routes go through next/link; tel:, #hash and external hrefs stay plain anchors. */
export function A({ href, className, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (href.startsWith('/')) return <Link href={href} className={className} {...rest}>{children}</Link>
  return <a href={href} className={className} {...rest}>{children}</a>
}

/** Service-page hero: full-bleed wipe, crumb, tag, copy row with Call + primary CTA. */
export function PHero({ wipe, crumb, ptag, text, cta, extra }: {
  wipe: WipeProps
  crumb: React.ReactNode
  ptag: React.ReactNode
  text: string
  cta: { href: string; label: string }
  extra?: React.ReactNode
}) {
  return (
    <section className="phero">
      <Nav />
      <Wipe anim {...wipe} />
      <div className="scrim" />
      <div className="crumb mono">{crumb}</div>
      <div className="ptag">{ptag}</div>
      {extra}
      <div className="prow">
        <p>{text}</p>
        <div className="cta">
          <a className="btn line" href={TEL}>Call<span className="hm">&nbsp;{PHONE}</span></a>
          <A className="btn o" href={cta.href}>{cta.label} <Arrow /></A>
        </div>
      </div>
    </section>
  )
}

export function SHead({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return <div className="shead"><h2 className="disp">{title}</h2><p>{children}</p></div>
}

/** Mid-pass process row: the step numbers + titles go hollow left of the blade. */
export function Proc7({ steps, hot, pos, seed, six, overStyle }: {
  steps: { h: string; p: string }[]
  hot: number
  pos: number
  seed: number
  six?: boolean
  overStyle?: React.CSSProperties
}) {
  return (
    <Wipe kind="flat" className="proc7" pos={pos} posm={0.5} seed={seed}
      over={
        <div className="w-over" style={overStyle}>
          <div className={'row7' + (six ? ' r6' : '')}>
            {steps.map((s, i) => (
              <div key={s.h} className={i === hot ? 'hot' : undefined}>
                <span className="n w-txt ink">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="w-txt ink">{s.h}</h4>
                <p className="w-soft">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      } />
  )
}

/** Orange closing CTA band. */
export function PCta({ title, text, primary, secondary }: {
  title: React.ReactNode
  text: string
  primary: { href: string; label: string }
  secondary?: { href: string; label: string; external?: boolean }
}) {
  const sec = secondary ?? { href: TEL, label: `Call ${PHONE}` }
  return (
    <section className="pcta">
      <h2 className="disp">{title}</h2>
      <div className="side">
        <p>{text}</p>
        <div className="acts">
          <A className="btn k" href={primary.href}>{primary.label} <Arrow /></A>
          <A className="btn line" href={sec.href} {...(secondary?.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{sec.label}</A>
        </div>
      </div>
    </section>
  )
}
