import { Fragment } from 'react'

export default function Ticker({ items }: { items: string[] }) {
  // two identical runs; the CSS animation slides by -50% and loops seamlessly
  const run = (k: number) => items.map((t, i) => <Fragment key={`${k}-${i}`}><span>{t}</span><em>/</em></Fragment>)
  return (
    <div className="ticker" aria-hidden="true">
      <div className="tr">{run(0)}{run(1)}</div>
    </div>
  )
}
