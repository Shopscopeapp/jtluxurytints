import { TEL } from '../lib/site'

/** Fixed call / quote bar, phone widths only (hidden by CSS above 600px). */
export default function CallBar({ quoteHref = '/quote' }: { quoteHref?: string }) {
  return (
    <div className="callbar">
      <a className="c" href={TEL}>Call Julian</a>
      <a className="q" href={quoteHref}>Get a quote <span aria-hidden="true">&#8599;</span></a>
    </div>
  )
}
