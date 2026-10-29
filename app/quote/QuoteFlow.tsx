'use client'

import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Coverage, { type CoverageKind } from '../components/Coverage'
import Pic from '../components/Pic'
import { Chips, Field } from '../components/forms/fields'
import { reducedMotion } from '../components/wipe/engine'
import Marble from '../components/wipe/Marble'
import Wipe from '../components/wipe/Wipe'
import { IMG, INSTAGRAM, PHONE, TEL, sendLead, validPhone } from '../lib/site'

type Service = 'Paint' | 'Stone' | 'Glass'
const SERVICES: { s: Service; p: string }[] = [
  { s: 'Paint', p: 'Automotive PPF, plus tint bundle' },
  { s: 'Stone', p: 'Marble and stone benchtops' },
  { s: 'Glass', p: 'Offices, shopfronts, buildings' },
]
const PAINT_PACKS: { k: CoverageKind; b: string; d: string }[] = [
  { k: 'front', b: 'Front', d: 'Bumper, headlights, leading edges' },
  { k: 'full', b: 'Full front', d: 'Full bonnet and guards, bumper, mirrors' },
  { k: 'body', b: 'Full body', d: 'Every painted panel' },
]
const FINISHES = [
  { b: 'Gloss', d: 'For polished marble and stone', m: 51 },
  { b: 'Satin', d: 'For honed and matte stone', m: 52 },
  { b: 'Not sure', d: 'Julian will suggest one on site', m: 53 },
]
const PROBLEMS = [
  { b: 'Heat', d: 'Sun load through big or west-facing glass' },
  { b: 'Glare', d: 'Screens unreadable in the afternoon' },
  { b: 'Privacy', d: 'One-way, frosted or decorative' },
  { b: 'UV', d: 'Fading floors, furniture and stock' },
]
const STEP_NAMES = ['Service', 'Details', 'Package', 'Contact']
// progress image: the blade moves left as steps complete
const POS_BY: Record<number, number> = { 1: 0.82, 2: 0.62, 3: 0.42, 4: 0.22, 5: -0.3 }
const pad = (n: number) => String(n).padStart(2, '0')
const ease = (k: number) => 1 - Math.pow(1 - k, 4)

const initial = {
  service: 'Paint' as Service,
  make: '', model: '', year: '', colour: '', cond: 'Brand new', use: 'Daily',
  stone: '', size: '', where: 'Kitchen island',
  business: '', site: '', building: 'Office', facing: 'West',
  pack: 'Full front', tint: true, finish: 'Gloss', problem: 'Glare', timing: 'After hours',
  name: '', phone: '', email: '', suburb: '', reach: 'Text',
}
type Data = typeof initial

/** Sample office view for the Glass choice tile. */
const MiniCity = () => (
  <svg viewBox="0 0 260 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="260" height="200" fill="#9fb6c4" />
    <rect x="0" y="80" width="40" height="120" fill="#55636f" />
    <rect x="46" y="50" width="60" height="150" fill="#3a4651" />
    <rect x="112" y="96" width="50" height="104" fill="#6c7d8a" />
    <rect x="168" y="40" width="54" height="160" fill="#2d363e" />
    <rect x="226" y="110" width="34" height="90" fill="#55636f" />
    <polygon points="160,0 260,0 260,200 44,200" fill="#0d1820" opacity=".45" />
    <line x1="160" y1="0" x2="44" y2="200" stroke="#F5730F" strokeWidth="5" />
  </svg>
)

