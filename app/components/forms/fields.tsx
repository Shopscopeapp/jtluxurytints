'use client'

import React, { useId, useState } from 'react'
import { sendLead } from '../../lib/site'

export type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Submit state for a Formspree lead form. */
export function useLead() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  async function submit(data: Record<string, string>) {
    setStatus('sending')
    setError('')
    try {
      await sendLead(data)
      setStatus('sent')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
      setStatus('error')
    }
  }
  return { status, error, submit }
}

type FieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  full?: boolean
  labelClass?: string
}

/** Label wrapping its input, as in the design, plus an inline error. */
export function Field({ label, value, onChange, error, full, labelClass, className, ...rest }: FieldProps) {
  const id = useId()
  const cls = [full ? 'full' : '', labelClass || ''].filter(Boolean).join(' ') || undefined
  return (
    <label className={cls}>
      {label}
      <input
        {...rest}
        className={className}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? id : undefined}
      />
      {error && <span className="ferr" id={id}>{error}</span>}
    </label>
  )
}

/** Single-select chip row rendered as real toggle buttons. */
export function Chips({ label, options, value, onChange, className, labelClass }: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
  className: string
  labelClass?: string
}) {
  const id = useId()
  return (
    <div className={labelClass}>
      <label id={id}>{label}</label>
      <div className={className} role="group" aria-labelledby={id}>
        {options.map((o) => (
          <button key={o} type="button" className={'rs' + (o === value ? ' on' : '')} aria-pressed={o === value} onClick={() => onChange(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
