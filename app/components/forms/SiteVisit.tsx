'use client'

import { useState, type FormEvent } from 'react'
import { validPhone } from '../../lib/site'
import { Chips, Field, useLead } from './fields'

const GROUPS = [
  { k: 'building', label: 'Building type', options: ['Office', 'Shopfront', 'Clinic', 'Hospitality', 'Building'], d: 'Office' },
  { k: 'problem', label: 'Main problem', options: ['Heat', 'Glare', 'Privacy', 'UV'], d: 'Glare' },
  { k: 'facing', label: 'Glass faces', options: ['North', 'East', 'South', 'West', 'Not sure'], d: 'West' },
  { k: 'timing', label: 'Install timing', options: ['Business hours', 'After hours', 'Weekend'], d: 'After hours' },
] as const

/** Commercial tint site-visit request (dark form on the paper section). */
export default function SiteVisit() {
  const [f, setF] = useState({ business: '', suburb: '', name: '', phone: '' })
  const [pick, setPick] = useState<Record<string, string>>(() => Object.fromEntries(GROUPS.map((g) => [g.k, g.d])))
  const [errs, setErrs] = useState<Record<string, string>>({})
  const { status, error, submit } = useLead()
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }))

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const er: Record<string, string> = {}
    if (!f.name.trim()) er.name = 'Add your name'
    if (!validPhone(f.phone)) er.phone = 'Add a phone number'
    if (!f.suburb.trim()) er.suburb = 'Where is the site?'
    setErrs(er)
    if (Object.keys(er).length) return
    submit({
      _subject: `Site visit request (Glass) from ${f.name}${f.business ? `, ${f.business}` : ''}`,
      source: 'Commercial tinting page · site visit form',
      service: 'Glass',
      ...f,
      ...pick,
    })
  }

  if (status === 'sent') {
    return (
      <form aria-live="polite" onSubmit={(e) => e.preventDefault()}>
        <div className="fsent">
          <span className="mono" style={{ color: 'var(--or)' }}>Site visit requested</span>
          <div className="disp" style={{ marginTop: 14 }}>Sent<span>.</span></div>
          <p style={{ color: '#cfcac2' }}>Julian&apos;s got it. He&apos;ll be in touch to book a time to measure up {f.business || 'the site'}.</p>
        </div>
      </form>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Request a site visit">
      <span className="mono" style={{ color: 'var(--or)' }}>Request a site visit</span>
      <div className="f2" style={{ marginTop: 20 }}>
        <Field label="Business" value={f.business} onChange={set('business')} placeholder="Business name" autoComplete="organization" />
        <Field label="Suburb" value={f.suburb} onChange={set('suburb')} placeholder="e.g. Richmond" autoComplete="address-level2" required error={errs.suburb} />
        <Field label="Your name" value={f.name} onChange={set('name')} placeholder="Name" autoComplete="name" required error={errs.name} />
        <Field label="Phone" value={f.phone} onChange={set('phone')} placeholder="Your mobile" type="tel" autoComplete="tel" required error={errs.phone} />
      </div>
      {GROUPS.map((g) => (
        <Chips key={g.k} labelClass="grp" className="chipset" label={g.label} options={[...g.options]} value={pick[g.k]} onChange={(v) => setPick((p) => ({ ...p, [g.k]: v }))} />
      ))}
      <div className="send">
        <span className="mono">Julian replies himself</span>
        <button className="btn o" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Request a visit'} <i aria-hidden="true">&#8599;</i>
        </button>
      </div>
      {status === 'error' && <p className="fmsg" role="alert">{error}</p>}
    </form>
  )
}
