'use client'

import { useState, type FormEvent } from 'react'
import { validPhone } from '../../lib/site'
import { Field, useLead } from './fields'

const SERVICES = ['Paint', 'Stone', 'Glass']
const JOB_HINT: Record<string, string> = {
  Paint: 'e.g. 2024 Porsche 911, full front',
  Stone: 'e.g. Marble kitchen island, 3m',
  Glass: 'e.g. Office in Richmond, west glass',
}

/** Homepage quote form (the design's "What are we protecting?" card). */
export default function QuickQuote() {
  const [service, setService] = useState('Paint')
  const [f, setF] = useState({ name: '', phone: '', job: '', notes: '' })
  const [errs, setErrs] = useState<Record<string, string>>({})
  const { status, error, submit } = useLead()
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }))

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const er: Record<string, string> = {}
    if (!f.name.trim()) er.name = 'Add your name'
    if (!validPhone(f.phone)) er.phone = 'Add a phone number Julian can call'
    setErrs(er)
    if (Object.keys(er).length) return
    submit({
      _subject: `Quote request (${service}) from ${f.name}`,
      source: 'Homepage quote form',
      service,
      name: f.name,
      phone: f.phone,
      details: f.job,
      notes: f.notes,
    })
  }

  if (status === 'sent') {
    return (
      <form aria-live="polite" onSubmit={(e) => e.preventDefault()}>
        <div className="fsent">
          <span className="mono" style={{ color: '#6c6760' }}>Sent · {service}</span>
          <div className="disp" style={{ marginTop: 14 }}>Sent<span>.</span></div>
          <p>Julian&apos;s got it. He&apos;ll come back with options and a price, from the person who&apos;ll fit it.</p>
        </div>
      </form>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Quote request">
      <span className="mono" id="qq-what" style={{ color: '#6c6760' }}>What are we protecting?</span>
      <div className="tabs" role="group" aria-labelledby="qq-what">
        {SERVICES.map((s) => (
          <button key={s} type="button" className={'rs' + (s === service ? ' on' : '')} aria-pressed={s === service} onClick={() => setService(s)}>{s}</button>
        ))}
      </div>
      <div className="f2">
        <Field label="Name" value={f.name} onChange={set('name')} placeholder="Your name" autoComplete="name" required error={errs.name} />
        <Field label="Phone" value={f.phone} onChange={set('phone')} placeholder="Your mobile" type="tel" autoComplete="tel" required error={errs.phone} />
        <Field full label={service === 'Paint' ? 'Car, or the job' : 'The job'} value={f.job} onChange={set('job')} placeholder={JOB_HINT[service]} />
        <label className="full">Anything else
          <textarea value={f.notes} onChange={(e) => set('notes')(e.target.value)} placeholder="Daily, track days, new delivery date…" />
        </label>
      </div>
      <div className="send">
        <span className="mono">Julian replies himself</span>
        <button className="btn k" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send for a quote'} <i aria-hidden="true">&#8599;</i>
        </button>
      </div>
      {status === 'error' && <p className="fmsg" role="alert">{error}</p>}
    </form>
  )
}