export default function QuoteFlow() {
  const [step, setStep] = useState(1)
  const [prev, setPrev] = useState<number | null>(null)
  const [d, setD] = useState<Data>(initial)
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)
  const [sendErr, setSendErr] = useState('')
  const [entry, setEntry] = useState('')
  const stageRef = useRef<HTMLDivElement>(null)
  const curRef = useRef<HTMLDivElement>(null)
  const prevRef = useRef<HTMLDivElement>(null)
  const bladeRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)

  const set = <K extends keyof Data>(k: K) => (v: Data[K]) => setD((p) => ({ ...p, [k]: v }))

  // deep links: ?service=paint|stone|glass, ?package=Full front, ?tint=1, ?step=1-4
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const svc = (q.get('service') || '').toLowerCase()
    const match = SERVICES.find((x) => x.s.toLowerCase() === svc)
    const pack = q.get('package')
    setD((p) => ({
      ...p,
      ...(match ? { service: match.s } : {}),
      ...(pack && PAINT_PACKS.some((x) => x.b === pack) ? { pack } : {}),
      ...(q.get('tint') === '1' ? { tint: true } : {}),
    }))
    const st = Number(q.get('step'))
    if (st >= 1 && st <= 4) setStep(st)
    const ref = document.referrer && new URL(document.referrer).origin === window.location.origin ? new URL(document.referrer).pathname : ''
    setEntry([q.toString(), ref && `from ${ref}`].filter(Boolean).join(' · '))
  }, [])

  function go(to: number) {
    if (to === step) return
    moved.current = true
    setErrs({})
    if (reducedMotion()) { setPrev(null); setStep(to); return }
    setPrev(step)
    setStep(to)
  }

  // step transition: the new step is wiped on over the old one along a 30deg edge
  useLayoutEffect(() => {
    if (prev === null) return
    const stage = stageRef.current, np = curRef.current, blade = bladeRef.current
    if (!stage || !np || !blade) return
    if (prevRef.current) prevRef.current.style.clipPath = ''
    const k = Math.tan(Math.PI / 6), t0 = performance.now(), dur = 720
    let raf = 0
    const frame = (now: number) => {
      const W = stage.clientWidth, H = stage.clientHeight
      const e = ease(Math.min(1, (now - t0) / dur))
      const from = W + (k * H) / 2 + 12, to = -(k * H) / 2 - 12
      const xc = from + (to - from) * e, xt = xc + (k * H) / 2, xb = xc - (k * H) / 2
      np.style.clipPath = `polygon(${xt}px 0,${W}px 0,${W}px ${H}px,${xb}px ${H}px)`
      const L = H / Math.cos(Math.PI / 6) + 60
      Object.assign(blade.style, { display: 'block', left: xc - 6 + 'px', top: (H - L) / 2 + 'px', height: L + 'px', transform: 'rotate(30deg)' })
      if (e < 1) raf = requestAnimationFrame(frame)
      else {
        np.style.clipPath = ''
        blade.style.display = 'none'
        setPrev(null)
      }
    }
    frame(t0)
    return () => cancelAnimationFrame(raf)
  }, [prev, step])

  // keyboard / screen-reader users land on the new step's heading
  useEffect(() => {
    if (moved.current) headRef.current?.focus({ preventScroll: true })
  }, [step])

  function validate(s: number) {
    const er: Record<string, string> = {}
    if (s === 2) {
      if (d.service === 'Paint' && !d.model.trim()) er.model = 'Add the model'
      if (d.service === 'Stone' && !d.stone.trim()) er.stone = 'What stone is it?'
      if (d.service === 'Glass' && !d.site.trim()) er.site = 'Where is the site?'
    }
    if (s === 4) {
      if (!d.name.trim()) er.name = 'Add your name'
      if (!validPhone(d.phone)) er.phone = 'Add a phone number Julian can reach'
      if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) er.email = 'Check the email address'
    }
    setErrs(er)
    return Object.keys(er).length === 0
  }

  const summary = (): [string, string][] => {
    if (d.service === 'Paint')
      return [['Service', 'Paint'], ['Car', [d.year, d.make, d.model].filter(Boolean).join(' ') || '—'], ['Package', d.pack], ['Add-on', d.tint ? 'Tint' : 'None']]
    if (d.service === 'Stone') return [['Service', 'Stone'], ['Benchtop', d.stone || '—'], ['Finish', d.finish], ['Where', d.where]]
    return [['Service', 'Glass'], ['Site', d.business || d.site], ['Problem', d.problem], ['Timing', d.timing]]
  }

  async function send() {
    if (!validate(4)) return
    setSending(true)
    setSendErr('')
    const details: Record<string, string> =
      d.service === 'Paint'
        ? { make: d.make, model: d.model, year: d.year, colour: d.colour, condition: d.cond, driven: d.use, package: d.pack, tint_bundle: d.tint ? 'Yes' : 'No' }
        : d.service === 'Stone'
          ? { stone: d.stone, approx_size: d.size, where: d.where, finish: d.finish }
          : { business: d.business, site_suburb: d.site, building_type: d.building, glass_faces: d.facing, main_problem: d.problem, install_timing: d.timing }
    try {
      await sendLead({
        _subject: `Quote request (${d.service}) from ${d.name}`,
        source: 'Quote page (/quote)' + (entry ? ` · ${entry}` : ''),
        service: d.service,
        ...details,
        name: d.name, phone: d.phone, email: d.email, suburb: d.suburb, best_contact: d.reach,
        ...(d.email ? { _replyto: d.email } : {}),
      })
      go(5)
    } catch (e) {
      setSendErr(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setSending(false)
    }
  }

  function next() {
    if (step === 4) return void send()
    if (step < 4 && validate(step)) go(step + 1)
  }

  const h2 = (children: React.ReactNode) => <h2 ref={headRef} tabIndex={-1} style={{ outline: 'none' }}>{children}</h2>
  const filled = (v: string) => (v ? 'filled' : undefined)

  function panel(s: number) {
    switch (s) {
      case 1:
        return (
          <>
            <span className="mono k">Step 01 · Service</span>
            {h2(<>What are we<br /><span>protecting?</span></>)}
            <div className="choices" role="group" aria-label="Service">
              {SERVICES.map((x) => (
                <button key={x.s} type="button" className={'ch rs' + (d.service === x.s ? ' on' : '')} aria-pressed={d.service === x.s} onClick={() => set('service')(x.s)}>
                  <span className="im" style={{ display: 'block' }}>
                    {x.s === 'Paint' && <Pic className="" src="hsv.jpg" op="50% 48%" alt="" />}
                    {x.s === 'Stone' && <Marble seed={91} width={260} height={200} />}
                    {x.s === 'Glass' && <MiniCity />}
                  </span>
                  <b>{x.s}</b>
                  <p>{x.p}</p>
                </button>
              ))}
            </div>
            <p className="mono k" style={{ marginTop: 26 }}>Not sure which? Pick the closest. Julian sorts the rest.</p>
          </>
        )
      case 2:
        if (d.service === 'Stone')
          return (
            <>
              <span className="mono k">Step 02 · Details</span>
              {h2(<>Tell us about<br /><span>the benchtop.</span></>)}
              <div className="f4">
                <Field label="Stone" className={filled(d.stone)} value={d.stone} onChange={set('stone')} placeholder="e.g. Calacatta marble" required error={errs.stone} />
                <Field label="Rough size" className={filled(d.size)} value={d.size} onChange={set('size')} placeholder="e.g. 3.2m island + 2m back bench" />
              </div>
              <Chips labelClass="grp2" className="chips2" label="Where is it?" options={['Kitchen island', 'Vanity', 'Splashback', 'Bar top', 'Table']} value={d.where} onChange={set('where')} />
            </>
          )
        if (d.service === 'Glass')
          return (
            <>
              <span className="mono k">Step 02 · Details</span>
              {h2(<>Tell us about<br /><span>the site.</span></>)}
              <div className="f4">
                <Field label="Business" className={filled(d.business)} value={d.business} onChange={set('business')} placeholder="Business name" autoComplete="organization" />
                <Field label="Site suburb" className={filled(d.site)} value={d.site} onChange={set('site')} placeholder="e.g. Richmond" required error={errs.site} />
              </div>
              <Chips labelClass="grp2" className="chips2" label="Building type" options={['Office', 'Shopfront', 'Clinic', 'Hospitality', 'Building']} value={d.building} onChange={set('building')} />
              <Chips labelClass="grp2" className="chips2" label="Glass faces" options={['North', 'East', 'South', 'West', 'Not sure']} value={d.facing} onChange={set('facing')} />
            </>
          )
        return (
          <>
            <span className="mono k">Step 02 · Details</span>
            {h2(<>Tell us about<br /><span>the car.</span></>)}
            <div className="f4">
              <Field label="Make" className={filled(d.make)} value={d.make} onChange={set('make')} placeholder="e.g. Porsche" />
              <Field label="Model" className={filled(d.model)} value={d.model} onChange={set('model')} placeholder="e.g. 911 Carrera S" required error={errs.model} />
              <Field label="Year" className={filled(d.year)} value={d.year} onChange={set('year')} placeholder="e.g. 2023" inputMode="numeric" />
              <Field label="Colour" className={filled(d.colour)} value={d.colour} onChange={set('colour')} placeholder="e.g. Chalk" />
            </div>
            <Chips labelClass="grp2" className="chips2" label="New or on the road?" options={['Brand new', 'On the road']} value={d.cond} onChange={set('cond')} />
            <Chips labelClass="grp2" className="chips2" label="How is it driven?" options={['Daily', 'Weekends', 'Track days']} value={d.use} onChange={set('use')} />
          </>
        )
      case 3:
        if (d.service === 'Stone')
          return (
            <>
              <span className="mono k">Step 03 · Finish</span>
              {h2(<>Which<br /><span>finish?</span></>)}
              <div className="pkr" role="radiogroup" aria-label="Finish">
                {FINISHES.map((x) => (
                  <button key={x.b} type="button" role="radio" aria-checked={d.finish === x.b} className={'r rs' + (d.finish === x.b ? ' on' : '')} onClick={() => set('finish')(x.b)}>
                    <i /><span className="thumb" style={{ width: 40, height: 84, overflow: 'hidden', display: 'block' }}><Marble seed={x.m} width={40} height={84} /></span>
                    <span className="pt"><b>{x.b}</b><span>{x.d}</span></span><em>Price on quote</em>
                  </button>
                ))}
              </div>
              <p className="mono k" style={{ marginTop: 18 }}>Sample imagery · generated marble</p>
            </>
          )
        if (d.service === 'Glass')
          return (
            <>
              <span className="mono k">Step 03 · Problem</span>
              {h2(<>What needs<br /><span>fixing?</span></>)}
              <div className="pkr" role="radiogroup" aria-label="Main problem">
                {PROBLEMS.map((x, i) => (
                  <button key={x.b} type="button" role="radio" aria-checked={d.problem === x.b} className={'r rs' + (d.problem === x.b ? ' on' : '')} onClick={() => set('problem')(x.b)}>
                    <i /><span className="mono" style={{ color: 'var(--or)' }}>{pad(i + 1)}</span>
                    <span className="pt"><b>{x.b}</b><span>{x.d}</span></span><em>Price on quote</em>
                  </button>
                ))}
              </div>
              <Chips labelClass="grp2" className="chips2" label="Install timing" options={['Business hours', 'After hours', 'Weekend']} value={d.timing} onChange={set('timing')} />
            </>
          )
        return (
          <>
            <span className="mono k">Step 03 · Package</span>
            {h2(<>How much<br /><span>film?</span></>)}
            <div className="pkr" role="radiogroup" aria-label="Coverage">
              {PAINT_PACKS.map((x) => (
                <button key={x.k} type="button" role="radio" aria-checked={d.pack === x.b} className={'r rs' + (d.pack === x.b ? ' on' : '')} onClick={() => set('pack')(x.b)}>
                  <i /><Coverage kind={x.k} id={'qcov-' + x.k} />
                  <span className="pt"><b>{x.b}</b><span>{x.d}</span></span><em>Price on quote</em>
                </button>
              ))}
            </div>
            <button type="button" className="tog rs" role="switch" aria-checked={d.tint} onClick={() => set('tint')(!d.tint)}>
              <span className="sw" />
              <span className="pt"><b>+ Tint bundle</b><br /><span>XPEL window tint in the same visit · priced with your quote</span></span>
            </button>
          </>
        )
      case 4:
        return (
          <>
            <span className="mono k">Step 04 · Contact</span>
            {h2(<>Where do we<br /><span>reply?</span></>)}
            <div className="f4">
              <Field label="Name" className={filled(d.name)} value={d.name} onChange={set('name')} placeholder="Your name" autoComplete="name" required error={errs.name} />
              <Field label="Phone" className={filled(d.phone)} value={d.phone} onChange={set('phone')} placeholder="Your mobile" type="tel" autoComplete="tel" required error={errs.phone} />
              <Field label="Email" className={filled(d.email)} value={d.email} onChange={set('email')} placeholder="you@email.com" type="email" autoComplete="email" error={errs.email} />
              <Field label="Suburb" className={filled(d.suburb)} value={d.suburb} onChange={set('suburb')} placeholder="e.g. Brighton" autoComplete="address-level2" />
            </div>
            <Chips labelClass="grp2" className="chips2" label="Best way to reach you" options={['Call', 'Text', 'Email']} value={d.reach} onChange={set('reach')} />
            <div className="drop">
              <span><b>Got photos?</b> Text them to Julian on <a href={TEL} style={{ textDecoration: 'underline' }}>{PHONE}</a> once this is sent. They help him price it properly.</span>
            </div>
            {sendErr && <p className="fmsg" role="alert">{sendErr}</p>}
          </>
        )
      default: {
        const sum = summary()
        const what = d.service === 'Paint' ? `your ${d.model || 'car'}` : d.service === 'Stone' ? 'your benchtop' : (d.business || 'the site')
        return (
          <>
            <span className="mono k">Sent · confirmation</span>
            <div className="sent" style={{ marginTop: 20 }}>Sent<span>.</span></div>
            <h2 ref={headRef} tabIndex={-1} className="sr">Quote sent</h2>
            <p style={{ fontSize: 19, fontWeight: 500, maxWidth: 620, marginTop: 22 }}>Julian&apos;s got it. He&apos;ll come back with options and a price for {what}, from the person who&apos;ll fit it.</p>
            <div className="sum">{sum.map(([k, v]) => <div key={k}><span className="mono">{k}</span><b>{v}</b></div>)}</div>
            <ol className="next qn">
              <li><span className="mono">01</span><b>Julian reads it</b><p>Himself. Photos help him price it properly.</p></li>
              <li><span className="mono">02</span><b>You get options</b><p>{d.service === 'Paint' ? 'Coverage, film' : 'Film options'} and a price, by {d.reach === 'Email' ? 'email' : d.reach === 'Call' ? 'phone' : 'text'}.</p></li>
              <li><span className="mono">03</span><b>Book the pass</b><p>{d.service === 'Paint' ? 'Pick a drop-off day that suits.' : 'Pick a day for Julian to come out.'}</p></li>
            </ol>
          </>
        )
      }
    }
  }

  return (
    <div className="qf">
      <aside className="ql">
        <Wipe kind="paint" pos={POS_BY[step]} seed={401} zone=".1 .35 .9 .62" chips={300} swirl=".4 .3"
          media={<Pic src="porsche.jpg" eager op="50% 70%" alt="Porsche 911 in the studio, getting cleaner as the quote progresses" />} />
        <div className="top">
          <img src={`${IMG}/logo.png`} alt="JT Luxury Tints" width={94} height={30} />
          <Link href="/">Close <span aria-hidden="true">×</span></Link>
        </div>
        <div className="prog" aria-live="polite">
          <b>{step > 4 ? <>Done<span>.</span></> : <>{pad(step)}<span>/04</span></>}</b>
          <div className="mono" style={{ marginTop: 12, color: '#d6d0c8' }}>The car gets cleaner as you go</div>
        </div>
        <ol className="qsteps">
          {STEP_NAMES.map((n, i) => {
            const st = i + 1 < step ? 'done' : i + 1 === step ? 'now' : undefined
            return <li key={n} className={st} aria-current={st === 'now' ? 'step' : undefined}><span className="mono">{pad(i + 1)}</span>{n}<em>{st === 'done' ? 'Done' : st === 'now' ? 'Now' : ''}</em></li>
          })}
        </ol>
        <div className="call"><span className="mono" style={{ color: '#a7a29a' }}>Rather call?</span><a href={TEL}><b>{PHONE}</b></a></div>
      </aside>

      <main className="qr" id="main">
        <div className="bar" aria-hidden="true">{[1, 2, 3, 4].map((i) => <s key={i} className={i <= step ? 'on' : undefined} />)}</div>
        <div className="stage" ref={stageRef}>
          {prev !== null && (
            <div key={'p' + prev} ref={prevRef} className="qpanel old" style={{ zIndex: 1 }} aria-hidden="true">
              {panel(prev)}
            </div>
          )}
          <div key={'p' + step} ref={curRef} className="qpanel" style={{ zIndex: 3 }}>
            {panel(step)}
          </div>
          <div className="tblade" ref={bladeRef} style={{ display: 'none' }} aria-hidden="true" />
        </div>
        <div className="foot">
          <span className="mono">{step > 4 ? 'Quote sent' : `Step ${step} of 4`}</span>
          {step === 5 ? (
            <>
              <a className="btn line" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">@jtluxurytints</a>
              <Link className="btn o" href="/">Back to site <i aria-hidden="true">&#8599;</i></Link>
            </>
          ) : (
            <>
              {step === 1
                ? <Link className="btn line" href="/">Back</Link>
                : <button type="button" className="btn line" onClick={() => go(step - 1)}>Back</button>}
              <button type="button" className="btn o" onClick={next} disabled={sending}>
                {step === 4 ? (sending ? 'Sending…' : 'Send for a quote') : 'Next'} <i aria-hidden="true">&#8599;</i>
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
