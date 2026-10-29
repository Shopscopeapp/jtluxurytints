'use client'

import { useState, type FormEvent } from 'react'
import { validPhone } from '../../lib/site'
import { Field, useLead } from './fields'

const PACKS = ['Front', 'Full front', 'Full body']

/** Ads landing-page quote form (dark card on orange). */
export default function LandingForm({ variant, cta, modelHint }: { variant: string; cta: string; modelHint: string }) {
  const [pack, setPack] = useState('Full front')
  const [f, setF] = useState({ name: '', phone: '', model: '' })
  const [errs, setErrs] = useState<Record<string, string>>({})
  const { status, error, submit } = useLead()
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }))

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const er: Record<string, string> = {}
    if (!f.name.trim()) er.name = 'Add your name'
    if (!validPhone(f.phone)) er.phone = 'Add a phone number'
    setErrs(er)
    if (Object.keys(er).length) return
    submit({
      _subject: `PPF quote (${variant} landing page) from ${f.name}`,
      source: `Landing page /ppf/${variant}`,
      landing_variant: variant,
      service: 'Paint',
      package: pack,
      name: f.name,
      phone: f.phone,
      details: f.model,
    })
  }

  if (status === 'sent') {
    return (
      <form id="lp-form" aria-live="polite" onSubmit={(e) => e.preventDefault()}>
        <span className="mono">Sent · {pack}</span>
        <div className="fsent">
          <div className="disp" style={{ fontSize: 96 }}>Sent<span>.</span></div>
          <p style={{ color: '#cfcac2' }}>Julian&apos;s got it. He&apos;ll come back with options and a price, from the person who&apos;ll fit it.</p>
        </div>
      </form>
    )
  }

  return (
    <form id="lp-form" noValidate onSubmit={onSubmit} aria-label="PPF quote request">
      <span className="mono" id="lp-cov">Which coverage?</span>
      <div className="pk" role="group" aria-labelledby="lp-cov">
        {PACKS.map((p) => (
          <button key={p} type="button" className={'rs' + (p === pack ? ' on' : '')} aria-pressed={p === pack} onClick={() => setPack(p)}>{p}</button>
        ))}
      </div>
      <div className="f2">
        <Field label="Name" value={f.name} onChange={set('name')} placeholder="Your name" autoComplete="name" required error={errs.name} />
        <Field label="Phone" value={f.phone} onChange={set('phone')} placeholder="Your mobile" type="tel" autoComplete="tel" required error={errs.phone} />
        <Field full label="Model + year" value={f.model} onChange={set('model')} placeholder={modelHint} />
      </div>
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : cta} <i aria-hidden="true">&#8599;</i>
      </button>
      {status === 'error' && <p className="fmsg" role="alert">{error}</p>}
      <span className="mono fine">Julian replies himself</span>
    </form>
  )
}
