'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IMG, PHONE, TEL } from '../lib/site'

const LINKS = [
  { href: '/automotive-ppf', n: '01', label: 'Paint' },
  { href: '/benchtop-protection', n: '02', label: 'Stone' },
  { href: '/commercial-tinting', n: '03', label: 'Glass' },
  { href: '/our-work', label: 'Work' },
  { href: '/#studio', label: 'Studio' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])
  const close = () => setOpen(false)

  return (
    <nav className={'nav' + (open ? ' open' : '')} aria-label="Main">
      <Link className="logo" href="/" onClick={close}>
        <img src={`${IMG}/logo.png`} alt="JT Luxury Tints" width={107} height={34} />
      </Link>
      <ul>
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.n && <b>{l.n}</b>}{l.label}</Link>
          </li>
        ))}
      </ul>
      <a className="tel" href={TEL}>{PHONE}</a>
      <Link className="btn o" href="/quote">Get a quote <i aria-hidden="true">&#8599;</i></Link>
      <button className="burger" type="button" aria-label={open ? 'Close menu' : 'Menu'} aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
        <s /><s />
      </button>
      <div className="mnav" id="mnav" hidden={!open}>
        {LINKS.map((l) => (
          <Link key={l.href} className="ml" href={l.href} onClick={close}>{l.label}{l.n && <b>{l.n}</b>}</Link>
        ))}
        <a className="mtel" href={TEL}>{PHONE}</a>
        <Link className="btn o" href="/quote" onClick={close}>Get a quote <i aria-hidden="true">&#8599;</i></Link>
      </div>
    </nav>
  )
}
