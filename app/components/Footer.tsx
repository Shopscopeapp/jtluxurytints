import Link from 'next/link'
import { IMG, INSTAGRAM, PHONE, TEL } from '../lib/site'

export default function Footer() {
  return (
    <footer className="sf">
      <div className="sfbig" aria-hidden="true"><div className="sf-big disp">Paint<i>/</i>Stone<i>/</i>Glass</div></div>
      <div className="sf-cols">
        <div className="sf-brand">
          <img src={`${IMG}/logo.png`} alt="JT Luxury Tints" width={107} height={34} loading="lazy" />
          <p>Paint · Stone · Glass Protection. Every job fitted by hand by Julian, in Melbourne.</p>
          <Link className="btn o" href="/quote">Get a quote <i aria-hidden="true">&#8599;</i></Link>
        </div>
        <div>
          <span className="mono">Services</span>
          <Link href="/automotive-ppf">Automotive PPF</Link>
          <Link href="/benchtop-protection">Benchtop protection</Link>
          <Link href="/commercial-tinting">Commercial tint</Link>
          <Link href="/automotive-ppf#bundle">Window tint bundle</Link>
        </div>
        <div>
          <span className="mono">Studio</span>
          <Link href="/our-work">Our work</Link>
          <Link href="/#process">How a pass goes</Link>
          <Link href="/#studio">Trade &amp; dealers</Link>
          <Link href="/quote">Quote</Link>
        </div>
        <div>
          <span className="mono">Talk to Julian</span>
          <a className="sf-tel" href={TEL}>{PHONE}</a>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">@jtluxurytints</a>
          <Link href="/">jtluxurytints.com.au</Link>
          <span className="sf-loc">Melbourne, VIC</span>
        </div>
      </div>
      <div className="sf-bar"><span className="mono">© JT Luxury Tints</span><span className="mono">XPEL film · Fitted by hand</span><span className="mono">Generated imagery is labelled where used</span></div>
    </footer>
  )
}
